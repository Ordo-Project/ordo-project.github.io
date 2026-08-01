import React from 'react';
import { AlertTriangle, Layers, Crosshair, BarChart3, TrendingUp, Radar, XCircle, Grid3x3 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
  ReferenceArea,
} from 'recharts';
import { Language, translations } from '../translations';
import {
  contextCurveData,
  curveSeries,
  cliffData,
  heatmapPositions,
  heatmapRows,
  causalData,
  causalSeries,
  attentionData,
  selectorData,
} from '../data';
import { SectionHeader, FigureCard, AXIS, TOOLTIP_STYLE, LEGEND_STYLE } from './ui';

interface OrdoGenSectionProps {
  lang: Language;
}

// Green at 100%, red at 0% — used by the position × task grid.
const heatColor = (v: number) => {
  const hue = (v / 100) * 140; // 0 = red, 140 = green
  return `hsl(${hue} 60% ${14 + (v / 100) * 20}%)`;
};

export const OrdoGenSection: React.FC<OrdoGenSectionProps> = ({ lang }) => {
  const t = translations[lang].ordoGen;
  const c = translations[lang].common;

  const series = curveSeries(lang);
  const causal = causalData(lang);
  const causalNames = causalSeries(lang);
  const attention = attentionData(lang);
  const selector = selectorData(lang);
  const rows = heatmapRows(lang);

  const cards = [
    { icon: AlertTriangle, tone: 'bg-rose-500/10 text-rose-400', data: t.cards[0] },
    { icon: Layers, tone: 'bg-violet-500/10 text-violet-400', data: t.cards[1] },
    { icon: Crosshair, tone: 'bg-emerald-500/10 text-emerald-400', data: t.cards[2] },
  ];

  return (
    <section id="ordogen" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="02" tag={t.paperTag} title={t.title} accent="violet" />

        <p className="text-sm sm:text-base text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-10">
          {t.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-[#1E2330]">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-3 ${card.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-xs font-mono mb-1.5">{card.data.title}</h3>
                <p className="text-xs text-[#8A94A6] leading-relaxed font-light">{card.data.text}</p>
              </div>
            );
          })}
        </div>

        {/* Figures 1–2 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FigureCard
            title={t.fig1Title}
            sub={t.fig1Sub}
            badge={t.fig1Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig1Analysis}
            icon={<TrendingUp className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contextCurveData} margin={{ top: 8, right: 12, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="length" stroke="#8A94A6" tick={AXIS} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Line type="monotone" dataKey="exact" name={series.exact} stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="update" name={series.update} stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="latent" name={series.latent} stroke="#F43F5E" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig2Title}
            sub={t.fig2Sub}
            badge={t.fig2Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig2Analysis}
            icon={<BarChart3 className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-56"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cliffData} margin={{ top: 8, right: 12, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <ReferenceArea x1="0.70" x2="0.80" fill="#F43F5E" fillOpacity={0.07} />
                <XAxis dataKey="pos" stroke="#8A94A6" tick={AXIS} />
                <YAxis stroke="#8A94A6" tick={AXIS} domain={[0, 10]} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar dataKey="k16" name="16K" fill="#06B6D4" radius={[3, 3, 0, 0]} />
                <Bar dataKey="k32" name="32K" fill="#F43F5E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Position × task grid at 32K */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#1E2330] mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <Grid3x3 className="w-4 h-4 text-violet-400" />
              <span>
                {lang === 'ru'
                  ? '32K: точность по позиции факта и задаче'
                  : '32K: accuracy by evidence position and task'}
              </span>
            </h3>
            <span className="text-[10px] font-mono text-[#8A94A6] hidden sm:inline">{c.higher}</span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-[190px_repeat(5,1fr)] gap-1.5 mb-1.5">
                <div />
                {heatmapPositions.map((p) => (
                  <div key={p} className="text-center text-[10px] font-mono text-[#8A94A6]">
                    {p}
                  </div>
                ))}
              </div>
              {rows.map((row) => (
                <div key={row.task} className="grid grid-cols-[190px_repeat(5,1fr)] gap-1.5 mb-1.5">
                  <div className="text-[11px] font-mono text-[#8A94A6] flex items-center pr-2">{row.task}</div>
                  {row.values.map((v, i) => (
                    <div
                      key={i}
                      className="h-11 rounded flex items-center justify-center text-[11px] font-mono text-white border border-white/5"
                      style={{ backgroundColor: heatColor(v) }}
                      title={`${row.task} · ${heatmapPositions[i]} → ${v}%`}
                    >
                      {v}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-[#8A94A6] font-light leading-relaxed">
            {lang === 'ru'
              ? 'Дословный поиск идеален на 0.05 — самой удалённой позиции — и проваливается до 20% на 0.75. Расстояние до вопроса не объясняет отказ.'
              : 'Literal retrieval is perfect at 0.05 — the most distant position — and collapses to 20% at 0.75. Distance to the question does not explain the failure.'}
          </p>
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
            icon={<Crosshair className="w-4 h-4 text-emerald-400 shrink-0" />}
            chartHeight="h-72"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={causal} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[0, 80]} unit="%" />
                <YAxis type="category" dataKey="arm" stroke="#8A94A6" tick={AXIS} width={200} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar dataKey="basePct" name={causalNames.base} fill="#475569" radius={[0, 3, 3, 0]} barSize={11} />
                <Bar dataKey="condPct" name={causalNames.cond} fill="#10B981" radius={[0, 3, 3, 0]} barSize={11}>
                  {causal.map((d, i) => (
                    <Cell key={i} fill={d.kind === 'up' ? '#10B981' : d.kind === 'down' ? '#F43F5E' : '#8A94A6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>

          <FigureCard
            title={t.fig4Title}
            sub={t.fig4Sub}
            badge={t.fig4Badge}
            badgeTone="rose"
            analysisLabel={c.analysis}
            analysis={t.fig4Analysis}
            icon={<Radar className="w-4 h-4 text-rose-400 shrink-0" />}
            chartHeight="h-72"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={attention} margin={{ top: 8, right: 4, left: -14, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="arm" stroke="#8A94A6" tick={AXIS} interval={0} height={34} />
                <YAxis
                  yAxisId="m"
                  scale="log"
                  domain={[0.0002, 0.02]}
                  stroke="#06B6D4"
                  tick={{ ...AXIS, fill: '#06B6D4' }}
                  tickFormatter={(v: number) => v.toExponential(0)}
                />
                <YAxis yAxisId="s" orientation="right" domain={[0, 15]} stroke="#10B981" tick={{ ...AXIS, fill: '#10B981' }} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar
                  yAxisId="m"
                  dataKey="mass"
                  name={lang === 'ru' ? 'внимание к факту (лог)' : 'evidence attention (log)'}
                  fill="#06B6D4"
                  radius={[3, 3, 0, 0]}
                />
                <Line
                  yAxisId="s"
                  type="monotone"
                  dataKey="score"
                  name={lang === 'ru' ? 'верных из 15' : 'correct of 15'}
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Figure 5 — selector */}
        <div className="mb-8">
          <FigureCard
            title={t.fig5Title}
            sub={t.fig5Sub}
            badge={t.fig5Badge}
            badgeTone="violet"
            analysisLabel={c.analysis}
            analysis={t.fig5Analysis}
            icon={<Layers className="w-4 h-4 text-violet-400 shrink-0" />}
            chartHeight="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selector} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" horizontal={false} />
                <XAxis type="number" stroke="#8A94A6" tick={AXIS} domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="policy" stroke="#8A94A6" tick={AXIS} width={230} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar dataKey="r1" name="Recall@1" fill="#8B5CF6" radius={[0, 3, 3, 0]} barSize={11}>
                  <LabelList dataKey="r1" position="right" fill="#8A94A6" fontSize={9} />
                </Bar>
                <Bar dataKey="r4" name="Recall@4" fill="#06B6D4" radius={[0, 3, 3, 0]} barSize={11} />
              </BarChart>
            </ResponsiveContainer>
          </FigureCard>
        </div>

        {/* Ruled out */}
        <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
          <h3 className="text-sm font-bold text-white mb-4 font-mono flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>{t.tableTitle}</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans min-w-[720px]">
              <thead>
                <tr className="border-b border-[#1E2330] text-[#8A94A6] font-mono">
                  <th className="pb-2 pr-4 font-medium w-1/4">{t.colHyp}</th>
                  <th className="pb-2 pr-4 font-medium">{t.colResult}</th>
                  <th className="pb-2 font-medium w-1/5">{t.colVerdict}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2330] text-slate-300">
                {t.ruled.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-4 text-white align-top font-medium">{row.hyp}</td>
                    <td className="py-3 pr-4 text-[#8A94A6] align-top font-light leading-relaxed">{row.result}</td>
                    <td className="py-3 align-top">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-900/70 inline-block">
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
