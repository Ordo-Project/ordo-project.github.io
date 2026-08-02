import type { Language } from './types';
import { nav } from './sections/nav';
import { common } from './sections/common';
import { hero } from './sections/hero';
import { ordoM } from './sections/ordoM';
import { ordoGen } from './sections/ordoGen';
import { timeline } from './sections/timeline';
import { limits } from './sections/limits';
import { publications } from './sections/publications';
import { literature } from './sections/literature';
import { about } from './sections/about';
import { footer } from './sections/footer';

export type { Language, Bilingual, Bi } from './types';
export { LANGUAGES, bi } from './types';

/**
 * UI copy, one module per page section under ./sections. Each module holds both
 * languages side by side and types RU against EN, so translations stay adjacent to
 * the text they translate and a new section is a new file rather than an edit to a
 * thousand-line object. Long-form content (papers) lives in ../content instead.
 */
export const translations = {
  en: {
    nav: nav.en,
    common: common.en,
    hero: hero.en,
    ordoM: ordoM.en,
    ordoGen: ordoGen.en,
    timeline: timeline.en,
    limits: limits.en,
    publications: publications.en,
    literature: literature.en,
    about: about.en,
    footer: footer.en,
  },
  ru: {
    nav: nav.ru,
    common: common.ru,
    hero: hero.ru,
    ordoM: ordoM.ru,
    ordoGen: ordoGen.ru,
    timeline: timeline.ru,
    limits: limits.ru,
    publications: publications.ru,
    literature: literature.ru,
    about: about.ru,
    footer: footer.ru,
  },
} satisfies Record<Language, unknown>;

export type Content = (typeof translations)['en'];
