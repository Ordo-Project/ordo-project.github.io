import React from 'react';
import type { Language } from '../i18n';
import type { Block, Publication } from '../content/publications';

/** Minimal inline formatting so block text stays plain strings: **bold**, *italic*, `code`. */
const inline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.filter(Boolean).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-[0.92em] text-cyan-300 bg-cyan-950/40 px-1 py-0.5 rounded">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const BlockView: React.FC<{ block: Block; lang: Language }> = ({ block, lang }) => {
  switch (block.t) {
    case 'h2':
      return (
        <h3
          id={block.id}
          className="text-lg sm:text-xl font-bold text-white mt-10 mb-3 pt-2 border-t border-[#1E2330] scroll-mt-28"
        >
          {block.text[lang]}
        </h3>
      );

    case 'h3':
      return <h4 className="text-sm font-bold text-cyan-300 font-mono mt-7 mb-2">{block.text[lang]}</h4>;

    case 'lead':
      return (
        <p className="text-sm text-slate-300 leading-relaxed mb-4 font-light">{inline(block.text[lang])}</p>
      );

    case 'p':
      return (
        <p className="text-[13px] sm:text-sm text-[#9AA4B4] leading-[1.75] mb-4 font-light">
          {inline(block.text[lang])}
        </p>
      );

    case 'quote':
      return (
        <blockquote className="my-5 pl-4 border-l-2 border-cyan-500/50 text-[13px] sm:text-sm text-slate-300 leading-relaxed font-light italic">
          {inline(block.text[lang])}
        </blockquote>
      );

    case 'ul':
      return (
        <ul className="mb-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] sm:text-sm text-[#9AA4B4] leading-[1.7] font-light">
              <span className="mt-2 w-1 h-1 rounded-full bg-cyan-500 shrink-0" />
              <span>{inline(item[lang])}</span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="mb-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] sm:text-sm text-[#9AA4B4] leading-[1.7] font-light">
              <span className="font-mono text-[11px] text-cyan-500 shrink-0 pt-0.5 w-4 text-right">{i + 1}.</span>
              <span>{inline(item[lang])}</span>
            </li>
          ))}
        </ol>
      );

    case 'refs':
      return (
        <ol className="mb-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[12px] text-[#8A94A6] leading-relaxed font-light">
              <span className="font-mono text-[10px] text-[#475569] shrink-0 pt-0.5 w-5 text-right">[{i + 1}]</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'readout':
      return (
        <div className="my-5 p-4 rounded-xl bg-[#050608] border border-[#1E2330] font-mono text-[11px] sm:text-xs space-y-1.5">
          {block.rows.map((row, i) => (
            <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span className="text-[#8A94A6]">{row.label[lang]}</span>
              <span className="text-cyan-300 font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
      );

    case 'table': {
      const align = block.align ?? block.head.map((_, i) => (i === 0 ? 'l' : 'r'));
      return (
        <div className="my-5 -mx-1 overflow-x-auto">
          <table className="w-full text-left text-[11px] sm:text-xs border-collapse min-w-[420px]">
            <thead>
              <tr className="border-b border-[#2E364A]">
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className={`pb-2 px-2 font-mono font-medium text-[#8A94A6] ${
                      align[i] === 'r' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h[lang]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2330]">
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`py-2 px-2 align-top leading-snug ${
                        align[ci] === 'r' ? 'text-right font-mono text-slate-300' : 'text-[#9AA4B4]'
                      }`}
                    >
                      {inline(cell[lang])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
};

interface PaperReaderProps {
  paper: Publication;
  lang: Language;
}

export const PaperReader: React.FC<PaperReaderProps> = ({ paper, lang }) => (
  <article>
    {paper.abstract.map((para, i) => (
      <p
        key={i}
        className={`text-[13px] sm:text-sm leading-[1.75] mb-4 ${
          i === 0 ? 'text-slate-300 font-normal' : 'text-[#9AA4B4] font-light'
        }`}
      >
        {inline(para[lang])}
      </p>
    ))}

    {paper.blocks.map((block, i) => (
      <BlockView key={i} block={block} lang={lang} />
    ))}
  </article>
);

/** Section headings, for the contents rail. */
export const paperSections = (paper: Publication, lang: Language) =>
  paper.blocks.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2').map((b) => ({
    id: b.id,
    label: b.text[lang],
  }));
