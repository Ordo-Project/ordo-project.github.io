import type { Bilingual } from '../types';

const en = {
    badge: 'Closed-source lab • Research prototype • Data cut-off: 2026-08-04',
    titleStart: 'Rewritable External Memory and Functional Context for ',
    titleEnd: 'Frozen LLMs',
    leadResearcher: 'Lead researcher:',
    author: 'Russel Gavery (Gavrilov Ruslan, @8hrsk)',
    subtitle:
      'Two independent empirical tracks. Ordo-M attaches a rewritable value table to a frozen model so documentation can be updated by diff instead of retrained. OrdoGen measures why a nominal context window is not a functional one, and localizes the failure down to three attention heads in a single layer.',
    plainLead:
      'In one sentence: a language model’s knowledge is frozen at training time, and we are making it rewritable — so a new documentation version can be written into the model’s memory instead of triggering a retraining run.',
    btnSummary: 'What this means in practice',
    btnLiterature: 'Read the papers',
    btnOrdoM: 'Ordo-M results',
    btnOrdoGen: 'OrdoGen results',
    metrics: {
      damageVal: '0.0%',
      damageLabel: 'Collateral damage on a point edit',
      damageSub: 'vs 8.4% for an equal-capacity LoRA',
      effVal: '1 of 2',
      effLabel: 'Domains where the M1 bar is cleared',
      effSub: '68.1% against 67.8% on the first, 64.7% against 71.2% on the second',
      relayVal: '35%',
      relayLabel: 'Answers that flip when the context is reordered',
      relaySub: 'same tokens, evidence on the same index — 5% at a quarter of the window',
      penaltyVal: '+15–19 pp',
      penaltyLabel: 'What the memory adds over the base',
      penaltySub: 'constant across two domains; the bar moves with how well the domain searches',
    },
    abstractTitle: 'Technical abstract',
    abstractText:
      'Two bottlenecks block a locally hosted assistant. First, updating facts by fine-tuning is destructive: an equal-capacity LoRA damages 8.4% of neighbouring knowledge on a point edit, so a new documentation version cannot be written over an old one without re-verifying everything else. Second, a physically accepted context window is not a functional one: within the native position limit of a small model, literal retrieval drops from 70/70 at 16K to 56/70 at 32K, and at 128K both plain prompts and the best prompt-level intervention score 0/15. Ordo-M answers the first by writing knowledge into an external value table addressed from text, leaving the base weights bit-identical. OrdoGen answers the second by measuring the collapse and localizing it causally to three attention heads in one late layer. Both are research prototypes, and the honest state is this. Ordo-M has now been measured on two independent domains. What the memory adds over the base is remarkably steady — 18.7 and 15.0 points — but the bar is set as half the distance to retrieval, so a domain that searches well raises it out of reach: the first domain was cleared at 68.1% against 67.8%, the second missed at 64.7% against 71.2%. The empirical law that predicted knowledge from corpus coverage transfers in shape and not in slope, which turns the threshold into an arithmetic question about a domain rather than an experimental one. In OrdoGen the correction is sharper: on most long-context cases every candidate route returns the same answer, so only about an eighth of any test set can be moved at all, and unconditional interventions — reordering, steering — destroy more than they repair. The value of routing sits in a narrow set of failures, and finding that set cheaply is now the object of the work.',
    statusTitle: 'Project status',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 cleared on the first domain by 0.3 points, missed on the second by 6.5. Prose bar set at 79.9% and not yet attempted.' },
      { label: 'OrdoGen', value: 'Bottleneck localized causally, but only an eighth of cases can be moved by routing at all. No subquadratic speed-up demonstrated.' },
      { label: 'Publication', value: 'Source code and evaluation harnesses are closed. Methods and numbers are open.' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const hero: Bilingual<typeof en> = {
  en,
  ru: {
    badge: 'Закрытая лаборатория • Исследовательский прототип • Срез данных: 2026-08-04',
    titleStart: 'Обновляемая внешняя память и функциональный контекст для ',
    titleEnd: 'замороженных языковых моделей',
    leadResearcher: 'Ведущий исследователь:',
    author: 'Russel Gavery (Гаврилов Руслан, @8hrsk)',
    subtitle:
      'Два независимых эмпирических трека. Ordo-M приделывает к замороженной модели обновляемую таблицу значений, чтобы документацию можно было обновлять по дельте, а не переобучением. OrdoGen измеряет, почему номинальное окно контекста не равно функциональному, и доводит причину до трёх голов внимания в одном слое.',
    plainLead:
      'Одной фразой: знание языковой модели заморожено на момент обучения, а мы делаем его перезаписываемым — чтобы новую версию документации можно было записать в память модели, а не запускать ради неё переобучение.',
    btnSummary: 'Что это даёт на практике',
    btnLiterature: 'Читать статьи',
    btnOrdoM: 'Результаты Ordo-M',
    btnOrdoGen: 'Результаты OrdoGen',
    metrics: {
      damageVal: '0.0%',
      damageLabel: 'Побочный ущерб при точечной правке',
      damageSub: 'против 8.4% у LoRA равной ёмкости',
      effVal: '1 из 2',
      effLabel: 'Домены, где планка M1 взята',
      effSub: '68.1% против 67.8% на первом, 64.7% против 71.2% на втором',
      relayVal: '35%',
      relayLabel: 'Ответов переворачивается от перестановки контекста',
      relaySub: 'те же токены, факт на том же индексе — 5% на четверти окна',
      penaltyVal: '+15–19 п.п.',
      penaltyLabel: 'Сколько память добавляет к базе',
      penaltySub: 'постоянно на двух доменах; планку двигает то, как домен ищется',
    },
    abstractTitle: 'Техническая аннотация',
    abstractText:
      'Локальному ассистенту мешают два барьера. Первый: обновление фактов дообучением разрушительно — LoRA равной ёмкости при точечной правке повреждает 8.4% соседнего знания, поэтому новую версию документации нельзя записать поверх старой, не перепроверив всё остальное. Второй: физически принятое окно контекста не является рабочим — внутри штатного лимита позиций маленькой модели дословный поиск падает с 70/70 на 16K до 56/70 на 32K, а на 128K и обычный промпт, и лучшее промптовое вмешательство дают 0/15. Ordo-M отвечает на первый барьер записью знания во внешнюю таблицу значений, адресуемую из текста, оставляя веса базы побитово прежними. OrdoGen отвечает на второй: обрыв измерен и локализован причинно до трёх голов внимания в одном позднем слое. Оба — исследовательские прототипы, и честное состояние таково. Ordo-M замерена теперь на двух независимых доменах. Прибавка памяти над базой держится удивительно ровно — 18.7 и 15.0 пункта, — но планка ставится как половина расстояния до поиска, поэтому домен, который хорошо ищется, поднимает её туда, где памяти не достать: первый домен взят на 68.1% при пороге 67.8%, второй недобрал — 64.7% при пороге 71.2%. Эмпирический закон, предсказывавший знание по покрытию корпуса, переносится формой, но не наклоном, и это превращает вопрос о пороге из экспериментального в арифметический — про конкретный домен. В OrdoGen поправка резче: на большинстве длинных примеров любой маршрут-кандидат даёт один и тот же ответ, то есть сдвинуть можно лишь около восьмой части набора, а безусловные вмешательства — перестановка, стиринг — разрушают больше, чем чинят. Ценность маршрутизации сосредоточена в узком множестве отказов, и дешёвый способ найти это множество и есть теперь предмет работы.',
    statusTitle: 'Статус проектов',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 на первом домене взята с запасом 0.3 пункта, на втором недобор 6.5. Планка для прозы 79.9% и ещё не бралась.' },
      { label: 'OrdoGen', value: 'Узкое место локализовано причинно, но сдвинуть маршрутизацией можно лишь восьмую часть примеров. Субквадратичного ускорения нет.' },
      { label: 'Публикация', value: 'Исходный код и стенды замеров закрыты. Методика и числа открыты.' },
    ],
  },
};
