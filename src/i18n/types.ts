export type Language = 'en' | 'ru';

export const LANGUAGES: Language[] = ['en', 'ru'];

/**
 * One value per language. Section modules declare `Bilingual<typeof en>`, so RU is
 * type-checked against EN inside each file — a missing or renamed key fails the build
 * in the file that owns it, not somewhere downstream.
 */
export type Bilingual<T> = Record<Language, T>;

/** A single string in both languages. Used inside content data (papers, datasets). */
export type Bi = Bilingual<string>;

export const bi = (en: string, ru: string): Bi => ({ en, ru });
