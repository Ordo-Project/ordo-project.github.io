import type { Bilingual } from '../types';

const en = {
    badge: 'Closed-source lab • Research prototype • Data cut-off: 2026-08-03',
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
      effVal: '68.1%',
      effLabel: 'M1 bar on a real domain',
      effSub: 'threshold 67.8% — reached, not exceeded',
      relayVal: '49/75',
      relayLabel: 'Causal head steering',
      relaySub: 'from 40/75 — 9 gains, 0 regressions, p=0.0039',
      penaltyVal: '54.1%',
      penaltyLabel: 'Raw documentation text — carries nothing',
      penaltySub: 'a foreign address scores the same as the right one',
    },
    abstractTitle: 'Executive abstract',
    abstractText:
      'Two bottlenecks block a locally hosted assistant. First, updating facts by fine-tuning is destructive: an equal-capacity LoRA damages 8.4% of neighbouring knowledge on a point edit, so a new documentation version cannot be written over an old one without re-verifying everything else. Second, a physically accepted context window is not a functional one: within the native position limit of a small model, literal retrieval drops from 70/70 at 16K to 56/70 at 32K, and at 128K both plain prompts and the best prompt-level intervention score 0/15. Ordo-M answers the first by writing knowledge into an external value table addressed from text, leaving the base weights bit-identical. OrdoGen answers the second by measuring the collapse and localizing it causally to three attention heads in one late layer. Both are research prototypes, and the honest state of Ordo-M is this: on a real library the memory has now cleared the bar it set for itself against retrieval — 68.1% against a 67.8% threshold — but only after the corpus was rewritten into the form the questions ask about. Fed the raw documentation text it scores 54.1%, and a deliberately wrong address scores the same as the right one. What the memory holds is decided by what you put in it, not by the carrier.',
    statusTitle: 'Project status',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 cleared on a code domain by 0.3 points. Prose bar set at 79.9% and not yet attempted.' },
      { label: 'OrdoGen', value: 'Bottleneck localized causally. No subquadratic speed-up demonstrated yet.' },
      { label: 'Publication', value: 'Source code and evaluation harnesses are closed. Methods and numbers are open.' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const hero: Bilingual<typeof en> = {
  en,
  ru: {
    badge: 'Закрытая лаборатория • Исследовательский прототип • Срез данных: 2026-08-03',
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
      effVal: '68.1%',
      effLabel: 'Планка M1 на настоящем домене',
      effSub: 'порог 67.8% — достигнут, не превышен',
      relayVal: '49/75',
      relayLabel: 'Стиринг причинных голов внимания',
      relaySub: 'было 40/75 — 9 улучшений, 0 регрессий, p=0.0039',
      penaltyVal: '54.1%',
      penaltyLabel: 'Сырой текст документации не переносится',
      penaltySub: 'чужой адрес даёт ровно столько же, сколько верный',
    },
    abstractTitle: 'Краткая аннотация',
    abstractText:
      'Локальному ассистенту мешают два барьера. Первый: обновление фактов дообучением разрушительно — LoRA равной ёмкости при точечной правке повреждает 8.4% соседнего знания, поэтому новую версию документации нельзя записать поверх старой, не перепроверив всё остальное. Второй: физически принятое окно контекста не является рабочим — внутри штатного лимита позиций маленькой модели дословный поиск падает с 70/70 на 16K до 56/70 на 32K, а на 128K и обычный промпт, и лучшее промптовое вмешательство дают 0/15. Ordo-M отвечает на первый барьер записью знания во внешнюю таблицу значений, адресуемую из текста, оставляя веса базы побитово прежними. OrdoGen отвечает на второй: обрыв измерен и локализован причинно до трёх голов внимания в одном позднем слое. Оба — исследовательские прототипы, и честное состояние Ordo-M таково: на настоящей библиотеке память взяла планку, которую сама себе выставила против поиска, — 68.1% при пороге 67.8%, — но только после того, как корпус переписали в ту форму, о которой спрашивают вопросы. На сыром тексте документации она даёт 54.1%, а заведомо неверный адрес даёт ровно столько же, сколько верный. Что память держит, решает то, что в неё положили, а не носитель.',
    statusTitle: 'Статус проектов',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 на кодовом домене взята с запасом 0.3 пункта. Планка для прозы 79.9% и ещё не бралась.' },
      { label: 'OrdoGen', value: 'Узкое место локализовано причинно. Субквадратичного ускорения пока нет.' },
      { label: 'Публикация', value: 'Исходный код и стенды замеров закрыты. Методика и числа открыты.' },
    ],
  },
};
