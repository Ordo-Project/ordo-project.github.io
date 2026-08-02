# Grafting an Addressable Memory onto a Frozen LLM: Zero Collateral Damage in Pointwise Edits, and Exactly Where the Addressing Breaks

**Ordo-M Technical Report, Chapter 1**

Independent research, single author, unfunded. Measurement cutoff: 2026-08-02.

---

## Abstract

I attach a sparse, externally addressed memory module to an off-the-shelf language model whose weights are never modified, and I measure what happens when a single fact in that memory is overwritten. On CounterFact with Qwen3-8B, editing 50 facts out of 500 damages **0.0 percentage points** of the remaining 450, while a LoRA adapter of matched parameter capacity (144.6M vs 145.8M) damages **8.4 points** on the same data with the same evaluation code. Specificity on neighborhood prompts holds at 82.9% for the memory against a 83.6% pre-edit baseline, and collapses to 30.0% for LoRA. On MQuAKE multi-hop questions the edited fact changes the outcome of the reasoning chain by +29.6 points where the question names the edited entity, and by −0.2 points where it does not.

That last pair of numbers is the point of this report as much as the first. The memory computes its address from an explicit surface mention of the entity; where no mention exists, it returns exactly zero, and the measured gain is exactly zero. This is a property of the construction rather than an outcome of training, and I show that the headroom it leaves is large: supplying the address externally on the same indirect questions recovers **+37.0 points**. I also report the failed route to closing that gap — addressing from the model's own hidden state is not viable, because at the depth where the memory is read the identity of the entity is no longer present in the residual stream (top-1 recovery 0.003 against 0.694 measured on the name token itself).

Three of the first four experimental runs of this project produced zero, and I report them in full, including two defects in my own measurement harness that would each have been publishable as a success. This is a preview of a closed project: I give every measured number and the reasoning behind every design decision, and I withhold implementation.

---

## 1. Why this problem

There is a class of user for whom fine-tuning does not exist. A company that wants its internal wiki inside an assistant, or a developer who wants a code agent that knows the current version of a library, needs a model in the 27B class and above to be useful, and has a bench of one or two consumer GPUs. Training such a model is not a budget question for them; it is an infrastructure question they cannot answer.

The two available answers are both compromises. Retrieval-augmented generation puts the knowledge into the context window, which costs a retrieval hop on every query, spends context that the task needs, and — as recent work on knowledge conflict shows — produces unpredictable output when the retrieved passage contradicts what the model already believes. Parameter-efficient fine-tuning puts the knowledge into the weights, but a low-rank adapter is a **dense operator**: it multiplies against activations for every token, and it is updated only as a whole. When the documentation changes, you retrain the adapter on the delta and you find out what happened to everything else by running the entire evaluation again.

The requirement I set was narrower than "make the model learn documentation". It was:

> Write knowledge into a frozen model such that updating one item provably does not disturb the others.

If that holds, a new version of a corpus can be written over the old one without re-verifying the rest. If it does not hold, the product does not exist regardless of how well the knowledge is learned in the first place.

## 2. What is being tested, and what counts as failure

The construction is a table of trainable value slots inserted into the forward pass of a frozen transformer at roughly two-thirds of its depth, read by a deterministic address computed from the entity name found in the text. The base model is not modified in any way: no weights, no class substitution, no patching. The module can be disabled in place, which matters for measurement — without it, a regression test would have to compare two separate model loads and would pick up differences that have nothing to do with the memory.

Three questions, each with its own number and its own failure mode:

| | Question | Failure means |
|---|---|---|
| **A** | Does the memory learn anything at all? | Gradient does not reach it, or capacity is absent |
| **B** | Is the base model still intact? | The memory smears across all behavior instead of adding to it |
| **C** | **Is the stored knowledge addressable?** | The only reason the project exists is not satisfied |

A and B are necessary conditions. C is the thesis. A "no" on C closes the line of work in weeks instead of months, and that is an acceptable outcome, not a defeat.

An important framing note that shaped everything downstream: memory layers in the literature are introduced **during pretraining**. The network grows around the memory and learns to use it. Here the base is finished and frozen. The question is whether a frozen network can learn to read a module that did not exist when it was trained — when the only thing that learns is the module itself.

## 3. Setup

- **Base model:** Qwen3-8B, official safetensors weights, frozen throughout. Earlier pilots on Qwen3-0.6B.
- **Hardware:** NVIDIA L4 24GB (GCP) for the main runs, RTX 4090 (rented) for later series, MacBook Pro M1 8GB for offline development and mechanism self-tests.
- **Datasets:** CounterFact (21,919 records) and MQuAKE-CF-3k (3,000). Chosen not for realism but because CounterFact's structure mirrors the metrics I needed as a built-in test — `requested_rewrite` for injection, `paraphrase_prompts` for generalization to unseen phrasings, `neighborhood_prompts` for collateral damage, `generation_prompts` for application — and because the resulting numbers are comparable to the ROME/MEMIT line of work.
- **Control arm:** LoRA of matched capacity. The rank is not chosen, it is computed: the actual parameter count of the memory configuration divided by the summed input and output dimensions of the target layers, giving rank 53 and 144.6M trainable parameters against the memory's 145.8M. Both arms are scored by **the same evaluation code**; a separate path for the adapter would have been tempting, since it needs no address, but then any difference in padding or answer-boundary handling would land in the gap between arms and read as an architectural difference.
- **Metric:** length-normalized log-probability comparison between the two candidate answers, as in the editing literature — an order of magnitude cheaper than generation and independent of how the model chooses to format its output. Greedy generation is also reported on one prompt set, so the numbers reconcile with the earlier oracle runs.

## 4. The first three runs returned zero, and the zeros were the useful part

### 4.1 Run 1: the memory learned the prior, not the facts

Qwen3-0.6B, 200 synthetic facts about invented entities, 900 steps, 49 minutes on a laptop. Loss fell from 5.97 to 1.15. Read naively, the result looks like a success — recall on the training facts went from 1.0% to 20.0%.

| Metric | Before | After | Expected |
|---|---:|---:|---|
| recall, **train** | 1.0% | **20.0%** | increase |
| recall, **control** (same generator, never shown) | 2.0% | **16.0%** | unchanged |
| recall, **negative** (non-existent subjects) | 4.0% | **20.0%** | unchanged |
| perplexity, neutral text | 28.5 | **1154.9** | unchanged |
| KL divergence to base | 0.0000 | **3.79** | ≈ 0 |
| slot occupancy | 87.0% | **18.1%** | ≥ 87% |
| slot overlap between facts | 0.27 | **0.68** | ≤ 0.27 |

The control and negative sets rose almost as much as the training set. What was learned is "in a prompt of this shape, name a plausible technical value" — a prior over answers, not a set of facts. Without the control and negative sets this would have been reported as 1% → 20%. They exist for exactly this case.

The base was also destroyed: perplexity on neutral text rose forty-fold. A regression of that size means the memory is not adding to the model, it is overriding it.

The mechanistic cause is in the last two rows. Occupancy fell from 87% to 18%, overlap between facts rose from 0.27 to 0.68 — **the addressing collapsed**. All facts read mostly the same slots, so the memory physically cannot hold them separately; it retains one degree of freedom, a single direction added to everything. This is a known disease: key-usage collapse in product-key memory, router degeneration in mixture-of-experts.

### 4.2 The fix worked on its target and the hypothesis still failed

Three mechanisms were added against three named causes: query normalization against collapse, a load-balancing penalty against concentration of lookups, and a KL anchor to the base on neutral text against regression. The anchor text is held in a **separate file** from the probe text used for measurement; anchoring on the measurement text is training on the test, and the regression figure would have been zero by construction and meaningless.

Repeated on Qwen3-8B, with a no-mechanism control run first to confirm that the failure was not an artifact of the 0.6B model:

| | control | + three mechanisms |
|---|---|---|
| recall train / control / negative | 16.2 / **17.3** / 12.0% | 15.3 / **16.3** / 13.3% |
| perplexity, neutral text | 12.78 → **4029** | 12.78 → **13.72** |
| slot occupancy | 57.7% → **4.6%** | 99.2% → **38.0%** |
| slot overlap between facts | 0.12 → **0.667** | 0.16 → **0.298** |

The failure reproduced at 8B, so it was not a small-model artifact. The three mechanisms hit their targets precisely — base regression fell from ×315 to +7.4%, collapse was prevented — **and the fact-learning hypothesis still failed by the same numbers**. Which means the collapse explanation described a symptom.

### 4.3 The actual cause: writing to one address and reading from another

The diagnostic that did not exist in the harness was the one that mattered. Slot-signature overlap was computed **between different facts**. But memory is written at an address derived from a training template and read at an address derived from an evaluation template, and whether those two addresses coincide had never been checked. The measurement requires no training:

```
one fact, two training templates        0.203
one fact, training ↔ evaluation         0.184   ← the write→read path
different facts, evaluation template    0.360   ← the "random" level
```

Overlap between *different facts* is **higher** than overlap for the *same fact* across templates. Addressing was determined by the shape of the phrase, not by the entity. There was no connected write→read path, and therefore the central question of the project had not been tested by any of the three runs.

**This is the single most useful result in the chapter.** A construction can fail silently for reasons entirely outside the hypothesis under test, and the only defense is a diagnostic that measures the plumbing rather than the outcome.

## 5. Reading exists: the oracle control

The decisive experiment does not compare before and after. It swaps the address on a single fixed prompt, holding weights, text, and everything else constant, and asks whether the answer follows the address.

With the address supplied externally from the entity name, and only the value slots trained:

```
recall, own address       89.0%       recall, control set       1.5%
recall, foreign address    2.2%       recall, memory disabled   1.2%
```

**A frozen network can read a memory module grafted into it after training, and the contents are addressable in the strict sense.** Reproduced three times with gaps of +86.8, +87.0 and +86.8 points. Every prior failure was a defect in learned addressing, not a property of the architecture.

The oracle was built as a debugging tool and turned out to be the architecture. If the address is computed from the entity name by a deterministic function rather than by a learned lookup, the storage remains parametric, the memory is editable by key, and on text containing no known entity it stays silent — so base regression is zero by construction rather than by the size of a penalty term. The open question moves from "does this work" to **"how do you compute the address on real text"**.

## 6. Where isolation leaks, and the rule that follows

Overwrite 50 facts out of 500 and look at the other 450.

| | shared output projection trainable | frozen |
|---|---:|---:|
| new value | 98.0% | 98.0% |
| old value | 0.0% | 0.0% |
| remaining facts | 88.9% → **58.4%** | 88.2% → **88.2%** |
| **collateral damage** | **30.4 pts** | **0.0 pts** |

Slot collisions were 1.6%, so the storage was already disjoint — and the damage was still 30 points. It leaked through the **shared output projection**, which sits on the read path of every fact and, during an edit, re-fits itself to the 50 targets at the expense of the rest. Freezing everything shared removes the damage entirely without degrading the edit.

> **The rule, and it generalizes beyond this project: isolation of storage is worth nothing as long as one parameter on the read path is both shared and trainable.**

## 7. The main comparison: memory against LoRA of matched capacity

"An attached memory works" means nothing on its own — it might work exactly as well as any adapter of the same size. The only interesting question is whether the memory does something the adapter cannot, and the answer lives in the locality of the edit.

Both arms, 500 CounterFact records, override regime, same evaluation code, Qwen3-8B on L4:

| | Ordo-M | LoRA |
|---|---:|---:|
| trainable parameters | 145.8M | 144.6M (rank 53) |
| efficacy | **100.0%** | **100.0%** |
| generalization (paraphrase) | **97.2%** | 92.4% |
| specificity, before → after | 83.6% → **82.9%** | 83.6% → **30.0%** |
| greedy generation | 99.8% | 100.0% |
| perplexity, module on / off | 26.40 / 26.40 | 344.91 / 26.36 |
| **damage to the other 450 when 50 are edited** | **0.0 pts** | **8.4 pts** |

LoRA is not undertrained — its edit loss fell from 2.79 to 0.02 and it took the new values in 100% of cases. The difference sits precisely on the claimed property: a dense adapter has no isolated address, whereas the memory, with shared parameters frozen, changes only the target slots.

A separate control that matters for the specificity row: the entity registry is built over **all 20,391** entities in the dataset while only 500 are trained. A neighborhood prompt therefore lands in the slots of a registered but untrained entity — random initialization — and the specificity check tests something real. Had the registry known only the trained entities, such prompts would find no address, the memory would be silent by construction, and there would be nothing to check.

### 7.1 Two defects in my own harness, found after the fact

Neither of these changes the locality conclusion, and both would have inflated a different claim.

**The override regime made one number tautological.** In override, the edit rewrites toward the value the base model already believes: with the memory disabled the base prefers it in **87.8%** of cases. The edit produced 88.0%. That is the same level, and "the memory wrote the new value" is indistinguishable from "the memory stopped asserting the old one, and then the base spoke."

| | base, memory off | after edit | what can be claimed |
|---|---:|---:|---|
| override, memory | 87.8% | 88.0% | old value removed; says nothing about writing |
| override, LoRA | 87.8% | 100.0% | above baseline — new value written |
| injection, memory | 1.6% | 0.0% | nowhere to retreat, and no write occurred |

The working hypothesis this leaves is that **an edit restricted to value slots can erase but not write**. For locality that is sufficient — erasure must also be addressable, and it is. For "updatable memory" it is not, and it is the subject of a later chapter. A `base_off` control now prints alongside every edit result so the substitution cannot recur.

**The edit budgets were not equal.** The budget was specified in epochs, and the number of steps depends on batch size: 120 steps for the memory, **390** for LoRA. A comment in the configuration asserted they were equal. The 8.4-point figure was therefore obtained at roughly three times the budget of the 0.0-point figure, and until it is re-shot it must be read with that qualification. Both arms are now driven by an explicit step budget.

I keep both of these in the report rather than in a footnote because a locality claim is exactly the kind of claim that a favorable measurement bug produces for free.

## 8. Application, not recitation: MQuAKE

Asking about a fact with the same prompt used to write it measures string recall. MQuAKE asks a question requiring a chain of reasoning, with the edit placed on one link of the chain. Two buckets, scored separately:

| bucket | what it is | expectation |
|---|---|---|
| `addressable` | the edited subject is named verbatim in the question (≈39%) | addressing must work |
| `indirect` | it is not named; the edit sits off the first link | zero gain |

On 300 cases with a single edit:

| | before | after |
|---|---:|---:|
| hop-1, the fact itself | 11.3% | **100.0%** |
| `addressable` | 35.3% | **65.0%** |
| `indirect` | 19.9% | 19.7% |

On addressable questions the fact is not merely reproduced, it changes the outcome of the chain: **+29.6 points**. On indirect questions the gain is **−0.2 points**. Averaging the two buckets would have yielded a cheerful single number and destroyed the information: the measured boundary coincides exactly with the boundary of symbolic addressing by explicit mention.

The dataset itself sets that boundary. In CounterFact the subject appears verbatim in **all 43,838** paraphrase prompts, so substring matching covers the set entirely and that bench tests the plumbing rather than the hard part of addressing. In MQuAKE the edited subject appears in the multi-hop question in only **39.4%** of cases. This is not a defect of the dataset; it is the limit of applicability, and it should be measured rather than papered over.

## 9. Slot crowding: the cost of "address by entity" turned out to be zero

Addressing by subject rather than by fact means every fact about one entity writes into the same slots and competes for them. This caveat stood in my notes from day one. It is not true.

The comparison uses one population and one training run: 687 two-fact subjects (after discarding 353 whose two records share a relation — those are not two facts but two incompatible answers) split in half, one half trained on a single fact, the other on both, comparing the first fact of each half.

| group | efficacy before | efficacy after | logP gap | generalization |
|---|---:|---:|---:|---:|
| one fact (n=300) | 12.3% | 99.0% | +8.14 | 96.3% |
| two facts, same slots (n=300) | 11.7% | **99.7%** | +9.26 | 95.8% |
| three facts (n=31) | 9.7% | **100.0%** | +11.09 | 100.0% |

No gap, and the log-probability margin is *larger* in the crowded groups. The likely explanation is a division of labor: the memory supplies one averaged vector for the entity, and the frozen network distinguishes among that entity's facts using the relation named in the prompt. Storage does not have to be per-fact if the query context already separates the facts. That is an argument for the construction, not against it.

A four-times wider address is strictly worse on every axis:

| | 16 slots | 64 slots |
|---|---:|---:|
| efficacy, one fact | **99.0%** | 95.3% |
| efficacy, two facts | **99.7%** | 97.7% |
| generalization, one fact | **96.3%** | 88.8% |
| perplexity on mentions of *untrained* entities | **+1.36%** | +10.90% |

Reading is a uniform average over the entity's slots, so at 64 slots each value enters at weight 1/64 instead of 1/16. For the same number of steps the signal is diluted fourfold, the shared output projection compensates by amplifying, and an amplified projection also drags the random initialization of untrained entities into the residual stream. Hence the last row. Sixteen slots is not "enough for now" — it is better than more.

## 10. Where the addressing genuinely stops

Three failure modes in surface matching were found by measurement on real data, each silent, each worth a point or two, each easily written off as "the data is like that": possessive forms gluing a name to its apostrophe; a trailing period in a canonical key that a text slice never reaches; and a common noun registered as an entity, which the sticky address then jumped to. After fixing them, the subject is located in 100.0% of write prompts, paraphrases and generation prompts; neighborhood prompts find no address 76.1% of the time and a foreign registered entity 23.9% of the time.

One defect deserves its own paragraph, because it repeats the central error of the project. During training the address was computed over the **entire** training text, answer included — and 40.7% of CounterFact target values are themselves registered entities. The sticky address jumped to the answer, and the fact was written into the answer's slots and read from the subject's. Measured: **37.6% of training texts landed on the wrong address.** After the fix, 0.00%.

> A counter for "address not on the intended subject" belongs in the log permanently. This class of failure raises no exception and produces no loss spike — only a quiet zero on the metric, which is subsequently explained by the architecture.

And the real boundary, the one that is a property of the design rather than a bug:

- Where the entity is not mentioned, no address is computed and the memory returns exactly zero.
- Supplying the address externally on the indirect MQuAKE bucket recovers **+37.0 points**. So the ceiling is known and the bottleneck is the address computation, not the reading. (Caveat found inside that measurement and worth stating: in 60.7% of indirect questions the edited target value coincides with the chain's answer, which makes part of that bucket tautological.)
- **Computing the address from the model's own hidden state is closed as a general solution.** At the depth where the memory is read, the identity of the entity is no longer recoverable from the residual stream: top-1 recovery 0.003, against 0.694 measured on the name token itself. The precise claim is narrower than "the information is gone": 0.003 means it is not present *in the same form*, so a learned mapping between positions is not ruled out — but the cheap version, decoding the identity directly where the memory reads, does not exist.
- For code and documentation this does not bite. A symbol name and a file path repeat verbatim, so a hash of the string is a sufficient address, and the open vocabulary comes free. For prose it bites, and that is a separate chapter.

## 11. Related work and where this sits

**Memory layers.** *Memory Layers at Scale* (Meta FAIR, 2024) is where the mechanism comes from — trainable key-value lookup that adds parameters without adding FLOPs, scaled to 128B memory parameters, with gains most pronounced on factual tasks. The critical difference is that memory layers are introduced **at pretraining time**. Whether one can be attached to a finished frozen model was, at the start of this project, unresolved; §5 answers it affirmatively.

**Sparse memory finetuning.** The closest existing work is the *Continual Learning via Sparse Memory Finetuning* line (Meta, 2025) and its 2026 follow-ups, which insert key-value memory layers and, on each step, train only the value rows the current batch reads most heavily, ranked by TF-IDF or KL. Reported forgetting is dramatically better than the alternatives — an 11% relative drop on NaturalQuestions against 71% for LoRA and 89% for full fine-tuning at comparable acquisition of new knowledge.

The difference is in where the isolation comes from, and it is the difference between statistical and structural. There, the set of rows to update is *inferred* from activation statistics, so isolation is very good but approximate. Here the address is a **deterministic function of a string that exists in the source**, so the set of touched slots is known before the forward pass and disjointness is decidable rather than measured. That is what buys the 0.0 rather than a small number, and what makes an update auditable — you can state which slots an update will touch before running it. The price is stated plainly in §10: no mention, no address, no memory. Sparse memory finetuning has no such blind spot, because its addressing is content-based. **The two numbers are not directly comparable** — different benchmarks, different forgetting probes — and I present this as a difference in construction, not as a win.

**Knowledge injection into frozen models.** *TokenMem* (2026) injects knowledge into frozen LLMs through a dedicated cross-attention channel specifically to avoid competing with parametric memory in the residual stream, training a small gating adapter and reporting large gains in compliance with counterfactual knowledge over vanilla RAG. It shares my premise — the base stays frozen, the knowledge lives outside it — and differs in the channel: cross-attention over retrieved tokens against a direct residual-stream addition read by symbolic address. *Memory Grafting* (2026) uses frozen hidden states as n-gram memory retrieved by longest-match exact lookup, which is architecturally the closest thing to my addressing scheme that I am aware of, though aimed at pretraining efficiency rather than at updatability.

**Model editing.** ROME and MEMIT define the metric set I report against. The active problem in that literature is precisely sequential degradation — recent surveys and benchmarks find that edit success, locality and portability all degrade under long edit sequences across essentially all methods, which is what the 2026 crop of sequential-editing methods is built to postpone. My claim in this chapter is narrower and structurally different: not that degradation is slow, but that for a single pointwise edit it is absent, because the edit does not touch the parameters that carry the other facts. Whether that survives twenty sequential updates is Chapter 3, and I do not claim it here.

**LoRA.** *LoRA Learns Less and Forgets Less* (TMLR 2024) sets the rank/forgetting tradeoff that the control arm is configured against, and is the reason the control uses rank 53 rather than the conventional 8–16. It also predicts the shape of the result I got: the adapter learns the edit perfectly and disturbs more of its surroundings.

**Capacity.** *Knowledge Capacity Scaling Laws* (ICLR 2025) puts the ceiling at roughly 2 bits of knowledge per parameter and shows int8 quantization does not lower it while int4 does. This is why I do not pursue "forget something to make room": there is no capacity shortage to relieve.

## 12. What this does not show

An honest list, so the result is not read for more than it is.

1. **Benchmark facts are not documentation.** CounterFact and MQuAKE are more realistic than synthetic triples and still do not test a coherent API surface, code examples, or contradictions between versions.
2. **Crowding is verified only to three facts per entity**, and only 31 subjects at three. An API symbol has dozens of facts — signature, return value, exceptions, defaults, deprecation, examples — and where the limit falls is unknown.
3. **Indirect addressing is unsolved, and its ceiling is now measured.** +37.0 points of headroom, with the hidden-state route closed.
4. **The baseline comparison is incomplete.** A global LoRA of matched capacity has been run. Routed LoRA, a keyed soft prompt and a codebook baseline have not, and without them the effect of the gate is not separated from the effect of the storage.
5. **One model size, one graft depth, one seed.** Everything substantive is Qwen3-8B at 0.66 depth. The positioning of the project is 27B and above, and between those two statements there is currently nothing.
6. **The 8.4-point LoRA figure carries the budget qualification of §7.1** until it is re-shot at an equal step budget.
7. **The repeated edit on the injection set did not converge.** Injecting 62 previously unknown facts works — efficacy 1.6% → 100%, generalization 30.6% → 91.9%, greedy generation 93.5% against 0% with the memory disabled and 6.5% at a foreign address — but updating half of that small sample requires a separately tuned regime. This is an open result, not a success.

## 13. What comes next

The chapters that follow this one, in the order the measurements exist:

- **Chapter 2 — why the memory damages text where it fires, and what the volume knob actually trades.** The regression probe had to be rebuilt: on the project's neutral corpus 0.0% of tokens are addressed, so equality with the base follows from the construction and proves nothing. A probe carrying entity mentions addresses 93% of tokens and tells a different story.
- **Chapter 3 — incrementality.** Whether pointwise locality survives a series of updates, which is the flagship claim of the product and is currently measured at a handful of waves rather than the twenty it needs.
- **Chapter 4 — the price in hardware.** Training cost against corpus volume, VRAM, quantization, and whether the table can live outside the GPU.
- **Chapter 5 — the first real domain, and the bar set by RAG.** A real library, a generated and audited question set, and a row of five retrievers with an oracle ceiling. I will state in advance what this chapter already knows: the base model does not know the domain at all, any retriever takes 38–40 points of the gap, and **symbolic addressing measured as a retriever currently loses to plain BM25**. The threshold the memory has to clear is a specific number, and whether it clears it is not yet decided.

## Reproducibility and disclosure

This is a preview of a closed project. Every measured number, every control, every failed run and every defect found in my own harness is reported here. The implementation — the addressing scheme's internals, the ingestion component, hyperparameters and code — is not. Public artifacts are the datasets, which are third-party and cited, and the base model, which is publicly released.

I state this plainly because it is a real limitation: nothing in this chapter is independently reproducible from the chapter alone. What it can do is state a result and its boundary precisely enough that someone can decide whether the boundary matters to them.

## Funding and conflicts

No funding. No institutional affiliation. No revenue. Compute was rented personally: the main runs cost single-digit dollars — one full run on an L4 spot instance is roughly twenty minutes and about twenty-four cents.

## References

- Lample et al., *Large Memory Layers with Product Keys*, 2019.
- Meta FAIR, *Memory Layers at Scale*, 2024. arXiv:2412.09764
- Meta, *Continual Learning via Sparse Memory Finetuning*, 2025. arXiv:2510.15103; and *Sparse Memory Finetuning as a Low-Forgetting Alternative to LoRA and Full Finetuning*, 2026. arXiv:2605.03229
- *TokenMem: Faithful Knowledge Injection for Frozen LLMs*, 2026. arXiv:2607.22625
- *Memory Grafting: Scaling Language Model Pre-training via Offline Conditional Memory*, 2026. arXiv:2605.20948
- Meng et al., *Locating and Editing Factual Associations in GPT* (ROME), 2022; *Mass-Editing Memory in a Transformer* (MEMIT), 2023.
- Zhong et al., *MQuAKE: Assessing Knowledge Editing in Language Models via Multi-Hop Questions*, 2023.
- Biderman et al., *LoRA Learns Less and Forgets Less*, TMLR 2024. arXiv:2405.09673
- Allen-Zhu & Li, *Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws*, ICLR 2025. arXiv:2404.05405
- Yang et al., *Synthetic Continued Pretraining* (EntiGraph), ICLR 2025. arXiv:2409.07431
