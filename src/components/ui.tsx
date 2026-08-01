import React from 'react';

export const AXIS = { fill: '#8A94A6', fontSize: 10 } as const;
export const TOOLTIP_STYLE = {
  backgroundColor: '#0F1117',
  borderColor: '#2E364A',
  borderRadius: '8px',
  fontSize: '11px',
  color: '#F1F5F9',
} as const;
export const LEGEND_STYLE = { fontSize: '10px', paddingTop: '8px' } as const;

interface SectionHeaderProps {
  index: string;
  tag: string;
  title: string;
  accent: 'cyan' | 'violet' | 'emerald' | 'amber';
  icon?: React.ReactNode;
}

const ACCENT: Record<string, string> = {
  cyan: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400',
  violet: 'bg-violet-950/80 border-violet-500/40 text-violet-400',
  emerald: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400',
  amber: 'bg-amber-950/80 border-amber-500/40 text-amber-400',
};

const ACCENT_TEXT: Record<string, string> = {
  cyan: 'text-cyan-400',
  violet: 'text-violet-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, tag, title, accent, icon }) => (
  <div className="flex items-start space-x-3 mb-4">
    <div
      className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center font-mono text-xs ${ACCENT[accent]}`}
    >
      {icon ?? index}
    </div>
    <div>
      <span className={`text-[11px] font-mono tracking-wider uppercase ${ACCENT_TEXT[accent]}`}>{tag}</span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans leading-tight">{title}</h2>
    </div>
  </div>
);

interface FigureCardProps {
  title: string;
  sub: string;
  badge: string;
  badgeTone?: 'cyan' | 'violet' | 'emerald' | 'rose' | 'amber';
  analysisLabel: string;
  analysis: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  chartHeight?: string;
  /** Minimum readable chart width. Below it the chart scrolls inside its own
   *  container instead of squeezing category labels into each other. */
  chartMinWidth?: string;
}

const TONE: Record<string, string> = {
  cyan: 'bg-cyan-950 text-cyan-300 border-cyan-800',
  violet: 'bg-violet-950 text-violet-300 border-violet-800',
  emerald: 'bg-emerald-950 text-emerald-300 border-emerald-800',
  rose: 'bg-rose-950 text-rose-300 border-rose-800',
  amber: 'bg-amber-950 text-amber-300 border-amber-800',
};

export const FigureCard: React.FC<FigureCardProps> = ({
  title,
  sub,
  badge,
  badgeTone = 'cyan',
  analysisLabel,
  analysis,
  icon,
  children,
  chartHeight = 'h-72',
  chartMinWidth,
}) => (
  <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#1E2330] flex flex-col min-w-0">
    {/* Badge sits under the title on narrow screens: as a nowrap sibling it used to
        force the card wider than the viewport and widen the whole page. */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-4 min-w-0">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white flex items-start gap-2 font-mono">
          {icon}
          <span className="break-words min-w-0">{title}</span>
        </h3>
        <p className="text-[11px] text-[#8A94A6] mt-0.5 break-words">{sub}</p>
      </div>
      <span
        className={`self-start sm:shrink-0 px-2 py-0.5 rounded text-[10px] font-mono border break-words ${TONE[badgeTone]}`}
      >
        {badge}
      </span>
    </div>

    <div className="w-full min-w-0 overflow-x-auto">
      <div className={`${chartHeight} w-full`} style={chartMinWidth ? { minWidth: chartMinWidth } : undefined}>
        {children}
      </div>
    </div>

    <div className="mt-4 p-3.5 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] leading-relaxed text-[#8A94A6] font-sans">
      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/80 mr-1.5">
        {analysisLabel} ·
      </span>
      {analysis}
    </div>
  </div>
);
