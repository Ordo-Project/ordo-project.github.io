import type { Bilingual } from '../types';

const en = {
    paperTag: 'TRACK 02 • FUNCTIONAL CONTEXT AND THE ATTENTION BOTTLENECK',
    title: 'OrdoGen: a nominal window is not a functional one',
    description:
      'Vendors advertise nominal windows of a million tokens and more. OrdoGen measures what is actually retrievable from them. Every experiment uses one small open-weight model (Qwen3-0.6B) at a pinned revision, FP16, deterministic decoding, on a 12GB consumer card, plus two rented sessions on a 48GB datacenter card for the 64K and 128K work. The model is small on purpose: the mechanism has to be observable per head, and every claim has to be paired and pre-registered.',
    cards: [
      {
        title: '1. The cliff is inside the native window',
        text: 'Literal retrieval is perfect at 1K–16K and drops to 80% at 32K. On a paired test over the same 70 logical cases: 70/70 at 16K against 56/70 at 32K, p=0.0001. The failure is not monotone in distance — it is a band around 0.70–0.80 of the context with a minimum at 0.75. Evidence placed at the very start sits further away and is retrieved perfectly.',
      },
      {
        title: '2. The bottleneck is three heads in one layer',
        text: 'Per-head causal ablation on held-out cases isolates three heads of one late layer. Zeroing them costs 8 of 32 correct answers (32/45 → 24/45, p=0.0078); matched control heads in the same layer change nothing at all (32/45, p=1.0). The loss concentrates on distant evidence and disappears near the end of the context.',
      },
      {
        title: '3. The right address repairs the failure',
        text: 'Giving those same three heads a small bias toward the correct evidence — with the answer never shown to the model — repairs 9 of 35 frozen failures with zero regressions (40/75 → 49/75, p=0.0039). Matched control heads receive the identical address and identical bias and repair nothing. The address must land in a path the model can convert into an answer.',
      },
    ],
    fig1Title: 'Functional context curve by task',
    fig1Sub: '375 cases — 5 seeds × 5 lengths × 5 positions, one model',
    fig1Badge: 'Rot reproduced inside the native window',
    fig1Analysis:
      'Three tasks behave differently, and that is the point: a single "context length" score hides it. Literal retrieval is intact until 32K. Tracking the latest of several updates degrades gently. Latent retrieval — where the record must be identified by description rather than by key — is broken at every length including 1K, so its decline is not context rot at all but a missing capability. Any rot curve has to be normalized against short-context capability per task, or it measures the wrong thing.',
    fig2Title: 'Where in the context it breaks',
    fig2Sub: 'Paired test, same 70 logical cases at 16K and 32K',
    fig2Badge: '70/70 → 56/70, p=0.0001',
    fig2Analysis:
      'The common claim that quality falls once the window is a quarter full is not supported. Early and very late positions stay perfect at both lengths; the hole sits at 0.70–0.80 with a minimum of 3/10 at 0.75. Of the 14 failures, 11 return a number from a distractor record rather than the requested one — the failure mode is selection and routing, not reading. That also means simply raising the positional-encoding base is unlikely to be enough, since the failure is not monotone in relative distance.',
    fig3Title: 'Causal chain: necessity, then partial sufficiency',
    fig3Sub: 'Ablation, oracle steering and a learned selector on frozen pre-registered sets',
    fig3Badge: 'Control arms move nothing',
    fig3Analysis:
      'Read left to right, this is the whole argument. Removing the three heads destroys answers. Handing them the right address restores answers. Doing either to matched control heads in the same layer does nothing in either direction. Then the oracle is replaced by a small learned selector that never sees the answer or the gold span: it keeps 5 of the 9 repairs with no regressions. That last step is deliberately reported as not two-sided significant — five discordant pairs give p=0.0625, and the informative statement is the 55.6% retention of oracle repairs, not a significance claim.',
    fig4Title: 'Evidence attention collapses before the answer does',
    fig4Sub: 'Per-head attention of the final query; no quadratic map is built',
    fig4Badge: 'Mechanistic signal of routing collapse',
    fig4Analysis:
      'At 64K the prompt-level intervention raises attention to the evidence by 1.66× and lifts retrieval from 3/15 to 10/15 at 4.2% latency cost — replicated on three independent samples. At 128K the same intervention still raises relative mass by 2.5×, but the absolute mass is an order of magnitude below the 64K level, the evidence block stops being hit, and both arms score 0/15. The failure mode changes too: at 128K the model stops hallucinating and starts explicitly answering that the value is absent. The intervention changed the policy to abstention without restoring access. The 128K slice is a single matched pair, so its exact ratio is exploratory rather than a population estimate.',
    fig5Title: 'Learned routing transfers from short context to long',
    fig5Sub: 'Selector trained only on 4K/8K, evaluated frozen at 32K',
    fig5Badge: 'Recall@1 72%, Recall@4 90.7%',
    fig5Analysis:
      'The selector is a linear ranker over deployable features — no quadratic attention map, no long-context fitting, and no exposure to 32K data or to the known repair cases while fitting. It transfers. But the ablations carry the more useful lesson: a policy using only causal-head features finds the right block in 75 of 75 cases at budget 4, and still repairs fewer cases than the full policy. Two routes can both contain the evidence and differ in what else they drag in. Optimizing block recall alone is therefore the wrong objective — and that is a causal counterexample, not a hunch.',
    tableTitle: 'What was ruled out',
    colHyp: 'Hypothesis',
    colResult: 'Result',
    colVerdict: 'Verdict',
    ruled: [
      { hyp: 'Evidence-first prompting fixes the cliff', result: 'Repaired all 14 original failures and created 30 new ones, moving the failure band instead of removing it', verdict: 'Rejected as a standalone fix' },
      { hyp: 'A hierarchical sparse router beats dense attention', result: 'Cut scored pairs 20× at 2M tokens, but the only configuration that beat dense wall-clock had 21.9% recall, and none reached 99% at 1M/2M', verdict: 'Systems gate failed' },
      { hyp: 'Prompt-level relays generalize beyond literal retrieval', result: 'Multi-hop and aggregation stayed at zero; on an already-working task the markers competed with the evidence for attention and made it worse', verdict: 'Does not transfer' },
      { hyp: 'A format-consistency verifier can gate a cascade', result: '140/140 on literal retrieval, but it accepted five wrong structured outputs on compositional tasks — truncated intermediate steps and stale values', verdict: 'Unsound; must be task-aware' },
      { hyp: 'Amplifying the causal heads is enough', result: 'Scaling the same heads by 1.5× produced neither gains nor regressions — amplitude without a routed address does nothing', verdict: 'Necessary but not sufficient' },
      { hyp: 'The current prototype is already a speed-up', result: 'Intervention overhead is about 2.5%, but the selector still runs a second dense prefill; measured end to end it is slower, not faster', verdict: 'Not yet a systems win' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const ordoGen: Bilingual<typeof en> = {
  en,
  ru: {
    paperTag: 'ТРЕК 02 • ФУНКЦИОНАЛЬНЫЙ КОНТЕКСТ И УЗКОЕ МЕСТО ВНИМАНИЯ',
    title: 'OrdoGen: номинальное окно не равно функциональному',
    description:
      'Вендоры заявляют номинальные окна в миллион токенов и больше. OrdoGen измеряет, что оттуда реально достаётся. Каждый эксперимент идёт на одной маленькой модели с открытыми весами (Qwen3-0.6B) на зафиксированной ревизии, FP16, детерминированный декод, потребительская карта 12 ГБ, плюс две арендованные сессии на серверной карте 48 ГБ для работы на 64K и 128K. Модель маленькая намеренно: механизм должен быть наблюдаем по головам, а каждое утверждение — парным и заранее зафиксированным.',
    cards: [
      {
        title: '1. Обрыв лежит внутри штатного окна',
        text: 'Дословный поиск идеален на 1K–16K и падает до 80% на 32K. Парный тест на одних и тех же 70 логических примерах: 70/70 на 16K против 56/70 на 32K, p=0.0001. Провал не монотонен по расстоянию — это полоса около 0.70–0.80 контекста с минимумом на 0.75. Факт, помещённый в самое начало, лежит дальше и достаётся идеально.',
      },
      {
        title: '2. Узкое место — три головы одного слоя',
        text: 'Поголовая причинная абляция на отложенных примерах выделяет три головы одного позднего слоя. Их зануление стоит 8 из 32 верных ответов (32/45 → 24/45, p=0.0078); согласованные контрольные головы того же слоя не меняют ничего (32/45, p=1.0). Потери сосредоточены на удалённых фактах и исчезают у конца контекста.',
      },
      {
        title: '3. Правильный адрес чинит провал',
        text: 'Небольшой сдвиг тех же трёх голов в сторону нужного фрагмента — при том что ответ модели не показывают — чинит 9 из 35 замороженных ошибок без единой регрессии (40/75 → 49/75, p=0.0039). Контрольные головы получают тот же адрес и тот же сдвиг и не чинят ничего. Адрес обязан попасть в путь, который модель умеет превратить в ответ.',
      },
    ],
    fig1Title: 'Кривая функционального контекста по задачам',
    fig1Sub: '375 примеров — 5 сидов × 5 длин × 5 позиций, одна модель',
    fig1Badge: 'Деградация воспроизведена внутри штатного окна',
    fig1Analysis:
      'Три задачи ведут себя по-разному, и в этом суть: единая оценка «длины контекста» это прячет. Дословный поиск цел до 32K. Отслеживание последнего из нескольких обновлений деградирует плавно. Латентный поиск — где запись надо опознать по описанию, а не по ключу — сломан на всех длинах, включая 1K, значит его падение — вовсе не деградация контекста, а отсутствующая способность. Любая кривая деградации обязана нормироваться на короткий контекст отдельно по каждой задаче, иначе она измеряет не то.',
    fig2Title: 'Где именно по контексту ломается',
    fig2Sub: 'Парный тест, одни и те же 70 логических примеров на 16K и 32K',
    fig2Badge: '70/70 → 56/70, p=0.0001',
    fig2Analysis:
      'Расхожий тезис «после заполнения четверти окна качество падает» не подтверждается. Ранние и самые поздние позиции идеальны на обеих длинах; яма стоит на 0.70–0.80 с минимумом 3/10 на 0.75. Из 14 ошибок 11 возвращают число из отвлекающей записи вместо запрошенной — тип отказа это выбор и маршрутизация, а не чтение. Отсюда же следует, что простое увеличение базы позиционного кодирования вряд ли достаточно: провал не монотонен по относительному расстоянию.',
    fig3Title: 'Причинная цепочка: необходимость, затем частичная достаточность',
    fig3Sub: 'Абляция, оракульный стиринг и обучаемый селектор на заранее замороженных наборах',
    fig3Badge: 'Контрольные плечи не двигают ничего',
    fig3Analysis:
      'Читается слева направо, и это весь аргумент целиком. Снятие трёх голов уничтожает ответы. Подача им правильного адреса ответы возвращает. То же самое, сделанное с согласованными контрольными головами того же слоя, не даёт ничего ни в одну сторону. Затем оракул заменяется маленьким обучаемым селектором, который не видит ни ответа, ни эталонного фрагмента: он удерживает 5 из 9 починок без регрессий. Последний шаг намеренно подан как двусторонне незначимый — пять расходящихся пар дают p=0.0625, и содержательное утверждение здесь — удержание 55.6% оракульных починок, а не заявка на значимость.',
    fig4Title: 'Внимание к факту рушится раньше, чем ответ',
    fig4Sub: 'Поголовное внимание последнего запроса; квадратичная карта не строится',
    fig4Badge: 'Механистический признак развала маршрутизации',
    fig4Analysis:
      'На 64K промптовое вмешательство поднимает внимание к факту в 1.66 раза и вытягивает поиск с 3/15 до 10/15 ценой 4.2% задержки — воспроизведено на трёх независимых выборках. На 128K то же вмешательство всё ещё поднимает относительную массу в 2.5 раза, но абсолютная масса на порядок ниже уровня 64K, нужный блок перестаёт попадать в верхушку, и оба плеча дают 0/15. Меняется и тип отказа: на 128K модель перестаёт выдумывать и начинает прямо отвечать, что значения нет. Вмешательство сменило политику на воздержание, не восстановив доступ. Срез 128K — одна согласованная пара, поэтому точное отношение считается разведочным, а не оценкой популяции.',
    fig5Title: 'Обученная маршрутизация переносится с короткого контекста на длинный',
    fig5Sub: 'Селектор обучен только на 4K/8K, замороженным проверен на 32K',
    fig5Badge: 'Recall@1 72%, Recall@4 90.7%',
    fig5Analysis:
      'Селектор — линейный ранкер над пригодными к развёртыванию признаками: ни квадратичной карты внимания, ни подгонки под длинный контекст, и при обучении он не видел ни данных 32K, ни известных случаев починки. Он переносится. Но полезнее оказался урок из абляций: политика только на признаках причинных голов находит нужный блок в 75 случаях из 75 при бюджете 4 — и чинит при этом меньше случаев, чем полная политика. Два маршрута могут оба содержать нужный фрагмент и различаться тем, что ещё они с собой тащат. Значит оптимизировать одну лишь полноту выбора блоков — неверная цель, и это причинный контрпример, а не догадка.',
    tableTitle: 'Что было отвергнуто',
    colHyp: 'Гипотеза',
    colResult: 'Результат',
    colVerdict: 'Вердикт',
    ruled: [
      { hyp: 'Промпт «сначала выпиши факт» чинит обрыв', result: 'Починил все 14 исходных ошибок и создал 30 новых, перенеся полосу отказа вместо её устранения', verdict: 'Отвергнут как самостоятельная починка' },
      { hyp: 'Иерархический разреженный роутер обыгрывает плотное внимание', result: 'Сократил число сравниваемых пар в 20 раз на 2M токенов, но единственная конфигурация, обогнавшая плотное внимание по времени, имела полноту 21.9%, и ни одна не дошла до 99% на 1M/2M', verdict: 'Системный шлюз не пройден' },
      { hyp: 'Промптовые реле обобщаются за пределы дословного поиска', result: 'Многошаговые вопросы и агрегация остались на нуле; на уже работавшей задаче маркеры конкурировали с фактом за внимание и сделали хуже', verdict: 'Не переносится' },
      { hyp: 'Проверяющий по согласованности формата может управлять каскадом', result: '140/140 на дословном поиске, но он принял пять неверных структурированных ответов на композиционных задачах — усечённые промежуточные шаги и устаревшие значения', verdict: 'Несостоятелен; нужен проверяющий под задачу' },
      { hyp: 'Достаточно усилить причинные головы', result: 'Усиление тех же голов в 1.5 раза не дало ни улучшений, ни регрессий — амплитуда без маршрутизированного адреса не делает ничего', verdict: 'Необходимо, но не достаточно' },
      { hyp: 'Нынешний прототип — уже ускорение', result: 'Накладные расходы вмешательства около 2.5%, но селектор всё ещё выполняет второй плотный прогон; сквозным замером это медленнее, а не быстрее', verdict: 'Пока не системная победа' },
    ],
  },
};
