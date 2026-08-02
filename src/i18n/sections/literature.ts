import type { Bilingual } from '../types';

const en = {
    tag: 'TECHNICAL LIBRARY',
    title: 'Papers, protocols and research logs',
    subtitle:
      'Summaries of the internal documents behind the numbers on this page. Each entry states the setup, the primary result and the limits of the claim. Implementation, configurations and raw artefacts stay closed.',
    placeholder: 'Filter by title, project or topic…',
    empty: 'Nothing matches that filter.',
    setup: 'Setup',
    result: 'Primary result',
    limit: 'Limits of the claim',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const literature: Bilingual<typeof en> = {
  en,
  ru: {
    tag: 'ТЕХНИЧЕСКАЯ БИБЛИОТЕКА',
    title: 'Статьи, протоколы и журналы исследования',
    subtitle:
      'Сводки внутренних документов, стоящих за числами на этой странице. В каждой записи — постановка, основной результат и границы утверждения. Реализация, конфигурации и сырые артефакты остаются закрытыми.',
    placeholder: 'Фильтр по названию, проекту или теме…',
    empty: 'Под фильтр ничего не подходит.',
    setup: 'Постановка',
    result: 'Основной результат',
    limit: 'Границы утверждения',
  },
};
