import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';

export const ResearchDocs: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState('ordo-m-design');
  const [searchQuery, setSearchQuery] = useState('');

  const docsList = [
    {
      id: 'ordo-m-design',
      title: 'Ordo-M Architecture & Hook Specifications',
      category: 'Ordo-M',
      date: '2026-08-01',
      summary: 'Detailed design of Product-Key memory forward hooks, SHA-256 entity canonical addressing, and residual stream injection at layer 0.66.',
    },
    {
      id: 'why-not-lora',
      title: 'Why Not LoRA: Collateral Damage & Memory Locality',
      category: 'Ordo-M',
      date: '2026-07-31',
      summary: 'Comparative study proving LoRA adapters suffer 8.4% collateral side damage on updates, whereas Ordo-M maintains 0.0% side damage.',
    },
    {
      id: 'context-rot-analysis',
      title: 'OrdoGen: Nominal vs Functional Context Rot',
      category: 'OrdoGen',
      date: '2026-08-01',
      summary: 'Empirical measurement of 128K context rot cliff, 24× evidence attention mass drop, and exact 64K retrieval relay replication.',
    },
    {
      id: 'retrieval-bottleneck',
      title: 'Layer 24 Retrieval Bottleneck & Head Steering',
      category: 'OrdoGen',
      date: '2026-08-01',
      summary: 'Per-head causal ablation and gold evidence steering results (40/75 → 49/75, p=0.0039) for trainable GQA block selectors.',
    },
  ];

  const filteredDocs = docsList.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="docs" className="py-20 relative bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">RESEARCH HUB & PAPERS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Technical Documentation
            </h2>
          </div>
        </div>

        <p className="text-base text-[#8A94A6] max-w-3xl mb-8 font-light">
          Browse experimental logs, mathematical formulations, hardware benchmarks, and architectural design choices for Ordo-M and OrdoGen.
        </p>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md">
          <Search className="w-4 h-4 text-[#8A94A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers, benchmarks, equations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F1117] border border-[#1E2330] text-xs font-sans text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Reader Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar List */}
          <div className="lg:col-span-4 space-y-3">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#0F1117] border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                      : 'bg-[#08090C] border-[#1E2330] hover:bg-[#0F1117]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        doc.category === 'Ordo-M'
                          ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/50'
                          : 'bg-violet-950/80 text-violet-400 border border-violet-800/50'
                      }`}
                    >
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-[#475569] font-mono">{doc.date}</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-[#8A94A6] mt-1.5 line-clamp-2 font-light">
                    {doc.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Document Content Reader */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
            {selectedDoc === 'ordo-m-design' && (
              <div className="space-y-6">
                <div className="border-b border-[#1E2330] pb-4">
                  <span className="text-xs font-mono text-cyan-400">DOC 15 • TECHNICAL SPECIFICATION</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Ordo-M Architecture & Hook Mechanism</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-4 font-light">
                  <p>
                    Ordo-M introduces product-key memory attached via forward hook into residual stream blocks at <strong className="text-white">layer depth 0.66</strong> (e.g. Layer 21 in Qwen3-8B).
                  </p>
                  <div className="p-4 rounded-2xl bg-[#08090C] border border-[#1E2330] font-mono text-xs space-y-2">
                    <div className="text-cyan-300">// Memory Address Function</div>
                    <div className="text-white">address = SHA256(canonical_entity_name)</div>
                    <div className="text-cyan-300">// Hook Output Projection</div>
                    <div className="text-white">hidden_state += out_proj(memory_table[address])</div>
                  </div>
                  <p>
                    Because <code className="text-cyan-300 font-mono">out_proj</code> is initialized to zero vectors, the network remains <strong className="text-white font-mono">100% byte-identical</strong> to base model checkpoint at initialization. Disabling the hook restores exact base model behavior on the fly.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'why-not-lora' && (
              <div className="space-y-6">
                <div className="border-b border-[#1E2330] pb-4">
                  <span className="text-xs font-mono text-rose-400">RESEARCH LOG 09 • COMPARATIVE EVAL</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Why Not LoRA: Locality & Side-Damage Analysis</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-4 font-light">
                  <p>
                    Fine-tuning via Low-Rank Adaptation (LoRA) modifies shared parameter matrices. When updating 50 out of 500 facts in a documentation domain:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-white">
                    <li><strong className="text-rose-400 font-mono">LoRA:</strong> Suffers 8.4% degradation on untouched neighboring knowledge.</li>
                    <li><strong className="text-emerald-400 font-mono">Ordo-M:</strong> Maintains 0.0% collateral side-damage.</li>
                  </ul>
                  <p>
                    This empirical measurement led to closing the domain LoRA pipeline track on 2026-07-31 in favor of external memory tables.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'context-rot-analysis' && (
              <div className="space-y-6">
                <div className="border-b border-[#1E2330] pb-4">
                  <span className="text-xs font-mono text-violet-400">DOC 13 • GPU.AI PACKET</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Context Rot: Nominal vs Functional Window</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-4 font-light">
                  <p>
                    Answer-free semantic query relays on RTX A6000 hardware yielded exact retrieval replication at <strong className="text-white">64K window with 4.2% latency overhead</strong> (p=0.0156).
                  </p>
                  <p>
                    However, plain 128K context runs resulted in 0/15 retrieval accuracy due to a <strong className="text-rose-400 font-mono font-bold">24× collapse</strong> in evidence attention mass.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'retrieval-bottleneck' && (
              <div className="space-y-6">
                <div className="border-b border-[#1E2330] pb-4">
                  <span className="text-xs font-mono text-emerald-400">DOC 16 • CAUSAL INTERVENTION</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Layer 24 Retrieval Bottleneck & Head Steering</h3>
                </div>

                <div className="text-xs text-[#8A94A6] leading-relaxed space-y-4 font-light">
                  <p>
                    Selected-head ablation on Layer 24 caused a statistically significant drop in query accuracy (32/45 → 24/45, p=0.0078).
                  </p>
                  <p>
                    Conversely, oracle gold evidence head steering boosted score on post-freeze cases from <strong className="text-emerald-400 font-mono font-bold">40/75 to 49/75 (p=0.0039)</strong> with zero regressions across held-out test sets.
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
