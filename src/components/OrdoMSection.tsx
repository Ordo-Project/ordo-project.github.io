import React from 'react';
import { Cpu, BarChart3, Clock, Lock, Gauge, Search, Target } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Cell,
  LabelList,
} from 'recharts';
import { Language, translations } from '../translations';
import {
  editQualityData,
  sideDamageData,
  waveData,
  gainData,
  domainArmData,
  retrieverData,
  MEMORY_THRESHOLD,
} from '../data';
import { SectionHeader, FigureCard, AXIS, TOOLTIP_STYLE, LEGEND_STYLE } from './ui';

interface OrdoMSectionProps {
  lang: Language;
}

export const OrdoMSection: React.FC<OrdoMSectionProps> = ({ lang }) => {
  const t = translations[lang].ordoM;
  const c = translations[lang].common;

  const quality = editQualityData(lang);
  const damage = sideDamageData(lang);
  const waves = waveData(lang);
  const gains = gainData(lang);
  const arms = domainArmData(lang);
  const retrievers = retrieverData(lang);

  const armColor = (kind: string) =>
    kind === 'base' ? '#F43F5E' : kind === 'ceiling' ? '#F59E0B' : '#06B6D4';

  return (
    <section id="ordo-m" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="01" tag={t.paperTag} title={t.title} accent="cyan" />

        <p className="text-sm sm:text-base text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-10">
          {t.description}
        </p>

        {/* Construction */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#1E2330] mb-10 bg-[#0B0D13]">
          <h3 className="text-sm font-mono font-bold text-white mb-4 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{t.mathTitle}</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-cyan-400 font-semibold">{t.math1Title}</div>
              <div className="text-slate-200 text-[13px]">{t.math1Formula}</div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">{t.math1Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-violet-400 font-semibold">{t.math2Title}</div>
              <div className="text-slate-200 text-[13px]">{t.math2Formula}</div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">{t.math2Desc}</p>
            </div>
          </div>
        </div>

        {/* Figures 1–2 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FigureCard
            title={t.fig1Title}
            sub={t.fig1Sub}
            badge={t.fig1Badge}
            badgeTone="cyan"
            analysisLabel={c.analysis}
            analysis={t.fig1Analysis}
            icon={<BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quality} margin={{ top: 8, right: 8, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="metric" stroke="#8A94A6" tick={AXIS} interval={0} height={34} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar dataKey="ordo" name="Ordo-M" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lora" name="LoRA" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig2Title}
            sub={t.fig2Sub}
            badge={t.fig2Badge}
            badgeTone="violet"
            analysisLabel={c.analysis}
            analysis={t.fig2Analysis}
            icon={<Clock className="w-4 h-4 text-violet-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waves} margin={{ top: 8, right: 8, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="setup" stroke="#8A94A6" tick={AXIS} interval={0} height={34} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <ReferenceLine
                  y={96.9}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{ value: '96.9', position: 'insideTopLeft', fill: '#F59E0B', fontSize: 10 }}
                />
                <Bar dataKey="wave" name="%" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="wave" position="top" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Side damage strip — the single number the project turns on */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#1E2330] mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>{t.fig1Badge}</span>
            </h3>
            <span className="text-[10px] font-mono text-[#8A94A6]">{c.lower}</span>
          </div>
          <div className="space-y-3">
            {damage.map((d) => (
              <div key={d.arm} className="flex items-center gap-3">
                <div className="w-28 sm:w-52 lg:w-64 shrink-0 text-[10px] sm:text-[11px] font-mono text-[#8A94A6] text-right leading-tight">
                  {d.arm}
                </div>
                <div className="flex-1 h-6 rounded bg-[#050608] border border-[#1E2330] overflow-hidden">
                  <div
                    className={`h-full ${d.damage === 0 ? 'bg-emerald-500/70' : 'bg-rose-500/70'}`}
                    style={{ width: `${Math.max(d.damage / 10, 0.012) * 100}%` }}
                  />
                </div>
                <div
                  className={`w-14 shrink-0 text-[11px] font-mono ${d.damage === 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                  {d.damage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Figures 3–4 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FigureCard
            title={t.fig3Title}
            sub={t.fig3Sub}
            badge={t.fig3Badge}
            badgeTone="emerald"
            analysisLabel={c.analysis}
            analysis={t.fig3Analysis}
            icon={<Gauge className="w-4 h-4 text-emerald-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gains} margin={{ top: 8, right: 4, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="setup" stroke="#8A94A6" tick={AXIS} interval={0} height={34} />
                <YAxis yAxisId="k" stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <YAxis yAxisId="p" orientation="right" stroke="#F43F5E" tick={{ ...AXIS, fill: '#F43F5E' }} domain={[0, 500]} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar yAxisId="k" dataKey="wave0" name={lang === 'ru' ? 'волна 0' : 'wave 0'} fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="k" dataKey="late" name={lang === 'ru' ? 'поздние волны' : 'later waves'} fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="p" type="monotone" dataKey="ppl" name={lang === 'ru' ? 'ΔPPL упоминания, %' : 'ΔPPL on mentions, %'} stroke="#F43F5E" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig4Title}
            sub={t.fig4Sub}
            badge={t.fig4Badge}
            badgeTone="amber"
            analysisLabel={c.analysis}
            analysis={t.fig4Analysis}
            icon={<BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arms} margin={{ top: 8, right: 8, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="arm" stroke="#8A94A6" tick={AXIS} interval={0} height={38} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[40, 95]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <ReferenceLine
                  y={MEMORY_THRESHOLD}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  label={{ value: `${MEMORY_THRESHOLD}%`, position: 'insideTopLeft', fill: '#10B981', fontSize: 10 }}
                />
                <Bar dataKey="prefer" name="%" radius={[4, 4, 0, 0]}>
                  {arms.map((a, i) => (
                    <Cell key={i} fill={armColor(a.kind)} />
                  ))}
                  <LabelList dataKey="prefer" position="top" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Figure 5 — addressing as a retriever */}
        <div className="mb-10">
          <FigureCard
            title={t.fig5Title}
            sub={t.fig5Sub}
            badge={t.fig5Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig5Analysis}
            icon={<Search className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-72"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retrievers} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="name" stroke="#8A94A6" tick={AXIS} width={210} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="recall" name="recall@1 %" radius={[0, 4, 4, 0]} barSize={16}>
                  {retrievers.map((r, i) => (
                    <Cell key={i} fill={r.own ? '#06B6D4' : '#475569'} />
                  ))}
                  <LabelList dataKey="recall" position="right" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Resource table */}
        <div className="glass-panel p-6 rounded-2xl border border-[#1E2330] mb-10">
          <h3 className="text-sm font-bold text-white mb-4 font-mono">{t.tableTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono min-w-[640px]">
              <thead>
                <tr className="border-b border-[#1E2330] text-[#8A94A6]">
                  <th className="pb-2 pr-4 font-medium">{t.colAxis}</th>
                  <th className="pb-2 pr-4 font-medium">{t.colValue}</th>
                  <th className="pb-2 font-medium">{t.colAdv}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2330] text-slate-300">
                {t.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 pr-4 text-cyan-400 align-top">{row.axis}</td>
                    <td className="py-2.5 pr-4 align-top">{row.val}</td>
                    <td className="py-2.5 text-[#8A94A6] align-top">{row.adv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1117] border border-[#1E2330] flex items-start space-x-3 text-xs">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white font-mono">{t.noticeTitle}</div>
            <p className="text-[#8A94A6] font-light leading-relaxed">{t.noticeText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
