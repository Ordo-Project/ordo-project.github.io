import type { Bi } from '../../i18n/types';

/**
 * A published report is a list of blocks rather than a markdown string: every piece of
 * prose carries both languages, and tables keep their structure so they can be made
 * responsive instead of overflowing. Inline `**bold**` is supported by the renderer.
 */
export type Block =
  | { t: 'h2'; id: string; text: Bi }
  | { t: 'h3'; text: Bi }
  | { t: 'p'; text: Bi }
  | { t: 'lead'; text: Bi }
  | { t: 'quote'; text: Bi }
  | { t: 'ul'; items: Bi[] }
  | { t: 'ol'; items: Bi[] }
  | { t: 'refs'; items: string[] }
  | { t: 'readout'; rows: { label: Bi; value: string }[] }
  | {
      t: 'table';
      caption?: Bi;
      head: Bi[];
      rows: Bi[][];
      /** Column alignment; defaults to left for the first column and right for the rest. */
      align?: ('l' | 'r')[];
    };

export interface Publication {
  id: string;
  slug: string;
  chapter: number;
  project: 'Ordo-M' | 'OrdoGen';
  date: string;
  /** Reading time in minutes, stated rather than computed so it is stable. */
  minutes: number;
  status: Bi;
  title: Bi;
  subtitle: Bi;
  author: string;
  cutoff: string;
  /** Path of the source markdown inside /public, offered as a download. */
  sourceFile: string;
  abstract: Bi[];
  blocks: Block[];
}
