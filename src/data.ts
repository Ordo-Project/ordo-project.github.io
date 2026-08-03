import { Language } from './i18n';

type L = Record<Language, string>;
const L = (en: string, ru: string): L => ({ en, ru });

// ---------------------------------------------------------------------------
// Ordo-M — point edit: memory table vs equal-capacity adapter (CounterFact)
// ---------------------------------------------------------------------------
const editQualityRaw = [
  { metric: L('Efficacy', 'Efficacy'), ordo: 100, lora: 100 },
  { metric: L('Paraphrase', 'Парафраз'), ordo: 97.2, lora: null as number | null },
  { metric: L('Specificity', 'Специфичность'), ordo: 100, lora: 30 },
  { metric: L('50 of 500 edited', '50 из 500 правок'), ordo: 88, lora: null as number | null },
];

export const editQualityData = (lang: Language) =>
  editQualityRaw.map((r) => ({ metric: r.metric[lang], ordo: r.ordo, lora: r.lora }));

export const sideDamageData = (lang: Language) => [
  { arm: lang === 'ru' ? 'Ordo-M (таблица)' : 'Ordo-M (table)', damage: 0.0 },
  { arm: lang === 'ru' ? 'LoRA равной ёмкости' : 'Equal-capacity LoRA', damage: 8.4 },
];

// ---------------------------------------------------------------------------
// Ordo-M — incremental waves vs full retraining
// ---------------------------------------------------------------------------
const waveRaw = [
  { setup: L('Old build, 6 ep.', 'Прежняя, 6 эпох'), wave: 29.5, drift: 0.0 },
  { setup: L('Calibrated, 6 ep.', 'Калибровка, 6 эпох'), wave: 81.1, drift: 0.5 },
  { setup: L('Calibrated, 18 ep.', 'Калибровка, 18 эпох'), wave: 96.2, drift: 0.0 },
  { setup: L('Full retrain', 'Полное переобучение'), wave: 96.9, drift: 0.0 },
];

export const waveData = (lang: Language) =>
  waveRaw.map((r) => ({ setup: r.setup[lang], wave: r.wave, drift: r.drift }));

// ---------------------------------------------------------------------------
// Ordo-M — output gain: knowledge against text damage
// ---------------------------------------------------------------------------
const gainRaw = [
  { setup: L('Old build', 'Прежняя'), wave0: 89.0, late: 29.5, ppl: 470.2 },
  { setup: L('gain 100 (working point)', 'gain 100 (рабочая)'), wave0: 90.0, late: 93.8, ppl: 36.8 },
  { setup: L('gain 250', 'gain 250'), wave0: 99.5, late: 99.8, ppl: 266.0 },
];

export const gainData = (lang: Language) =>
  gainRaw.map((r) => ({ setup: r.setup[lang], wave0: r.wave0, late: r.late, ppl: r.ppl }));

// ---------------------------------------------------------------------------
// Ordo-M — the code domain, M1: every arm on the same 183 questions
// The oracle ceiling is the corrected one: chapter 12 assembled the oracle context
// from the wrong record of the address, which understated it (90.2 -> 92.3).
// ---------------------------------------------------------------------------
const domainRaw = [
  { arm: L('Base, no context', 'База без контекста'), prefer: 47.5, kind: 'base' },
  { arm: L('Memory, raw doc text', 'Память, сырой текст'), prefer: 54.1, kind: 'memory-fail' },
  { arm: L('Memory, prepared corpus', 'Память, подготовленный корпус'), prefer: 68.1, kind: 'memory' },
  { arm: L('Lexical search', 'Лексический поиск'), prefer: 85.8, kind: 'rag' },
  { arm: L('Hybrid (fusion)', 'Гибрид (fusion)'), prefer: 88.0, kind: 'rag' },
  { arm: L('Oracle context', 'Оракульный контекст'), prefer: 92.3, kind: 'ceiling' },
];

export const domainArmData = (lang: Language) =>
  domainRaw.map((r) => ({ arm: r.arm[lang], prefer: r.prefer, kind: r.kind }));

export const MEMORY_THRESHOLD = 67.8;

// ---------------------------------------------------------------------------
// Ordo-M — what the corpus is made of decides the outcome, not the carrier
// ---------------------------------------------------------------------------
const corpusFormRaw = [
  { form: L('Raw text', 'Сырой текст'), knowledge: 54.1, ppl: 2.4, coverage: null as number | null },
  { form: L('Base-written', 'Написан базой'), knowledge: 54.6, ppl: 169.8, coverage: 21.3 },
  { form: L('Prepared +dist.', 'Подгот. +дист.'), knowledge: 67.0, ppl: 52.4, coverage: 49.7 },
  { form: L('Prepared', 'Подготовленный'), knowledge: 68.1, ppl: 80.0, coverage: 49.7 },
];

export const corpusFormData = (lang: Language) =>
  corpusFormRaw.map((r) => ({ form: r.form[lang], knowledge: r.knowledge, ppl: r.ppl, coverage: r.coverage }));

// ---------------------------------------------------------------------------
// Ordo-M — coverage predicts knowledge: knowledge = 49.14 + 0.539 * coverage
// ---------------------------------------------------------------------------
export const COVERAGE_LAW = { intercept: 49.14, slope: 0.539, r2: 0.996, need: 34.6 };

/** Four measured points across two corpora, plus the fitted line for the same x. */
export const coverageLawData = [
  { coverage: 16.4, knowledge: 58.5, facts: '1' },
  { coverage: 21.9, knowledge: 60.9, facts: 'own' },
  { coverage: 26.8, knowledge: 63.9, facts: '2' },
  { coverage: 38.3, knowledge: 69.4, facts: '4' },
  { coverage: 49.7, knowledge: 65.0, facts: 'all' },
].map((p) => ({ ...p, fit: +(COVERAGE_LAW.intercept + COVERAGE_LAW.slope * p.coverage).toFixed(1) }));

// ---------------------------------------------------------------------------
// Ordo-M — output gain: knowledge is flat above the knee, text damage is not
// ---------------------------------------------------------------------------
export const gainCurveData = [
  { gain: 25, knowledge: 60.5, ppl: 1.2, prose: 0.2 },
  { gain: 50, knowledge: 67.9, ppl: 22.6, prose: 3.1 },
  { gain: 60, knowledge: 67.8, ppl: 29.8, prose: 3.7 },
  { gain: 75, knowledge: 70.5, ppl: 52.9, prose: null as number | null },
  { gain: 100, knowledge: 68.9, ppl: 81.8, prose: 6.4 },
];

export const GAIN_KNEE = 50;

// ---------------------------------------------------------------------------
// Ordo-M — prose: a page is addressable, a section is not
// ---------------------------------------------------------------------------
const proseAddressRaw = [
  { set: L('Prose domain, 378 questions', 'Прозаический домен, 378 вопросов'), page: 95.0, section: 9.0 },
  { set: L('Prose domain, 189 questions', 'Прозаический домен, 189 вопросов'), page: 96.9, section: 9.3 },
];

export const proseAddressData = (lang: Language) =>
  proseAddressRaw.map((r) => ({ set: r.set[lang], page: r.page, section: r.section }));

/** The prose bar is set in a different bucket: the base already knows Kubernetes. */
const proseArmRaw = [
  { arm: L('Base, no context', 'База без контекста'), prefer: 64.8, kind: 'base' },
  { arm: L('Lexical search', 'Лексический поиск'), prefer: 92.9, kind: 'rag' },
  { arm: L('Hybrid (fusion)', 'Гибрид (fusion)'), prefer: 95.0, kind: 'rag' },
  { arm: L('Oracle context', 'Оракульный контекст'), prefer: 96.6, kind: 'ceiling' },
];

export const proseArmData = (lang: Language) =>
  proseArmRaw.map((r) => ({ arm: r.arm[lang], prefer: r.prefer, kind: r.kind }));

export const PROSE_THRESHOLD = 79.9;

// ---------------------------------------------------------------------------
// Ordo-M — retriever comparison, recall@1 on the same questions
// ---------------------------------------------------------------------------
const retrieverRaw = [
  { name: L('Ordo-M addressing (current rule)', 'Адресация Ordo-M (текущее правило)'), recall: 60.1, own: true },
  { name: L('Lexical search', 'Лексический поиск'), recall: 68.3, own: false },
  { name: L('Local embeddings', 'Локальные эмбеддинги'), recall: 68.3, own: false },
  { name: L('API embeddings', 'API-эмбеддинги'), recall: 69.9, own: false },
  { name: L('Hybrid (fusion)', 'Гибрид (fusion)'), recall: 72.7, own: false },
  { name: L('Ordo-M, longest-mention rule', 'Ordo-M, правило «самое длинное»'), recall: 74.3, own: true },
  { name: L('Ordo-M, collisions split by content', 'Ordo-M, коллизии разведены содержимым'), recall: 82.0, own: true },
];

export const retrieverData = (lang: Language) =>
  retrieverRaw.map((r) => ({ name: r.name[lang], recall: r.recall, own: r.own }));

// ---------------------------------------------------------------------------
// OrdoGen — functional context curve by task
// ---------------------------------------------------------------------------
export const contextCurveData = [
  { length: '1K', exact: 100, latent: 44, update: 80 },
  { length: '4K', exact: 100, latent: 56, update: 80 },
  { length: '8K', exact: 100, latent: 36, update: 84 },
  { length: '16K', exact: 100, latent: 32, update: 76 },
  { length: '32K', exact: 80, latent: 32, update: 60 },
];

export const curveSeries = (lang: Language) => ({
  exact: lang === 'ru' ? 'Дословный поиск' : 'Literal retrieval',
  latent: lang === 'ru' ? 'Латентный поиск' : 'Latent retrieval',
  update: lang === 'ru' ? 'Последнее обновление' : 'Latest update',
});

// ---------------------------------------------------------------------------
// OrdoGen — paired cliff test: same 70 logical cases at 16K and 32K
// ---------------------------------------------------------------------------
export const cliffData = [
  { pos: '0.50', k16: 10, k32: 10 },
  { pos: '0.60', k16: 10, k32: 9 },
  { pos: '0.70', k16: 10, k32: 6 },
  { pos: '0.75', k16: 10, k32: 3 },
  { pos: '0.80', k16: 10, k32: 8 },
  { pos: '0.90', k16: 10, k32: 10 },
  { pos: '0.95', k16: 10, k32: 10 },
];

// ---------------------------------------------------------------------------
// OrdoGen — 32K position × task heatmap (percent correct)
// ---------------------------------------------------------------------------
export const heatmapPositions = ['0.05', '0.25', '0.50', '0.75', '0.95'];
export const heatmapRows = (lang: Language) => [
  { task: lang === 'ru' ? 'Дословный поиск' : 'Literal retrieval', values: [100, 100, 80, 20, 100] },
  { task: lang === 'ru' ? 'Латентный поиск' : 'Latent retrieval', values: [20, 40, 20, 20, 60] },
  { task: lang === 'ru' ? 'Последнее обновление' : 'Latest update', values: [80, 20, 80, 40, 80] },
];

// ---------------------------------------------------------------------------
// OrdoGen — causal chain: ablation, oracle steering, learned selector
// ---------------------------------------------------------------------------
const causalRaw = [
  { arm: L('Ablation — causal heads', 'Абляция — причинные головы'), base: 32, cond: 24, of: 45, p: '0.0078', kind: 'down' },
  { arm: L('Ablation — control heads', 'Абляция — контрольные головы'), base: 32, cond: 32, of: 45, p: '1.0', kind: 'flat' },
  { arm: L('Oracle steering — causal', 'Оракульный стиринг — причинные'), base: 40, cond: 49, of: 75, p: '0.0039', kind: 'up' },
  { arm: L('Oracle steering — control', 'Оракульный стиринг — контрольные'), base: 40, cond: 40, of: 75, p: '1.0', kind: 'flat' },
  { arm: L('Learned selector — causal', 'Обучаемый селектор — причинные'), base: 40, cond: 45, of: 75, p: '0.0625', kind: 'up' },
];

export const causalData = (lang: Language) =>
  causalRaw.map((r) => ({
    arm: r.arm[lang],
    basePct: +((r.base / r.of) * 100).toFixed(1),
    condPct: +((r.cond / r.of) * 100).toFixed(1),
    label: `${r.base}/${r.of} → ${r.cond}/${r.of}`,
    p: r.p,
    kind: r.kind,
  }));

export const causalSeries = (lang: Language) => ({
  base: lang === 'ru' ? 'Базовое плечо' : 'Baseline arm',
  cond: lang === 'ru' ? 'После вмешательства' : 'After intervention',
});

// ---------------------------------------------------------------------------
// OrdoGen — evidence attention mass (log scale) and paired scores
// ---------------------------------------------------------------------------
// Short axis labels on purpose: the full arm names collide on a phone.
const attentionRaw = [
  { arm: L('64K plain', '64K баз.'), mass: 0.00898, hit: 65.8, score: 3 },
  { arm: L('64K interv.', '64K вмеш.'), mass: 0.01493, hit: 61.5, score: 10 },
  { arm: L('128K plain', '128K баз.'), mass: 0.000368, hit: 22.3, score: 0 },
  { arm: L('128K interv.', '128K вмеш.'), mass: 0.000927, hit: 13.2, score: 0 },
];

export const attentionData = (lang: Language) =>
  attentionRaw.map((r) => ({ arm: r.arm[lang], mass: r.mass, hit: r.hit, score: r.score }));

// ---------------------------------------------------------------------------
// OrdoGen — learned selector routing quality, frozen transfer to 32K
// ---------------------------------------------------------------------------
const selectorRaw = [
  { policy: L('Whole-block mean', 'Среднее по блоку'), r1: 0.0, r4: 67.5, scope: '4K/8K' },
  { policy: L('Untrained landmarks', 'Ориентиры без обучения'), r1: 5.0, r4: 100, scope: '4K/8K' },
  { policy: L('Learned selector (held-out)', 'Обучаемый селектор (отложенный)'), r1: 95.0, r4: 97.5, scope: '4K/8K' },
  { policy: L('Learned selector, frozen at 32K', 'Селектор, заморожен на 32K'), r1: 72.0, r4: 90.7, scope: '32K' },
  { policy: L('Causal-only policy at 32K', 'Только причинные признаки, 32K'), r1: 44.0, r4: 100, scope: '32K' },
  { policy: L('Position-only policy at 32K', 'Только позиция, 32K'), r1: 0.0, r4: 0.0, scope: '32K' },
];

export const selectorData = (lang: Language) =>
  selectorRaw.map((r) => ({ policy: r.policy[lang], r1: r.r1, r4: r.r4, scope: r.scope }));

// ---------------------------------------------------------------------------
// Papers / technical library
// ---------------------------------------------------------------------------
export interface Paper {
  id: string;
  project: 'Ordo-M' | 'OrdoGen';
  date: string;
  title: L;
  summary: L;
  setup: L;
  result: L;
  limit: L;
  tags: string[];
}

export const papers: Paper[] = [
  {
    id: 'ordo-m-design',
    project: 'Ordo-M',
    date: '2026-08-01',
    tags: ['architecture', 'hook', 'архитектура', 'память'],
    title: L(
      'Parameter-isolated rewritable memory for a frozen model',
      'Обновляемая память с параметрической изоляцией на замороженной модели'
    ),
    summary: L(
      'The construction itself: a product-key value table injected by a forward hook at 0.66 depth, addressed by a hash of the canonical entity name.',
      'Само устройство: product-key таблица значений, врезанная forward-хуком на 0.66 глубины, с адресом по хэшу канонического имени сущности.'
    ),
    setup: L(
      'Qwen3-8B, frozen base, hook at 0.66 depth, output projection initialized to zero so the augmented network is bit-identical before any edit, and switchable off at runtime.',
      'Qwen3-8B, замороженная база, хук на 0.66 глубины, выходная проекция инициализируется нулём, поэтому до первой правки сеть побитово равна исходной, и хук отключается на лету.'
    ),
    result: L(
      'Edits operate purely on value vectors. With an external address the query projection and half-keys are never invoked — 9.4M of 145.8M memory parameters remain unused reserve.',
      'Правка идёт исключительно по векторам значений. При внешнем адресе проекция запроса и полуключи не вызываются — 9.4M из 145.8M параметров памяти остаются неиспользуемым резервом.'
    ),
    limit: L(
      'One injection depth, one model size, one base family. The reserve product-key mechanism is untested in this configuration.',
      'Одна глубина врезки, один размер модели, одно семейство. Резервный механизм product-key в этой конфигурации не проверялся.'
    ),
  },
  {
    id: 'lora-vs-table',
    project: 'Ordo-M',
    date: '2026-07-31',
    tags: ['lora', 'side damage', 'адаптер', 'ущерб'],
    title: L(
      'Why memory is not just another adapter',
      'Почему память — не «ещё один адаптер»'
    ),
    summary: L(
      'The measurement that closed the adapter track: a point edit damages 8.4% of neighbouring knowledge in an adapter and 0.0% in a table.',
      'Измерение, закрывшее трек адаптеров: точечная правка повреждает 8.4% соседнего знания у адаптера и 0.0% у таблицы.'
    ),
    setup: L(
      'CounterFact and multi-hop questions, equal-capacity adapter as the control arm, identical data and identical measurement code in both arms.',
      'CounterFact и многошаговые вопросы, адаптер равной ёмкости как контрольное плечо, одни и те же данные и один и тот же код замера в обоих плечах.'
    ),
    result: L(
      'Efficacy ties at 100%. Specificity separates the arms: the table holds while the adapter falls to about 30%. Editing 50 of 500 facts lands 88% of new values. On questions that name the entity, multi-hop application gains 29.6 points.',
      'По efficacy ничья — 100%. Плечи расходятся на специфичности: таблица держится, адаптер падает примерно до 30%. Правка 50 фактов из 500 закрепляет 88% новых значений. На вопросах, называющих сущность, многошаговое применение прибавляет 29.6 пункта.'
    ),
    limit: L(
      'The asymmetry is structural — a dense operator against a sparse lookup — but it is measured on one model and one benchmark family.',
      'Асимметрия структурна — плотный оператор против разреженного поиска, — но измерена на одной модели и одном семействе наборов.'
    ),
  },
  {
    id: 'address-limits',
    project: 'Ordo-M',
    date: '2026-08-01',
    tags: ['addressing', 'oracle', 'адресация', 'оракул'],
    title: L(
      'The address is the whole problem',
      'Вся проблема — в адресе'
    ),
    summary: L(
      'Ten hypotheses about open-vocabulary addressing, three measurements, and one closed direction.',
      'Десять гипотез об адресации по открытому словарю, три замера и одно закрытое направление.'
    ),
    setup: L(
      'Oracle arm supplies the address externally; a separate screen probes whether the entity identity survives in the residual stream at the depth where the memory is read.',
      'Оракульное плечо подаёт адрес снаружи; отдельный скрининг проверяет, сохраняется ли личность сущности в остаточном потоке на глубине, где читается память.'
    ),
    result: L(
      'With an external address, questions that never name the entity gain 37.0 points — so the ceiling is real and the limitation is the address, not the memory. Addressing from hidden state is closed: at the reading position the entity is effectively absent from the residual stream, while it is strongly present at the name itself.',
      'При внешнем адресе вопросы, не называющие сущность, прибавляют 37.0 пункта — значит потолок реален, а упирается всё в адрес, а не в память. Адресация по скрытому состоянию закрыта: в позиции чтения сущности в остаточном потоке фактически нет, тогда как на самом имени она выражена сильно.'
    ),
    limit: L(
      'Both measurements come from single-entity prompts. On real questions with two or three entities, mention selection becomes a separate unsolved problem.',
      'Оба замера сняты на промптах с одной сущностью. На настоящих вопросах с двумя-тремя сущностями выбор упоминания становится отдельной нерешённой задачей.'
    ),
  },
  {
    id: 'resources',
    project: 'Ordo-M',
    date: '2026-08-01',
    tags: ['hardware', 'quantization', 'железо', 'квантование'],
    title: L('What it costs in hardware', 'Сколько это стоит в железе'),
    summary: L(
      'Five resource axes measured end to end: corpus scaling, VRAM, generation speed, table placement and precision.',
      'Пять ресурсных осей, посчитанных целиком: масштабирование по корпусу, VRAM, скорость генерации, размещение таблицы и разрядность.'
    ),
    setup: L(
      'Qwen3-8B on a 24GB datacenter card; quantization and micro-benchmarks reproducible on a laptop in seconds.',
      'Qwen3-8B на серверной карте 24 ГБ; части по квантованию и микрозамерам воспроизводятся на ноутбуке за секунды.'
    ),
    result: L(
      'Training is linear in corpus size (exponent 1.05) and quality improves with volume. Generation is free — 15.1 tokens/s before and after. The table can live in host RAM or on disk at 0.98× speed. int8 holds an edit series; int4 destroys it. Quality pays for vector width, not slot count.',
      'Обучение линейно по объёму (показатель 1.05), и качество с объёмом растёт. Генерация бесплатна — 15.1 токенов/с до и после. Таблицу можно вынести в системную RAM или на диск за 0.98× скорости. int8 держит серию правок, int4 её убивает. Качество платит за ширину вектора, а не за число слотов.'
    ),
    limit: L(
      'All figures are for one 8B model. Behaviour of the same table on much larger models, and on mixture-of-experts bases, is unmeasured.',
      'Все величины сняты на одной модели 8B. Поведение той же таблицы на моделях сильно крупнее и на MoE-базах не измерено.'
    ),
  },
  {
    id: 'retrainability',
    project: 'Ordo-M',
    date: '2026-08-01',
    tags: ['incremental', 'waves', 'дообучение', 'волны'],
    title: L(
      'Why later waves would not learn, and how it was fixed',
      'Почему поздние волны не выучивались и как это починено'
    ),
    summary: L(
      'A collapse that looked like the price of locality turned out to be one line of initialization.',
      'Провал, выглядевший как цена локальности, оказался одной строкой инициализации.'
    ),
    setup: L(
      'Eight arms on a consumer 24GB card: incremental waves against a full-retrain control, with early-record drift measured after every wave.',
      'Восемь плеч на потребительской карте 24 ГБ: дообучение волнами против контроля полного переобучения, с замером дрейфа ранних записей после каждой волны.'
    ),
    result: L(
      'Wave knowledge rises from 29.5% to 96.2% against 96.9% for a full retrain, with 0.0 pp drift. Two independent fixes work: calibrating the shared output projection before freezing it, and a frozen random orthogonal output with matched scale. Whitening the output after training destroys knowledge down to 18.3% — decoder and values are fitted to each other and do not transfer apart.',
      'Знание волн поднимается с 29.5% до 96.2% против 96.9% у полного переобучения при дрейфе 0.0 п.п. Работают два независимых исправления: калибровка общей выходной проекции перед заморозкой и замороженный случайный ортогональный выход с согласованным масштабом. Отбеливание выхода после обучения сносит знание до 18.3% — декодер и значения подогнаны друг под друга и порознь не переносятся.'
    ),
    limit: L(
      'Output gain is a free knob that trades knowledge against damage to the surrounding text, and it must be chosen per task rather than defaulted.',
      'Громкость выхода — свободная ручка, торгующая знание против ущерба окружающему тексту, и её надо выбирать под задачу, а не оставлять по умолчанию.'
    ),
  },
  {
    id: 'first-domain',
    project: 'Ordo-M',
    date: '2026-08-02',
    tags: ['rag', 'domain', 'домен', 'поиск'],
    title: L(
      'First real domain: what beating search actually costs',
      'Первый настоящий домен: сколько стоит победа над поиском'
    ),
    summary: L(
      'A real corpus, an audited question set, five retrieval arms — and two unwelcome results.',
      'Настоящий корпус, проверенный набор вопросов, пять поисковых плеч — и два неприятных результата.'
    ),
    setup: L(
      '825 records of a public library across two versions (41% of the corpus differs), 183 questions generated by an external model and filtered by an adversarial typed verifier, six arms scored by the same code, no training anywhere.',
      '825 записей публичной библиотеки в двух версиях (41% корпуса отличается), 183 вопроса, сгенерированных внешней моделью и отфильтрованных враждебным типизированным проверяющим, шесть плеч, посчитанных одним кодом, обучения нет нигде.'
    ),
    result: L(
      'The base model scores 47.5% where a coin flip is 50% — it does not know the domain at all. Every retriever takes 38–40 points, and the class ceiling with the correct record supplied is 90.2%. Closing half the gap sets the bar for memory at 67.8%. Symbolic addressing, scored as a retriever, loses to lexical search (60.1% vs 68.3%), and a free rule change is worth +15.1 points.',
      'База даёт 47.5% при монетке 50% — домен ей неизвестен вообще. Любой извлекатель забирает 38–40 пунктов, а потолок класса при поданной нужной записи — 90.2%. Закрыть половину разрыва — значит выставить планку памяти на 67.8%. Символьная адресация, посчитанная как извлекатель, проигрывает лексическому поиску (60.1% против 68.3%), а бесплатная смена правила стоит +15.1 пункта.'
    ),
    limit: L(
      'The memory arm itself is not measured. The domain is 96% code symbols and says nothing about prose. Question defect rate is known only as a range, 0.8% to 25.6%, and the indirect-question bucket is too small to conclude anything.',
      'Само плечо памяти не замерено. Домен на 96% состоит из символов кода и ничего не говорит про прозу. Доля брака в вопросах известна только вилкой 0.8%–25.6%, а корзина косвенных вопросов слишком мала для выводов.'
    ),
  },
  {
    id: 'memory-vs-rag',
    project: 'Ordo-M',
    date: '2026-08-02',
    tags: ['m1', 'rag', 'домен', 'провал'],
    title: L('Memory against context: the phase is not passed', 'Память против контекста: фаза не пройдена'),
    summary: L(
      'The memory arm on a real domain, and a negative result with a precise cause.',
      'Плечо памяти на настоящем домене и отрицательный результат с точно названной причиной.'
    ),
    setup: L(
      'The same 825 records and the same 183 questions as the retrieval arms, memory trained on the raw documentation text, everything else held fixed.',
      'Те же 825 записей и те же 183 вопроса, что и у поисковых плеч, память обучена на сыром тексте документации, всё остальное зафиксировано.'
    ),
    result: L(
      '54.1% against a 67.8% threshold and 88.0% for hybrid retrieval — the memory takes 5.5 of the 40.4 points a retrieved record takes. Undertraining, addressing and a 10.1% ingestion defect were each measured and cleared. On held-out tails the memory does not predict even the continuation of its own record (83.3% against 84.5%).',
      '54.1% при пороге 67.8% и 88.0% у гибридного поиска — память забирает 5.5 пункта из 40.4, которые забирает найденная запись. Недоучивание, адресация и дефект закачки на 10.1% измерены и отброшены. На удержанных хвостах память не предсказывает даже продолжение собственной записи (83.3% против 84.5%).'
    ),
    limit: L(
      'The failure is of the pairing "raw text → memory", not of the mechanism. Everything proved about editing and locality still holds.',
      'Провалилась связка «сырой текст → память», а не механизм. Всё доказанное про правку и локальность остаётся в силе.'
    ),
  },
  {
    id: 'prepared-corpus',
    project: 'Ordo-M',
    date: '2026-08-02',
    tags: ['corpus', 'm1', 'корпус', 'порог'],
    title: L('The prepared corpus takes the bar', 'Подготовленный корпус берёт планку'),
    summary: L(
      'Put in the form that is asked for, and the same records clear the threshold.',
      'Положить ту форму, которую спрашивают, — и те же записи берут порог.'
    ),
    setup: L(
      'Each record is turned into atomic facts in the shape the questions use; a second phrasing of every question is held out of training and used to check generalization.',
      'Каждая запись превращается в атомарные факты в той форме, которой пользуются вопросы; вторая формулировка каждого вопроса удерживается вне обучения и служит проверкой обобщения.'
    ),
    result: L(
      '68.1% ± 1.38 across three seeds against a 67.8% threshold: +15.3 points over the raw text and +20.2 over the base, p ≤ 0.0001. A deliberately foreign address now returns exactly the base level (p = 0.56), so the content of the record decides. Generalization to an unseen phrasing is 87.8% against 57.8%, and up to six facts per address show no crowding.',
      '68.1% ± 1.38 на трёх зёрнах при пороге 67.8%: +15.3 пункта к сырому тексту и +20.2 к базе, p ≤ 0.0001. Заведомо чужой адрес теперь возвращает ровно уровень базы (p = 0.56), значит решает содержимое записи. Обобщение на невиданную формулировку 87.8% против 57.8%, и до шести фактов на адрес вытеснения нет.'
    ),
    limit: L(
      'Reached by 0.3 points at a spread of 1.38 — not a significant excess. The corpus was written by an external model, and the cost in text damage is the largest open number.',
      'Взят с запасом 0.3 пункта при разбросе 1.38 — значимого превышения нет. Корпус написан внешней моделью, а цена в порче текста — крупнейшая открытая величина.'
    ),
  },
  {
    id: 'own-teacher',
    project: 'Ordo-M',
    date: '2026-08-03',
    tags: ['local model', 'distillation', 'локальная модель', 'дистилляция'],
    title: L('Its own teacher: what a local model can and cannot do', 'Свой учитель: что локальная модель может и чего не может'),
    summary: L(
      'The frozen base writes its own corpus, and two surprises come out of it.',
      'Замороженная база пишет собственный корпус, и из этого выходят две неожиданности.'
    ),
    setup: L(
      'The same preparation prompt that was given to an external model is given to the frozen base itself — the one model a client is guaranteed to have. Separately, context distillation against a teacher that has the record in context.',
      'Тот же промпт подготовки, что подавался внешней модели, подаётся самой замороженной базе — единственной модели, которая у клиента точно есть. Отдельно — контекстная дистилляция от учителя, у которого запись лежит в контексте.'
    ),
    result: L(
      'The self-written corpus is indistinguishable from raw text: 54.6% against 53.6%, p = 0.88. The form is flawless (2 malformed JSON out of 825) and the facts are absorbed (80.0% on a second phrasing against 49.5%), but coverage of what gets asked is half — 21.3% against 49.7%. Distillation adds no knowledge (67.0% ± 3.72 against 68.7% ± 0.32) and instead cuts text damage by 43% with six times less spread.',
      'Самописный корпус неотличим от сырого текста: 54.6% против 53.6%, p = 0.88. Форма безупречна (2 несобравшихся JSON из 825), факты впитаны (80.0% на второй формулировке против 49.5%), но покрытие того, о чём спрашивают, вдвое ниже — 21.3% против 49.7%. Дистилляция знания не добавляет (67.0% ± 3.72 против 68.7% ± 0.32) и вместо этого срезает порчу текста на 43% при вшестеро меньшем разбросе.'
    ),
    limit: L(
      'A local model can write facts and cannot choose which ones. That single gap is what stands between the measured result and the product promise.',
      'Локальная модель умеет писать факты и не умеет выбирать, о чём. Ровно этот разрыв и стоит между измеренным результатом и продуктовым обещанием.'
    ),
  },
  {
    id: 'coverage-law',
    project: 'Ordo-M',
    date: '2026-08-03',
    tags: ['coverage', 'law', 'покрытие', 'закон'],
    title: L('Coverage predicts knowledge, and selection cannot fix a corpus', 'Покрытие предсказывает знание, а отбор корпус не чинит'),
    summary: L(
      'The misses of a local generator taken apart one by one, with no rented GPU at all.',
      'Промахи локального генератора разобраны поштучно, без единой минуты аренды.'
    ),
    setup: L(
      'Every coverage miss classified by hand against the question set; four measured points across two corpora fitted against the share of questions whose fact appears anywhere in the corpus.',
      'Каждый промах покрытия размечен вручную против набора вопросов; четыре измеренные точки на двух корпусах подогнаны против доли вопросов, чей факт вообще присутствует в корпусе.'
    ),
    result: L(
      'Knowledge = 49.14 + 0.539 × coverage, R² = 0.996, with the intercept exactly at the base level. A corpus therefore needs 34.6% coverage to clear the bar, and that is a laptop computation. The sort "what this thing does" is 52.9% of the local model\'s facts against 2.2% of the questions. Reordering is worth +3.8 points on the weak corpus and exactly zero on the strong one.',
      'Знание = 49.14 + 0.539 × покрытие, R² = 0.996, свободный член ровно на уровне базы. Значит корпусу нужно покрытие 34.6%, чтобы взять планку, и это вычисление на ноутбуке. Сорт «что эта штука делает» занимает 52.9% фактов локальной модели против 2.2% вопросов. Переупорядочивание стоит +3.8 пункта на слабом корпусе и ровно ноль на сильном.'
    ),
    limit: L(
      'Four points, two corpora. The law is a working tool rather than a proven relation, and selection is closed because its ceiling is the coverage of the source (21.9%).',
      'Четыре точки, два корпуса. Закон — рабочий инструмент, а не доказанное соотношение, а отбор закрыт, потому что его потолок равен покрытию исходника (21.9%).'
    ),
  },
  {
    id: 'prose-domain',
    project: 'Ordo-M',
    date: '2026-08-03',
    tags: ['prose', 'addressing', 'проза', 'адресация'],
    title: L('Prose is addressable by page, not by section', 'Проза адресуется страницей, а не разделом'),
    summary: L(
      'Eleven prose corpora screened against the acceptance metric, and the address redefined.',
      'Одиннадцать прозаических корпусов проверены приёмочной метрикой, и адрес переопределён.'
    ),
    setup: L(
      'The acceptance metric is the share of addresses whose record names itself in its own text. Two question sets of 378 and 189 items built by the same pipeline as the code domain.',
      'Приёмочная метрика — доля адресов, чья запись называет себя внутри собственного текста. Два набора вопросов на 378 и 189 пунктов, построенные тем же трактом, что и кодовый домен.'
    ),
    result: L(
      'By sections not one corpus clears the 60% bar — the best is 59.4% and a real corporate handbook gives 18.1%, with identical named failures everywhere: "Overview", "What\'s next", "Introduction". By page, eight of eleven pass, and the page address lands in the right record for 95.0% and 96.9% of direct questions against 9.0% and 9.3% for sections. A section leads into a foreign record for 85.7% of questions rather than staying silent.',
      'По разделам порог 60% не берёт ни один корпус — лучшее 59.4%, а настоящий корпоративный хендбук даёт 18.1%, причём провалы всюду одинаковы и названы поимённо: «Overview», «What\'s next», «Introduction». По страницам проходят восемь из одиннадцати, и адрес страницы попадает в нужную запись у 95.0% и 96.9% прямых вопросов против 9.0% и 9.3% по разделам. Раздел при этом не молчит, а ведёт в чужую запись у 85.7% вопросов.'
    ),
    limit: L(
      'The price is 12.5 records per address instead of 1.9 and an indirect bucket growing from 6.0% to 20.6%. On the chosen prose domain the base already knows the material, so the bar sits higher (79.9%) and measures addition rather than acquisition.',
      'Цена — 12.5 записей на адрес вместо 1.9 и рост косвенной корзины с 6.0% до 20.6%. На выбранном прозаическом домене база материал уже знает, поэтому планка стоит выше (79.9%) и меряет добавление, а не приобретение.'
    ),
  },
  {
    id: 'levers-and-gain',
    project: 'Ordo-M',
    date: '2026-08-03',
    tags: ['gain', 'distillation', 'громкость', 'оракул'],
    title: L('Two levers turn out to be one, and the oracle had been understated', 'Рычагов оказалось не два, а один, и оракул был занижен'),
    summary: L(
      'The text cost falls fourfold, gain is exhausted as a lever, and a ceiling that looked tautological was wrong.',
      'Цена текста падает вчетверо, громкость исчерпана как рычаг, а потолок, казавшийся тавтологией, оказался неверным.'
    ),
    setup: L(
      'Distillation and reduced gain compared at matched text damage; then a gain sweep on the real domain with three seeds per point.',
      'Дистилляция и пониженная громкость сравниваются при равной порче текста; затем перебор громкости на настоящем домене по три зерна на точку.'
    ),
    result: L(
      'At equal damage both give the same knowledge, 68.3%, with slopes matching to the third decimal — they do not add, and combined they are worse than either alone. The working point now holds 67.9% ± 1.67 at +22.5% perplexity against +81.8% before. Above the knee knowledge does not depend on gain at all while damage moves fourfold. Separately: the oracle context was assembled from the wrong record of its address, understating the retrieval ceiling — 90.2% → 92.3% on code, 80.2% → 96.6% on prose.',
      'При равной порче оба дают одно и то же знание, 68.3%, с наклонами, совпадающими до третьего знака, — они не складываются, а вместе хуже каждого порознь. Рабочая точка теперь держит 67.9% ± 1.67 при +22.5% перплексии против +81.8% прежде. Выше колена знание от громкости не зависит вовсе, тогда как порча меняется вчетверо. Отдельно: оракульный контекст собирался не из той записи своего адреса, из-за чего потолок поиска был занижен — 90.2% → 92.3% на коде, 80.2% → 96.6% на прозе.'
    ),
    limit: L(
      'The middle of an earlier trade-off curve did not reproduce, so the shape that suggested "knowledge saturates, damage does not" was a measurement error. Only its bottom held.',
      'Середина более ранней кривой размена не воспроизвелась, поэтому форма, наводившая на «знание насыщается, порча нет», была ошибкой измерения. Устоял только её низ.'
    ),
  },
  {
    id: 'capacity-not-corpus',
    project: 'Ordo-M',
    date: '2026-08-03',
    tags: ['capacity', 'routing', 'ёмкость', 'маршрутизация'],
    title: L('Capacity, not corpus: sub-addressing closed by an exact balance', 'Ёмкость, а не корпус: подадресование закрыто точным балансом'),
    summary: L(
      'The corpus that would clear the bar already exists; what blocks it is the capacity of one address.',
      'Корпус, который взял бы планку, уже существует; мешает ему ёмкость одного адреса.'
    ),
    setup: L(
      'Six symbolic schemes that split an address by the sort of question, measured entirely on a laptop, with the scheme chosen on a tuning half and read on a reporting half.',
      'Шесть символьных схем, дробящих адрес по сорту вопроса, замерены целиком на ноутбуке: схема выбиралась по настроечной половине, итог читается по отчётной.'
    ),
    result: L(
      'The best scheme gives 40.7% coverage against 37.4% for the baseline, inside the pre-registered band of refusal and not distinguishable from it (p = 0.51). Splitting makes +10.3 points of coverage available and the instability of the reading rule takes precisely as much back. Stability under paraphrase predicts it exactly: only the one scheme above 80% failed to lose. The remaining axis is the width of the slot, and it has never been varied on a real domain.',
      'Лучшая схема даёт покрытие 40.7% против 37.4% у опоры — внутри заранее зарегистрированной полосы отказа и неотличимо от неё (p = 0.51). Дробление делает доступными +10.3 пункта покрытия, и нестабильность читающей разметки забирает ровно столько же. Устойчивость при пересказе предсказывает это точно: не проиграла лишь та единственная схема, что взяла порог 80%. Остающаяся ось — ширина слота, и на настоящем домене её не поворачивали ни разу.'
    ),
    limit: L(
      'A symbolic router over the content of a question is impossible where a symbolic router over the name works: a name survives paraphrase, the sort of question does not. The axis is closed by nature rather than by arithmetic.',
      'Символьный маршрутизатор по содержанию вопроса невозможен там, где работает символьный маршрутизатор по имени: имя при пересказе выживает, сорт вопроса — нет. Ось закрыта природой, а не арифметикой.'
    ),
  },
  {
    id: 'context-curve',
    project: 'OrdoGen',
    date: '2026-07-30',
    tags: ['context rot', 'curve', 'деградация', 'кривая'],
    title: L(
      'Functional context curve inside the native window',
      'Кривая функционального контекста внутри штатного окна'
    ),
    summary: L(
      'Context rot reproduced without exceeding the model\'s own position limit, and localized to a band rather than a distance.',
      'Деградация контекста воспроизведена без выхода за собственный лимит позиций модели и локализована в полосу, а не в расстояние.'
    ),
    setup: L(
      'One 0.6B open-weight model at a pinned revision, FP16, deterministic decoding, 12GB consumer card. 375 cases: 5 seeds × 5 lengths × 5 positions × 3 tasks, then a targeted paired test on 70 fresh logical cases at 16K and 32K.',
      'Одна модель 0.6B с открытыми весами на зафиксированной ревизии, FP16, детерминированный декод, потребительская карта 12 ГБ. 375 примеров: 5 сидов × 5 длин × 5 позиций × 3 задачи, затем прицельный парный тест на 70 новых логических примерах на 16K и 32K.'
    ),
    result: L(
      'Literal retrieval drops 20 points at 16K→32K; the paired test gives 70/70 against 56/70, p=0.0001. The hole sits at 0.70–0.80 with a minimum at 0.75, while positions 0.05 and 0.95 stay perfect. Of 14 failures, 11 return a value from a distractor record — the failure is selection, not reading.',
      'Дословный поиск теряет 20 пунктов на 16K→32K; парный тест даёт 70/70 против 56/70, p=0.0001. Яма стоит на 0.70–0.80 с минимумом на 0.75, тогда как позиции 0.05 и 0.95 остаются идеальными. Из 14 ошибок 11 возвращают значение из отвлекающей записи — это отказ выбора, а не чтения.'
    ),
    limit: L(
      'Latent retrieval is broken at every length including 1K, so its curve is not rot but a missing capability. Aggregation was excluded outright for a zero short-context baseline.',
      'Латентный поиск сломан на всех длинах, включая 1K, поэтому его кривая — не деградация, а отсутствующая способность. Агрегация исключена сразу из-за нулевого короткого базиса.'
    ),
  },
  {
    id: 'evidence-first',
    project: 'OrdoGen',
    date: '2026-07-31',
    tags: ['prompting', 'cascade', 'промпт', 'каскад'],
    title: L(
      'Evidence-first prompting and the consistency gate',
      'Промпт «сначала факт» и шлюз согласованности'
    ),
    summary: L(
      'The prompt that repaired every known failure and created thirty new ones — and the ensemble that rescued it.',
      'Промпт, починивший все известные ошибки и создавший тридцать новых, — и ансамбль, который его спас.'
    ),
    setup: L(
      'Same 140 logical pairs at 16K and 32K, seven evidence positions, shared-prefix dual decode so both branches see a byte-identical corpus and differ only in the final instruction.',
      'Те же 140 логических пар на 16K и 32K, семь позиций факта, двойной декод с общим префиксом, чтобы обе ветви видели побайтово одинаковый корпус и различались только финальной инструкцией.'
    ),
    result: L(
      'Alone the prompt is a wash: it moves the failure band instead of removing it. Gated by agreement between the two branches, the pair reaches 139/140 overall and 69/70 at 32K. A compact evidence format reached 138/140 while sharply cutting decode length.',
      'Сам по себе промпт даёт ноль: он переносит полосу отказа, а не устраняет её. Со шлюзом по согласию двух ветвей пара выходит на 139/140 в целом и 69/70 на 32K. Компактный формат факта дал 138/140, резко сократив длину декодирования.'
    ),
    limit: L(
      'The verifier is format-based, and on compositional tasks it accepted five wrong structured outputs. Consistency of shape is not proof of a completed reasoning chain.',
      'Проверяющий работает по формату, и на композиционных задачах он принял пять неверных структурированных ответов. Согласованность формы не доказывает завершённость цепочки рассуждения.'
    ),
  },
  {
    id: 'router-fail',
    project: 'OrdoGen',
    date: '2026-07-31',
    tags: ['sparse', 'systems', 'разреженность', 'система'],
    title: L(
      'The sparse router that failed its systems gate',
      'Разреженный роутер, не прошедший системный шлюз'
    ),
    summary: L(
      'Fewer scored pairs is not less wall-clock time. A negative result published in full.',
      'Меньше сравниваемых пар — не меньше времени. Отрицательный результат, опубликованный целиком.'
    ),
    setup: L(
      'A synthetic selector study first, then a hierarchical index with beam traversal and exact rerank of leaf candidates, evaluated at 128K, 1M and 2M against dense attention.',
      'Сначала синтетическое исследование селектора, затем иерархический индекс с лучевым обходом и точным переранжированием кандидатов, замеренный на 128K, 1M и 2M против плотного внимания.'
    ),
    result: L(
      'On synthetic data the multi-landmark index reached 99.9% recall while visiting under 1% of blocks. On the real systems gate it failed: at 2M the only configuration faster than dense attention had 21.9% recall, and no configuration reached 99% at 1M or 2M.',
      'На синтетике многоориентирный индекс дал 99.9% полноты, посещая меньше 1% блоков. На настоящем системном шлюзе он провалился: на 2M единственная конфигурация быстрее плотного внимания имела полноту 21.9%, и ни одна не дошла до 99% на 1M или 2M.'
    ),
    limit: L(
      'This does not refute sparse attention. It refutes the specific idea that generic hierarchical routing built from standard tensor operations beats a dense matrix multiply without kernel co-design.',
      'Это не опровергает разреженное внимание. Это опровергает конкретную идею, что универсальная иерархическая маршрутизация на стандартных тензорных операциях обыгрывает плотное умножение матриц без совместной разработки ядра.'
    ),
  },
  {
    id: 'relay-128k',
    project: 'OrdoGen',
    date: '2026-08-01',
    tags: ['relay', '128k', 'реле', 'внимание'],
    title: L(
      'Prompt-level relay works at 64K and dies at 128K',
      'Промптовое реле работает на 64K и умирает на 128K'
    ),
    summary: L(
      'Three independent samples confirm the gain; the 128K packet shows exactly where and why it stops.',
      'Три независимые выборки подтверждают выигрыш; пакет на 128K показывает, где именно и почему он кончается.'
    ),
    setup: L(
      'Rented 48GB datacenter card, same pinned 0.6B model, paired plain/relay prompts with controlled evidence position and character budget, plus a linear-cost probe storing per-head attention of the final query only.',
      'Арендованная серверная карта 48 ГБ, та же зафиксированная модель 0.6B, парные промпты с контролируемой позицией факта и бюджетом символов, плюс зонд линейной стоимости, сохраняющий поголовное внимание только последнего запроса.'
    ),
    result: L(
      'Retrieval rises 10/30 → 17/30 at 32K and 6/30 → 17/30 at 64K, replicated as 3/15 → 10/15 at 64K with p=0.0156 and 4.2% latency. At 128K every arm scores 0/15. Attention mass to the evidence at 128K is an order of magnitude below the 64K level, and the failure mode shifts from hallucination to explicit abstention.',
      'Поиск растёт 10/30 → 17/30 на 32K и 6/30 → 17/30 на 64K, с репликацией 3/15 → 10/15 на 64K при p=0.0156 и 4.2% задержки. На 128K все плечи дают 0/15. Внимание к факту на 128K на порядок ниже уровня 64K, а тип отказа смещается с выдумывания на явное воздержание.'
    ),
    limit: L(
      'Compositional tasks got worse, not better: repeating an obligation as text competes with the evidence for attention. The 128K attention slice is a single matched pair and its ratio is exploratory.',
      'Композиционные задачи стали хуже, а не лучше: повторение обязательства текстом конкурирует с фактом за внимание. Срез внимания на 128K — одна согласованная пара, и его отношение разведочное.'
    ),
  },
  {
    id: 'head-bottleneck',
    project: 'OrdoGen',
    date: '2026-08-01',
    tags: ['causal', 'ablation', 'причинность', 'абляция'],
    title: L(
      'The retrieval bottleneck is three heads in one late layer',
      'Узкое место поиска — три головы одного позднего слоя'
    ),
    summary: L(
      'Per-head causal ablation with a matched control, on held-out cases that took no part in selecting the heads.',
      'Поголовая причинная абляция с согласованным контролем, на отложенных примерах, не участвовавших в выборе голов.'
    ),
    setup: L(
      'A query-side gate zeroes selected heads only on the last stretch of the prompt and on each decode step, so the encoding of the corpus itself is untouched. 45 held-out cases across three evidence positions.',
      'Гейт со стороны запроса зануляет выбранные головы только на последнем отрезке промпта и на каждом шаге декодирования, поэтому кодирование самого корпуса не трогается. 45 отложенных примеров на трёх позициях факта.'
    ),
    result: L(
      'Ablating the selected heads costs 8 of 32 correct answers (32/45 → 24/45, p=0.0078); matched control heads in the same layer change nothing (32/45, p=1.0). The loss concentrates on distant evidence and vanishes near the end of the context.',
      'Абляция выбранных голов стоит 8 из 32 верных ответов (32/45 → 24/45, p=0.0078); согласованные контрольные головы того же слоя не меняют ничего (32/45, p=1.0). Потери сосредоточены на удалённых фактах и исчезают у конца контекста.'
    ),
    limit: L(
      'Necessity is shown, sufficiency is not. Amplifying the same heads by 1.5× produced neither gains nor regressions — they need routed content, not more amplitude. Zero-ablation is also not equivalent to removing heads during training.',
      'Показана необходимость, но не достаточность. Усиление тех же голов в 1.5 раза не дало ни улучшений, ни регрессий — им нужен маршрутизированный контент, а не амплитуда. Зануление также не эквивалентно удалению голов при обучении.'
    ),
  },
  {
    id: 'gold-steering',
    project: 'OrdoGen',
    date: '2026-08-01',
    tags: ['steering', 'causal', 'стиринг', 'починка'],
    title: L(
      'Steering the causal heads repairs the failures',
      'Стиринг причинных голов чинит ошибки'
    ),
    summary: L(
      'An oracle experiment designed to test the mechanism before training anything: the model is given an address, never an answer.',
      'Оракульный эксперимент, поставленный, чтобы проверить механизм до обучения чего-либо: модели дают адрес, но никогда — ответ.'
    ),
    setup: L(
      'Bias applied to the selected heads only, on the final prompt token and subsequent decode steps, without ever building a quadratic attention map. Heads, control heads and bias magnitude were frozen after a small pilot; the primary claim uses only post-freeze cases.',
      'Сдвиг применяется только к выбранным головам, на финальном токене промпта и последующих шагах декодирования, без построения квадратичной карты внимания. Головы, контрольные головы и величина сдвига заморожены после небольшого пилота; основное утверждение опирается только на примеры после заморозки.'
    ),
    result: L(
      '40/75 → 49/75 with 9 gains and 0 regressions, p=0.0039. The matched control heads receive the identical address and identical bias and produce 40/75, changing not a single output. Gains concentrate at the distant positions where the ablation did its damage.',
      '40/75 → 49/75 при 9 улучшениях и 0 регрессиях, p=0.0039. Согласованные контрольные головы получают тот же адрес и тот же сдвиг и дают 40/75, не изменив ни одного ответа. Улучшения сосредоточены на удалённых позициях, где абляция и наносила ущерб.'
    ),
    limit: L(
      'This is an oracle: the evidence span is known to the harness. It measures the mechanism, not a deployable retrieval system, and the overhead measured here is not a final kernel benchmark.',
      'Это оракул: эталонный фрагмент известен стенду. Он измеряет механизм, а не пригодную к развёртыванию систему поиска, и замеренные здесь накладные расходы — не финальный бенчмарк ядра.'
    ),
  },
  {
    id: 'learned-selector',
    project: 'OrdoGen',
    date: '2026-08-02',
    tags: ['selector', 'routing', 'селектор', 'маршрутизация'],
    title: L(
      'A learned selector replaces the oracle and transfers to 32K',
      'Обучаемый селектор заменяет оракула и переносится на 32K'
    ),
    summary: L(
      'Short-context training, long-context evaluation, and a causal counterexample against optimizing recall.',
      'Обучение на коротком контексте, замер на длинном и причинный контрпример против оптимизации полноты.'
    ),
    setup: L(
      'A linear ranker over deployable features from the causal heads, trained on 160 short-context cases split by whole seeds, then frozen and evaluated on the same pre-registered 32K set used for the oracle result. No 32K data and no known repair cases were used during fitting.',
      'Линейный ранкер над пригодными к развёртыванию признаками причинных голов, обученный на 160 примерах короткого контекста с разбиением по целым сидам, затем замороженный и проверенный на том же заранее зафиксированном наборе 32K, что и оракульный результат. Ни данные 32K, ни известные случаи починки при обучении не использовались.'
    ),
    result: L(
      'Frozen transfer to 32K gives Recall@1 72% and Recall@4 90.7%. End to end it keeps 5 of the 9 oracle repairs with zero regressions (40/75 → 45/75). Routed into matched control heads the same blocks and the same bias repair 0 of 9 — the effect is specific to the previously localized path.',
      'Замороженный перенос на 32K даёт Recall@1 72% и Recall@4 90.7%. Сквозным замером он удерживает 5 из 9 оракульных починок без регрессий (40/75 → 45/75). Направленные в согласованные контрольные головы, те же блоки и тот же сдвиг чинят 0 из 9 — эффект специфичен ранее локализованному пути.'
    ),
    limit: L(
      'Five discordant pairs give a two-sided p=0.0625; this is deliberately not claimed as significant. A causal-only policy finds the right block in 75 of 75 cases at budget 4 and still repairs fewer cases — so block recall is the wrong objective. And the prototype still runs a second dense prefill, so it is not yet a speed-up.',
      'Пять расходящихся пар дают двусторонний p=0.0625; значимость здесь намеренно не заявляется. Политика только на причинных признаках находит нужный блок в 75 случаях из 75 при бюджете 4 и всё равно чинит меньше — значит полнота выбора блоков неверная цель. И прототип всё ещё делает второй плотный прогон, поэтому ускорением пока не является.'
    ),
  },
];
