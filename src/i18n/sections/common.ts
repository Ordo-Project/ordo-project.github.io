import type { Bilingual } from '../types';

const en = {
    analysis: 'Analysis',
    lower: 'lower is better',
    higher: 'higher is better',
    /** Shared chart series names, so the same arm reads the same in every figure. */
    baseArm: 'Base',
    memoryArm: 'Memory',
    ragArm: 'Hybrid retrieval',
    thresholdArm: 'Phase bar',
    predicted: 'Predicted before the run',
    measured: 'Measured',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const common: Bilingual<typeof en> = {
  en,
  ru: {
    analysis: 'Разбор',
    lower: 'меньше — лучше',
    higher: 'больше — лучше',
    baseArm: 'База',
    memoryArm: 'Память',
    ragArm: 'Гибридный поиск',
    thresholdArm: 'Планка фазы',
    predicted: 'Прогноз до прогона',
    measured: 'Измерено',
  },
};
