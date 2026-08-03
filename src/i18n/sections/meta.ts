import type { Bilingual } from '../types';

/** Head copy. The served HTML carries it statically for crawlers; this keeps it
 *  in step for a reader who flips the language without reloading. */
const en = {
  title: 'Ordo Research Lab — Rewritable LLM Memory & Long-Context Limits',
  description:
    'Making a local LLM assistant that learns new documentation by diff, not retraining. Open results: rewritable memory (Ordo-M), long-context limits (OrdoGen).',
};

export const meta: Bilingual<typeof en> = {
  en,
  ru: {
    title: 'Ordo Research Lab — перезаписываемая память модели и предел контекста',
    description:
      'Локальный ассистент, который принимает новую документацию дельтой, а не переобучением. Открытые результаты: память Ordo-M и пределы длинного контекста OrdoGen.',
  },
};
