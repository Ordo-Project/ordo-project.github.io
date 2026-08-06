import React from 'react';
import { Cpu, BarChart3, Clock, Lock, Gauge, Search, Target, Layers, TrendingUp, FileText } from 'lucide-react';
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
import { Language, translations } from '../i18n';
import {
  editQualityData,
  sideDamageData,
  waveData,
  domainArmData,
  retrieverData,
  corpusFormData,
  coverageLawData,
  gainCurveData,
  proseAddressData,
  proseArmData,
  MEMORY_THRESHOLD,
  PROSE_THRESHOLD,
  GAIN_KNEE,
  COVERAGE_LAW,
  twoDomainData,
  coverageTransferData,
  blindReadData,
  blindReadSeries,
  COVERAGE_SLOPES,
  gateData,
  gateSeries,
  GATE,
  flowCurveData,
  FLOW_POINT,
  strataData,
  strataSeries,
  capacityData,
  capacitySeries,
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
  const gains = gainCurveData;
  const corpus = corpusFormData(lang);
  const proseAddr = proseAddressData(lang);
  const proseArms = proseArmData(lang);
  const arms = domainArmData(lang);
  const retrievers = retrieverData(lang);
  const domains = twoDomainData(lang);
  const transfer = coverageTransferData(lang);
  const blind = blindReadData();
  const blindLabels = blindReadSeries(lang);
  const gate = gateData(lang);
  const gateLabels = gateSeries(lang);
  const flow = flowCurveData;
  const strata = strataData(lang);
  const strataLabels = strataSeries(lang);
  const capacity = capacityData(lang);
  const capacityLabels = capacitySeries(lang);

  const armColor = (kind: string) =>
    kind === 'base'
      ? '#F43F5E'
      : kind === 'memory-fail'
        ? '#9F1239'
        : kind === 'memory'
          ? '#10B981'
          : kind === 'ceiling'
            ? '#F59E0B'
            : '#475569';

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
        <div className="grid lg:grid-cols-2 gap-8 mb-8 min-w-0">
          <FigureCard
            title={t.fig1Title}
            sub={t.fig1Sub}
            badge={t.fig1Badge}
            badgeTone="cyan"
            analysisLabel={c.analysis}
            analysis={t.fig1Analysis}
            icon={<BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />}
            chartHeight="h-56"
            chartMinWidth="360px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quality} margin={{ top: 8, right: 8, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="metric" stroke="#8A94A6" tick={AXIS} interval={0} height={34} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar isAnimationActive={false} dataKey="ordo" name="Ordo-M" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar isAnimationActive={false} dataKey="lora" name="LoRA" fill="#F43F5E" radius={[4, 4, 0, 0]} />
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
            chartMinWidth="400px"
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
                <Bar isAnimationActive={false} dataKey="wave" name="%" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
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
        <div className="grid lg:grid-cols-2 gap-8 mb-8 min-w-0">
          <FigureCard
            title={t.fig3Title}
            sub={t.fig3Sub}
            badge={t.fig3Badge}
            badgeTone="emerald"
            analysisLabel={c.analysis}
            analysis={t.fig3Analysis}
            icon={<Gauge className="w-4 h-4 text-emerald-400 shrink-0" />}
            chartHeight="h-56"
            chartMinWidth="380px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gains} margin={{ top: 12, right: 6, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="gain" stroke="#8A94A6" tick={AXIS} />
                <YAxis yAxisId="k" stroke="#10B981" tick={{ ...AXIS, fill: '#10B981' }} domain={[55, 75]} unit="%" />
                <YAxis yAxisId="p" orientation="right" stroke="#F43F5E" tick={{ ...AXIS, fill: '#F43F5E' }} domain={[0, 90]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <ReferenceLine
                  yAxisId="k"
                  x={GAIN_KNEE}
                  stroke="#8A94A6"
                  strokeDasharray="4 4"
                  label={{ value: lang === 'ru' ? 'колено' : 'knee', position: 'top', fill: '#8A94A6', fontSize: 10 }}
                />
                <Line
                  isAnimationActive={false}
                  yAxisId="k"
                  type="monotone"
                  dataKey="knowledge"
                  name={lang === 'ru' ? 'знание, %' : 'knowledge, %'}
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  isAnimationActive={false}
                  yAxisId="p"
                  type="monotone"
                  dataKey="ppl"
                  name={lang === 'ru' ? 'ΔPPL упоминания, %' : 'ΔPPL on mentions, %'}
                  stroke="#F43F5E"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  dot={{ r: 4 }}
                />
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
            chartHeight="h-72"
            chartMinWidth="380px"
          >
            {/* Horizontal: six arm names in either language do not fit as x-axis ticks. */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arms} layout="vertical" margin={{ top: 20, right: 34, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[40, 100]} unit="%" />
                <YAxis type="category" dataKey="arm" stroke="#8A94A6" tick={AXIS} width={150} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <ReferenceLine
                  x={MEMORY_THRESHOLD}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  label={{ value: `${MEMORY_THRESHOLD}%`, position: 'top', fill: '#10B981', fontSize: 10 }}
                />
                <Bar isAnimationActive={false} dataKey="prefer" name="%" radius={[0, 4, 4, 0]} barSize={16}>
                  {arms.map((a, i) => (
                    <Cell key={i} fill={armColor(a.kind)} />
                  ))}
                  <LabelList dataKey="prefer" position="right" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Figure 5 — addressing as a retriever */}
        <div className="mb-10 min-w-0">
          <FigureCard
            title={t.fig5Title}
            sub={t.fig5Sub}
            badge={t.fig5Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig5Analysis}
            icon={<Search className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-72"
            chartMinWidth="420px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retrievers} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="name" stroke="#8A94A6" tick={AXIS} width={210} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar isAnimationActive={false} dataKey="recall" name="recall@1 %" radius={[0, 4, 4, 0]} barSize={16}>
                  {retrievers.map((r, i) => (
                    <Cell key={i} fill={r.own ? '#06B6D4' : '#475569'} />
                  ))}
                  <LabelList dataKey="recall" position="right" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Figures 6–7 — what the corpus is made of, and the law it obeys */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8 min-w-0">
          <FigureCard
            title={t.fig6Title}
            sub={t.fig6Sub}
            badge={t.fig6Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig6Analysis}
            icon={<Layers className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-64"
            chartMinWidth="480px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={corpus} margin={{ top: 12, right: 6, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="form" stroke="#8A94A6" tick={AXIS} interval={0} height={40} />
                <YAxis yAxisId="k" stroke="#8A94A6" tick={AXIS} domain={[40, 80]} unit="%" />
                <YAxis
                  yAxisId="p"
                  orientation="right"
                  scale="log"
                  domain={[1, 200]}
                  stroke="#F43F5E"
                  tick={{ ...AXIS, fill: '#F43F5E' }}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <ReferenceLine
                  yAxisId="k"
                  y={MEMORY_THRESHOLD}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  label={{ value: `${MEMORY_THRESHOLD}%`, position: 'insideTopLeft', fill: '#10B981', fontSize: 10 }}
                />
                <Bar
                  isAnimationActive={false}
                  yAxisId="k"
                  dataKey="knowledge"
                  name={lang === 'ru' ? 'знание, %' : 'knowledge, %'}
                  fill="#06B6D4"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList dataKey="knowledge" position="top" fill="#8A94A6" fontSize={10} />
                </Bar>
                <Line
                  isAnimationActive={false}
                  yAxisId="p"
                  type="monotone"
                  dataKey="ppl"
                  name={lang === 'ru' ? 'ΔPPL упоминания, % (лог)' : 'ΔPPL on mentions, % (log)'}
                  stroke="#F43F5E"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig7Title}
            sub={t.fig7Sub}
            badge={t.fig7Badge}
            badgeTone="emerald"
            analysisLabel={c.analysis}
            analysis={t.fig7Analysis}
            icon={<TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />}
            chartHeight="h-64"
            chartMinWidth="380px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={coverageLawData} margin={{ top: 12, right: 10, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis
                  dataKey="coverage"
                  type="number"
                  domain={[10, 55]}
                  stroke="#8A94A6"
                  tick={AXIS}
                  unit="%"
                  label={{
                    value: lang === 'ru' ? 'покрытие' : 'coverage',
                    position: 'insideBottom',
                    offset: -2,
                    fill: '#8A94A6',
                    fontSize: 10,
                  }}
                />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[50, 80]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <ReferenceLine
                  x={COVERAGE_LAW.need}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{ value: `${COVERAGE_LAW.need}%`, position: 'top', fill: '#F59E0B', fontSize: 10 }}
                />
                <Line
                  isAnimationActive={false}
                  type="linear"
                  dataKey="fit"
                  name={lang === 'ru' ? 'прямая' : 'fitted line'}
                  stroke="#475569"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={false}
                />
                <Line
                  isAnimationActive={false}
                  type="linear"
                  dataKey="knowledge"
                  name={lang === 'ru' ? 'измерено' : 'measured'}
                  stroke="#10B981"
                  strokeWidth={0}
                  dot={{ r: 5, fill: '#10B981' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Figure 8 — prose: the address has to be a page */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10 min-w-0">
          <FigureCard
            title={t.fig8Title}
            sub={t.fig8Sub}
            badge={t.fig8Badge}
            badgeTone="violet"
            analysisLabel={c.analysis}
            analysis={t.fig8Analysis}
            icon={<FileText className="w-4 h-4 text-violet-400 shrink-0" />}
            chartHeight="h-56"
            chartMinWidth="380px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proseAddr} margin={{ top: 12, right: 10, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="set" stroke="#8A94A6" tick={AXIS} interval={0} height={40} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar
                  isAnimationActive={false}
                  dataKey="page"
                  name={lang === 'ru' ? 'адрес страницы' : 'page address'}
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList dataKey="page" position="top" fill="#8A94A6" fontSize={10} />
                </Bar>
                <Bar
                  isAnimationActive={false}
                  dataKey="section"
                  name={lang === 'ru' ? 'адрес раздела' : 'section address'}
                  fill="#F43F5E"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList dataKey="section" position="top" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig9Title}
            sub={t.fig9Sub}
            badge={t.fig9Badge}
            badgeTone="amber"
            analysisLabel={c.analysis}
            analysis={t.fig9Analysis}
            icon={<BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />}
            chartHeight="h-56"
            chartMinWidth="380px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proseArms} layout="vertical" margin={{ top: 20, right: 34, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[60, 100]} unit="%" />
                <YAxis type="category" dataKey="arm" stroke="#8A94A6" tick={AXIS} width={150} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <ReferenceLine
                  x={PROSE_THRESHOLD}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  label={{ value: `${PROSE_THRESHOLD}%`, position: 'top', fill: '#10B981', fontSize: 10 }}
                />
                <Bar isAnimationActive={false} dataKey="prefer" name="%" radius={[0, 4, 4, 0]} barSize={16}>
                  {proseArms.map((a, i) => (
                    <Cell key={i} fill={armColor(a.kind)} />
                  ))}
                  <LabelList dataKey="prefer" position="right" fill="#8A94A6" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Two domains under the same phase rule */}
          <FigureCard
            title={t.fig10Title}
            sub={t.fig10Sub}
            badge={t.fig10Badge}
            badgeTone="cyan"
            analysisLabel={c.analysis}
            analysis={t.fig10Analysis}
            icon={<Layers className="w-4 h-4 text-cyan-400 shrink-0" />}
            chartMinWidth="420px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={domains} margin={{ top: 24, right: 12, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="domain" stroke="#8A94A6" tick={AXIS} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[40, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar isAnimationActive={false} dataKey="base" name={c.baseArm} fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar isAnimationActive={false} dataKey="memory" name={c.memoryArm} fill="#10B981" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="memory" position="top" fill="#10B981" fontSize={10} />
                </Bar>
                <Bar isAnimationActive={false} dataKey="rag" name={c.ragArm} fill="#22D3EE" radius={[4, 4, 0, 0]} />
                {/* The bar is derived per domain, so it is a series and not one line. */}
                <Line
                  isAnimationActive={false}
                  type="linear"
                  dataKey="threshold"
                  name={c.thresholdArm}
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: '#F59E0B' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Coverage law: predicted before the run against measured */}
          <FigureCard
            title={t.fig11Title}
            sub={t.fig11Sub}
            badge={t.fig11Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig11Analysis}
            icon={<TrendingUp className="w-4 h-4 text-rose-400 shrink-0" />}
            chartMinWidth="420px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transfer} margin={{ top: 24, right: 12, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="point" stroke="#8A94A6" tick={AXIS} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[55, 80]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <ReferenceLine
                  y={COVERAGE_SLOPES.threshold}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{
                    value: `${COVERAGE_SLOPES.threshold}%`,
                    position: 'insideTopLeft',
                    fill: '#F59E0B',
                    fontSize: 10,
                  }}
                />
                <Bar isAnimationActive={false} dataKey="predicted" name={c.predicted} fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="predicted" position="top" fill="#A78BFA" fontSize={10} />
                </Bar>
                <Bar isAnimationActive={false} dataKey="measured" name={c.measured} fill="#F43F5E" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="measured" position="top" fill="#FB7185" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Blind paired reading of the damage budget */}
          <FigureCard
            title={t.fig12Title}
            sub={t.fig12Sub}
            badge={t.fig12Badge}
            badgeTone="violet"
            analysisLabel={c.analysis}
            analysis={t.fig12Analysis}
            icon={<FileText className="w-4 h-4 text-violet-400 shrink-0" />}
            chartMinWidth="420px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blind} margin={{ top: 20, right: 12, left: -20, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="level" stroke="#8A94A6" tick={AXIS} />
                <YAxis stroke="#8A94A6" tick={AXIS} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar isAnimationActive={false} stackId="p" dataKey="base" name={blindLabels.base} fill="#F43F5E" />
                <Bar isAnimationActive={false} stackId="p" dataKey="tie" name={blindLabels.tie} fill="#475569" />
                <Bar
                  isAnimationActive={false}
                  stackId="p"
                  dataKey="memory"
                  name={blindLabels.memory}
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
          {/* The gate: knowledge against damage, gated points marked */}
          <FigureCard
            title={t.fig13Title}
            sub={t.fig13Sub}
            badge={t.fig13Badge}
            badgeTone="emerald"
            analysisLabel={c.analysis}
            analysis={t.fig13Analysis}
            icon={<Gauge className="w-4 h-4 text-emerald-400 shrink-0" />}
            chartMinWidth="560px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gate} margin={{ top: 20, right: 8, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="point" stroke="#8A94A6" tick={{ ...AXIS, fontSize: 9 }} interval={0} />
                <YAxis yAxisId="k" stroke="#8A94A6" tick={AXIS} domain={[45, 65]} unit="%" />
                <YAxis yAxisId="d" orientation="right" stroke="#F43F5E" tick={AXIS} domain={[-20, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <ReferenceLine
                  yAxisId="d"
                  y={GATE.budget}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{ value: `+${GATE.budget}%`, position: 'insideTopRight', fill: '#F59E0B', fontSize: 10 }}
                />
                {/* fill is the legend swatch; the per-point Cell marks which arms are gated */}
                <Bar
                  yAxisId="k"
                  isAnimationActive={false}
                  dataKey="knowledge"
                  name={gateLabels.knowledge}
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                >
                  {gate.map((row, i) => (
                    <Cell key={i} fill={row.gated ? '#10B981' : '#334155'} />
                  ))}
                  <LabelList dataKey="knowledge" position="top" fill="#94A3B8" fontSize={10} />
                </Bar>
                <Line
                  yAxisId="d"
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="damage"
                  name={gateLabels.damage}
                  stroke="#F43F5E"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#F43F5E' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Flow share against knowledge on the larger model */}
          <FigureCard
            title={t.fig14Title}
            sub={t.fig14Sub}
            badge={t.fig14Badge}
            badgeTone="amber"
            analysisLabel={c.analysis}
            analysis={t.fig14Analysis}
            icon={<Target className="w-4 h-4 text-amber-400 shrink-0" />}
            chartMinWidth="420px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={flow} margin={{ top: 20, right: 8, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis
                  dataKey="share"
                  type="number"
                  domain={[0.6, 2.05]}
                  ticks={flow.map((p) => p.share)}
                  stroke="#8A94A6"
                  tick={AXIS}
                  tickFormatter={(v: number) => v.toFixed(2)}
                />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[55, 75]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: '#2E364A' }} />
                <ReferenceLine
                  y={FLOW_POINT.threshold}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{
                    value: `${FLOW_POINT.threshold}%`,
                    position: 'insideTopLeft',
                    fill: '#F59E0B',
                    fontSize: 10,
                  }}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="knowledge"
                  name={gateLabels.knowledge}
                  stroke="#22D3EE"
                  strokeWidth={2}
                  dot={{ r: 5, fill: '#22D3EE' }}
                >
                  <LabelList
                    dataKey="knowledge"
                    position="top"
                    fill="#67E8F9"
                    fontSize={10}
                    formatter={(v: number) => v.toFixed(1)}
                  />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Four strata of the same question set */}
          <FigureCard
            title={t.fig15Title}
            sub={t.fig15Sub}
            badge={t.fig15Badge}
            badgeTone="cyan"
            analysisLabel={c.analysis}
            analysis={t.fig15Analysis}
            icon={<Layers className="w-4 h-4 text-cyan-400 shrink-0" />}
            chartMinWidth="480px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strata} margin={{ top: 20, right: 12, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="stratum" stroke="#8A94A6" tick={{ ...AXIS, fontSize: 9 }} interval={0} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[40, 90]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar isAnimationActive={false} dataKey="product" name={strataLabels.product} fill="#22D3EE" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="product" position="top" fill="#67E8F9" fontSize={10} />
                </Bar>
                <Bar isAnimationActive={false} dataKey="large" name={strataLabels.large} fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="large" position="top" fill="#A78BFA" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          {/* Address capacity saturation */}
          <FigureCard
            title={t.fig16Title}
            sub={t.fig16Sub}
            badge={t.fig16Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig16Analysis}
            icon={<TrendingUp className="w-4 h-4 text-rose-400 shrink-0" />}
            chartMinWidth="480px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={capacity} margin={{ top: 20, right: 8, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="cap" stroke="#8A94A6" tick={{ ...AXIS, fontSize: 9 }} interval={0} />
                <YAxis yAxisId="p" stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <YAxis yAxisId="ce" orientation="right" stroke="#F59E0B" tick={AXIS} domain={[1, 2.6]} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar yAxisId="p" isAnimationActive={false} dataKey="corpus" name={capacityLabels.corpus} fill="#334155" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="corpus" position="top" fill="#94A3B8" fontSize={10} />
                </Bar>
                <Bar yAxisId="p" isAnimationActive={false} dataKey="knowledge" name={capacityLabels.knowledge} fill="#10B981" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="knowledge" position="top" fill="#6EE7B7" fontSize={10} />
                </Bar>
                <Line
                  yAxisId="ce"
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="ce"
                  name={capacityLabels.ce}
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#F59E0B' }}
                />
              </ComposedChart>
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
