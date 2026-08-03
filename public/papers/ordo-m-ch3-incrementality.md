# Locality Was Not Bought at the Price of Trainability: How a Zero-Initialized Decoder Silently Made the First Update Privileged

**Ordo-M Technical Report, Chapter 3**

Independent research, single author, unfunded. Measurement cutoff: 2026-08-02.
Companion to Chapters 1 and 2.

---

## Abstract

Chapter 1 established that a single pointwise edit to an externally addressed memory grafted into a frozen Qwen3-8B damages 0.0 percentage points of the surrounding knowledge. That is not the product claim. The product claim is a *series* of updates — documentation changes, and you write the delta over what is already there. This chapter measures the series, and it does so in two passes, because the first pass produced a negative result that I published and that turns out to be wrong.

**The first pass.** Five waves of 100 records each, the first training everything and the rest touching only value slots. Forgetting was absent — the earliest wave went 88.0% → 88.0% across four subsequent retrainings, a drift of **0.0 points** against a criterion of 3. But the later waves themselves learned at only 27–32% against 88% for the first and 97.3% for full retraining of the combined corpus, at identical wall-clock time. Tripling the training budget bought 37 points and pushed the cost to 583 seconds against 227 for retraining. The conclusion I drew and wrote down was: **locality is bought at the price of trainability.**

**The second pass refutes it.** The failure was not a slope but a single step at the freezing boundary, which localizes the defect. Under external addressing exactly one shared parameter is live — the output projection — and it is initialized to zero, which is precisely what makes the graft bitwise identical to the base model at insertion. The consequence, which was not in anyone's plan: on the first step the gradient reaching the value table is proportional to that zero matrix, so the projection moves first and alone, driven by whatever data happens to train first. **The subspace and the amplitude the memory can ever write with are not chosen; they grow out of the first wave's hundred records and are then frozen together with that wave's bias.**

The fix that worked is not the one I expected. Calibrating the shared part once on a larger corpus and freezing it recovers parity with full retraining (96.2% against 96.9%, inside the 0.6-point measurement noise, at zero drift). But a scale sweep then showed that **the shared part does not need to be trained at all**: a frozen random orthogonal decoder that has never seen a single record, given the right scale, reaches 99.4% with perfectly symmetric waves — above full retraining. What looked like a learned write subspace was learned *loudness*, one number, and it can be assigned as a constant.

Loudness is paid for in text, which is Chapter 2's trade-off arriving from a different direction. The working point I settle on gives waves of 90.0–96.0%, drift of 0.0 points, +36.8% perplexity on entity mentions and **+0.00%** on neutral prose — three times the knowledge of the original construction at a tenth of the damage, with **no shared parameter trained even once during the run**.

---

## 1. What has to be measured, and why one edit is not enough

Chapter 1's locality result covers a single edit. The system I am describing is supposed to absorb a documentation diff every time a library releases, which is a sequence of tens of updates, each written on top of everything already stored. Two things can go wrong in a sequence that cannot go wrong in one edit: the old knowledge can erode gradually, and the new knowledge can stop being absorbable.

The measurement is a series of waves. The first wave trains the module; each later wave trains only the value slots of its own records, with everything shared frozen — the arrangement Chapter 1 identified as necessary, since isolation is worth nothing while any parameter on the read path is both shared and trainable. After every wave, **all** previous waves are re-measured. The result is a retention matrix: rows are "after which wave", columns are "how well is which wave remembered".

The control arm is full retraining of the accumulated corpus, which is what a conventional adapter would require.

## 2. The first pass: forgetting is absent, and absorption collapses

Five waves of 100 CounterFact records, Qwen3-8B.

| after \ wave | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 0 | 88.0% | | | | |
| 1 | 88.0% | 32.0% | | | |
| 2 | 88.0% | 32.0% | 32.0% | | |
| 3 | 88.0% | 32.0% | 32.0% | 28.0% | |
| 4 | 88.0% | 32.5% | 32.0% | 28.0% | 27.0% |

**The good half.** The columns do not move. The first wave across four subsequent retrainings: 88.0% → 88.0%, a drift of **0.0 points**. Forgetting here is not a phenomenon to be fought, it is a phenomenon that does not occur: disjoint slots plus a frozen shared part give locality directly.

**The bad half.** The later waves learn at 27–32% against 88% for the first and 97.3% for full retraining, a mean across waves of 41.5% against 97.3%. And the wall-clock times were **identical**: 227 seconds either way. In that form, incremental updating loses on quality and wins nothing on speed.

Training loss for the later waves stalls at 4.03–4.15 against 3.46 for the first, which looks like undertraining rather than a ceiling. Two explanations were available and only a measurement separates them: **budget** (later waves get fewer steps and half the learning rate, so incremental updating works but costs more than assumed) or **freezing** (the shared parameters are fitted to the first wave's slots and do not serve new ones, so locality and trainability are incompatible in this construction).

Tripling the budget answered: both, and budget is the larger part. Later waves rose from 27–32% to 66–70.5%, buying about 37 points, while the drift of the first wave stayed at noise (+0.5 points) — a threefold more aggressive training of later waves did not touch the earlier records at all, which is an independent confirmation of locality under load.

But the gap did not close, and the price had risen out of proportion:

| | mean across waves | time |
|---|---:|---:|
| waves, 6 epochs | 41.5% | 227 s |
| waves, 18 epochs | **72.5%** | 583 s |
| full retraining | **97.3%** | 227 s |

Slower by a factor of 2.6 and worse by 25 points, simultaneously. I published that as a negative result under the heading **"locality in the present construction is bought at the price of trainability, and budget reduces that price without removing it."** The rest of this chapter is about why that sentence was wrong.

### 2.1 An observation from the same run that deserves its own paragraph

**Full retraining of the combined corpus wrecks the text.** Perplexity on a probe carrying mentions of trained entities came to **+17860%** for retraining against **+463%** for waves. The control arm here is not a benign reference point; on base-model damage it is the worst of the options. Waves pay in the quality of new records and buy text integrity with it. Retraining does exactly the opposite.

This did not change the conclusion at the time, and it should have made me suspicious of it. A control arm that wins the headline metric by destroying the thing the headline metric is supposed to be protecting is not a control arm you should be conceding to.

## 3. A step, not a slope

The distinction that decides what to repair, and the first pass stated it insufficiently clearly.

| | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 6 epochs | 88.0% | 32.5% | 32.0% | 28.0% | 27.0% |
| 18 epochs | 90.0% | 69.0% | 70.5% | 67.0% | 66.0% |

Between waves 1 and 4 the difference is within two records per hundred. Between wave 0 and wave 1 it is more than twenty points. A slope would mean the construction accumulates damage and is doomed. A step means a defect in one specific place — a one-time discontinuity at the freezing boundary.

The place was found by reading the construction, not by running anything. This is the second time in this project that has worked (Chapter 2 §2 is the first), and it is beginning to look like a method rather than a coincidence.

## 4. Exactly one shared parameter is live, and it starts at zero

Under external addressing the learned lookup is never invoked — the address supplies the slots directly, so the query projection, the half-key tables, the normalization and the temperature are dead code, and the gate is off in these configurations. What remains is one shared parameter through which everything passes: the output projection that carries the retrieved value into the residual stream.

And it is initialized to **zero**. That is not an oversight; it is what buys the property Chapter 1 relies on, that the graft is bitwise identical to the base model at the moment of insertion. It is the same device as the zero-initialized second factor in LoRA, and for the same reason.

The consequence was in nobody's plan. The memory's output is a product of two factors: the retrieved value and this projection. On the first step, the gradient with respect to the values is mediated by the projection — and the projection is zero, so the gradient with respect to the values is zero too. The projection moves first, and alone, driven by terms of the form "upstream gradient ⊗ retrieved value", evaluated on the records of whichever wave happens to train first.

> **The subspace of the residual stream into which the memory is capable of writing at all is not chosen in advance. It grows out of the first wave's data and is frozen together with that wave's bias.**

The bias is measurable, and measuring it also revealed what it depends on:

| what trained the projection | condition number | effective dimension |
|---|---:|---:|
| wave 0, 100 records | 272.0 | **187.7** of 512 |
| calibration slice, 500 records | 261.1 | **267.5** of 512 |

Directions are not closed off — Adam updates coordinate-wise and leaves near-full rank — but their weights are distributed very differently, and a hundred records yield eighty fewer working directions than five hundred. This confirms an earlier conjecture that the shared part learns *from volume*: a wave of a hundred records selects a narrow subspace fitted to its own hundred facts, freezes it, and every subsequent wave finds itself a guest inside somebody else's metric.

## 5. Eight arms, and a measurement noise floor

All runs: Qwen3-8B, RTX 4090, CounterFact in override mode, five waves of 100 records. A wave takes 15–16 seconds; a full arm with all measurements runs 140 to 240 seconds.

The baseline arm was re-run from scratch on the new card specifically as an anchor, because the first-pass numbers were taken on an L4 and comparing new arms against them without that check would have been illegitimate. Reproduction was complete: wave 0 at 89.0% against 88.0%, later waves 27.0–32.0% against 27.0–32.5%, mean across waves 41.4% against 41.5%, full retraining 96.9% against 97.3%. Everything inside measurement noise, at a third of the time.

Two arms were run twice in identical configurations before the operation that distinguishes them, and calibration knowledge came out 97.5% against 96.9%. That gives a **measurement noise of roughly 0.6 points on a sample of a thousand items** — the figure every claim below is checked against. A drift of +0.5 points is noise. A step of −3.1 points is not.

"Step" here and below means wave 0 minus the mean of the later waves; positive means the first wave was privileged.

| arm | what changes | wave 0 | later | step | drift |
|---|---|---:|---:|---:|---:|
| **A** baseline, 6 epochs | — | 89.0% | 27.0–32.0% | +59.5 pts | 0.0 pts |
| **A′** baseline, 18 epochs | budget | 89.5% | 66.0–70.5% | +21.4 pts | +0.5 pts |
| **C** frozen orthogonal decoder | initialization | 17.5% | 11.5–15.5% | +5.0 pts | 0.0 pts |
| **E** same, doubled vector width | and capacity | 18.0% | 11.0–16.5% | +5.2 pts | 0.0 pts |
| **B** calibrate on 500, then freeze | training order | 78.0% | 79.0–84.0% | **−3.1 pts** | +0.5 pts |
| **D** B + whitening of the decoder | conditioning | 21.0% | 27.0–33.0% | −9.2 pts | 0.0 pts |

### 5.1 Arms C and E: symmetry achieved, memory silent

The intent of arm C was to remove the privilege radically. Make the decoder a random semi-orthogonal matrix, initialize the values to zero, and freeze the decoder from step zero. Graft identity is preserved — a zero value gives a zero output — the gradient with respect to values is isotropic, and the shared part is never trained at all. There is no privileged wave by construction.

The symmetry did arrive: the step fell from +21 to +5 points, with later waves spread across 11.5–15.5%. But the level collapsed to the floor. And the decisive clue is not in the percentages, it is in the training: **the loss does not fall, it rises** — 4.878 → 4.950. The memory did not learn "evenly and badly". It did not learn.

Arm E tested the one honest objection — that a random 512-dimensional subspace inside 4096 is simply too small. Doubling the vector width gave the same result, 18.0% against 12.8%. Subspace dimensionality is not the issue.

The cause is scale. With an orthonormal decoder, the addition to the residual stream has the same norm as the value itself, and the values start at zero. Adam moves a coordinate by roughly the learning rate per touch, a record's slot is touched about two dozen times across six epochs, so the value norm reaches around 5. A *trained* decoder has a leading singular value of 376. Two orders of magnitude of gap, and the memory has no way to reach the amplitude at which it is audible at all.

> **Orthogonal initialization without scale matching is not a "neutral start". It is a silent switching-off of the memory.** No training metric reports it: the loss barely moves, addressing is 100%, nothing fails.

I record this as a standalone lesson because the failure mode is invisible to exactly the instruments one would normally trust.

### 5.2 Arm B: the step changes sign

Arm B changes not the construction but the order. The shared part is trained once on a calibration slice of 500 records and frozen permanently; only then do five product waves of 100 records each, drawn from a **different** slice, touch nothing but values.

| after \ wave | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 0 | 77.5% | | | | |
| 2 | 77.5% | 79.0% | 79.0% | | |
| 4 | 78.0% | 79.0% | 79.0% | 84.0% | 82.5% |

- the calibration slice is learned to **97.5%**, matching the 96.9% obtained on the same 500 records in a separate volume measurement;
- **the step is −3.1 points**: later waves learn slightly *better* than the first;
- drift of the first wave across four retrainings: **+0.5 points**, i.e. noise;
- calibration knowledge after all five waves: 97.5% → **97.6%** — untouched;
- wave loss actually falls, 4.64–4.70 → 3.52–3.58, against "does not fall at all" in arm C. The wave is learning rather than imitating learning;
- timing: calibration 77 s, each wave 15 s, all four incremental updates 60 s.

**A caveat without which the absolute numbers are unreadable.** Arm B's waves are drawn from a different slice of CounterFact than the baseline's. Quantities internal to an arm — the step and the drift — are comparable across arms; absolute levels between A and B are not, without that correction. Within arm B the comparison is clean, since all five waves come from one slice.

### 5.3 How much calibration is needed

If calibration works, it has a size, and the size has to be known before datasets are collected.

| calibration | calibration knowledge | wave 0 | later | step |
|---:|---:|---:|---:|---:|
| 250 | 93.2% | 68.5% | 58.0–68.5% | +4.2 pts |
| 500 | 97.5% | 78.0% | 79.0–84.0% | −3.1 pts |
| 1000 | 97.3% | 87.5% | 86.5–93.0% | −2.4 pts |

Monotone and not saturating by a thousand: doubling the calibration lifts the waves by about nine points. At 250 records the step is still positive — the shared part did not get enough volume, and the first wave's privilege returns. From 500 onward it is negative and stays there. Calibration knowledge itself does not change at any grid point across five waves (93.2 → 93.2, 97.5 → 97.6, 97.3 → 97.4): freezing protects the calibration corpus exactly as it protects the earlier waves.

### 5.4 Calibration plus budget reaches parity with retraining

The remaining question was whether the two levers compose. Calibration on 500 records, then waves at eighteen epochs instead of six — the same schedule that had hit a 70.5% ceiling in the first pass, but now on top of a calibrated shared part. The column is the mean over the four incremental waves.

| | mean, incremental waves | drift | wave time |
|---|---:|---:|---:|
| baseline, 6 epochs | 29.5% | 0.0 pts | 15 s |
| baseline, 18 epochs | 68.1% | +0.5 pts | 107 s |
| calibration 500, 6 epochs | 81.1% | +0.5 pts | 15 s |
| calibration 1000, 6 epochs | 89.9% | +0.5 pts | 15 s |
| **calibration 500, 18 epochs** | **96.2%** | **0.0 pts** | 45 s |
| full retraining (control) | 96.9% | — | 75 s |

**The gap is closed.** 96.2% against 96.9% is inside the 0.6-point noise, at zero drift of the earlier records, and a wave costs 45 seconds against 75 for retraining. That advantage grows rather than shrinks: a wave's cost depends only on the size of the wave, while retraining's depends on the entire accumulated corpus.

The ceiling that the schedule had been hitting stopped existing the moment the shared part stopped being an inheritance from the first hundred records. Eighteen epochs on top of calibration give 96.2%; eighteen epochs on top of wave 0 gave 68.1%.

### 5.5 Arm D: whitening kills the memory, and that is the best result in the chapter

Arm D differs from B by exactly one operation: after calibration, the decoder is replaced by its polar factor. The intent was to remove the conditioning while preserving the learned subspaces — the singular vectors stay, only their weights change.

The operation worked perfectly in form and catastrophically in substance:

| | condition number | effective dimension | calibration knowledge |
|---|---:|---:|---:|
| after calibration | 272.9 | 266.8 of 512 | **96.9%** |
| after whitening | **1.0** | **512.0 of 512** | **18.3%** |

The spectrum is flattened exactly, all 512 directions are equal — and the knowledge is gone. Not degraded: gone, from 96.9% to 18.3%, with the subspaces untouched and not a single record retrained.

The obvious first reading was that the spectral skew *is* the learned content, and that "where to write" cannot be separated from "on whose facts it was learned". The scale sweep in the next section showed that reading is wrong, and that the correct explanation is simpler.

Whitening changes the decoder. The values in the table were fitted to the **old** matrix — to its directions and to its weights — and after the substitution they are being read by a decoder they were never trained under. The 96.9% → 18.3% collapse does not prove that knowledge lives in the singular values; it proves that **the values and the decoder are fitted to each other**, and that any modification of the decoder devalues the entire table at once.

That is worth knowing on its own, and its practical consequence is severe: after ingestion, the output projection must not be touched by anything, including "improvements" such as renormalization, further training on a new domain, or transferring a decoder between packages.

The more useful part is quantitative. After whitening, the decoder is an isotropic matrix at scale σ̄ — which is precisely arm C's construction, but with a scale of order thirty instead of one. Waves on it learn at **27–33%** against 11–15% at scale one. So scale is the cause of C's failure, and the next section tests that head-on.

## 6. The scale sweep: it was only ever scale

One constant controls the magnitude of the orthogonal initialization; with it, the addition to the residual stream is exactly that many times the norm of the value. Nothing else in the construction changes: the decoder is frozen from step zero, the values start at zero, the shared part is never trained.

| scale | wave 0 | later | step | ΔPPL on mentions |
|---:|---:|---:|---:|---:|
| 1 | 17.5% | 11.5–15.5% | +5.0 pts | −0.2% |
| 10 | 18.2% | 15.2% | +3.0 pts | **−0.8%** |
| 50 | 47.0% | 47.4% | −0.4 pts | **+4.8%** |
| 250 | **99.2%** | **99.4%** | **−0.2 pts** | +1164% |

This should be read literally. **A frozen random orthogonal matrix that has never seen a single record gives, at the right scale, 99.4% of the knowledge with perfectly symmetric waves — higher than full retraining (96.9%), and higher than a decoder that was trained on a calibration corpus and then frozen (80.5%).**

So the hypothesis behind arms B and D was wrong twice over. The shared part does not need to be calibrated on volume; it does not need to be trained at all. The only thing it is obliged to do is land in the scale of the residual stream. Everything that looked like a *learned write subspace* was **learned loudness** — one number, which there is no reason to obtain by gradient descent.

This also explains the entire first pass in retrospect. Wave 0 trained the decoder and thereby assigned the loudness; later waves inherited it along with a fit to somebody else's hundred facts. The tripled budget was not compensating for a bad subspace but for insufficient value amplitude inside a scale it did not choose — which is why it bought 37 points and then stopped.

**But text pays for loudness, and this is Chapter 2's trade-off arriving from a different direction.** The perplexity cost grows faster than the scale: at 50 the text is essentially untouched (+4.8%), at 250 perplexity on mentions rises twelvefold. 99.4% knowledge at that cost is not a memory, it is a steering vector forcing an answer over the base model — precisely the failure Chapter 2 dissected, and it is repaired the same way.

A caveat on that column: these resource benches run without the anchor and without answer masking, so the absolute perplexity values are an artifact of the configuration. They are comparable between arms of this chapter, which share one configuration, and not comparable with the product numbers in §7.

And on that same comparison something unpleasant surfaces for calibration: **arm B damages text more than anything else measured, +22851%**, at 80.5% knowledge. The frozen random decoder at scale 250 delivers more knowledge at twenty times less damage. The scheme I spent most of the session building is dominated by the scheme that required no training at all.

## 7. The product point: the same thing with Chapter 2's protections

The numbers above were taken in a resource-bench configuration that has no text protection by construction. The real question is what remains of 99.4% once Chapter 2's mechanisms are enabled: one slot per entity, cross-entropy on the answer only, and a locally scoped anchor.

**The gate is deliberately left off, and this is a decision worth stating.** Chapter 2 found the gate worth a further factor of 4.5 on text damage. But the gate is shared and trainable, and Chapter 1's rule applies without exception: isolation is worth nothing while any parameter on the read path is both shared and trainable. Turning it on would mean every wave adjusts, for every previous wave, a parameter they all depend on — giving away exactly the property the system exists for. The protection here is carried by the anchor and the answer mask. **This is a real cost of incrementality, paid in text quality, and it is charged against a benefit Chapter 2 had already banked.**

| | wave 0 | later | step | drift | ΔPPL mentions | ΔPPL prose |
|---|---:|---:|---:|---:|---:|---:|
| scale 100 | 90.0% | 91.5–96.0% | −3.2 pts | 0.0 pts | **+36.8%** | **+0.00%** |
| scale 250 | 99.5% | 99.5–100.0% | −0.4 pts | 0.0 pts | +266.0% | **+0.00%** |
| original construction | 89.0% | 27.0–32.0% | +59.5 pts | 0.0 pts | +470.2% | +0.00% |

The retention curve at scale 100 is what the whole chapter was for:

| after \ wave | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 0 | 90.0% | | | | |
| 2 | 90.0% | 91.5% | 92.5% | | |
| 4 | 90.0% | 91.5% | 92.5% | 93.0% | 96.0% |

The columns do not move by a tenth of a point, and the rows rise: the fifth wave learns better than the first. **No shared parameter was trained even once during the run.**

**The working point is scale 100.** Mean wave knowledge 93.2% at +36.8% damage on mentions. It beats the original construction on both axes simultaneously — three times the knowledge at a tenth of the damage. Scale 250 adds six points of knowledge for a sevenfold larger perplexity cost, which is a bad exchange, and the 99.9% there should be read as "the memory is forcing the answer" rather than "the memory is well trained."

The anchor helps at both points: at scale 250 it reduced damage from +1164% to +266% while simultaneously raising knowledge from 99.4% to about 99.9%. It does not abolish the loudness/text trade-off, but it shifts the whole curve in the right direction.

Finally, the **+0.00% on neutral prose** at both points. The property "no mention, and the memory returns exactly zero" is neither approximate nor learned; it follows from how addressing works, and it holds at any loudness. All the damage that exists at all is concentrated on texts where a trained entity is named.

## 8. What is now known about the construction

**Drift of early records is zero in all eight arms without exception** — 0.0, 0.0, 0.0, 0.0, +0.5, +0.5, +0.5, 0.0 points. It does not depend on initialization, on scale, or on whether anything was learned at all. It is a property of disjoint slots plus freezing, and the construction got it for free. The *step*, by contrast, depended on exactly one thing: who assigned the loudness.

**The shared part need not be trained.** A frozen random orthogonal decoder with a matched scale yields waves above full retraining.

**Values and decoder are fitted to each other and do not transfer separately.** Whitening preserved every subspace and dropped knowledge from 96.9% to 18.3%.

**Scale is a free parameter of the construction rather than an outcome of training.** It trades knowledge against text integrity directly and non-linearly: scale 10 gives 15% knowledge at −0.8% perplexity; scale 100 gives 93% at +37%; scale 250 gives ~99.9% at +266%. It is a knob to be set deliberately for a task, not inherited from the first ingestion.

**Damage to the base is concentrated, not smeared.** Neutral prose is at exactly +0.00% at any loudness.

## 9. Two schemes, and which to choose

**Scheme 1 — frozen random decoder.** Simpler, and currently preferred. The decoder is a random semi-orthogonal matrix at a fixed scale, frozen from step zero; values start at zero; the shared part is never trained; all waves are equal by construction. No calibration corpus is required at all.

A side benefit that needs separate verification: with values initialized to zero, untouched slots stay exactly zero, and the package becomes genuinely sparse. The current table is initialized with noise, and 100% of its rows are non-zero, which affects both the on-disk size of a memory package and the cost of dequantization on untouched rows.

**Scheme 2 — calibration ingestion.** Needed if a learned decoder is wanted. Everything is trained once on a large corpus, the decoder is frozen permanently, and product waves touch only values. Calibration of 500 records plus eighteen epochs per wave gives 96.2% against 96.9% for full retraining. The calibration corpus then becomes part of the package specification: it determines the subspace, it cannot be replaced after the fact, and it must be *wider* than the product slice rather than identical to it.

Common to both: **the decoder is the immutable part of a memory package**, and a diff-driven update touches only rows of the table. A wave costs 15 seconds against 75 for full retraining, and the advantage grows with the accumulated corpus.

## 10. Related work

**Sequential and continual editing.** The knowledge-editing literature treats degradation under long edit sequences as the central open problem — surveys and benchmarks find edit success, locality and portability all deteriorating across essentially all methods as edits accumulate, and the 2026 generation of methods (PRUNE, EAC, O-Edit, QueueEDIT, LyapLock and others) is built to postpone that collapse, in the strongest case out to twenty thousand edits. My claim is structurally different rather than quantitatively better: the drift here is not slowed, it is absent, because an update does not touch the parameters carrying the other records. The corresponding weakness is equally structural — those methods edit knowledge already in the base model's weights, whereas this construction can only reach knowledge it wrote itself, and only where an explicit mention supplies an address (Chapter 1 §10).

**Sparse memory finetuning.** The closest existing line — insert key-value memory layers, then per step train only the value rows the batch reads most heavily. Chapter 1 §11 compares the addressing. What this chapter adds to that comparison is the freezing schedule: in my construction the shared decoder is never updated after ingestion at all, which is why drift is exactly zero rather than small, and §5.5 shows what happens if you violate that even once with a well-intentioned transformation.

**LoRA initialization.** This is the connection I did not expect, and I think it is the most transferable result in the chapter. An entire literature exists on how initialization determines which subspace a low-rank adapter can learn in — PiSSA initializing from the principal singular components of the pretrained matrix, MiLoRA from the least significant ones, LoRA-GA from an SVD of estimated gradients, LoRA-XS from the dominant subspaces of the pretrained weights, and rsLoRA addressing the scaling factor specifically. All of it assumes the standard zero-initialized second factor, and all of it studies a *single* fine-tuning episode.

What §4 reports is the sequential-learning consequence of the same fact. When the output factor starts at zero, the first data to arrive determines both the subspace *and* the amplitude of everything the adapter will ever write — and if the shared part is then frozen for the sake of isolation, that determination becomes permanent for every subsequent update. The privilege of the first batch, invisible in a single fine-tune, becomes a twenty-point step in an incremental system.

My resolution also runs against the grain of that literature. Its answer to "initialization determines the subspace" is to find a better, data-informed initialization. §6 says that in this setting the subspace was never the binding constraint — the amplitude was — and the correct move is not a smarter initialization but to stop training the shared part altogether and assign its scale as a constant. I would be interested to know whether an analogous statement holds for low-rank adapters, and I have not tested it.

## 11. What this does not show

1. **The drift is measured over five waves of a hundred records.** The product promise is dozens of updates. Zero over four retrainings is not zero over twenty, and this remains the largest single gap in the evidence base.
2. **The working point was chosen on CounterFact, not on a real domain.** The optimal scale almost certainly depends on how far the target answer sits from what the base model would say unprompted: a counterfactual edit needs loudness, writing an unknown API perhaps does not. This has to be re-measured on the domain, and it is the reason Chapter 5 cannot simply reuse this number.
3. **Schemes 1 and 2 were not compared under identical conditions.** Scheme 1 was measured with the anchor and one slot per entity; scheme 2 in the resource-bench configuration with sixteen. A direct comparison costs one run and has not been made.
4. **The scale sweep ran on two waves while the product points ran on five**, and intermediate scales were not measured. The knowledge-versus-damage curve rests on four points.
5. **Package sparsity under zero initialization is asserted from the construction and not measured**, and the earlier package-size and quantization-drift figures have not been recomputed under it.
6. **All eight arms are one model, one seed per arm.** Chapter 2 §8 showed that text-damage figures can vary by a factor of two across seeds; the perplexity columns here inherit that caveat.
7. **Refusing the gate costs text quality**, and I have not measured how much in this configuration — only that Chapter 2 valued it at 4.5× in a non-incremental setting.

## 12. What this settles and what it opens

Two of the three things a series of updates could break are now answered. Old knowledge does not erode: zero drift, in every arm, independent of everything else. New knowledge is absorbable at parity with full retraining, and at a cost that improves relative to retraining as the corpus grows, because a wave's price depends only on the wave.

The third is untouched. Everything here is CounterFact — subject, relation, object triples where the fact is pre-decomposed. Chapter 5 puts the construction on a real library's documentation, against a row of retrieval baselines with an oracle ceiling, and I will state in advance what that chapter already knows: the base model does not know the domain at all, any retriever closes 38–40 points of the gap, and symbolic addressing measured *as a retriever* currently loses to plain BM25. The threshold this construction has to clear is a specific number and it is not yet cleared.

Chapter 4, in between, is the price in hardware: training cost against corpus volume, VRAM, quantization, and whether the value table can live outside the GPU at all.

## Methodological note on cost

The entire session behind this chapter — eight arms plus the scale sweep — took 57 minutes on a rented RTX 4090 and cost about seventy cents.

## Reproducibility and disclosure

As in Chapters 1 and 2: this is a preview of a closed project. Every measured number, every control, every failed arm and every retraction is reported. The implementation is withheld — the initialization procedure, the calibration schedule, the addressing internals, the anchor construction, and the code. Scales, epoch counts and calibration sizes appear because they are the axes of the experiments and the findings are meaningless without them.

Nothing here is independently reproducible from this chapter alone.

## Retraction

**"Locality in the present construction is bought at the price of trainability, and budget reduces that price without removing it."** Withdrawn. The measurements supporting it (§2) stand; the interpretation does not. The later waves failed not because freezing denied them the shared part, but because the shared part started at zero and therefore had its amplitude assigned by whichever wave trained first. Once that amplitude is assigned as a constant, waves reach 90.0–96.0% at zero drift with nothing shared trained at any point.

I am keeping the original negative result in the record rather than quietly replacing it, because the sequence — publish the negative finding, find the step, read the construction, refute your own conclusion — is the part of this that generalizes.

## Funding and conflicts

No funding. No institutional affiliation. No revenue. Compute rented personally.

## References

- Meta FAIR, *Memory Layers at Scale*, 2024. arXiv:2412.09764
- Meta, *Continual Learning via Sparse Memory Finetuning*, 2025. arXiv:2510.15103
- Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models*, 2021. arXiv:2106.09685
- Meng et al., *PiSSA: Principal Singular Values and Singular Vectors Adaptation*, 2024. arXiv:2404.02948
- Wang et al., *LoRA-GA: Low-Rank Adaptation with Gradient Approximation*, NeurIPS 2024. arXiv:2407.05000
- Kalajdzievski, *A Rank Stabilization Scaling Factor for Fine-Tuning with LoRA* (rsLoRA), 2023. arXiv:2312.03732
- Bałazy et al., *LoRA-XS: Low-Rank Adaptation with Extremely Small Number of Parameters*, 2024. arXiv:2405.17604
- Biderman et al., *LoRA Learns Less and Forgets Less*, TMLR 2024. arXiv:2405.09673
- Meng et al., *Mass-Editing Memory in a Transformer* (MEMIT), 2023.
- Allen-Zhu & Li, *Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws*, ICLR 2025. arXiv:2404.05405
