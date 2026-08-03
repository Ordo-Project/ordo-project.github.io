import { bi } from '../../i18n/types';
import type { Publication } from './types';

/**
 * Ordo-M Technical Report, Chapter 2 — published in full.
 * English is the language it was written in; the Russian side is a translation.
 */
export const ordoMChapter2: Publication = {
  id: 'ordo-m-ch2-why-text-breaks',
  slug: 'ordo-m-ch2-why-text-breaks',
  chapter: 2,
  project: 'Ordo-M',
  date: '2026-08-02',
  minutes: 21,
  author: 'Russel Gavery (Gavrilov Ruslan, @8hrsk)',
  cutoff: '2026-08-02',
  sourceFile: 'papers/ordo-m-ch2-why-text-breaks.md',
  status: bi(
    'Independent research, single author, unfunded',
    'Независимое исследование, один автор, без финансирования'
  ),
  title: bi(
    'What I Actually Built Was a Steering Vector: Diagnosing a Six-Order-of-Magnitude Regression and Removing It Without Losing the Fact',
    'На самом деле я построил стиринг-вектор: диагноз регрессии в шесть порядков и её устранение без потери факта'
  ),
  subtitle: bi(
    'Ordo-M Technical Report, Chapter 2 · Companion to Chapter 1',
    'Технический отчёт Ordo-M, глава 2 · Спутник главы 1'
  ),

  abstract: [
    bi(
      'Chapter 1 reported that an externally addressed memory grafted into a frozen Qwen3-8B edits knowledge with zero collateral damage. It also reported, in passing, that where the memory fires it damages the surrounding text. This chapter is about that damage: what it is, why it happens, and what it cost to remove.',
      'Глава 1 сообщила, что память с внешней адресацией, приделанная к замороженной Qwen3-8B, правит знание с нулевым побочным ущербом. Она же вскользь сообщила, что там, где память срабатывает, она портит окружающий текст. Эта глава — про этот ущерб: что это такое, почему так происходит и чего стоило его убрать.'
    ),
    bi(
      'The diagnosis did not come from a run. It came from tracing the data path and discovering that under external addressing the memory **does not read the context at all**. The hidden state determines only the shape of a tensor; what is emitted is one fixed vector per entity, added identically to every token from the entity\'s mention to the end of the sequence. The construction I had been training and measuring for thirteen runs was not sparse memory retrieval. It was **a learned per-entity steering vector broadcast over a token span** — which places this work, unexpectedly, inside the activation-steering literature rather than the memory-layer literature.',
      'Диагноз пришёл не из прогона. Он пришёл из прослеживания пути данных и обнаружения, что при внешней адресации память **не читает контекст вообще**. Скрытое состояние определяет только форму тензора; наружу выдаётся один фиксированный вектор на сущность, одинаково добавляемый к каждому токену от упоминания сущности до конца последовательности. Конструкция, которую я обучал и измерял тринадцать прогонов, не была разреженным извлечением из памяти. Это был **обученный на каждую сущность стиринг-вектор, транслируемый на отрезок токенов**, — что неожиданно помещает эту работу в литературу по управлению активациями, а не в литературу по слоям памяти.'
    ),
    bi(
      'Three consequences follow, each measured. The product-key routing machinery never fires and receives no gradient — 9.5M of 145.8M nominal parameters are inert. Effective capacity is 512 degrees of freedom per entity, so 500 trained entities use **0.18% of the nominal parameter count**; the matched-capacity comparison against LoRA in Chapter 1 was therefore not "fair" but heavily handicapped in the control arm\'s favor. And the damage has a precise mechanism: on unrelated archival prose the memory places **7.3%** of the entire probability mass on the entity\'s target value, against **5.8 × 10⁻⁶** for the base model — a factor of roughly twelve and a half thousand. "Perplexity ×314" stopped being an observation and became an explanation.',
      'Отсюда следуют три последствия, каждое измеренное. Механика маршрутизации product-key не срабатывает никогда и не получает градиента — 9.5M из 145.8M номинальных параметров инертны. Эффективная ёмкость — 512 степеней свободы на сущность, поэтому 500 обученных сущностей используют **0.18% номинального числа параметров**; сравнение с LoRA по равной ёмкости из главы 1 было, таким образом, не «честным», а с большой форой в пользу контрольного плеча. И у ущерба есть точный механизм: на посторонней архивной прозе память кладёт **7.3%** всей вероятностной массы на целевое значение сущности против **5.8 × 10⁻⁶** у базовой модели — разница примерно в двенадцать с половиной тысяч раз. «Перплексия ×314» перестала быть наблюдением и стала объяснением.'
    ),
    bi(
      'The headline result is a prediction of mine that failed. I had argued that a single constant vector cannot satisfy "silent everywhere, loud in the answer", and that any objective demanding it must collapse the fact. It does not: scoping the training objective locally gives efficacy **0.982** at a whole-probe perplexity cost of **+16.9%**, against **+21,027,832%** for the same construction without it. The binding constraint was the objective, not the architecture. I close with the configuration this produced — whole-probe regression of **+1.9% / +1.5%** across two seeds at efficacy 0.976 / 0.972 — and with three retractions of my own earlier claims, including one I had already published in Chapter 1\'s framing.',
      'Главный результат — провалившееся предсказание, моё собственное. Я утверждал, что один постоянный вектор не может удовлетворить условию «молчать везде, звучать в ответе», и что любая цель, требующая этого, обязана обрушить факт. Не обязана: локальное ограничение обучающей цели даёт efficacy **0.982** при цене в **+16.9%** перплексии по всей пробе против **+21 027 832%** у той же конструкции без него. Связывающим ограничением была цель, а не архитектура. Заканчиваю конфигурацией, которую это дало, — регрессия по всей пробе **+1.9% / +1.5%** на двух сидах при efficacy 0.976 / 0.972 — и тремя отзывами собственных прежних утверждений, включая одно, уже опубликованное в рамке главы 1.'
    ),
  ],

  blocks: [
    // ---------------------------------------------------------------- 1
    { t: 'h2', id: 'metric', text: bi('1. The metric that produced a false conclusion', '1. Метрика, породившая ложный вывод') },
    {
      t: 'p',
      text: bi(
        'Chapter 1 ends with a promise and a warning: on the project\'s neutral probe text, **0.0%** of tokens are addressed, so the memory\'s equality with the base model there follows from the construction and proves nothing. A probe carrying entity mentions addresses 93% of tokens, and on that probe perplexity went from 39.4 to 12,393.',
        'Глава 1 заканчивается обещанием и предупреждением: на нейтральном пробном тексте проекта адресуются **0.0%** токенов, поэтому равенство памяти базовой модели там следует из конструкции и не доказывает ничего. Проба, несущая упоминания сущностей, адресует 93% токенов, и на ней перплексия ушла с 39.4 до 12 393.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'My first explanation of that was that the anchor term protecting the base model had been dropped in the move to real data. True, but it describes the missing medicine rather than the disease. Worse, the report built on it contained a conclusion that does not survive recomputation, and the failure is instructive enough to open with.',
        'Моё первое объяснение состояло в том, что якорное слагаемое, защищающее базовую модель, было потеряно при переходе на реальные данные. Это правда, но она описывает недостающее лекарство, а не болезнь. Хуже того, построенный на ней отчёт содержал вывод, не переживающий пересчёта, и этот провал достаточно поучителен, чтобы им открыться.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I had claimed that two independent treatments — penalizing the memory\'s volume, and narrowing the address from a sticky span down to the name token itself — converge on the same frontier point, and that the fact/text trade-off is therefore **a property of the construction**. The two numbers supporting this were 43.0% efficacy at perplexity 120, and 41.2% at perplexity 145.',
        'Я утверждал, что два независимых воздействия — штраф за громкость памяти и сужение адреса с липкого отрезка до самого токена имени — сходятся в одну точку фронтира, и что компромисс «факт против текста» поэтому является **свойством конструкции**. Подкрепляли это два числа: efficacy 43.0% при перплексии 120 и 41.2% при перплексии 145.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Those two numbers are not comparable. Perplexity there was computed over the bucket of *addressed positions*, and the two modes have different buckets: under a sticky address the bucket is 1,885 continuation tokens with a base level of 39.4; under name-only addressing it is 94 tokens of the name itself, with a base level of 283.3. Different token sets, different base levels. Their absolute values cannot be set side by side.',
        'Эти два числа несравнимы. Перплексия там считалась по корзине *адресованных позиций*, а корзины у двух режимов разные: при липком адресе это 1885 токенов продолжения с базовым уровнем 39.4; при адресации только по имени — 94 токена самого имени с базовым уровнем 283.3. Разные множества токенов, разные базовые уровни. Их абсолютные значения нельзя ставить рядом.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Recomputed over the whole probe — the number that answers "how damaged is the text":',
        'Пересчёт по всей пробе — то число, которое отвечает на вопрос «насколько испорчен текст»:'
      ),
    },
    {
      t: 'table',
      head: [bi('run', 'прогон'), bi('efficacy', 'efficacy'), bi('generalization', 'обобщение'), bi('whole-probe PPL', 'PPL по всей пробе'), bi('share of addressed tokens', 'доля адресованных токенов')],
      align: ['l', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('sticky, no anchor', 'липкий, без якоря'), bi('1.00', '1.00'), bi('0.97', '0.97'), bi('**+20250%**', '**+20250%**'), bi('92.5%', '92.5%')],
        [bi('anchor weight 0.3', 'вес якоря 0.3'), bi('1.00', '1.00'), bi('0.96', '0.96'), bi('+2555%', '+2555%'), bi('92.5%', '92.5%')],
        [bi('anchor weight 1', 'вес якоря 1'), bi('0.96', '0.96'), bi('0.91', '0.91'), bi('+3523%', '+3523%'), bi('92.5%', '92.5%')],
        [bi('anchor weight 3', 'вес якоря 3'), bi('0.93', '0.93'), bi('0.84', '0.84'), bi('+2636%', '+2636%'), bi('92.5%', '92.5%')],
        [bi('anchor weight 10', 'вес якоря 10'), bi('0.71', '0.71'), bi('0.63', '0.63'), bi('+600%', '+600%'), bi('92.5%', '92.5%')],
        [bi('anchor weight 30', 'вес якоря 30'), bi('0.43', '0.43'), bi('0.40', '0.40'), bi('+180%', '+180%'), bi('92.5%', '92.5%')],
        [bi('name-only address', 'адрес только по имени'), bi('0.41', '0.41'), bi('0.38', '0.38'), bi('**+5.3%**', '**+5.3%**'), bi('4.6%', '4.6%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'At matched efficacy — 0.41 against 0.43 — narrowing the region where the memory speaks is **34 times cheaper in text** than turning its volume down. The conclusion "the boundary is architectural" is withdrawn: it rested on a coincidence that was an artifact of the bucket.',
        'При сопоставимой efficacy — 0.41 против 0.43 — сужение области, где память говорит, **в 34 раза дешевле по тексту**, чем убавление её громкости. Вывод «граница архитектурна» отзывается: он держался на совпадении, которое было артефактом корзины.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The whole-probe figure is now the headline regression metric of the project. The error that opens this chapter came directly out of a bucketed metric, and it would have recurred silently.',
        'Число по всей пробе теперь является главной метрикой регрессии проекта. Ошибка, которой открывается эта глава, вышла прямо из корзинной метрики и повторялась бы молча.'
      ),
    },

    // ---------------------------------------------------------------- 2
    { t: 'h2', id: 'diagnosis', text: bi('2. The diagnosis, obtained by reading rather than running', '2. Диагноз, полученный чтением, а не прогоном') },
    {
      t: 'p',
      text: bi(
        'Under an external address, the memory returns the slots of the addressed entity with uniform weights, and the hidden state at that position enters the computation only to determine tensor shape. Neither the position, nor the subject under discussion, nor whether a question has been asked at all influences what the memory emits. What is actually added to the residual stream is:',
        'При внешнем адресе память возвращает слоты адресованной сущности с равными весами, а скрытое состояние в этой позиции входит в вычисление только для определения формы тензора. Ни позиция, ни обсуждаемый предмет, ни то, был ли вообще задан вопрос, не влияют на то, что выдаёт память. В остаточный поток фактически добавляется:'
      ),
    },
    {
      t: 'quote',
      text: bi(
        'one fixed vector per entity, identical at every addressed position, applied to every token from the entity\'s mention to the end of the sequence.',
        'один фиксированный вектор на сущность, одинаковый в каждой адресованной позиции, применяемый к каждому токену от упоминания сущности до конца последовательности.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'That is not sparse retrieval from a memory. It is **a steering vector, learned per entity and broadcast over a span**.',
        'Это не разреженное извлечение из памяти. Это **стиринг-вектор, обученный на каждую сущность и транслируемый на отрезок**.'
      ),
    },
    { t: 'p', text: bi('Three consequences, and they are not cosmetic.', 'Три последствия, и они не косметические.') },
    {
      t: 'p',
      text: bi(
        '**The routing machinery is inert.** Query projection, the half-key tables, query normalization, the learned temperature, top-k selection, the concentration penalty — none of it is invoked under external addressing, and none of it receives gradient. That is 9.5M of 145.8M nominal parameters taking no part in any number this project has reported.',
        '**Механика маршрутизации инертна.** Проекция запроса, таблицы полуключей, нормализация запроса, обучаемая температура, отбор top-k, штраф за концентрацию — ничего из этого при внешней адресации не вызывается и не получает градиента. Это 9.5M из 145.8M номинальных параметров, не участвующих ни в одном числе, отчитанном этим проектом.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Effective capacity is 0.18% of nominal.** An entity holds 16 slots of 512 numbers each, but they enter the result only through their mean, so the entity has exactly 512 degrees of freedom. Across 500 trained entities that is 256,000 numbers — against a nominal 145.8M.',
        '**Эффективная ёмкость — 0.18% от номинальной.** Сущность держит 16 слотов по 512 чисел, но они входят в результат только через своё среднее, поэтому у сущности ровно 512 степеней свободы. На 500 обученных сущностей это 256 000 чисел против номинальных 145.8M.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Chapter 1\'s central comparison was not fair; it was handicapped against me.** The two arms were equalized on *nominal* parameter count, and LoRA uses its 144.6M in full while the memory uses two tenths of one percent of its own. The memory nonetheless kept the specificity and the locality advantage. (Exact figures vary by run — Chapter 1 reports specificity 82.9% against 30.0% and edit damage 0.0 against 8.4 points; the run analysed here gives 83.1% against 32.9% and 0.0 against 20.2 points. The magnitudes move between runs, the ordering does not, and Chapter 1\'s caveat about unequal edit-step budgets applies to both.) I present this as a correction to my own framing rather than as a stronger claim: the honest statement is that the comparison gave the control arm a large head start and the control arm still lost on locality.',
        '**Центральное сравнение главы 1 было не честным — фора была против меня.** Плечи уравнивались по *номинальному* числу параметров, и LoRA использует свои 144.6M полностью, тогда как память — две десятых процента своих. И тем не менее память удержала преимущество и по специфичности, и по локальности. (Точные цифры разнятся между прогонами: глава 1 приводит специфичность 82.9% против 30.0% и ущерб правки 0.0 против 8.4 пункта; разбираемый здесь прогон даёт 83.1% против 32.9% и 0.0 против 20.2 пункта. Величины между прогонами гуляют, порядок — нет, и оговорка главы 1 о неравных бюджетах шагов правки касается обоих.) Подаю это как поправку к собственной рамке, а не как более сильное утверждение: честная формулировка в том, что сравнение дало контрольному плечу большую фору, и контрольное плечо всё равно проиграло по локальности.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Because this diagnosis was obtained by reading a construction rather than by measuring it, it is now asserted by an automated check that runs on every invocation: with no gate, the spread of the memory\'s contribution across positions is exactly 0.0, and a complete change of surrounding context changes the output by exactly 0.0. A conclusion derived from reading has to be pinned by a test, or one day a context dependence appears, this chapter silently becomes false, and nobody notices.',
        'Поскольку этот диагноз получен чтением конструкции, а не её измерением, он теперь утверждается автоматической проверкой, выполняющейся при каждом вызове: без гейта разброс вклада памяти по позициям равен ровно 0.0, а полная смена окружающего контекста меняет выход ровно на 0.0. Вывод, полученный чтением, должен быть закреплён тестом — иначе в один день появится зависимость от контекста, эта глава молча станет ложной, и никто этого не заметит.'
      ),
    },

    // ---------------------------------------------------------------- 3
    { t: 'h2', id: 'mechanism', text: bi('3. Three cheap measurements that turned an observation into a mechanism', '3. Три дешёвых замера, превративших наблюдение в механизм') },
    {
      t: 'p',
      text: bi(
        '**Probability mass on the target value.** On the mention-carrying probe — archival prose in which the entity appears but its stored fact is irrelevant — the memory places **7.3%** of the entire probability mass on that entity\'s target value at every addressed position. The base model places **5.8 × 10⁻⁶**. A factor of about 12,500. The addition literally says "the next token is *Paris*", and it says it at every point in the span. On prose, where the next token is anything else, that is the ×314 perplexity.',
        '**Вероятностная масса на целевом значении.** На пробе с упоминаниями — архивной прозе, где сущность встречается, но её сохранённый факт нерелевантен, — память кладёт **7.3%** всей вероятностной массы на целевое значение этой сущности в каждой адресованной позиции. Базовая модель кладёт **5.8 × 10⁻⁶**. Разница примерно в 12 500 раз. Добавка буквально говорит «следующий токен — *Париж*», и говорит это в каждой точке отрезка. На прозе, где следующий токен любой другой, это и есть перплексия ×314.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Norm of the addition against norm of the stream.** The ratio of the added vector\'s norm to the residual stream\'s norm at the graft layer was **1.02** in the then-current configuration: the memory writes into the stream a vector the size of the stream itself. The same quantity orders the slot-count series — 1.02 at sixteen slots per entity against 0.59 at one — and the text damage differs by a factor of twelve in the same direction.',
        '**Норма добавки против нормы потока.** Отношение нормы добавляемого вектора к норме остаточного потока на слое врезки составляло **1.02** в тогдашней конфигурации: память пишет в поток вектор размером с сам поток. Та же величина упорядочивает серию по числу слотов — 1.02 при шестнадцати слотах на сущность против 0.59 при одном, — и ущерб тексту различается в двенадцать раз в том же направлении.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The limit of that number has to be stated immediately, because I over-generalized it before checking. **It orders runs within a single graft depth, and not across depths.** At depth 0.15 the added norm is the largest measured anywhere (1.46) and the text damage is the smallest (+14.8%). On early blocks the residual stream is quieter to begin with, and thirty layers of frozen network remain downstream to absorb the perturbation; at two-thirds depth, twelve remain.',
        'Границу этого числа надо назвать сразу, потому что я обобщил его прежде, чем проверил. **Оно упорядочивает прогоны внутри одной глубины врезки, но не между глубинами.** На глубине 0.15 норма добавки — наибольшая из всех измеренных (1.46), а ущерб тексту — наименьший (+14.8%). На ранних блоках остаточный поток изначально тише, и ниже по течению остаётся тридцать слоёв замороженной сети, чтобы поглотить возмущение; на двух третях глубины остаётся двенадцать.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**One slot instead of sixteen.** Collapsing each entity to a single slot matched the sixteen-slot configuration on efficacy, generalization and specificity to three decimal places — confirming that the product-key machinery is dead in this regime. It did not match on two other axes, and both favour the single slot: the gap between correct and incorrect addressing widens (0.676 against 0.486), and the text damage is **twelve times smaller** (+1701% against +20250%), with the norm ratio at 0.59 against 1.02.',
        '**Один слот вместо шестнадцати.** Схлопывание каждой сущности до одного слота совпало с шестнадцатислотовой конфигурацией по efficacy, обобщению и специфичности до третьего знака — подтверждая, что механика product-key в этом режиме мертва. Оно не совпало по двум другим осям, и обе в пользу одного слота: разрыв между верной и неверной адресацией расширяется (0.676 против 0.486), а ущерб тексту **в двенадцать раз меньше** (+1701% против +20250%) при отношении норм 0.59 против 1.02.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'This last result has a practical consequence I want to state plainly, because it is the kind of thing a research programme normally refuses to admit. The reference implementation for further iteration does not need the product-key mechanism at all. It is an entity-indexed embedding table plus a shared projection — an order of magnitude simpler and faster — and the routing machinery returns if and only if addresses stop being supplied externally.',
        'У последнего результата есть практическое следствие, которое я хочу назвать прямо, потому что обычно исследовательские программы такое признавать отказываются. Эталонной реализации для дальнейших итераций механизм product-key не нужен вовсе. Это таблица эмбеддингов, индексируемая сущностью, плюс общая проекция — на порядок проще и быстрее, — а механика маршрутизации возвращается тогда и только тогда, когда адреса перестанут подаваться снаружи.'
      ),
    },

    // ---------------------------------------------------------------- 4
    { t: 'h2', id: 'prediction', text: bi('4. The prediction that failed', '4. Провалившееся предсказание') },
    {
      t: 'p',
      text: bi(
        'I had written, in the plan for these runs, that a particular arm *must* fail. The reasoning was: an anchor and a cross-entropy term have one and only one object of dispute, the entity\'s vector; quieter on prose means quieter in the answer position, because there is no other degree of freedom. Therefore an objective demanding "silent everywhere except in the answer" has no solution for a constant vector, and efficacy must collapse. I marked it explicitly as a falsifier: if efficacy does not collapse, the diagnosis is incomplete and the remaining waves must not be launched.',
        'В плане этих прогонов я написал, что одно конкретное плечо *обязано* провалиться. Рассуждение было такое: у якоря и слагаемого кросс-энтропии есть один и только один предмет спора — вектор сущности; тише на прозе означает тише и в позиции ответа, потому что другой степени свободы нет. Следовательно, у цели, требующей «молчать везде, кроме ответа», для постоянного вектора решения нет, и efficacy обязана обрушиться. Я явно пометил это как фальсификатор: если efficacy не обрушится, диагноз неполон и остальные волны запускать нельзя.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Efficacy did not collapse. Scoping the objective locally gave **0.982** — and whole-probe perplexity of **+16.9%**, against **+21,027,832%** for the same construction with no such term.',
        'Efficacy не обрушилась. Локальное ограничение цели дало **0.982** — и перплексию по всей пробе **+16.9%** против **+21 027 832%** у той же конструкции без такого слагаемого.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The error was a single unjustified step: from *the memory\'s reading does not depend on context* to *the memory\'s effect does not depend on context*. Between the graft layer and the model\'s output sits a third of a frozen network, and it is nonlinear. The same vector is processed differently depending on what surrounds it. A direction that is inert inside archival prose and decisive immediately after "The mother tongue of X is" exists — the previous objective simply never asked for one.',
        'Ошибка была в одном необоснованном переходе: от «чтение памяти не зависит от контекста» к «эффект памяти не зависит от контекста». Между слоем врезки и выходом модели стоит треть замороженной сети, и она нелинейна. Один и тот же вектор обрабатывается по-разному в зависимости от того, что его окружает. Направление, инертное внутри архивной прозы и решающее сразу после «Родной язык X —», существует; прежняя цель просто никогда его не запрашивала.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**What was binding was the formulation of the problem, not the architecture of reading.** I consider this the most useful result in the chapter, and it is the reason the earlier "the trade-off is inherent" claim had to go: I had twice concluded that a limit was structural when it was a limit of what I had asked for.',
        '**Связывающей была формулировка задачи, а не архитектура чтения.** Считаю это самым полезным результатом главы, и именно поэтому пришлось убрать прежнее утверждение «компромисс неотъемлем»: я дважды заключил, что предел структурен, тогда как это был предел того, о чём я просил.'
      ),
    },

    // ---------------------------------------------------------------- 5
    { t: 'h2', id: 'factorial', text: bi('5. The factorial: which half does what', '5. Факторный план: какая половина что делает') },
    {
      t: 'p',
      text: bi(
        'The gate and the locally scoped objective had been changed together, which meant neither could be attributed. Both missing cells were computed separately.',
        'Гейт и локально ограниченная цель менялись вместе, а значит ни одному из них нельзя было ничего приписать. Обе недостающие клетки посчитаны отдельно.'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('no anchor', 'без якоря'), bi('anchor', 'с якорем')],
      align: ['l', 'l', 'l'],
      rows: [
        [bi('**loss over the full string**', '**лосс по всей строке**'), bi('eff 1.000 · PPL +18205%', 'eff 1.000 · PPL +18205%'), bi('eff 0.692 · PPL +28.0%', 'eff 0.692 · PPL +28.0%')],
        [bi('**loss on the answer only**', '**лосс только по ответу**'), bi('eff 1.000 · PPL **+21,027,832%**', 'eff 1.000 · PPL **+21 027 832%**'), bi('eff 0.982 · PPL **+16.9%**', 'eff 0.982 · PPL **+16.9%**')],
      ],
    },
    {
      t: 'p',
      text: bi(
        '**The anchor is the only lever on the text axis.** Both cells containing it give tens of percent; both without it give tens of thousands, or twenty-one million.',
        '**Якорь — единственный рычаг по оси текста.** Обе клетки, где он есть, дают десятки процентов; обе, где его нет, — десятки тысяч или двадцать один миллион.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Answer-scoped loss rescues the fact from the anchor; it does not heal the prose.** Under a loss spread over the full string, the answer tokens are roughly four out of thirty — a twelfth of the gradient — and an anchor strong enough to hold the text simply drowns the fact, giving efficacy 0.692. Re-weighting returns the fact its share. On its own, without an anchor, the same re-weighting is **a thousand times worse**: mass on the target value rises to 0.35 and generalization rises to a *perfect* 1.000, because nothing survives except the instruction "emit this token", and it fires from anywhere.',
        '**Лосс, ограниченный ответом, спасает факт от якоря; прозу он не лечит.** При лоссе, размазанном по всей строке, токенов ответа примерно четыре из тридцати — двенадцатая часть градиента, — и якорь, достаточно сильный, чтобы удержать текст, просто топит факт, давая efficacy 0.692. Перевзвешивание возвращает факту его долю. Само по себе, без якоря, то же перевзвешивание **в тысячу раз хуже**: масса на целевом значении поднимается до 0.35, а обобщение — до *идеальной* 1.000, потому что не выживает ничего, кроме инструкции «выдай этот токен», и она срабатывает откуда угодно.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'A generalization score of exactly 1.000 is, in this construction, a symptom rather than an achievement. It is worth stating as a general caution about editing benchmarks: a metric that measures whether the edited value appears cannot distinguish a well-placed fact from an unconditional command to say it.',
        'Оценка обобщения ровно 1.000 в этой конструкции — симптом, а не достижение. Стоит сформулировать это как общее предостережение о бенчмарках редактирования: метрика, измеряющая, появилось ли отредактированное значение, не отличает хорошо поставленный факт от безусловной команды его произносить.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'This forces a sign correction to my own diagnosis. Earlier in this work I asserted that a loss over the full string "literally teaches the memory to alter the distribution on prose". The sign is wrong. That loss was requiring the memory to remain **coherent** across the prefix and the prompt, and it was the only constraint — inadvertent, but real — holding it in place. The +20250% was not the result of training the memory to damage prose; it was the result of almost nothing preventing it.',
        'Это вынуждает исправить знак в собственном диагнозе. Раньше в этой работе я утверждал, что лосс по всей строке «буквально учит память менять распределение на прозе». Знак неверен. Этот лосс требовал от памяти оставаться **согласованной** на префиксе и промпте, и он был единственным ограничением — непреднамеренным, но настоящим, — удерживавшим её на месте. +20250% были результатом не обучения памяти портить прозу, а того, что почти ничто ей этого не мешало.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The gate closes only when there is something to close.** In three of the four cells it sat at 1.000, permanently open. It closed to 0.454 in exactly the cell where the vector is loud and there is a reason to be silent, and there it bought a further factor of 4.5 on text beyond what the anchor achieved. A conditional mechanism is worth its parameters only where an unconditional one is actually causing harm.',
        '**Гейт закрывается только тогда, когда есть что закрывать.** В трёх клетках из четырёх он стоял на 1.000, постоянно открытый. Он закрылся до 0.454 ровно в той клетке, где вектор громкий и есть причина молчать, и там он купил ещё множитель 4.5 по тексту сверх того, что дал якорь. Условный механизм оправдывает свои параметры только там, где безусловный действительно наносит вред.'
      ),
    },

    // ---------------------------------------------------------------- 6
    { t: 'h2', id: 'depth', text: bi('6. Graft depth: two-thirds was the worst of the five tested', '6. Глубина врезки: две трети оказались худшими из пяти проверенных') },
    {
      t: 'p',
      text: bi(
        'With the address restricted to the name itself, the frozen network has to carry the fact from the name to the answer position, and how much network remains for that becomes the variable.',
        'Когда адрес ограничен самим именем, замороженной сети приходится нести факт от имени до позиции ответа, и переменной становится то, сколько сети на это остаётся.'
      ),
    },
    {
      t: 'table',
      head: [bi('depth', 'глубина'), bi('efficacy', 'efficacy'), bi('generalization', 'обобщение'), bi('whole-probe PPL', 'PPL по всей пробе'), bi('added-norm ratio', 'отношение норм')],
      align: ['l', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('0.15', '0.15'), bi('0.942', '0.942'), bi('0.881', '0.881'), bi('**+14.8%**', '**+14.8%**'), bi('1.462', '1.462')],
        [bi('0.25', '0.25'), bi('0.938', '0.938'), bi('0.871', '0.871'), bi('+41.3%', '+41.3%'), bi('0.581', '0.581')],
        [bi('0.40', '0.40'), bi('0.956', '0.956'), bi('0.891', '0.891'), bi('+225.4%', '+225.4%'), bi('0.645', '0.645')],
        [bi('0.55', '0.55'), bi('0.942', '0.942'), bi('0.868', '0.868'), bi('+57.0%', '+57.0%'), bi('0.697', '0.697')],
        [bi('0.66', '0.66'), bi('**0.412**', '**0.412**'), bi('0.380', '0.380'), bi('+5.3%', '+5.3%'), bi('—', '—')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Across the entire range 0.15–0.55 efficacy holds at 0.94–0.96; at 0.66 it falls by more than half. The break falls on blocks 20–24 of 36. The "two-thirds of depth" hypothesis had stood in this project from the beginning, was carried into Chapter 1 as a stated setting, and rested on a single measured value. Among five tested points it is **the worst**. No break has yet been found to the left.',
        'На всём диапазоне 0.15–0.55 efficacy держится на 0.94–0.96; на 0.66 она падает более чем вдвое. Излом приходится на блоки 20–24 из 36. Гипотеза «две трети глубины» стояла в этом проекте с самого начала, была перенесена в главу 1 как заявленная настройка и опиралась на одно измеренное значение. Из пяти проверенных точек она **худшая**. Излома левее пока не найдено.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'What cannot be read from this table is the perplexity column: 15 → 41 → 225 → 57, without order. On a single seed that is scatter, not a curve, and ranking by it would repeat precisely the mistake of §1, where a sequence of that kind was taken for a shape. What is reliable here is the absence of any efficacy collapse up to 0.55 and its presence at 0.66.',
        'Чего из этой таблицы читать нельзя — так это колонку перплексии: 15 → 41 → 225 → 57, без порядка. На одном сиде это разброс, а не кривая, и ранжирование по ней повторило бы ровно ошибку §1, где последовательность такого рода приняли за форму. Надёжно здесь другое: отсутствие обвала efficacy вплоть до 0.55 и его наличие на 0.66.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I flag one interaction that this scan does not resolve: it was run under name-only addressing, where depth is predicted to matter, and a sticky address is predicted to be indifferent to it because the vector already stands in the answer position. Chapter 1\'s headline numbers were taken at 0.66 under a sticky address, and this table therefore does not invalidate them — but it does mean the graft depth used throughout this project is an inherited default that survived on one data point, and the two-thirds figure should be read as "what was used", not "what was chosen".',
        'Отмечаю одно взаимодействие, которое этот скан не разрешает: он выполнен при адресации только по имени, где глубина, по предсказанию, важна, а липкий адрес, по предсказанию, к ней безразличен, потому что вектор уже стоит в позиции ответа. Заглавные числа главы 1 сняты на 0.66 при липком адресе, и эта таблица их поэтому не отменяет — но означает, что глубина врезки, использовавшаяся во всём проекте, есть унаследованное умолчание, выжившее на одной точке, и цифру «две трети» следует читать как «что использовалось», а не «что выбрано».'
      ),
    },

    // ---------------------------------------------------------------- 7
    { t: 'h2', id: 'anchor', text: bi('7. Anchor weight: the first three tenths do everything', '7. Вес якоря: первые три десятых делают всё') },
    {
      t: 'table',
      head: [bi('weight', 'вес'), bi('efficacy', 'efficacy'), bi('generalization', 'обобщение'), bi('whole-probe PPL', 'PPL по всей пробе'), bi('added-norm ratio', 'отношение норм'), bi('mass on target', 'масса на цели')],
      align: ['r', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('0', '0'), bi('1.000', '1.000'), bi('1.000', '1.000'), bi('**+21,027,832%**', '**+21 027 832%**'), bi('1.024', '1.024'), bi('0.3504', '0.3504')],
        [bi('0.3', '0.3'), bi('1.000', '1.000'), bi('0.950', '0.950'), bi('+21.7%', '+21.7%'), bi('0.803', '0.803'), bi('0.0049', '0.0049')],
        [bi('1', '1'), bi('0.982', '0.982'), bi('0.882', '0.882'), bi('+16.9%', '+16.9%'), bi('0.683', '0.683'), bi('0.0021', '0.0021')],
        [bi('3', '3'), bi('0.912', '0.912'), bi('0.792', '0.792'), bi('+12.0%', '+12.0%'), bi('0.491', '0.491'), bi('0.0005', '0.0005')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Unlike the earlier sweep over the external anchor, this is a genuine curve: all five quantities move monotonically. But it is sharply asymmetric. **The first 0.3 is worth a factor of a million in perplexity and costs nothing in efficacy.** Beyond that it is an ordinary exchange — four to eight points of generalization per quarter of the text damage. There is very little here to tune: switching the anchor on matters enormously, and its exact setting does not.',
        'В отличие от более раннего перебора внешнего якоря, это настоящая кривая: все пять величин движутся монотонно. Но она резко асимметрична. **Первые 0.3 стоят миллиона раз по перплексии и не стоят ничего по efficacy.** Дальше это обычный обмен: четыре-восемь пунктов обобщения за четверть ущерба тексту. Настраивать тут почти нечего: включение якоря значит огромно много, его точная величина — нет.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Note also the last column, which is the same quantity as §3\'s diagnostic. Mass on the target value drops from 0.35 to 0.0049 across that first step. The mechanism identified by reading and the knob found by sweeping are measuring the same thing, which is the strongest evidence I have that the diagnosis is correct.',
        'Обратите внимание и на последнюю колонку — это та же величина, что и диагностика из §3. Масса на целевом значении падает с 0.35 до 0.0049 на этом первом шаге. Механизм, найденный чтением, и ручка, найденная перебором, измеряют одно и то же, и это самое сильное свидетельство верности диагноза, которое у меня есть.'
      ),
    },

    // ---------------------------------------------------------------- 8
    { t: 'h2', id: 'landed', text: bi('8. Where it landed, on two seeds', '8. Куда это пришло, на двух сидах') },
    {
      t: 'table',
      head: [bi('', ''), bi('prior configuration', 'прежняя конфигурация'), bi('sticky, 0.66, one slot, anchor 0.3', 'липкий, 0.66, один слот, якорь 0.3'), bi('name-only, 0.15, one slot', 'только имя, 0.15, один слот')],
      align: ['l', 'r', 'r', 'r'],
      rows: [
        [bi('efficacy', 'efficacy'), bi('1.000', '1.000'), bi('**1.000 / 1.000**', '**1.000 / 1.000**'), bi('0.976 / 0.972', '0.976 / 0.972')],
        [bi('generalization', 'обобщение'), bi('0.971', '0.971'), bi('0.950 / 0.936', '0.950 / 0.936'), bi('0.907 / 0.894', '0.907 / 0.894')],
        [bi('specificity', 'специфичность'), bi('0.831', '0.831'), bi('0.834 / 0.854', '0.834 / 0.854'), bi('0.833 / 0.853', '0.833 / 0.853')],
        [bi('gap between correct and wrong address', 'разрыв между верным и неверным адресом'), bi('0.486', '0.486'), bi('0.788 / **0.804**', '0.788 / **0.804**'), bi('0.818 / 0.792', '0.818 / 0.792')],
        [bi('**whole-probe PPL**', '**PPL по всей пробе**'), bi('**+20250%**', '**+20250%**'), bi('+20.1% / +20.4%', '+20.1% / +20.4%'), bi('**+1.9% / +1.5%**', '**+1.9% / +1.5%**')],
        [bi('edit success', 'успешность правки'), bi('measurement was broken', 'замер был сломан'), bi('**0.84 / 0.96**', '**0.84 / 0.96**'), bi('0.62 / 0.76', '0.62 / 0.76')],
        [bi('collateral damage of edit', 'побочный ущерб правки'), bi('—', '—'), bi('0.0 / 0.0 pts', '0.0 / 0.0 п.п.'), bi('0.0 / 0.0 pts', '0.0 / 0.0 п.п.')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'One physically meaningful knob separates the two surviving configurations: the earlier the graft and the narrower the address, the more intact the text and the weaker the fact, the generalization and the edit. Both beat the prior configuration by three orders of magnitude on text, both reproduce across seeds, and **the zero collateral damage of Chapter 1 survives in both** — which is the result this chapter most needed not to break.',
        'Две выжившие конфигурации разделяет одна физически осмысленная ручка: чем раньше врезка и чем уже адрес, тем целее текст и тем слабее факт, обобщение и правка. Обе обыгрывают прежнюю конфигурацию на три порядка по тексту, обе воспроизводятся между сидами, и **нулевой побочный ущерб главы 1 выживает в обеих** — это тот результат, которому этой главе больше всего нельзя было сломать.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Seed scatter was measured for the first time in this project, and it immediately cost me a claim.** Functional quantities repeat within a couple of points. Perplexity mostly repeats too — but not everywhere: one configuration gave +11.3% and +24.1% on two seeds. Differences in text damage smaller than a factor of two to three therefore cannot be ranked on a single seed, and my own earlier comparison within this chapter — that anchor weight 1 is cleaner than 0.3 — is withdrawn. What survives the scatter is the three-order-of-magnitude drop, and the statement that on the name-only branch the text is left essentially untouched.',
        '**Разброс по сидам измерен в этом проекте впервые, и он немедленно стоил мне утверждения.** Функциональные величины повторяются в пределах пары пунктов. Перплексия в основном тоже повторяется — но не везде: одна конфигурация дала +11.3% и +24.1% на двух сидах. Различия в ущербе тексту меньше чем в два-три раза поэтому нельзя ранжировать на одном сиде, и моё же более раннее сравнение внутри этой главы — что вес якоря 1 чище, чем 0.3, — отзывается. Разброс переживают падение на три порядка и утверждение, что на ветке «только имя» текст остаётся практически нетронутым.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'One quantity has not been recovered. Generalization tops out at 0.950 against 0.971 for the untouched base. The anchor pays for it: it asks for silence at prompt positions, and in a paraphrase the mention sits exactly there. Silence on the prompt and transferability to a different phrasing are genuinely in conflict, and that is the next fork rather than a rounding error.',
        'Одна величина не восстановлена. Обобщение упирается в 0.950 против 0.971 у нетронутой базы. Платит за это якорь: он требует молчания в позициях промпта, а в парафразе упоминание стоит ровно там. Молчание на промпте и переносимость на другую формулировку действительно конфликтуют, и это следующая развилка, а не ошибка округления.'
      ),
    },

    // ---------------------------------------------------------------- 9
    { t: 'h2', id: 'notcause', text: bi('9. What is not the cause', '9. Что причиной не является') },
    {
      t: 'p',
      text: bi(
        'Stated explicitly, so the search does not go where the light is.',
        'Сказано явно, чтобы поиск не шёл туда, где светлее.'
      ),
    },
    {
      t: 'ul',
      items: [
        bi(
          '**Not the graft itself.** At unaddressed positions the output is identically zero, confirmed across all thirteen prior runs as +0.00%, not "approximately zero".',
          '**Не сама врезка.** В неадресованных позициях выход тождественно нулевой, подтверждено во всех тринадцати прежних прогонах как +0.00%, а не «примерно ноль».'
        ),
        bi(
          '**Not the addressing.** It is external, deterministic and verified: substituting the address destroys quality (a gap of 51.4 points), and surface-form collisions run at 118 in 8,000.',
          '**Не адресация.** Она внешняя, детерминированная и проверенная: подмена адреса уничтожает качество (разрыв 51.4 пункта), а коллизии поверхностных форм идут на уровне 118 из 8000.'
        ),
        bi('**Not capacity.** 0.18% of nominal is in use.', '**Не ёмкость.** В деле 0.18% от номинала.'),
        bi(
          '**Not slot crowding.** 99.0% / 99.7% / 100.0% for one, two and three facts written into the same slots (Chapter 1, §9).',
          '**Не теснота слотов.** 99.0% / 99.7% / 100.0% для одного, двух и трёх фактов, записанных в одни слоты (глава 1, §9).'
        ),
      ],
    },

    // ---------------------------------------------------------------- 10
    { t: 'h2', id: 'related', text: bi('10. Related work: this is a steering-vector result', '10. Смежные работы: это результат про стиринг-векторы') },
    {
      t: 'p',
      text: bi(
        'The diagnosis in §2 moves this work, for the duration of this chapter, out of the memory-layer literature and into activation steering — and there the phenomenon I spent thirteen runs rediscovering is well documented.',
        'Диагноз из §2 переносит эту работу на время этой главы из литературы про слои памяти в литературу про управление активациями — а там явление, которое я тринадцать прогонов переоткрывал, хорошо задокументировано.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '*Activation Addition* (2023) established the basic move of adding a fixed direction to the residual stream at inference. The subsequent critical literature established its cost: *A Sober Look at Steering Vectors for LLMs* finds that steering degrades general capability, in some cases equivalently to halving pretraining compute, and raises perplexity on high-quality text; the mechanism given there is exactly the one I measured — if a vector raises the probability of some continuations it must lower others, and perplexity worsens across nearly all topics. *Minimizing Collateral Damage in Activation Steering* (2026) and *On the Effectiveness–Fluency Trade-Off in LLM Conditioning* (2026) both treat the trade-off as the central object, the latter finding that efficient conditioning methods routinely buy their effect at a steep price in fluency.',
        '*Activation Addition* (2023) установила базовый приём — добавление фиксированного направления в остаточный поток на инференсе. Последующая критическая литература установила его цену: *A Sober Look at Steering Vectors for LLMs* находит, что стиринг ухудшает общие способности, в отдельных случаях эквивалентно уполовиниванию вычислений предобучения, и повышает перплексию на качественном тексте; механизм, приводимый там, ровно тот, который я измерил, — если вектор повышает вероятность одних продолжений, он обязан понизить другие, и перплексия ухудшается почти по всем темам. *Minimizing Collateral Damage in Activation Steering* (2026) и *On the Effectiveness–Fluency Trade-Off in LLM Conditioning* (2026) обе рассматривают этот компромисс как центральный объект, причём вторая находит, что эффективные методы обусловливания регулярно покупают свой эффект дорогой ценой во флюентности.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'So the +20250% was not a bug I introduced. It is the known cost of constant-direction conditioning, arrived at from a different direction.',
        'Значит +20250% были не внесённым мной багом. Это известная цена обусловливания постоянным направлением, до которой я дошёл с другой стороны.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Where I think this chapter contributes something to that literature is the shape of the fix. The steering literature\'s answers to the trade-off are predominantly *conditional application*: SADI selects which components to steer per input, FASB uses probing classifiers to decide on the fly whether to intervene at all, Dynamic Activation Composition modulates intensity by an information-theoretic signal. All of these add a mechanism that decides *when*. My §5 factorial says that in this setting the decisive factor is not the mechanism but the **scope of the training objective** — restricting the supervision to the positions where the fact is actually wanted, and requiring agreement with the base model everywhere else in the same sequence, recovers six orders of magnitude at efficacy 0.982 with no conditional machinery at all. The gate, which is precisely a "decide when" mechanism, contributed a further 4.5× and only in the cell where the unconditional vector was still loud. Conditional application is a real gain, and in these measurements it is the second-order one.',
        'Вклад этой главы в ту литературу, как мне кажется, состоит в форме починки. Ответы литературы по стирингу на этот компромисс — преимущественно *условное применение*: SADI выбирает, какие компоненты рулить на каждом входе, FASB использует зондирующие классификаторы, чтобы на лету решать, вмешиваться ли вообще, Dynamic Activation Composition модулирует интенсивность по теоретико-информационному сигналу. Все они добавляют механизм, решающий *когда*. Мой факторный план из §5 говорит, что в этой постановке решающим фактором является не механизм, а **область действия обучающей цели**: ограничение надзора позициями, где факт действительно нужен, и требование согласия с базовой моделью везде остальном в той же последовательности возвращают шесть порядков при efficacy 0.982 вообще без условной машинерии. Гейт, который как раз и есть механизм «решить когда», добавил ещё 4.5× и только в той клетке, где безусловный вектор всё ещё был громким. Условное применение — настоящий выигрыш, и в этих замерах он второго порядка.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Two boundaries on that claim. First, my setting differs from standard steering in that the direction is *learned per entity against a specific target*, not extracted from contrastive pairs, and it is applied under a deterministic address rather than globally — so the population of affected positions is known in advance, which is exactly what makes a locally scoped objective expressible. Second, the steering literature evaluates fluency and general capability broadly, whereas I evaluate a mention-carrying probe and the editing metric set; these do not measure the same thing and I do not claim the numbers transfer.',
        'Две границы этого утверждения. Первая: моя постановка отличается от стандартного стиринга тем, что направление *обучается на каждую сущность против конкретной цели*, а не извлекается из контрастных пар, и применяется по детерминированному адресу, а не глобально, — поэтому множество затронутых позиций известно заранее, и именно это делает локально ограниченную цель выразимой. Вторая: литература по стирингу оценивает флюентность и общие способности широко, тогда как я оцениваю пробу с упоминаниями и набор метрик редактирования; это не одно и то же, и я не утверждаю, что числа переносятся.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The connection also runs the other way, and I state it against my own interest: if what I have is a steering vector, then the strong locality result of Chapter 1 is partly a statement about steering vectors — a bank of per-entity directions, written under an external address with shared parameters frozen, is edit-isolated. That is a narrower and less novel claim than "an addressable memory", and it is the honest reading of the construction in its current regime.',
        'Связь работает и в обратную сторону, и я формулирую это против собственного интереса: если у меня стиринг-вектор, то сильный результат по локальности из главы 1 отчасти является утверждением о стиринг-векторах — банк направлений по одному на сущность, записываемых по внешнему адресу при замороженных общих параметрах, изолирован по правкам. Это более узкое и менее новое утверждение, чем «адресуемая память», и это честное прочтение конструкции в её нынешнем режиме.'
      ),
    },

    // ---------------------------------------------------------------- 11
    { t: 'h2', id: 'notshown', text: bi('11. What this does not show', '11. Чего эта работа не показывает') },
    {
      t: 'ol',
      items: [
        bi(
          '**The depth scan was run under name-only addressing on one seed**, and its perplexity column is not rankable. The claim "0.66 is the worst of five" rests on the efficacy column alone.',
          '**Скан по глубине выполнен при адресации только по имени на одном сиде**, и его колонка перплексии не ранжируема. Утверждение «0.66 — худшая из пяти» опирается только на колонку efficacy.'
        ),
        bi(
          '**The two surviving configurations are not compared on equal footing to each other** across every axis; they differ in two variables at once (depth and address mode), and the intermediate cells are not filled.',
          '**Две выжившие конфигурации не сравниваются друг с другом на равных** по каждой оси; они различаются сразу двумя переменными (глубина и режим адреса), а промежуточные клетки не заполнены.'
        ),
        bi(
          '**Generalization has not been recovered** to the base level, and the conflict causing it is identified but unresolved.',
          '**Обобщение не восстановлено** до базового уровня, а вызывающий это конфликт опознан, но не разрешён.'
        ),
        bi(
          '**Everything here is Qwen3-8B**, and the added-norm ratio is an absolute quantity calibrated to that model\'s activation scale. Nothing licenses transferring it.',
          '**Всё здесь — Qwen3-8B**, а отношение норм добавки есть абсолютная величина, откалиброванная под масштаб активаций именно этой модели. Переносить её ничто не разрешает.'
        ),
        bi(
          '**The steering-vector framing applies to the external-address regime**, which is the only regime this project currently uses. It would not apply if addresses were computed by a learned lookup — but Chapter 1 §10 explains why that route is presently closed.',
          '**Рамка «стиринг-вектор» относится к режиму внешнего адреса**, единственному, который проект сейчас использует. Она не относилась бы к случаю, где адреса вычисляются обученным поиском, — но глава 1 §10 объясняет, почему этот путь сейчас закрыт.'
        ),
        bi(
          '**The most effective repair is a change to the training objective**, which means the earlier thirteen runs measured a construction that was not being asked the right question. Their absolute numbers are of historical interest only; what carries forward is the ordering between arms.',
          '**Самая действенная починка — изменение обучающей цели**, а значит прежние тринадцать прогонов измеряли конструкцию, которой задавали не тот вопрос. Их абсолютные числа представляют только исторический интерес; вперёд переносится порядок между плечами.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 12
    { t: 'h2', id: 'changes', text: bi('12. What this changes for the rest of the series', '12. Что это меняет для остальной серии') },
    {
      t: 'p',
      text: bi(
        'The chapter\'s practical output is a working point rather than a discovery, and two of its findings reshape what comes next.',
        'Практический выход главы — рабочая точка, а не открытие, и два её вывода переопределяют то, что будет дальше.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The volume of the memory\'s addition is not an outcome of training — it is **a free parameter of the construction**, and it trades knowledge against text integrity directly. Chapter 3 has to choose it deliberately rather than inherit it, and choose it on the target domain rather than on counterfactual editing, where an edit must be loud enough to override a belief the model already holds. Writing an unknown API into a model may not require that.',
        'Громкость добавки памяти не является результатом обучения — это **свободный параметр конструкции**, и он напрямую торгует знание против целостности текста. Глава 3 обязана выбрать его осознанно, а не унаследовать, и выбирать на целевом домене, а не на контрфактическом редактировании, где правка должна быть достаточно громкой, чтобы перебить убеждение, которое модель уже держит. Запись неизвестного API в модель может этого не требовать.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'And the reference construction for further work is now the simplest thing that reproduces these numbers, not the most elaborate. The routing mechanism returns when, and only when, addresses stop being supplied from outside.',
        'А эталонной конструкцией для дальнейшей работы теперь является простейшее, что воспроизводит эти числа, а не самое сложное. Механизм маршрутизации возвращается тогда и только тогда, когда адреса перестанут подаваться снаружи.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Chapter 3 takes up incrementality: whether the pointwise locality of Chapter 1 survives a series of updates, which is the flagship claim of the whole line of work and is currently measured at a handful of waves rather than the twenty it needs.',
        'Глава 3 берётся за инкрементальность: переживает ли точечная локальность главы 1 серию обновлений — флагманское утверждение всей линии работы, измеренное сейчас на горстке волн вместо нужных двадцати.'
      ),
    },

    // ---------------------------------------------------------------- notes
    { t: 'h2', id: 'cost', text: bi('Methodological note on cost', 'Методологическая заметка о стоимости') },
    {
      t: 'p',
      text: bi(
        'This matters for the credibility of a solo, unfunded programme more than for the science. A full training run on Qwen3-8B is 7.8 minutes; a complete run including model load and all measurements is about twenty minutes, or roughly twenty-four cents on a rented L4. The twenty-five runs behind this chapter cost about six dollars of compute. The expense in this kind of work is not the GPU — it is the machine sitting idle between runs, which is why the runs are queued and the instance shuts itself down.',
        'Это важнее для доверия к одиночной программе без финансирования, чем для науки. Полный обучающий прогон на Qwen3-8B — 7.8 минуты; полный прогон с загрузкой модели и всеми замерами — около двадцати минут, или примерно двадцать четыре цента на арендованном L4. Двадцать пять прогонов, стоящих за этой главой, обошлись примерно в шесть долларов вычислений. Затратна в такой работе не видеокарта, а машина, простаивающая между прогонами, — поэтому прогоны ставятся в очередь, а инстанс сам себя гасит.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I mention it because the target user of this system is someone who cannot fine-tune. It would be incoherent to establish that by burning a cluster.',
        'Упоминаю это потому, что целевой пользователь системы — тот, кто не может дообучать. Устанавливать это, спалив кластер, было бы несвязно.'
      ),
    },
    { t: 'h2', id: 'disclosure', text: bi('Reproducibility and disclosure', 'Воспроизводимость и раскрытие') },
    {
      t: 'p',
      text: bi(
        'As in Chapter 1: this is a preview of a closed project. Every measured number, every control, every failed prediction and every retraction is reported. The implementation is not — specifically, the form of the gate, the construction of the locally scoped objective, the addressing internals, and the code. The anchor weights and graft depths appear because they are the axes of the experiments and the results are meaningless without them; they are reported as findings, not as a recipe.',
        'Как и в главе 1: это превью закрытого проекта. Каждое измеренное число, каждый контроль, каждое провалившееся предсказание и каждый отзыв приведены. Реализация — нет: в частности, форма гейта, устройство локально ограниченной цели, внутренности адресации и код. Веса якоря и глубины врезки присутствуют, потому что это оси экспериментов и без них результаты бессмысленны; они приводятся как находки, а не как рецепт.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Nothing here is independently reproducible from this chapter alone. What it can do is state a result and its boundary precisely enough to be useful or to be disbelieved.',
        'Ничто здесь не воспроизводимо независимо по одной этой главе. Что она может — назвать результат и его границу достаточно точно, чтобы быть полезной или чтобы ей не поверили.'
      ),
    },

    { t: 'h2', id: 'retractions', text: bi('Retractions in this chapter', 'Отзывы утверждений в этой главе') },
    {
      t: 'p',
      text: bi(
        'Collected in one place, because a reader who has seen the earlier write-ups deserves them without hunting:',
        'Собраны в одном месте, потому что читатель, видевший прежние отчёты, заслуживает получить их без поисков:'
      ),
    },
    {
      t: 'ol',
      items: [
        bi(
          '**"The fact/text trade-off is a property of the construction."** Withdrawn (§1). It rested on comparing perplexities computed over different token buckets with different base levels.',
          '**«Компромисс факт/текст — свойство конструкции.»** Отозвано (§1). Держалось на сравнении перплексий, посчитанных по разным корзинам токенов с разными базовыми уровнями.'
        ),
        bi(
          '**"For a constant vector, \'quiet everywhere except the answer\' has no solution, and efficacy must collapse."** Falsified by the first run that tested it (§4). Efficacy 0.982.',
          '**«Для постоянного вектора у условия „тихо везде, кроме ответа“ решения нет, и efficacy обязана обрушиться.»** Фальсифицировано первым же прогоном, который это проверил (§4). Efficacy 0.982.'
        ),
        bi(
          '**"A loss over the full string teaches the memory to alter the distribution on prose."** Sign error (§5). That loss was the only thing constraining it.',
          '**«Лосс по всей строке учит память менять распределение на прозе.»** Ошибка знака (§5). Этот лосс был единственным, что её ограничивало.'
        ),
        bi(
          '**"Anchor weight 1 is cleaner than weight 0.3."** Withdrawn (§8), on the grounds of seed scatter measured after the claim was made.',
          '**«Вес якоря 1 чище, чем 0.3.»** Отозвано (§8) на основании разброса по сидам, измеренного уже после того, как утверждение было сделано.'
        ),
      ],
    },
    { t: 'h2', id: 'funding', text: bi('Funding and conflicts', 'Финансирование и конфликты интересов') },
    {
      t: 'p',
      text: bi(
        'No funding. No institutional affiliation. No revenue. Compute rented personally.',
        'Финансирования нет. Институциональной принадлежности нет. Выручки нет. Вычисления арендованы лично.'
      ),
    },
    { t: 'h2', id: 'refs', text: bi('References', 'Литература') },
    {
      t: 'refs',
      items: [
        'Turner et al., Activation Addition: Steering Language Models Without Optimization, 2023. arXiv:2308.10248',
        'Braun et al., A Sober Look at Steering Vectors for LLMs, 2025.',
        'Minimizing Collateral Damage in Activation Steering, 2026. arXiv:2605.01167',
        'On the Effectiveness–Fluency Trade-Off in LLM Conditioning: A Systematic Study, 2026. arXiv:2606.12234',
        'Patterns and Mechanisms of Contrastive Activation Engineering, 2025. arXiv:2505.03189',
        'Interpretable Steering of Large Language Models with Feature Guided Activation Additions, 2025. arXiv:2501.09929',
        'Lample et al., Large Memory Layers with Product Keys, 2019.',
        'Meta FAIR, Memory Layers at Scale, 2024. arXiv:2412.09764',
        'Meng et al., Locating and Editing Factual Associations in GPT (ROME), 2022.',
        'Zhong et al., MQuAKE, 2023.',
      ],
    },
  ],
};
