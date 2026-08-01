import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';

export const ResearchDocs: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState('ordo-m-spec');
  const [searchQuery, setSearchQuery] = useState('');

  const docsList = [
    {
      id: 'ordo-m-spec',
      title: 'Ordo-M: Parameter-Isolated Rewritable Memory Matrix for Frozen LLMs',
      category: 'Ordo-M Paper',
      date: '2026-08-01',
      summary: 'Mathematical formulation of Product-Key forward hooks at depth 0.66, SHA-256 entity canonical addressing, and residual stream injection.',
    },
    {
      id: 'lora-degradation',
      title: 'Comparative Evaluation of LoRA Side-Damage vs. Isolated Value Tables',
      category: 'Ordo-M Evaluation',
      date: '2026-07-31',
      summary: 'Empirical benchmark proving LoRA adapters suffer 8.4% collateral side-damage on neighbor facts, while Ordo-M preserves 0.0% side-damage.',
    },
    {
      id: 'context-rot-128k',
      title: 'OrdoGen: Empirical Measurement of Nominal vs. Functional Context Rot',
      category: 'OrdoGen Paper',
      date: '2026-08-01',
      summary: 'Analysis of the 128K context rot cliff, 24x evidence attention mass collapse, and exact 64K query relay replication on RTX A6000 clusters.',
    },
    {
      id: 'layer24-bottleneck',
      title: 'Causal Localization & Gold Evidence Steering in Layer 24',
      category: 'OrdoGen Intervention',
      date: '2026-08-01',
      summary: 'Per-head causal ablation (p=0.0078) and gold evidence head steering results (40/75 -> 49/75, p=0.0039) for trainable GQA block selection.',
    },
    {
      id: 'wave-finetuning',
      title: 'Incremental Wave Fine-Tuning Parity via Output Projection Calibration',
      category: 'Ordo-M Optimization',
      date: '2026-08-01',
      summary: 'Solving wave learning saturation by calibrating initial output projections, reaching 96.2% retention parity with full retraining.',
    },
    {
      id: 'hardware-benchmark',
      title: 'Hardware Resource Footprint: Int8 Quantization & NVMe/RAM Offloading',
      category: 'Hardware Benchmark',
      date: '2026-08-01',
      summary: 'Measuring VRAM consumption (0.0034 GB/1M params), 0ms inference overhead, and Int8 quantization stability across edit series.',
    },
  ];

  const filteredDocs = docsList.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="literature" className="py-20 relative bg-[#08090C] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">TECHNICAL LITERATURE HUB</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Peer-Reviewed Preprints & Experimental Papers
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#8A94A6] max-w-3xl mb-8 font-light leading-relaxed">
          Access research preprints, mathematical formulations, hardware benchmarks, and empirical ablation protocols across Ordo-M and OrdoGen research projects.
        </p>

        {/* Search Input */}
        <div className="mb-6 relative max-w-md">
          <Search className="w-4 h-4 text-[#8A94A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter research preprints & experimental logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0F1117] border border-[#1E2330] text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Reader Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar List */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border font-sans ${
                    isSelected
                      ? 'bg-[#0F1117] border-cyan-500/50 shadow-md'
                      : 'bg-[#08090C] border-[#1E2330] hover:bg-[#0F1117]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        doc.category.includes('Ordo-M')
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                          : 'bg-violet-950/80 text-violet-300 border border-violet-800/60'
                      }`}
                    >
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-[#475569] font-mono">{doc.date}</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-[#8A94A6] mt-1 line-clamp-2 font-light">
                    {doc.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Document Display Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#1E2330] bg-[#0B0D13]">
            {selectedDoc === 'ordo-m-spec' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-cyan-400">PAPER SPECIFICATION 15</span>
                  <h3 className="text-xl font-bold text-white mt-1">Ordo-M Architecture & Forward Hook Mechanics</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Ordo-M attaches a product-key external rewritable memory matrix directly to a frozen host LLM at network layer depth 0.66.
                  </p>

                  <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] font-mono text-xs space-y-2">
                    <div className="text-cyan-300">// Memory Address Slot Computation</div>
                    <div className="text-white font-semibold">{"a(s) = SHA256(Canonical(s)) mod N_SLOTS"}</div>
                    <div className="text-cyan-300">// Output Residual Projection</div>
                    <div className="text-white font-semibold">{"h_l <= h_l + W_out * Table[a(s)]"}</div>
                  </div>

                  <p>
                    Because W_out is initialized to zeros, the augmented network is byte-identical to the original base model prior to edit ingestion. Disabling the forward-hook restores baseline generation with zero latency overhead.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'lora-degradation' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-rose-400">RESEARCH LOG 09</span>
                  <h3 className="text-xl font-bold text-white mt-1">Comparative Evaluation: LoRA vs. Isolated Value Tables</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Low-Rank Adaptation (LoRA) updates low-rank parameter matrices A and B across attention layers. When updating 50 out of 500 facts in a documentation dataset:
                  </p>

                  <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] font-mono text-xs space-y-1">
                    <div className="text-rose-400 font-semibold">• LoRA Collateral Damage: 8.4% Neighbor Fact Degradation</div>
                    <div className="text-emerald-400 font-semibold">• Ordo-M Collateral Damage: 0.0% (Pristine Retention)</div>
                  </div>

                  <p>
                    This empirical finding resulted in closing the domain LoRA adaptation track on 2026-07-31 in favor of parameter-isolated value tables.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'context-rot-128k' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-violet-400">DOC 13 • CONTEXT ROT EVALUATION</span>
                  <h3 className="text-xl font-bold text-white mt-1">OrdoGen: Nominal vs. Functional Context Rot at 128K Tokens</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Evaluation on dual RTX A6000 nodes demonstrated that plain 128K context windows suffer a 24x drop in evidence attention mass, yielding 0/15 exact retrieval scores.
                  </p>
                  <p>
                    Conversely, answer-free semantic query relays achieve exact 64K retrieval replication at 4.2% latency overhead (p=0.0156).
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'layer24-bottleneck' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-emerald-400">DOC 16 • CAUSAL INTERVENTION</span>
                  <h3 className="text-xl font-bold text-white mt-1">Causal Localization & Gold Evidence Steering in Layer 24</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Per-head attention ablation identified Layer 24 as the causal bottleneck for retrieval (32/45 -&gt; 24/45, p=0.0078).
                  </p>
                  <p>
                    Oracle gold evidence head steering on post-freeze plain cases boosted retrieval performance from <strong className="text-emerald-400 font-mono">40/75 to 49/75 (p=0.0039)</strong> with zero regressions on control cases.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'wave-finetuning' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-violet-400">DOC 11 • OPTIMIZATION LOG</span>
                  <h3 className="text-xl font-bold text-white mt-1">Incremental Wave Fine-Tuning Parity</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Late wave learning saturation (29.5% retention) was traced to initial output projection scaling. Calibrating W_out on 500 records prior to freezing restored wave retention to <strong className="text-violet-300 font-mono">96.2% parity with full retraining</strong> (45s per wave vs 75s+ full retrain).
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'hardware-benchmark' && (
              <div className="space-y-5">
                <div className="border-b border-[#1E2330] pb-3">
                  <span className="text-xs font-mono text-cyan-400">RESEARCH LOG 10 • HARDWARE FOOTPRINT</span>
                  <h3 className="text-xl font-bold text-white mt-1">Hardware Footprint & Quantization Stability</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-3 font-light">
                  <p>
                    Inference memory footprint requires only 0.0034 GB per 1M parameters. Offloading memory value tables to host system RAM or NVMe storage preserves 0.98x baseline token generation speed.
                  </p>
                  <p>
                    Int8 quantization preserves full edit series, whereas Int4 quantization degrades update retention. Int8 is recommended for production deployment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
