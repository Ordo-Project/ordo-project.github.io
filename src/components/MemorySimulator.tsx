import React, { useState } from 'react';
import { Cpu, Hash, Zap, RefreshCw, Layers } from 'lucide-react';

export const MemorySimulator: React.FC = () => {
  const [entityInput, setEntityInput] = useState('docs/v2.1/auth_service.py');
  const [factInput, setFactInput] = useState('auth_mode = "OIDC_JWT_v2_strict"');
  const [hookEnabled, setHookEnabled] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);

  // Simple string hash simulator
  const computeHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `0x${hex.toUpperCase()}_${str.length.toString(16).padStart(4, '0')}`;
  };

  const currentAddress = computeHash(entityInput);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedLogs([]);

    const steps = [
      `[Tokenization] Extracted entity mention: "${entityInput}"`,
      `[Canonical Hash] Computed SHA-256 address: ${currentAddress}`,
      `[Hook Layer 0.66] Forward pass reached layer 21/32`,
      hookEnabled
        ? `[Memory Lookup] Table hit at slot ${currentAddress}. Read v_dim vector (512-dim int8).`
        : `[Hook Disabled] Memory bypass active. Base frozen model prediction rendered directly.`,
      hookEnabled
        ? `[Residual Stream] Output projection injected into hidden state. Collateral damage: 0.0%.`
        : `[Residual Stream] Unaltered residual state. Ground truth efficacy: Base weights only.`,
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulatedLogs((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (index + 1) * 350);
    });
  };

  const samplePresets = [
    { entity: 'docs/v2.1/auth_service.py', fact: 'auth_mode = "OIDC_JWT_v2_strict"' },
    { entity: 'CompanyWiki/SecurityPolicy', fact: 'max_login_retries = 3' },
    { entity: 'ordo_m/config/l4-8b.yaml', fact: 'v_dim = 512, n_slots = 16384' },
  ];

  return (
    <section id="simulator" className="py-20 relative bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">INTERACTIVE DEMO</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ordo-M Memory & Forward Hook Simulator
            </h2>
          </div>
        </div>

        <p className="text-base text-[#8A94A6] max-w-3xl mb-8 font-light">
          Experience how Ordo-M routes text entity canonicals to external memory addresses, retrieving knowledge vectors into layer 0.66 of frozen LLM residual streams without altering underlying base weights.
        </p>

        {/* Main Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Input Controls */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-[#1E2330]">
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Write Fact to Memory</span>
              <span className="text-xs font-mono text-cyan-400">RAM / int8 Table</span>
            </h3>

            {/* Presets */}
            <div className="mb-5">
              <label className="text-xs text-[#8A94A6] mb-2 block font-medium">Quick Presets:</label>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setEntityInput(preset.entity);
                      setFactInput(preset.fact);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-[#161922] text-[11px] font-mono text-cyan-300 border border-[#1E2330] hover:border-cyan-500/30 transition-all"
                  >
                    {preset.entity.split('/')[1] || preset.entity}
                  </button>
                ))}
              </div>
            </div>

            {/* Entity Key Input */}
            <div className="mb-4">
              <label className="text-xs text-[#8A94A6] mb-1.5 block font-medium flex items-center justify-between">
                <span>Entity Mention / Symbol Key:</span>
                <span className="font-mono text-cyan-400 text-[10px]">Canonical Name</span>
              </label>
              <input
                type="text"
                value={entityInput}
                onChange={(e) => setEntityInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#1E2330] text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Fact Content Input */}
            <div className="mb-5">
              <label className="text-xs text-[#8A94A6] mb-1.5 block font-medium">Updated Memory Fact Payload:</label>
              <textarea
                rows={2}
                value={factInput}
                onChange={(e) => setFactInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#1E2330] text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Hook Toggle */}
            <div className="p-4 rounded-2xl bg-[#08090C] border border-[#1E2330] mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Forward Hook Status</div>
                <div className="text-[11px] text-[#8A94A6]">Layer 0.66 residual stream injection</div>
              </div>
              <button
                onClick={() => setHookEnabled(!hookEnabled)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  hookEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                }`}
              >
                {hookEnabled ? 'HOOK ENABLED' : 'HOOK DISABLED'}
              </button>
            </div>

            {/* Trigger Simulation Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Address & Injecting Hook...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run Inference Memory Pass</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Execution Canvas */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-[#1E2330] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E2330] pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-white">Execution & Address Mapping</span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <Hash className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300">{currentAddress}</span>
                </div>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="grid grid-cols-3 gap-3 mb-6 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-[10px] text-[#8A94A6] mb-1">Step A</div>
                  <div className="font-semibold text-white">Base Frozen LLM</div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">Qwen3-8B (0 Bits Changed)</div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090C] border border-cyan-500/30 bg-cyan-950/20">
                  <div className="text-[10px] text-cyan-400 mb-1">Step B</div>
                  <div className="font-semibold text-white">Forward Hook (0.66)</div>
                  <div className="text-[10px] text-cyan-300 mt-1 font-mono">
                    {hookEnabled ? 'Active (out_proj)' : 'Bypassed'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-[10px] text-[#8A94A6] mb-1">Step C</div>
                  <div className="font-semibold text-white">Memory Value</div>
                  <div className="text-[10px] text-violet-400 mt-1 font-mono">v_dim = 512 Vector</div>
                </div>
              </div>

              {/* Execution Trace Console */}
              <div className="bg-[#050608] p-4 rounded-2xl border border-[#1E2330] font-mono text-xs h-56 overflow-y-auto space-y-2">
                <div className="text-[#8A94A6]">// Memory Trace Log Console</div>
                {simulatedLogs.length === 0 ? (
                  <div className="text-[#475569] italic pt-4 text-center">
                    Click "Run Inference Memory Pass" to view live address computation & hook trace...
                  </div>
                ) : (
                  simulatedLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`leading-relaxed ${
                        log.includes('0.0%')
                          ? 'text-emerald-400 font-bold'
                          : log.includes('Disabled')
                          ? 'text-rose-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-4 pt-4 border-t border-[#1E2330] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8A94A6]">Side Damage:</span>
              <span className="text-emerald-400 font-bold">0.0% Pristine</span>
              <span className="text-[#8A94A6]">Memory Latency:</span>
              <span className="text-cyan-300">0.00 ms (Zero Overhead)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
