import type { Bilingual } from '../types';

const en = {
    tagline: 'ordo-project.com • Research preprints and technical reports',
    copyright: '© 2026 Ordo Research Project — Russel Gavery (Gavrilov Ruslan, @8hrsk).',
    host: 'Static site — no analytics, no trackers',
    cutoff: 'Data cut-off: 2026-08-04',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const footer: Bilingual<typeof en> = {
  en,
  ru: {
    tagline: 'ordo-project.com • Препринты и технические отчёты',
    copyright: '© 2026 Ordo Research Project — Russel Gavery (Гаврилов Руслан, @8hrsk).',
    host: 'Статический сайт — без аналитики и трекеров',
    cutoff: 'Срез данных: 2026-08-04',
  },
};
