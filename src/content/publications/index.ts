import type { Publication } from './types';
import { ordoMChapter1 } from './ordo-m-ch1';

export type { Publication, Block } from './types';

/** Newest first. Adding a report means adding a module here. */
export const publications: Publication[] = [ordoMChapter1];
