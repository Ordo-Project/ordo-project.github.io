import type { Bilingual } from '../types';

const en = {
    analysis: 'Analysis',
    lower: 'lower is better',
    higher: 'higher is better',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const common: Bilingual<typeof en> = {
  en,
  ru: {
    analysis: 'Разбор',
    lower: 'меньше — лучше',
    higher: 'больше — лучше',
  },
};
