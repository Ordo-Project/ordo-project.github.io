import type { Bilingual } from '../types';

const en = {
    badge: 'Closed-source lab • Research prototype • Data cut-off: 2026-08-02',
    titleStart: 'Rewritable External Memory and Functional Context for ',
    titleEnd: 'Frozen LLMs',
    leadResearcher: 'Lead researcher:',
    author: 'Russel Gavery (Gavrilov Ruslan, @8hrsk)',
    subtitle:
      'Two independent empirical tracks. Ordo-M attaches a rewritable value table to a frozen model so documentation can be updated by diff instead of retrained. OrdoGen measures why a nominal context window is not a functional one, and localizes the failure down to three attention heads in a single layer.',
    btnLiterature: 'Read the papers',
    btnOrdoM: 'Ordo-M results',
    btnOrdoGen: 'OrdoGen results',
    metrics: {
      damageVal: '0.0%',
      damageLabel: 'Collateral damage on a point edit',
      damageSub: 'vs 8.4% for an equal-capacity LoRA',
      effVal: '96.2%',
      effLabel: 'Incremental wave retention',
      effSub: 'full-retrain control: 96.9%',
      relayVal: '49/75',
      relayLabel: 'Causal head steering',
      relaySub: 'from 40/75 — 9 gains, 0 regressions, p=0.0039',
      penaltyVal: '0/15',
      penaltyLabel: '128K retrieval — still unsolved',
      penaltySub: 'plain and intervention arms both score zero',
    },
    abstractTitle: 'Executive abstract',
    abstractText:
      'Two bottlenecks block a locally hosted assistant. First, updating facts by fine-tuning is destructive: an equal-capacity LoRA damages 8.4% of neighbouring knowledge on a point edit, so a new documentation version cannot be written over an old one without re-verifying everything else. Second, a physically accepted context window is not a functional one: within the native position limit of a small model, literal retrieval drops from 70/70 at 16K to 56/70 at 32K, and at 128K both plain prompts and the best prompt-level intervention score 0/15. Ordo-M answers the first by writing knowledge into an external value table addressed from text, leaving the base weights bit-identical. OrdoGen answers the second by measuring the collapse and localizing it causally: ablating three heads in one late layer destroys 8 of 32 correct answers, and steering those same heads toward the right evidence repairs 9 of 35 failures with zero regressions. Both projects are research prototypes, and what follows includes the results that did not work.',
    statusTitle: 'Project status',
    statusItems: [
      { label: 'Ordo-M', value: 'Mechanism confirmed. The memory arm on a real domain is not measured yet.' },
      { label: 'OrdoGen', value: 'Bottleneck localized causally. No subquadratic speed-up demonstrated yet.' },
      { label: 'Publication', value: 'Source code and evaluation harnesses are closed. Methods and numbers are open.' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const hero: Bilingual<typeof en> = {
  en,
  ru: {
    badge: 'Закрытая лаборатория • Исследовательский прототип • Срез данных: 2026-08-02',
    titleStart: 'Обновляемая внешняя память и функциональный контекст для ',
    titleEnd: 'замороженных языковых моделей',
    leadResearcher: 'Ведущий исследователь:',
    author: 'Russel Gavery (Гаврилов Руслан, @8hrsk)',
    subtitle:
      'Два независимых эмпирических трека. Ordo-M приделывает к замороженной модели обновляемую таблицу значений, чтобы документацию можно было обновлять по дельте, а не переобучением. OrdoGen измеряет, почему номинальное окно контекста не равно функциональному, и доводит причину до трёх голов внимания в одном слое.',
    btnLiterature: 'Читать статьи',
    btnOrdoM: 'Результаты Ordo-M',
    btnOrdoGen: 'Результаты OrdoGen',
    metrics: {
      damageVal: '0.0%',
      damageLabel: 'Побочный ущерб при точечной правке',
      damageSub: 'против 8.4% у LoRA равной ёмкости',
      effVal: '96.2%',
      effLabel: 'Знание при дообучении волнами',
      effSub: 'контроль полного переобучения: 96.9%',
      relayVal: '49/75',
      relayLabel: 'Стиринг причинных голов внимания',
      relaySub: 'было 40/75 — 9 улучшений, 0 регрессий, p=0.0039',
      penaltyVal: '0/15',
      penaltyLabel: '128K retrieval — задача не решена',
      penaltySub: 'и обычное плечо, и вмешательство дают ноль',
    },
    abstractTitle: 'Краткая аннотация',
    abstractText:
      'Локальному ассистенту мешают два барьера. Первый: обновление фактов дообучением разрушительно — LoRA равной ёмкости при точечной правке повреждает 8.4% соседнего знания, поэтому новую версию документации нельзя записать поверх старой, не перепроверив всё остальное. Второй: физически принятое окно контекста не является рабочим — внутри штатного лимита позиций маленькой модели дословный поиск падает с 70/70 на 16K до 56/70 на 32K, а на 128K и обычный промпт, и лучшее промптовое вмешательство дают 0/15. Ordo-M отвечает на первый барьер записью знания во внешнюю таблицу значений, адресуемую из текста, оставляя веса базы побитово прежними. OrdoGen отвечает на второй: обрыв измерен и локализован причинно — зануление трёх голов одного позднего слоя уничтожает 8 из 32 верных ответов, а направление тех же голов к нужному фрагменту чинит 9 из 35 ошибок без единой регрессии. Оба проекта — исследовательские прототипы, и ниже опубликованы в том числе те результаты, которые не сработали.',
    statusTitle: 'Статус проектов',
    statusItems: [
      { label: 'Ordo-M', value: 'Механизм подтверждён. Плечо памяти на настоящем домене ещё не замерено.' },
      { label: 'OrdoGen', value: 'Узкое место локализовано причинно. Субквадратичного ускорения пока нет.' },
      { label: 'Публикация', value: 'Исходный код и стенды замеров закрыты. Методика и числа открыты.' },
    ],
  },
};
