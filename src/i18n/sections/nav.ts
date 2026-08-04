import type { Bilingual } from '../types';

const en = {
    abstract: 'Abstract',
    summary: 'Summary',
    ordoM: 'Ordo-M',
    ordoGen: 'OrdoGen',
    timeline: 'Research Log',
    limits: 'Limits',
    publications: 'Publications',
    literature: 'Papers',
    about: 'Researcher',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const nav: Bilingual<typeof en> = {
  en,
  ru: {
    abstract: 'Аннотация',
    summary: 'Кратко',
    ordoM: 'Ordo-M',
    ordoGen: 'OrdoGen',
    timeline: 'Ход работы',
    limits: 'Границы',
    publications: 'Публикации',
    literature: 'Статьи',
    about: 'Исследователь',
  },
};
