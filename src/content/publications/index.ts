import type { Publication } from './types';
import { ordoMChapter1 } from './ordo-m-ch1';
import { ordoMChapter2 } from './ordo-m-ch2';
import { ordoMChapter3 } from './ordo-m-ch3';

export type { Publication, Block } from './types';

/** In chapter order: the reports are a series and later ones cite earlier ones. */
export const publications: Publication[] = [ordoMChapter1, ordoMChapter2, ordoMChapter3];
