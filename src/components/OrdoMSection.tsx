import React from 'react';
import { Cpu, BarChart3, Clock, Lock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Language, translations } from '../translations';

interface OrdoMSectionProps {
  lang: Language;
}

export const OrdoMSection: React.FC<OrdoMSectionProps> = ({ lang }) => {
  const t = translations[lang].ordoM;

  // Data for Collateral Damage Comparison
  const collateralData = [
    { metric: 'CounterFact Efficacy', 'Ordo-M': 100, 'LoRA (Equal Cap)': 100 },
    { metric: 'Paraphrase Generalization', 'Ordo-M': 97.2, 'LoRA (Equal Cap)': 68.5 },
    { metric: 'Collateral Damage (Lower is better)', 'Ordo-M': 0.0, 'LoRA (Equal Cap)': 8.4 },
    { metric: '50 Fact Update Retention', 'Ordo-M': 88.0, 'LoRA (Equal Cap)': 41.2 },
  ];

  // Data for Wave Training Parity
  const waveData = [
    { setup: 'Old baseline (6 epochs)', waveAvg: 29.5, drift: 0.0, label: '29.5% Wave Avg' },
    { setup: 'Calib 500 -> Freeze (6 ep)', waveAvg: 81.1, drift: 0.5, label: '81.1% Wave Avg' },
    { setup: 'Calib 500 -> Freeze (18 ep)', waveAvg: 96.2, drift: 0.0, label: '96.2% Wave Avg (Parity)' },
    { setup: 'Full Retrain (Control)', waveAvg: 96.9, drift: 0.0, label: '96.9% Full Retrain' },
  ];

  return (
    <section id="ordo-m" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs">
            01
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">{t.paperTag}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              {t.title}
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-10">
          {t.description}
        </p>

        {/* Mathematical Formulation Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#1E2330] mb-10 bg-[#0B0D13]">
          <h3 className="text-sm font-mono font-bold text-white mb-4 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{t.mathTitle}</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-cyan-400 font-semibold">{t.math1Title}</div>
              <div className="text-slate-300">
                {t.math1Formula}
              </div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">
                {t.math1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-violet-400 font-semibold">{t.math2Title}</div>
              <div className="text-slate-300">
                {t.math2Formula}
              </div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">
                {t.math2Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Experimental Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Chart 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>{t.fig1Title}</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">{t.fig1Sub}</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                {t.fig1Badge}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collateralData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="metric" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} interval={0} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Bar dataKey="Ordo-M" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="LoRA (Equal Cap)" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              {t.fig1Analysis}
            </div>
          </div>

          {/* Chart 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <Clock className="w-4 h-4 text-violet-400" />
                  <span>{t.fig2Title}</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">{t.fig2Sub}</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono border border-violet-800">
                {t.fig2Badge}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waveData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="setup" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Bar dataKey="waveAvg" name="Wave Avg Knowledge %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              {t.fig2Analysis}
            </div>
          </div>
        </div>

        {/* Resource Footprint Table */}
        <div className="glass-panel p-6 rounded-2xl border border-[#1E2330] mb-10">
          <h3 className="text-sm font-bold text-white mb-3 font-mono">{t.tableTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E2330] text-[#8A94A6]">
                  <th className="pb-2">{t.colAxis}</th>
                  <th className="pb-2">{t.colValue}</th>
                  <th className="pb-2">{t.colAdv}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2330] text-slate-300">
                {t.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 text-cyan-400">{row.axis}</td>
                    <td className="py-2.5">{row.val}</td>
                    <td className="py-2.5 text-[#8A94A6]">{row.adv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Closed-Source Research Notice */}
        <div className="p-5 rounded-2xl bg-[#0F1117] border border-[#1E2330] flex items-start space-x-3 text-xs">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white font-mono">{t.noticeTitle}</div>
            <p className="text-[#8A94A6] font-light leading-relaxed">
              {t.noticeText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
