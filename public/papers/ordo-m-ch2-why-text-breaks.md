# What I Actually Built Was a Steering Vector: Diagnosing a Six-Order-of-Magnitude Regression and Removing It Without Losing the Fact

**Ordo-M Technical Report, Chapter 2**

Independent research, single author, unfunded. Measurement cutoff: 2026-08-02.
Companion to Chapter 1, *Grafting an Addressable Memory onto a Frozen LLM*.

---

## Abstract

Chapter 1 reported that an externally addressed memory grafted into a frozen Qwen3-8B edits knowledge with zero collateral damage. It also reported, in passing, that where the memory fires it damages the surrounding text. This chapter is about that damage: what it is, why it happens, and what it cost to remove.

The diagnosis did not come from a run. It came from tracing the data path and discovering that under external addressing the memory **does not read the context at all**. The hidden state determines only the shape of a tensor; what is emitted is one fixed vector per entity, added identically to every token from the entity's mention to the end of the sequence. The construction I had been training and measuring for thirteen runs was not sparse memory retrieval. It was **a learned per-entity steering vector broadcast over a token span** — which places this work, unexpectedly, inside the activation-steering literature rather than the memory-layer literature.

Three consequences follow, each measured. The product-key routing machinery never fires and receives no gradient — 9.5M of 145.8M nominal parameters are inert. Effective capacity is 512 degrees of freedom per entity, so 500 trained entities use **0.18% of the nominal parameter count**; the matched-capacity comparison against LoRA in Chapter 1 was therefore not "fair" but heavily handicapped in the control arm's favor. And the damage has a precise mechanism: on unrelated archival prose the memory places **7.3%** of the entire probability mass on the entity's target value, against **5.8 × 10⁻⁶** for the base model — a factor of roughly twelve and a half thousand. "Perplexity ×314" stopped being an observation and became an explanation.

The headline result is a prediction of mine that failed. I had argued that a single constant vector cannot satisfy "silent everywhere, loud in the answer", and that any objective demanding it must collapse the fact. It does not: scoping the training objective locally gives efficacy **0.982** at a whole-probe perplexity cost of **+16.9%**, against **+21,027,832%** for the same construction without it. The binding constraint was the objective, not the architecture. I close with the configuration this produced — whole-probe regression of **+1.9% / +1.5%** across two seeds at efficacy 0.976 / 0.972 — and with three retractions of my own earlier claims, including one I had already published in Chapter 1's framing.

---

## 1. The metric that produced a false conclusion

Chapter 1 ends with a promise and a warning: on the project's neutral probe text, **0.0%** of tokens are addressed, so the memory's equality with the base model there follows from the construction and proves nothing. A probe carrying entity mentions addresses 93% of tokens, and on that probe perplexity went from 39.4 to 12,393.

My first explanation of that was that the anchor term protecting the base model had been dropped in the move to real data. True, but it describes the missing medicine rather than the disease. Worse, the report built on it contained a conclusion that does not survive recomputation, and the failure is instructive enough to open with.

I had claimed that two independent treatments — penalizing the memory's volume, and narrowing the address from a sticky span down to the name token itself — converge on the same frontier point, and that the fact/text trade-off is therefore **a property of the construction**. The two numbers supporting this were 43.0% efficacy at perplexity 120, and 41.2% at perplexity 145.

Those two numbers are not comparable. Perplexity there was computed over the bucket of *addressed positions*, and the two modes have different buckets: under a sticky address the bucket is 1,885 continuation tokens with a base level of 39.4; under name-only addressing it is 94 tokens of the name itself, with a base level of 283.3. Different token sets, different base levels. Their absolute values cannot be set side by side.

Recomputed over the whole probe — the number that answers "how damaged is the text":

| run | efficacy | generalization | whole-probe PPL | share of addressed tokens |
|---|---:|---:|---:|---:|
| sticky, no anchor | 1.00 | 0.97 | **+20250%** | 92.5% |
| anchor weight 0.3 | 1.00 | 0.96 | +2555% | 92.5% |
| anchor weight 1 | 0.96 | 0.91 | +3523% | 92.5% |
| anchor weight 3 | 0.93 | 0.84 | +2636% | 92.5% |
| anchor weight 10 | 0.71 | 0.63 | +600% | 92.5% |
| anchor weight 30 | 0.43 | 0.40 | +180% | 92.5% |
| name-only address | 0.41 | 0.38 | **+5.3%** | 4.6% |

At matched efficacy — 0.41 against 0.43 — narrowing the region where the memory speaks is **34 times cheaper in text** than turning its volume down. The conclusion "the boundary is architectural" is withdrawn: it rested on a coincidence that was an artifact of the bucket.

The whole-probe figure is now the headline regression metric of the project. The error that opens this chapter came directly out of a bucketed metric, and it would have recurred silently.

## 2. The diagnosis, obtained by reading rather than running

Under an external address, the memory returns the slots of the addressed entity with uniform weights, and the hidden state at that position enters the computation only to determine tensor shape. Neither the position, nor the subject under discussion, nor whether a question has been asked at all influences what the memory emits. What is actually added to the residual stream is:

> one fixed vector per entity, identical at every addressed position, applied to every token from the entity's mention to the end of the sequence.

That is not sparse retrieval from a memory. It is **a steering vector, learned per entity and broadcast over a span**.

Three consequences, and they are not cosmetic.

**The routing machinery is inert.** Query projection, the half-key tables, query normalization, the learned temperature, top-k selection, the concentration penalty — none of it is invoked under external addressing, and none of it receives gradient. That is 9.5M of 145.8M nominal parameters taking no part in any number this project has reported.

**Effective capacity is 0.18% of nominal.** An entity holds 16 slots of 512 numbers each, but they enter the result only through their mean, so the entity has exactly 512 degrees of freedom. Across 500 trained entities that is 256,000 numbers — against a nominal 145.8M.

**Chapter 1's central comparison was not fair; it was handicapped against me.** The two arms were equalized on *nominal* parameter count, and LoRA uses its 144.6M in full while the memory uses two tenths of one percent of its own. The memory nonetheless kept the specificity and the locality advantage. (Exact figures vary by run — Chapter 1 reports specificity 82.9% against 30.0% and edit damage 0.0 against 8.4 points; the run analysed here gives 83.1% against 32.9% and 0.0 against 20.2 points. The magnitudes move between runs, the ordering does not, and Chapter 1's caveat about unequal edit-step budgets applies to both.) I present this as a correction to my own framing rather than as a stronger claim: the honest statement is that the comparison gave the control arm a large head start and the control arm still lost on locality.

Because this diagnosis was obtained by reading a construction rather than by measuring it, it is now asserted by an automated check that runs on every invocation: with no gate, the spread of the memory's contribution across positions is exactly 0.0, and a complete change of surrounding context changes the output by exactly 0.0. A conclusion derived from reading has to be pinned by a test, or one day a context dependence appears, this chapter silently becomes false, and nobody notices.

## 3. Three cheap measurements that turned an observation into a mechanism

**Probability mass on the target value.** On the mention-carrying probe — archival prose in which the entity appears but its stored fact is irrelevant — the memory places **7.3%** of the entire probability mass on that entity's target value at every addressed position. The base model places **5.8 × 10⁻⁶**. A factor of about 12,500. The addition literally says "the next token is *Paris*", and it says it at every point in the span. On prose, where the next token is anything else, that is the ×314 perplexity.

**Norm of the addition against norm of the stream.** The ratio of the added vector's norm to the residual stream's norm at the graft layer was **1.02** in the then-current configuration: the memory writes into the stream a vector the size of the stream itself. The same quantity orders the slot-count series — 1.02 at sixteen slots per entity against 0.59 at one — and the text damage differs by a factor of twelve in the same direction.

The limit of that number has to be stated immediately, because I over-generalized it before checking. **It orders runs within a single graft depth, and not across depths.** At depth 0.15 the added norm is the largest measured anywhere (1.46) and the text damage is the smallest (+14.8%). On early blocks the residual stream is quieter to begin with, and thirty layers of frozen network remain downstream to absorb the perturbation; at two-thirds depth, twelve remain.

**One slot instead of sixteen.** Collapsing each entity to a single slot matched the sixteen-slot configuration on efficacy, generalization and specificity to three decimal places — confirming that the product-key machinery is dead in this regime. It did not match on two other axes, and both favour the single slot: the gap between correct and incorrect addressing widens (0.676 against 0.486), and the text damage is **twelve times smaller** (+1701% against +20250%), with the norm ratio at 0.59 against 1.02.

This last result has a practical consequence I want to state plainly, because it is the kind of thing a research programme normally refuses to admit. The reference implementation for further iteration does not need the product-key mechanism at all. It is an entity-indexed embedding table plus a shared projection — an order of magnitude simpler and faster — and the routing machinery returns if and only if addresses stop being supplied externally.

## 4. The prediction that failed

I had written, in the plan for these runs, that a particular arm *must* fail. The reasoning was: an anchor and a cross-entropy term have one and only one object of dispute, the entity's vector; quieter on prose means quieter in the answer position, because there is no other degree of freedom. Therefore an objective demanding "silent everywhere except in the answer" has no solution for a constant vector, and efficacy must collapse. I marked it explicitly as a falsifier: if efficacy does not collapse, the diagnosis is incomplete and the remaining waves must not be launched.

Efficacy did not collapse. Scoping the objective locally gave **0.982** — and whole-probe perplexity of **+16.9%**, against **+21,027,832%** for the same construction with no such term.

The error was a single unjustified step: from *the memory's reading does not depend on context* to *the memory's effect does not depend on context*. Between the graft layer and the model's output sits a third of a frozen network, and it is nonlinear. The same vector is processed differently depending on what surrounds it. A direction that is inert inside archival prose and decisive immediately after "The mother tongue of X is" exists — the previous objective simply never asked for one.

**What was binding was the formulation of the problem, not the architecture of reading.** I consider this the most useful result in the chapter, and it is the reason the earlier "the trade-off is inherent" claim had to go: I had twice concluded that a limit was structural when it was a limit of what I had asked for.

## 5. The factorial: which half does what

The gate and the locally scoped objective had been changed together, which meant neither could be attributed. Both missing cells were computed separately.

| | no anchor | anchor |
|---|---|---|
| **loss over the full string** | eff 1.000 · PPL +18205% | eff 0.692 · PPL +28.0% |
| **loss on the answer only** | eff 1.000 · PPL **+21,027,832%** | eff 0.982 · PPL **+16.9%** |

**The anchor is the only lever on the text axis.** Both cells containing it give tens of percent; both without it give tens of thousands, or twenty-one million.

**Answer-scoped loss rescues the fact from the anchor; it does not heal the prose.** Under a loss spread over the full string, the answer tokens are roughly four out of thirty — a twelfth of the gradient — and an anchor strong enough to hold the text simply drowns the fact, giving efficacy 0.692. Re-weighting returns the fact its share. On its own, without an anchor, the same re-weighting is **a thousand times worse**: mass on the target value rises to 0.35 and generalization rises to a *perfect* 1.000, because nothing survives except the instruction "emit this token", and it fires from anywhere.

A generalization score of exactly 1.000 is, in this construction, a symptom rather than an achievement. It is worth stating as a general caution about editing benchmarks: a metric that measures whether the edited value appears cannot distinguish a well-placed fact from an unconditional command to say it.

This forces a sign correction to my own diagnosis. Earlier in this work I asserted that a loss over the full string "literally teaches the memory to alter the distribution on prose". The sign is wrong. That loss was requiring the memory to remain **coherent** across the prefix and the prompt, and it was the only constraint — inadvertent, but real — holding it in place. The +20250% was not the result of training the memory to damage prose; it was the result of almost nothing preventing it.

**The gate closes only when there is something to close.** In three of the four cells it sat at 1.000, permanently open. It closed to 0.454 in exactly the cell where the vector is loud and there is a reason to be silent, and there it bought a further factor of 4.5 on text beyond what the anchor achieved. A conditional mechanism is worth its parameters only where an unconditional one is actually causing harm.

## 6. Graft depth: two-thirds was the worst of the five tested

With the address restricted to the name itself, the frozen network has to carry the fact from the name to the answer position, and how much network remains for that becomes the variable.

| depth | efficacy | generalization | whole-probe PPL | added-norm ratio |
|---|---:|---:|---:|---:|
| 0.15 | 0.942 | 0.881 | **+14.8%** | 1.462 |
| 0.25 | 0.938 | 0.871 | +41.3% | 0.581 |
| 0.40 | 0.956 | 0.891 | +225.4% | 0.645 |
| 0.55 | 0.942 | 0.868 | +57.0% | 0.697 |
| 0.66 | **0.412** | 0.380 | +5.3% | — |

Across the entire range 0.15–0.55 efficacy holds at 0.94–0.96; at 0.66 it falls by more than half. The break falls on blocks 20–24 of 36. The "two-thirds of depth" hypothesis had stood in this project from the beginning, was carried into Chapter 1 as a stated setting, and rested on a single measured value. Among five tested points it is **the worst**. No break has yet been found to the left.

What cannot be read from this table is the perplexity column: 15 → 41 → 225 → 57, without order. On a single seed that is scatter, not a curve, and ranking by it would repeat precisely the mistake of §1, where a sequence of that kind was taken for a shape. What is reliable here is the absence of any efficacy collapse up to 0.55 and its presence at 0.66.

I flag one interaction that this scan does not resolve: it was run under name-only addressing, where depth is predicted to matter, and a sticky address is predicted to be indifferent to it because the vector already stands in the answer position. Chapter 1's headline numbers were taken at 0.66 under a sticky address, and this table therefore does not invalidate them — but it does mean the graft depth used throughout this project is an inherited default that survived on one data point, and the two-thirds figure should be read as "what was used", not "what was chosen".

## 7. Anchor weight: the first three tenths do everything

| weight | efficacy | generalization | whole-probe PPL | added-norm ratio | mass on target |
|---:|---:|---:|---:|---:|---:|
| 0 | 1.000 | 1.000 | **+21,027,832%** | 1.024 | 0.3504 |
| 0.3 | 1.000 | 0.950 | +21.7% | 0.803 | 0.0049 |
| 1 | 0.982 | 0.882 | +16.9% | 0.683 | 0.0021 |
| 3 | 0.912 | 0.792 | +12.0% | 0.491 | 0.0005 |

Unlike the earlier sweep over the external anchor, this is a genuine curve: all five quantities move monotonically. But it is sharply asymmetric. **The first 0.3 is worth a factor of a million in perplexity and costs nothing in efficacy.** Beyond that it is an ordinary exchange — four to eight points of generalization per quarter of the text damage. There is very little here to tune: switching the anchor on matters enormously, and its exact setting does not.

Note also the last column, which is the same quantity as §3's diagnostic. Mass on the target value drops from 0.35 to 0.0049 across that first step. The mechanism identified by reading and the knob found by sweeping are measuring the same thing, which is the strongest evidence I have that the diagnosis is correct.

## 8. Where it landed, on two seeds

| | prior configuration | sticky, 0.66, one slot, anchor 0.3 | name-only, 0.15, one slot |
|---|---:|---:|---:|
| efficacy | 1.000 | **1.000 / 1.000** | 0.976 / 0.972 |
| generalization | 0.971 | 0.950 / 0.936 | 0.907 / 0.894 |
| specificity | 0.831 | 0.834 / 0.854 | 0.833 / 0.853 |
| gap between correct and wrong address | 0.486 | 0.788 / **0.804** | 0.818 / 0.792 |
| **whole-probe PPL** | **+20250%** | +20.1% / +20.4% | **+1.9% / +1.5%** |
| edit success | measurement was broken | **0.84 / 0.96** | 0.62 / 0.76 |
| collateral damage of edit | — | 0.0 / 0.0 pts | 0.0 / 0.0 pts |

One physically meaningful knob separates the two surviving configurations: the earlier the graft and the narrower the address, the more intact the text and the weaker the fact, the generalization and the edit. Both beat the prior configuration by three orders of magnitude on text, both reproduce across seeds, and **the zero collateral damage of Chapter 1 survives in both** — which is the result this chapter most needed not to break.

**Seed scatter was measured for the first time in this project, and it immediately cost me a claim.** Functional quantities repeat within a couple of points. Perplexity mostly repeats too — but not everywhere: one configuration gave +11.3% and +24.1% on two seeds. Differences in text damage smaller than a factor of two to three therefore cannot be ranked on a single seed, and my own earlier comparison within this chapter — that anchor weight 1 is cleaner than 0.3 — is withdrawn. What survives the scatter is the three-order-of-magnitude drop, and the statement that on the name-only branch the text is left essentially untouched.

One quantity has not been recovered. Generalization tops out at 0.950 against 0.971 for the untouched base. The anchor pays for it: it asks for silence at prompt positions, and in a paraphrase the mention sits exactly there. Silence on the prompt and transferability to a different phrasing are genuinely in conflict, and that is the next fork rather than a rounding error.

## 9. What is not the cause

Stated explicitly, so the search does not go where the light is.

- **Not the graft itself.** At unaddressed positions the output is identically zero, confirmed across all thirteen prior runs as +0.00%, not "approximately zero".
- **Not the addressing.** It is external, deterministic and verified: substituting the address destroys quality (a gap of 51.4 points), and surface-form collisions run at 118 in 8,000.
- **Not capacity.** 0.18% of nominal is in use.
- **Not slot crowding.** 99.0% / 99.7% / 100.0% for one, two and three facts written into the same slots (Chapter 1, §9).

## 10. Related work: this is a steering-vector result

The diagnosis in §2 moves this work, for the duration of this chapter, out of the memory-layer literature and into activation steering — and there the phenomenon I spent thirteen runs rediscovering is well documented.

*Activation Addition* (2023) established the basic move of adding a fixed direction to the residual stream at inference. The subsequent critical literature established its cost: *A Sober Look at Steering Vectors for LLMs* finds that steering degrades general capability, in some cases equivalently to halving pretraining compute, and raises perplexity on high-quality text; the mechanism given there is exactly the one I measured — if a vector raises the probability of some continuations it must lower others, and perplexity worsens across nearly all topics. *Minimizing Collateral Damage in Activation Steering* (2026) and *On the Effectiveness–Fluency Trade-Off in LLM Conditioning* (2026) both treat the trade-off as the central object, the latter finding that efficient conditioning methods routinely buy their effect at a steep price in fluency.

So the +20250% was not a bug I introduced. It is the known cost of constant-direction conditioning, arrived at from a different direction.

Where I think this chapter contributes something to that literature is the shape of the fix. The steering literature's answers to the trade-off are predominantly *conditional application*: SADI selects which components to steer per input, FASB uses probing classifiers to decide on the fly whether to intervene at all, Dynamic Activation Composition modulates intensity by an information-theoretic signal. All of these add a mechanism that decides *when*. My §5 factorial says that in this setting the decisive factor is not the mechanism but the **scope of the training objective** — restricting the supervision to the positions where the fact is actually wanted, and requiring agreement with the base model everywhere else in the same sequence, recovers six orders of magnitude at efficacy 0.982 with no conditional machinery at all. The gate, which is precisely a "decide when" mechanism, contributed a further 4.5× and only in the cell where the unconditional vector was still loud. Conditional application is a real gain, and in these measurements it is the second-order one.

Two boundaries on that claim. First, my setting differs from standard steering in that the direction is *learned per entity against a specific target*, not extracted from contrastive pairs, and it is applied under a deterministic address rather than globally — so the population of affected positions is known in advance, which is exactly what makes a locally scoped objective expressible. Second, the steering literature evaluates fluency and general capability broadly, whereas I evaluate a mention-carrying probe and the editing metric set; these do not measure the same thing and I do not claim the numbers transfer.

The connection also runs the other way, and I state it against my own interest: if what I have is a steering vector, then the strong locality result of Chapter 1 is partly a statement about steering vectors — a bank of per-entity directions, written under an external address with shared parameters frozen, is edit-isolated. That is a narrower and less novel claim than "an addressable memory", and it is the honest reading of the construction in its current regime.

## 11. What this does not show

1. **The depth scan was run under name-only addressing on one seed**, and its perplexity column is not rankable. The claim "0.66 is the worst of five" rests on the efficacy column alone.
2. **The two surviving configurations are not compared on equal footing to each other** across every axis; they differ in two variables at once (depth and address mode), and the intermediate cells are not filled.
3. **Generalization has not been recovered** to the base level, and the conflict causing it is identified but unresolved.
4. **Everything here is Qwen3-8B**, and the added-norm ratio is an absolute quantity calibrated to that model's activation scale. Nothing licenses transferring it.
5. **The steering-vector framing applies to the external-address regime**, which is the only regime this project currently uses. It would not apply if addresses were computed by a learned lookup — but Chapter 1 §10 explains why that route is presently closed.
6. **The most effective repair is a change to the training objective**, which means the earlier thirteen runs measured a construction that was not being asked the right question. Their absolute numbers are of historical interest only; what carries forward is the ordering between arms.

## 12. What this changes for the rest of the series

The chapter's practical output is a working point rather than a discovery, and two of its findings reshape what comes next.

The volume of the memory's addition is not an outcome of training — it is **a free parameter of the construction**, and it trades knowledge against text integrity directly. Chapter 3 has to choose it deliberately rather than inherit it, and choose it on the target domain rather than on counterfactual editing, where an edit must be loud enough to override a belief the model already holds. Writing an unknown API into a model may not require that.

And the reference construction for further work is now the simplest thing that reproduces these numbers, not the most elaborate. The routing mechanism returns when, and only when, addresses stop being supplied from outside.

Chapter 3 takes up incrementality: whether the pointwise locality of Chapter 1 survives a series of updates, which is the flagship claim of the whole line of work and is currently measured at a handful of waves rather than the twenty it needs.

## Methodological note on cost

This matters for the credibility of a solo, unfunded programme more than for the science. A full training run on Qwen3-8B is 7.8 minutes; a complete run including model load and all measurements is about twenty minutes, or roughly twenty-four cents on a rented L4. The twenty-five runs behind this chapter cost about six dollars of compute. The expense in this kind of work is not the GPU — it is the machine sitting idle between runs, which is why the runs are queued and the instance shuts itself down.

I mention it because the target user of this system is someone who cannot fine-tune. It would be incoherent to establish that by burning a cluster.

## Reproducibility and disclosure

As in Chapter 1: this is a preview of a closed project. Every measured number, every control, every failed prediction and every retraction is reported. The implementation is not — specifically, the form of the gate, the construction of the locally scoped objective, the addressing internals, and the code. The anchor weights and graft depths appear because they are the axes of the experiments and the results are meaningless without them; they are reported as findings, not as a recipe.

Nothing here is independently reproducible from this chapter alone. What it can do is state a result and its boundary precisely enough to be useful or to be disbelieved.

## Retractions in this chapter

Collected in one place, because a reader who has seen the earlier write-ups deserves them without hunting:

1. **"The fact/text trade-off is a property of the construction."** Withdrawn (§1). It rested on comparing perplexities computed over different token buckets with different base levels.
2. **"For a constant vector, 'quiet everywhere except the answer' has no solution, and efficacy must collapse."** Falsified by the first run that tested it (§4). Efficacy 0.982.
3. **"A loss over the full string teaches the memory to alter the distribution on prose."** Sign error (§5). That loss was the only thing constraining it.
4. **"Anchor weight 1 is cleaner than weight 0.3."** Withdrawn (§8), on the grounds of seed scatter measured after the claim was made.

## Funding and conflicts

No funding. No institutional affiliation. No revenue. Compute rented personally.

## References

- Turner et al., *Activation Addition: Steering Language Models Without Optimization*, 2023. arXiv:2308.10248
- Braun et al., *A Sober Look at Steering Vectors for LLMs*, 2025.
- *Minimizing Collateral Damage in Activation Steering*, 2026. arXiv:2605.01167
- *On the Effectiveness–Fluency Trade-Off in LLM Conditioning: A Systematic Study*, 2026. arXiv:2606.12234
- *Patterns and Mechanisms of Contrastive Activation Engineering*, 2025. arXiv:2505.03189
- *Interpretable Steering of Large Language Models with Feature Guided Activation Additions*, 2025. arXiv:2501.09929
- Lample et al., *Large Memory Layers with Product Keys*, 2019.
- Meta FAIR, *Memory Layers at Scale*, 2024. arXiv:2412.09764
- Meng et al., *Locating and Editing Factual Associations in GPT* (ROME), 2022.
- Zhong et al., *MQuAKE*, 2023.
