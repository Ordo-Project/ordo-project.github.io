import type { Bilingual } from '../types';

const en = {
  tag: 'PUBLISHED RESEARCH MATERIALS',
  title: 'Full-text reports, released as they are written',
  subtitle:
    'This is where finished write-ups are published in full, rather than summarised. Each report states every measured number, the controls behind it and the boundary of the claim. Implementation stays closed; the reasoning does not.',
  openLabel: 'Read in full',
  closeLabel: 'Close',
  downloadLabel: 'Download Markdown',
  contentsLabel: 'Contents',
  metaAuthor: 'Author',
  metaCutoff: 'Measurement cutoff',
  metaStatus: 'Status',
  metaLength: 'Length',
  minutes: 'min read',
  originalNote:
    'Written in English. The Russian rendering below is a translation of the same text; where the two disagree, the English is authoritative.',
  translatedNote:
    'Оригинал написан на английском. Ниже — перевод того же текста; при расхождении версий английская считается основной.',
  emptyHint: 'Pick a report on the left to read it here.',
  badgeChapter: 'Chapter',
  preprintTag: 'PREPRINT',
  preprintTitle: 'Ordo-M: sparse rewritable memory for a frozen model',
  preprintText:
    'The Ordo-M track as a single paper, hosted externally so it can be cited, discussed and disputed in the open. The chapters below remain the working record behind it.',
  preprintCta: 'Read on alphaXiv',
};

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const publications: Bilingual<typeof en> = {
  en,
  ru: {
    tag: 'ПУБЛИКУЕМЫЕ ИССЛЕДОВАТЕЛЬСКИЕ МАТЕРИАЛЫ',
    title: 'Полные тексты отчётов по мере их написания',
    subtitle:
      'Здесь законченные работы публикуются целиком, а не в пересказе. В каждом отчёте — все измеренные числа, контроли за ними и граница утверждения. Реализация остаётся закрытой, рассуждение — нет.',
    openLabel: 'Читать целиком',
    closeLabel: 'Закрыть',
    downloadLabel: 'Скачать Markdown',
    contentsLabel: 'Содержание',
    metaAuthor: 'Автор',
    metaCutoff: 'Срез измерений',
    metaStatus: 'Статус',
    metaLength: 'Объём',
    minutes: 'мин чтения',
    originalNote:
      'Написано на английском. Ниже — перевод того же текста; при расхождении версий английская считается основной.',
    translatedNote:
      'Оригинал написан на английском. Ниже — перевод того же текста; при расхождении версий английская считается основной.',
    emptyHint: 'Выберите отчёт слева, чтобы прочитать его здесь.',
    badgeChapter: 'Глава',
    preprintTag: 'ПРЕПРИНТ',
    preprintTitle: 'Ordo-M: разреженная перезаписываемая память для замороженной модели',
    preprintText:
      'Трек Ordo-M одной статьёй, размещённой снаружи, чтобы её можно было цитировать, обсуждать и оспаривать открыто. Главы ниже остаются рабочей летописью за ней.',
    preprintCta: 'Читать на alphaXiv',
  },
};
