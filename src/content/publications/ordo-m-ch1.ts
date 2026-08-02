import { bi } from '../../i18n/types';
import type { Publication } from './types';

/**
 * Ordo-M Technical Report, Chapter 1 — published in full.
 * English is the language it was written in; the Russian side is a translation.
 */
export const ordoMChapter1: Publication = {
  id: 'ordo-m-ch1-locality',
  slug: 'ordo-m-ch1-locality',
  chapter: 1,
  project: 'Ordo-M',
  date: '2026-08-02',
  minutes: 24,
  author: 'Russel Gavery (Gavrilov Ruslan, @8hrsk)',
  cutoff: '2026-08-02',
  sourceFile: 'papers/ordo-m-ch1-locality.md',
  status: bi(
    'Independent research, single author, unfunded',
    'Независимое исследование, один автор, без финансирования'
  ),
  title: bi(
    'Grafting an Addressable Memory onto a Frozen LLM: Zero Collateral Damage in Pointwise Edits, and Exactly Where the Addressing Breaks',
    'Приделанная адресуемая память на замороженной LLM: нулевой побочный ущерб при точечной правке и точное место, где ломается адресация'
  ),
  subtitle: bi(
    'Ordo-M Technical Report, Chapter 1',
    'Технический отчёт Ordo-M, глава 1'
  ),

  abstract: [
    bi(
      'I attach a sparse, externally addressed memory module to an off-the-shelf language model whose weights are never modified, and I measure what happens when a single fact in that memory is overwritten. On CounterFact with Qwen3-8B, editing 50 facts out of 500 damages **0.0 percentage points** of the remaining 450, while a LoRA adapter of matched parameter capacity (144.6M vs 145.8M) damages **8.4 points** on the same data with the same evaluation code. Specificity on neighborhood prompts holds at 82.9% for the memory against a 83.6% pre-edit baseline, and collapses to 30.0% for LoRA. On MQuAKE multi-hop questions the edited fact changes the outcome of the reasoning chain by +29.6 points where the question names the edited entity, and by −0.2 points where it does not.',
      'Я приделываю разреженный модуль памяти с внешней адресацией к готовой языковой модели, веса которой не меняются ни разу, и измеряю, что происходит при перезаписи одного факта в этой памяти. На CounterFact с Qwen3-8B правка 50 фактов из 500 повреждает **0.0 процентных пункта** у оставшихся 450, тогда как LoRA-адаптер равной параметрической ёмкости (144.6M против 145.8M) повреждает **8.4 пункта** на тех же данных и тем же кодом замера. Специфичность на соседских промптах у памяти держится на 82.9% против базовых 83.6% до правки и обваливается до 30.0% у LoRA. На многошаговых вопросах MQuAKE отредактированный факт меняет исход цепочки рассуждения на +29.6 пункта там, где вопрос называет отредактированную сущность, и на −0.2 пункта там, где не называет.'
    ),
    bi(
      'That last pair of numbers is the point of this report as much as the first. The memory computes its address from an explicit surface mention of the entity; where no mention exists, it returns exactly zero, and the measured gain is exactly zero. This is a property of the construction rather than an outcome of training, and I show that the headroom it leaves is large: supplying the address externally on the same indirect questions recovers **+37.0 points**. I also report the failed route to closing that gap — addressing from the model\'s own hidden state is not viable, because at the depth where the memory is read the identity of the entity is no longer present in the residual stream (top-1 recovery 0.003 against 0.694 measured on the name token itself).',
      'Эта последняя пара чисел — такой же предмет отчёта, как и первая. Память вычисляет адрес из явного поверхностного упоминания сущности; там, где упоминания нет, она возвращает ровно ноль, и измеренный прирост тоже ровно нулевой. Это свойство конструкции, а не результат обучения, и я показываю, что оставленный им запас велик: подача адреса снаружи на тех же косвенных вопросах возвращает **+37.0 пункта**. Я также сообщаю о провалившемся пути к закрытию этого разрыва: адресация по собственному скрытому состоянию модели нежизнеспособна, потому что на глубине, где память читается, личности сущности в остаточном потоке уже нет (top-1 восстановление 0.003 против 0.694, измеренных на самом токене имени).'
    ),
    bi(
      'Three of the first four experimental runs of this project produced zero, and I report them in full, including two defects in my own measurement harness that would each have been publishable as a success. This is a preview of a closed project: I give every measured number and the reasoning behind every design decision, and I withhold implementation.',
      'Три из первых четырёх экспериментальных прогонов этого проекта дали ноль, и я привожу их целиком — включая два дефекта в собственном стенде замеров, каждый из которых можно было бы опубликовать как успех. Это превью закрытого проекта: я даю все измеренные числа и рассуждение за каждым решением конструкции, но не даю реализацию.'
    ),
  ],

  blocks: [
    // ---------------------------------------------------------------- 1
    { t: 'h2', id: 'why', text: bi('1. Why this problem', '1. Почему эта задача') },
    {
      t: 'p',
      text: bi(
        'There is a class of user for whom fine-tuning does not exist. A company that wants its internal wiki inside an assistant, or a developer who wants a code agent that knows the current version of a library, needs a model in the 27B class and above to be useful, and has a bench of one or two consumer GPUs. Training such a model is not a budget question for them; it is an infrastructure question they cannot answer.',
        'Есть класс пользователей, для которых дообучения не существует. Компании, которая хочет свою внутреннюю вики внутри ассистента, или разработчику, которому нужен кодовый агент, знающий текущую версию библиотеки, требуется модель класса 27B и выше, чтобы она была полезна, — а в распоряжении стенд из одной-двух потребительских видеокарт. Обучение такой модели для них не вопрос бюджета; это вопрос инфраструктуры, на который они не могут ответить.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The two available answers are both compromises. Retrieval-augmented generation puts the knowledge into the context window, which costs a retrieval hop on every query, spends context that the task needs, and — as recent work on knowledge conflict shows — produces unpredictable output when the retrieved passage contradicts what the model already believes. Parameter-efficient fine-tuning puts the knowledge into the weights, but a low-rank adapter is a **dense operator**: it multiplies against activations for every token, and it is updated only as a whole. When the documentation changes, you retrain the adapter on the delta and you find out what happened to everything else by running the entire evaluation again.',
        'Два доступных ответа — оба компромиссы. Генерация с извлечением кладёт знание в окно контекста, а это стоит одного похода в поиск на каждый запрос, тратит контекст, нужный самой задаче, и — как показывают недавние работы про конфликт знаний — даёт непредсказуемый вывод, когда найденный фрагмент противоречит тому, во что модель уже верит. Параметрически эффективное дообучение кладёт знание в веса, но низкоранговый адаптер — это **плотный оператор**: он умножается на активации для каждого токена и обновляется только целиком. Когда документация меняется, вы переобучаете адаптер на дельте и узнаёте, что стало со всем остальным, прогнав замер целиком заново.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The requirement I set was narrower than "make the model learn documentation". It was:',
        'Требование, которое я поставил, было уже, чем «заставить модель выучить документацию». Оно звучало так:'
      ),
    },
    {
      t: 'quote',
      text: bi(
        'Write knowledge into a frozen model such that updating one item provably does not disturb the others.',
        'Записать знание в замороженную модель так, чтобы обновление одного элемента доказуемо не задевало остальные.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'If that holds, a new version of a corpus can be written over the old one without re-verifying the rest. If it does not hold, the product does not exist regardless of how well the knowledge is learned in the first place.',
        'Если это держится, новую версию корпуса можно записать поверх старой, не перепроверяя всё остальное. Если не держится, продукта нет независимо от того, насколько хорошо знание выучено в первый раз.'
      ),
    },

    // ---------------------------------------------------------------- 2
    { t: 'h2', id: 'tested', text: bi('2. What is being tested, and what counts as failure', '2. Что проверяется и что считается провалом') },
    {
      t: 'p',
      text: bi(
        'The construction is a table of trainable value slots inserted into the forward pass of a frozen transformer at roughly two-thirds of its depth, read by a deterministic address computed from the entity name found in the text. The base model is not modified in any way: no weights, no class substitution, no patching. The module can be disabled in place, which matters for measurement — without it, a regression test would have to compare two separate model loads and would pick up differences that have nothing to do with the memory.',
        'Конструкция — это таблица обучаемых слотов значений, вставленная в прямой проход замороженного трансформера примерно на двух третях его глубины и читаемая по детерминированному адресу, вычисленному из имени сущности, найденного в тексте. Базовая модель не меняется никак: ни весов, ни подмены классов, ни патчей. Модуль можно отключить на месте, и это важно для замера — без этого регрессионный тест сравнивал бы две отдельные загрузки модели и ловил бы различия, не имеющие к памяти никакого отношения.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Three questions, each with its own number and its own failure mode:',
        'Три вопроса, у каждого своё число и свой способ провалиться:'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('Question', 'Вопрос'), bi('Failure means', 'Провал означает')],
      align: ['l', 'l', 'l'],
      rows: [
        [bi('**A**', '**A**'), bi('Does the memory learn anything at all?', 'Учится ли память хоть чему-нибудь?'), bi('Gradient does not reach it, or capacity is absent', 'Градиент до неё не доходит либо ёмкости нет')],
        [bi('**B**', '**B**'), bi('Is the base model still intact?', 'Цела ли базовая модель?'), bi('The memory smears across all behavior instead of adding to it', 'Память размазывается по всему поведению вместо того, чтобы к нему добавляться')],
        [bi('**C**', '**C**'), bi('**Is the stored knowledge addressable?**', '**Адресуемо ли записанное знание?**'), bi('The only reason the project exists is not satisfied', 'Единственная причина существования проекта не выполнена')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'A and B are necessary conditions. C is the thesis. A "no" on C closes the line of work in weeks instead of months, and that is an acceptable outcome, not a defeat.',
        'A и B — необходимые условия. C — сам тезис. «Нет» на C закрывает направление за недели вместо месяцев, и это приемлемый исход, а не поражение.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'An important framing note that shaped everything downstream: memory layers in the literature are introduced **during pretraining**. The network grows around the memory and learns to use it. Here the base is finished and frozen. The question is whether a frozen network can learn to read a module that did not exist when it was trained — when the only thing that learns is the module itself.',
        'Важная рамочная оговорка, определившая всё дальнейшее: слои памяти в литературе вводятся **на предобучении**. Сеть растёт вокруг памяти и учится ею пользоваться. Здесь база закончена и заморожена. Вопрос в том, может ли замороженная сеть научиться читать модуль, которого не существовало в момент её обучения, — когда единственное, что учится, это сам модуль.'
      ),
    },

    // ---------------------------------------------------------------- 3
    { t: 'h2', id: 'setup', text: bi('3. Setup', '3. Постановка') },
    {
      t: 'ul',
      items: [
        bi(
          '**Base model:** Qwen3-8B, official safetensors weights, frozen throughout. Earlier pilots on Qwen3-0.6B.',
          '**Базовая модель:** Qwen3-8B, официальные веса safetensors, заморожены на всём протяжении. Ранние пилоты на Qwen3-0.6B.'
        ),
        bi(
          '**Hardware:** NVIDIA L4 24GB (GCP) for the main runs, RTX 4090 (rented) for later series, MacBook Pro M1 8GB for offline development and mechanism self-tests.',
          '**Железо:** NVIDIA L4 24GB (GCP) для основных прогонов, RTX 4090 (аренда) для более поздних серий, MacBook Pro M1 8GB для офлайн-разработки и самопроверок механизма.'
        ),
        bi(
          '**Datasets:** CounterFact (21,919 records) and MQuAKE-CF-3k (3,000). Chosen not for realism but because CounterFact\'s structure mirrors the metrics I needed as a built-in test — `requested_rewrite` for injection, `paraphrase_prompts` for generalization to unseen phrasings, `neighborhood_prompts` for collateral damage, `generation_prompts` for application — and because the resulting numbers are comparable to the ROME/MEMIT line of work.',
          '**Наборы данных:** CounterFact (21 919 записей) и MQuAKE-CF-3k (3000). Выбраны не за реалистичность, а потому что структура CounterFact повторяет нужные мне метрики как встроенный тест — `requested_rewrite` для внедрения, `paraphrase_prompts` для обобщения на невиданные формулировки, `neighborhood_prompts` для побочного ущерба, `generation_prompts` для применения — и потому что получаемые числа сопоставимы с линией работ ROME/MEMIT.'
        ),
        bi(
          '**Control arm:** LoRA of matched capacity. The rank is not chosen, it is computed: the actual parameter count of the memory configuration divided by the summed input and output dimensions of the target layers, giving rank 53 and 144.6M trainable parameters against the memory\'s 145.8M. Both arms are scored by **the same evaluation code**; a separate path for the adapter would have been tempting, since it needs no address, but then any difference in padding or answer-boundary handling would land in the gap between arms and read as an architectural difference.',
          '**Контрольное плечо:** LoRA равной ёмкости. Ранг не выбран, а вычислен: фактическое число параметров конфигурации памяти, делённое на сумму входных и выходных размерностей целевых слоёв, что даёт ранг 53 и 144.6M обучаемых параметров против 145.8M у памяти. Оба плеча считаются **одним и тем же кодом замера**; отдельный путь для адаптера был бы соблазнителен, раз ему не нужен адрес, но тогда любое различие в паддинге или в обработке границы ответа осело бы в разрыве между плечами и читалось бы как архитектурная разница.'
        ),
        bi(
          '**Metric:** length-normalized log-probability comparison between the two candidate answers, as in the editing literature — an order of magnitude cheaper than generation and independent of how the model chooses to format its output. Greedy generation is also reported on one prompt set, so the numbers reconcile with the earlier oracle runs.',
          '**Метрика:** сравнение логвероятностей двух кандидатных ответов с нормировкой на длину, как в литературе по редактированию, — на порядок дешевле генерации и не зависит от того, как модель решит оформить вывод. Жадная генерация тоже приводится на одном наборе промптов, чтобы числа сходились с более ранними оракульными прогонами.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 4
    { t: 'h2', id: 'zeros', text: bi('4. The first three runs returned zero, and the zeros were the useful part', '4. Первые три прогона дали ноль, и именно нули оказались полезными') },
    { t: 'h3', text: bi('4.1 Run 1: the memory learned the prior, not the facts', '4.1 Прогон 1: память выучила априор, а не факты') },
    {
      t: 'p',
      text: bi(
        'Qwen3-0.6B, 200 synthetic facts about invented entities, 900 steps, 49 minutes on a laptop. Loss fell from 5.97 to 1.15. Read naively, the result looks like a success — recall on the training facts went from 1.0% to 20.0%.',
        'Qwen3-0.6B, 200 синтетических фактов о выдуманных сущностях, 900 шагов, 49 минут на ноутбуке. Лосс упал с 5.97 до 1.15. При наивном прочтении результат выглядит успехом — полнота на обучающих фактах выросла с 1.0% до 20.0%.'
      ),
    },
    {
      t: 'table',
      head: [bi('Metric', 'Метрика'), bi('Before', 'До'), bi('After', 'После'), bi('Expected', 'Ожидалось')],
      align: ['l', 'r', 'r', 'l'],
      rows: [
        [bi('recall, **train**', 'полнота, **обучение**'), bi('1.0%', '1.0%'), bi('**20.0%**', '**20.0%**'), bi('increase', 'рост')],
        [bi('recall, **control** (same generator, never shown)', 'полнота, **контроль** (тот же генератор, никогда не показывался)'), bi('2.0%', '2.0%'), bi('**16.0%**', '**16.0%**'), bi('unchanged', 'без изменений')],
        [bi('recall, **negative** (non-existent subjects)', 'полнота, **негатив** (несуществующие субъекты)'), bi('4.0%', '4.0%'), bi('**20.0%**', '**20.0%**'), bi('unchanged', 'без изменений')],
        [bi('perplexity, neutral text', 'перплексия, нейтральный текст'), bi('28.5', '28.5'), bi('**1154.9**', '**1154.9**'), bi('unchanged', 'без изменений')],
        [bi('KL divergence to base', 'KL-дивергенция к базе'), bi('0.0000', '0.0000'), bi('**3.79**', '**3.79**'), bi('≈ 0', '≈ 0')],
        [bi('slot occupancy', 'занятость слотов'), bi('87.0%', '87.0%'), bi('**18.1%**', '**18.1%**'), bi('≥ 87%', '≥ 87%')],
        [bi('slot overlap between facts', 'пересечение слотов между фактами'), bi('0.27', '0.27'), bi('**0.68**', '**0.68**'), bi('≤ 0.27', '≤ 0.27')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The control and negative sets rose almost as much as the training set. What was learned is "in a prompt of this shape, name a plausible technical value" — a prior over answers, not a set of facts. Without the control and negative sets this would have been reported as 1% → 20%. They exist for exactly this case.',
        'Контрольный и негативный наборы выросли почти так же, как обучающий. Выучено было «в промпте такой формы назови правдоподобное техническое значение» — априор над ответами, а не набор фактов. Без контрольного и негативного наборов это было бы отчитано как 1% → 20%. Они и существуют ровно для такого случая.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The base was also destroyed: perplexity on neutral text rose forty-fold. A regression of that size means the memory is not adding to the model, it is overriding it.',
        'База при этом была разрушена: перплексия на нейтральном тексте выросла в сорок раз. Регрессия такого размера означает, что память не добавляется к модели, а перебивает её.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The mechanistic cause is in the last two rows. Occupancy fell from 87% to 18%, overlap between facts rose from 0.27 to 0.68 — **the addressing collapsed**. All facts read mostly the same slots, so the memory physically cannot hold them separately; it retains one degree of freedom, a single direction added to everything. This is a known disease: key-usage collapse in product-key memory, router degeneration in mixture-of-experts.',
        'Механистическая причина — в двух последних строках. Занятость упала с 87% до 18%, пересечение между фактами выросло с 0.27 до 0.68 — **адресация схлопнулась**. Все факты читают в основном одни и те же слоты, поэтому память физически не может держать их раздельно; у неё остаётся одна степень свободы — единственное направление, добавляемое ко всему. Это известная болезнь: схлопывание использования ключей в product-key памяти, вырождение роутера в mixture-of-experts.'
      ),
    },

    { t: 'h3', text: bi('4.2 The fix worked on its target and the hypothesis still failed', '4.2 Починка сработала по своей цели, а гипотеза всё равно провалилась') },
    {
      t: 'p',
      text: bi(
        'Three mechanisms were added against three named causes: query normalization against collapse, a load-balancing penalty against concentration of lookups, and a KL anchor to the base on neutral text against regression. The anchor text is held in a **separate file** from the probe text used for measurement; anchoring on the measurement text is training on the test, and the regression figure would have been zero by construction and meaningless.',
        'Против трёх названных причин добавлены три механизма: нормализация запроса против схлопывания, штраф за балансировку нагрузки против концентрации обращений и KL-якорь к базе на нейтральном тексте против регрессии. Текст якоря хранится в **отдельном файле** от пробного текста, на котором ведётся замер; якориться на измерительном тексте — значит обучаться на тесте, и цифра регрессии оказалась бы нулевой по построению и бессмысленной.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Repeated on Qwen3-8B, with a no-mechanism control run first to confirm that the failure was not an artifact of the 0.6B model:',
        'Повторено на Qwen3-8B, с предварительным контрольным прогоном без механизмов, чтобы убедиться, что провал не артефакт модели 0.6B:'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('control', 'контроль'), bi('+ three mechanisms', '+ три механизма')],
      align: ['l', 'l', 'l'],
      rows: [
        [bi('recall train / control / negative', 'полнота обучение / контроль / негатив'), bi('16.2 / **17.3** / 12.0%', '16.2 / **17.3** / 12.0%'), bi('15.3 / **16.3** / 13.3%', '15.3 / **16.3** / 13.3%')],
        [bi('perplexity, neutral text', 'перплексия, нейтральный текст'), bi('12.78 → **4029**', '12.78 → **4029**'), bi('12.78 → **13.72**', '12.78 → **13.72**')],
        [bi('slot occupancy', 'занятость слотов'), bi('57.7% → **4.6%**', '57.7% → **4.6%**'), bi('99.2% → **38.0%**', '99.2% → **38.0%**')],
        [bi('slot overlap between facts', 'пересечение слотов между фактами'), bi('0.12 → **0.667**', '0.12 → **0.667**'), bi('0.16 → **0.298**', '0.16 → **0.298**')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The failure reproduced at 8B, so it was not a small-model artifact. The three mechanisms hit their targets precisely — base regression fell from ×315 to +7.4%, collapse was prevented — **and the fact-learning hypothesis still failed by the same numbers**. Which means the collapse explanation described a symptom.',
        'Провал воспроизвёлся на 8B, значит это не артефакт маленькой модели. Три механизма попали ровно в свои цели — регрессия базы упала с ×315 до +7.4%, схлопывание было предотвращено, — **и гипотеза о выучивании фактов всё равно провалилась теми же числами**. А это значит, что объяснение через схлопывание описывало симптом.'
      ),
    },

    { t: 'h3', text: bi('4.3 The actual cause: writing to one address and reading from another', '4.3 Настоящая причина: запись по одному адресу, чтение по другому') },
    {
      t: 'p',
      text: bi(
        'The diagnostic that did not exist in the harness was the one that mattered. Slot-signature overlap was computed **between different facts**. But memory is written at an address derived from a training template and read at an address derived from an evaluation template, and whether those two addresses coincide had never been checked. The measurement requires no training:',
        'Диагностики, которой в стенде не было, как раз и не хватало. Пересечение сигнатур слотов считалось **между разными фактами**. Но память пишется по адресу, выведенному из обучающего шаблона, и читается по адресу, выведенному из шаблона замера, — а совпадают ли эти два адреса, никто не проверял. Замер не требует обучения:'
      ),
    },
    {
      t: 'readout',
      rows: [
        { label: bi('one fact, two training templates', 'один факт, два обучающих шаблона'), value: '0.203' },
        { label: bi('one fact, training ↔ evaluation  ← the write→read path', 'один факт, обучение ↔ замер  ← путь запись→чтение'), value: '0.184' },
        { label: bi('different facts, evaluation template  ← the "random" level', 'разные факты, шаблон замера  ← «случайный» уровень'), value: '0.360' },
      ],
    },
    {
      t: 'p',
      text: bi(
        'Overlap between *different facts* is **higher** than overlap for the *same fact* across templates. Addressing was determined by the shape of the phrase, not by the entity. There was no connected write→read path, and therefore the central question of the project had not been tested by any of the three runs.',
        'Пересечение между *разными фактами* **выше**, чем пересечение для *одного и того же факта* между шаблонами. Адресация определялась формой фразы, а не сущностью. Связного пути запись→чтение не было, а значит центральный вопрос проекта ни одним из трёх прогонов проверен не был.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**This is the single most useful result in the chapter.** A construction can fail silently for reasons entirely outside the hypothesis under test, and the only defense is a diagnostic that measures the plumbing rather than the outcome.',
        '**Это самый полезный результат главы.** Конструкция может молча провалиться по причинам, целиком лежащим вне проверяемой гипотезы, и единственная защита — диагностика, измеряющая проводку, а не исход.'
      ),
    },

    // ---------------------------------------------------------------- 5
    { t: 'h2', id: 'oracle', text: bi('5. Reading exists: the oracle control', '5. Чтение существует: оракульный контроль') },
    {
      t: 'p',
      text: bi(
        'The decisive experiment does not compare before and after. It swaps the address on a single fixed prompt, holding weights, text, and everything else constant, and asks whether the answer follows the address.',
        'Решающий эксперимент не сравнивает «до» и «после». Он подменяет адрес на одном фиксированном промпте, удерживая веса, текст и всё остальное неизменным, и спрашивает, следует ли ответ за адресом.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'With the address supplied externally from the entity name, and only the value slots trained:',
        'При адресе, поданном снаружи из имени сущности, и при обучении только слотов значений:'
      ),
    },
    {
      t: 'readout',
      rows: [
        { label: bi('recall, own address', 'полнота, свой адрес'), value: '89.0%' },
        { label: bi('recall, foreign address', 'полнота, чужой адрес'), value: '2.2%' },
        { label: bi('recall, control set', 'полнота, контрольный набор'), value: '1.5%' },
        { label: bi('recall, memory disabled', 'полнота, память отключена'), value: '1.2%' },
      ],
    },
    {
      t: 'p',
      text: bi(
        '**A frozen network can read a memory module grafted into it after training, and the contents are addressable in the strict sense.** Reproduced three times with gaps of +86.8, +87.0 and +86.8 points. Every prior failure was a defect in learned addressing, not a property of the architecture.',
        '**Замороженная сеть способна читать модуль памяти, приделанный к ней после обучения, и содержимое адресуемо в строгом смысле.** Воспроизведено трижды с разрывами +86.8, +87.0 и +86.8 пункта. Все прежние провалы были дефектом обученной адресации, а не свойством архитектуры.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The oracle was built as a debugging tool and turned out to be the architecture. If the address is computed from the entity name by a deterministic function rather than by a learned lookup, the storage remains parametric, the memory is editable by key, and on text containing no known entity it stays silent — so base regression is zero by construction rather than by the size of a penalty term. The open question moves from "does this work" to **"how do you compute the address on real text"**.',
        'Оракул строился как инструмент отладки и оказался архитектурой. Если адрес вычисляется из имени сущности детерминированной функцией, а не обученным поиском, хранение остаётся параметрическим, память редактируется по ключу, а на тексте без известных сущностей она молчит — и регрессия базы нулевая по построению, а не за счёт величины штрафного слагаемого. Открытый вопрос смещается с «работает ли это» на **«как вычислять адрес на настоящем тексте»**.'
      ),
    },

    // ---------------------------------------------------------------- 6
    { t: 'h2', id: 'isolation', text: bi('6. Where isolation leaks, and the rule that follows', '6. Где протекает изоляция и какое правило из этого следует') },
    {
      t: 'p',
      text: bi('Overwrite 50 facts out of 500 and look at the other 450.', 'Перезаписать 50 фактов из 500 и посмотреть на остальные 450.'),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('shared output projection trainable', 'общая выходная проекция обучаема'), bi('frozen', 'заморожена')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('new value', 'новое значение'), bi('98.0%', '98.0%'), bi('98.0%', '98.0%')],
        [bi('old value', 'старое значение'), bi('0.0%', '0.0%'), bi('0.0%', '0.0%')],
        [bi('remaining facts', 'оставшиеся факты'), bi('88.9% → **58.4%**', '88.9% → **58.4%**'), bi('88.2% → **88.2%**', '88.2% → **88.2%**')],
        [bi('**collateral damage**', '**побочный ущерб**'), bi('**30.4 pts**', '**30.4 п.п.**'), bi('**0.0 pts**', '**0.0 п.п.**')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Slot collisions were 1.6%, so the storage was already disjoint — and the damage was still 30 points. It leaked through the **shared output projection**, which sits on the read path of every fact and, during an edit, re-fits itself to the 50 targets at the expense of the rest. Freezing everything shared removes the damage entirely without degrading the edit.',
        'Коллизий слотов было 1.6%, то есть хранение уже было раздельным — а ущерб всё равно составил 30 пунктов. Он протёк через **общую выходную проекцию**, которая стоит на пути чтения каждого факта и во время правки переподгоняется под 50 целей за счёт всех остальных. Заморозка всего общего убирает ущерб полностью, не ухудшая саму правку.'
      ),
    },
    {
      t: 'quote',
      text: bi(
        '**The rule, and it generalizes beyond this project: isolation of storage is worth nothing as long as one parameter on the read path is both shared and trainable.**',
        '**Правило, и оно обобщается за пределы этого проекта: изоляция хранения не стоит ничего, пока хотя бы один параметр на пути чтения одновременно общий и обучаемый.**'
      ),
    },

    // ---------------------------------------------------------------- 7
    { t: 'h2', id: 'comparison', text: bi('7. The main comparison: memory against LoRA of matched capacity', '7. Основное сравнение: память против LoRA равной ёмкости') },
    {
      t: 'p',
      text: bi(
        '"An attached memory works" means nothing on its own — it might work exactly as well as any adapter of the same size. The only interesting question is whether the memory does something the adapter cannot, and the answer lives in the locality of the edit.',
        '«Приделанная память работает» само по себе не значит ничего — она может работать ровно так же, как любой адаптер того же размера. Единственный интересный вопрос — делает ли память то, чего не может адаптер, и ответ лежит в локальности правки.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Both arms, 500 CounterFact records, override regime, same evaluation code, Qwen3-8B on L4:',
        'Оба плеча, 500 записей CounterFact, режим перезаписи, один и тот же код замера, Qwen3-8B на L4:'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('Ordo-M', 'Ordo-M'), bi('LoRA', 'LoRA')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('trainable parameters', 'обучаемых параметров'), bi('145.8M', '145.8M'), bi('144.6M (rank 53)', '144.6M (ранг 53)')],
        [bi('efficacy', 'efficacy'), bi('**100.0%**', '**100.0%**'), bi('**100.0%**', '**100.0%**')],
        [bi('generalization (paraphrase)', 'обобщение (парафраз)'), bi('**97.2%**', '**97.2%**'), bi('92.4%', '92.4%')],
        [bi('specificity, before → after', 'специфичность, до → после'), bi('83.6% → **82.9%**', '83.6% → **82.9%**'), bi('83.6% → **30.0%**', '83.6% → **30.0%**')],
        [bi('greedy generation', 'жадная генерация'), bi('99.8%', '99.8%'), bi('100.0%', '100.0%')],
        [bi('perplexity, module on / off', 'перплексия, модуль вкл / выкл'), bi('26.40 / 26.40', '26.40 / 26.40'), bi('344.91 / 26.36', '344.91 / 26.36')],
        [bi('**damage to the other 450 when 50 are edited**', '**ущерб остальным 450 при правке 50**'), bi('**0.0 pts**', '**0.0 п.п.**'), bi('**8.4 pts**', '**8.4 п.п.**')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'LoRA is not undertrained — its edit loss fell from 2.79 to 0.02 and it took the new values in 100% of cases. The difference sits precisely on the claimed property: a dense adapter has no isolated address, whereas the memory, with shared parameters frozen, changes only the target slots.',
        'LoRA не недообучена — её лосс правки упал с 2.79 до 0.02, и она приняла новые значения в 100% случаев. Различие лежит ровно на заявленном свойстве: у плотного адаптера нет изолированного адреса, тогда как память при замороженных общих параметрах меняет только целевые слоты.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'A separate control that matters for the specificity row: the entity registry is built over **all 20,391** entities in the dataset while only 500 are trained. A neighborhood prompt therefore lands in the slots of a registered but untrained entity — random initialization — and the specificity check tests something real. Had the registry known only the trained entities, such prompts would find no address, the memory would be silent by construction, and there would be nothing to check.',
        'Отдельный контроль, важный для строки специфичности: реестр сущностей строится по **всем 20 391** сущности набора, тогда как обучаются только 500. Поэтому соседский промпт попадает в слоты зарегистрированной, но не обученной сущности — случайная инициализация, — и проверка специфичности проверяет нечто настоящее. Если бы реестр знал только обученные сущности, такие промпты не нашли бы адреса, память молчала бы по построению, и проверять было бы нечего.'
      ),
    },

    { t: 'h3', text: bi('7.1 Two defects in my own harness, found after the fact', '7.1 Два дефекта в собственном стенде, найденных задним числом') },
    {
      t: 'p',
      text: bi(
        'Neither of these changes the locality conclusion, and both would have inflated a different claim.',
        'Ни один из них не меняет вывод о локальности, и оба раздули бы другое утверждение.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The override regime made one number tautological.** In override, the edit rewrites toward the value the base model already believes: with the memory disabled the base prefers it in **87.8%** of cases. The edit produced 88.0%. That is the same level, and "the memory wrote the new value" is indistinguishable from "the memory stopped asserting the old one, and then the base spoke."',
        '**Режим перезаписи сделал одно число тавтологичным.** При перезаписи правка переписывает в сторону значения, в которое базовая модель уже верит: с отключённой памятью база предпочитает его в **87.8%** случаев. Правка дала 88.0%. Это тот же уровень, и «память записала новое значение» неотличимо от «память перестала утверждать старое, и тогда заговорила база».'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('base, memory off', 'база, память выкл'), bi('after edit', 'после правки'), bi('what can be claimed', 'что можно утверждать')],
      align: ['l', 'r', 'r', 'l'],
      rows: [
        [bi('override, memory', 'перезапись, память'), bi('87.8%', '87.8%'), bi('88.0%', '88.0%'), bi('old value removed; says nothing about writing', 'старое значение убрано; о записи не говорит ничего')],
        [bi('override, LoRA', 'перезапись, LoRA'), bi('87.8%', '87.8%'), bi('100.0%', '100.0%'), bi('above baseline — new value written', 'выше базового уровня — новое значение записано')],
        [bi('injection, memory', 'внедрение, память'), bi('1.6%', '1.6%'), bi('0.0%', '0.0%'), bi('nowhere to retreat, and no write occurred', 'отступать некуда, и записи не произошло')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The working hypothesis this leaves is that **an edit restricted to value slots can erase but not write**. For locality that is sufficient — erasure must also be addressable, and it is. For "updatable memory" it is not, and it is the subject of a later chapter. A `base_off` control now prints alongside every edit result so the substitution cannot recur.',
        'Остающаяся рабочая гипотеза: **правка, ограниченная слотами значений, умеет стирать, но не писать**. Для локальности этого достаточно — стирание тоже обязано быть адресуемым, и оно адресуемо. Для «обновляемой памяти» недостаточно, и это предмет более поздней главы. Контроль `base_off` теперь печатается рядом с каждым результатом правки, чтобы подмена не могла повториться.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The edit budgets were not equal.** The budget was specified in epochs, and the number of steps depends on batch size: 120 steps for the memory, **390** for LoRA. A comment in the configuration asserted they were equal. The 8.4-point figure was therefore obtained at roughly three times the budget of the 0.0-point figure, and until it is re-shot it must be read with that qualification. Both arms are now driven by an explicit step budget.',
        '**Бюджеты правки не были равны.** Бюджет задавался в эпохах, а число шагов зависит от размера батча: 120 шагов у памяти, **390** у LoRA. Комментарий в конфигурации утверждал, что они равны. Цифра 8.4 пункта, таким образом, получена примерно при тройном бюджете относительно цифры 0.0, и до переснятия её нужно читать с этой оговоркой. Оба плеча теперь управляются явным бюджетом шагов.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I keep both of these in the report rather than in a footnote because a locality claim is exactly the kind of claim that a favorable measurement bug produces for free.',
        'Я держу оба этих пункта в отчёте, а не в сноске, потому что утверждение о локальности — ровно тот класс утверждений, который удобный баг в замере выдаёт бесплатно.'
      ),
    },

    // ---------------------------------------------------------------- 8
    { t: 'h2', id: 'mquake', text: bi('8. Application, not recitation: MQuAKE', '8. Применение, а не пересказ: MQuAKE') },
    {
      t: 'p',
      text: bi(
        'Asking about a fact with the same prompt used to write it measures string recall. MQuAKE asks a question requiring a chain of reasoning, with the edit placed on one link of the chain. Two buckets, scored separately:',
        'Спрашивать о факте тем же промптом, которым он записывался, — значит мерить запоминание строки. MQuAKE задаёт вопрос, требующий цепочки рассуждения, причём правка стоит на одном звене цепочки. Две корзины, считаются раздельно:'
      ),
    },
    {
      t: 'table',
      head: [bi('bucket', 'корзина'), bi('what it is', 'что это'), bi('expectation', 'ожидание')],
      align: ['l', 'l', 'l'],
      rows: [
        [bi('`addressable`', '`addressable`'), bi('the edited subject is named verbatim in the question (≈39%)', 'отредактированный субъект назван в вопросе дословно (≈39%)'), bi('addressing must work', 'адресация обязана работать')],
        [bi('`indirect`', '`indirect`'), bi('it is not named; the edit sits off the first link', 'он не назван; правка стоит не на первом звене'), bi('zero gain', 'нулевой прирост')],
      ],
    },
    { t: 'p', text: bi('On 300 cases with a single edit:', 'На 300 случаях с одной правкой:') },
    {
      t: 'table',
      head: [bi('', ''), bi('before', 'до'), bi('after', 'после')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('hop-1, the fact itself', 'шаг 1, сам факт'), bi('11.3%', '11.3%'), bi('**100.0%**', '**100.0%**')],
        [bi('`addressable`', '`addressable`'), bi('35.3%', '35.3%'), bi('**65.0%**', '**65.0%**')],
        [bi('`indirect`', '`indirect`'), bi('19.9%', '19.9%'), bi('19.7%', '19.7%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'On addressable questions the fact is not merely reproduced, it changes the outcome of the chain: **+29.6 points**. On indirect questions the gain is **−0.2 points**. Averaging the two buckets would have yielded a cheerful single number and destroyed the information: the measured boundary coincides exactly with the boundary of symbolic addressing by explicit mention.',
        'На адресуемых вопросах факт не просто воспроизводится, он меняет исход цепочки: **+29.6 пункта**. На косвенных вопросах прирост составляет **−0.2 пункта**. Усреднение двух корзин дало бы бодрое единое число и уничтожило бы информацию: измеренная граница точно совпадает с границей символьной адресации по явному упоминанию.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The dataset itself sets that boundary. In CounterFact the subject appears verbatim in **all 43,838** paraphrase prompts, so substring matching covers the set entirely and that bench tests the plumbing rather than the hard part of addressing. In MQuAKE the edited subject appears in the multi-hop question in only **39.4%** of cases. This is not a defect of the dataset; it is the limit of applicability, and it should be measured rather than papered over.',
        'Границу задаёт сам набор данных. В CounterFact субъект встречается дословно во **всех 43 838** промптах-парафразах, поэтому поиск подстроки покрывает набор целиком, и этот бенчмарк проверяет проводку, а не трудную часть адресации. В MQuAKE отредактированный субъект встречается в многошаговом вопросе только в **39.4%** случаев. Это не дефект набора; это предел применимости, и его следует измерять, а не заглаживать.'
      ),
    },

    // ---------------------------------------------------------------- 9
    { t: 'h2', id: 'crowding', text: bi('9. Slot crowding: the cost of "address by entity" turned out to be zero', '9. Теснота слотов: цена «адреса по сущности» оказалась нулевой') },
    {
      t: 'p',
      text: bi(
        'Addressing by subject rather than by fact means every fact about one entity writes into the same slots and competes for them. This caveat stood in my notes from day one. It is not true.',
        'Адресация по субъекту, а не по факту, означает, что все факты об одной сущности пишутся в одни и те же слоты и конкурируют за них. Эта оговорка стояла в моих заметках с первого дня. Она неверна.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The comparison uses one population and one training run: 687 two-fact subjects (after discarding 353 whose two records share a relation — those are not two facts but two incompatible answers) split in half, one half trained on a single fact, the other on both, comparing the first fact of each half.',
        'Сравнение использует одну популяцию и один прогон обучения: 687 субъектов с двумя фактами (после отбрасывания 353, у которых обе записи делят одно отношение, — это не два факта, а два несовместимых ответа), разделённые пополам: одна половина обучается на одном факте, другая на обоих, сравнивается первый факт каждой половины.'
      ),
    },
    {
      t: 'table',
      head: [bi('group', 'группа'), bi('efficacy before', 'efficacy до'), bi('efficacy after', 'efficacy после'), bi('logP gap', 'разрыв logP'), bi('generalization', 'обобщение')],
      align: ['l', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('one fact (n=300)', 'один факт (n=300)'), bi('12.3%', '12.3%'), bi('99.0%', '99.0%'), bi('+8.14', '+8.14'), bi('96.3%', '96.3%')],
        [bi('two facts, same slots (n=300)', 'два факта, одни слоты (n=300)'), bi('11.7%', '11.7%'), bi('**99.7%**', '**99.7%**'), bi('+9.26', '+9.26'), bi('95.8%', '95.8%')],
        [bi('three facts (n=31)', 'три факта (n=31)'), bi('9.7%', '9.7%'), bi('**100.0%**', '**100.0%**'), bi('+11.09', '+11.09'), bi('100.0%', '100.0%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'No gap, and the log-probability margin is *larger* in the crowded groups. The likely explanation is a division of labor: the memory supplies one averaged vector for the entity, and the frozen network distinguishes among that entity\'s facts using the relation named in the prompt. Storage does not have to be per-fact if the query context already separates the facts. That is an argument for the construction, not against it.',
        'Разрыва нет, а запас по логвероятности в тесных группах *больше*. Вероятное объяснение — разделение труда: память поставляет один усреднённый вектор для сущности, а замороженная сеть различает факты этой сущности по отношению, названному в промпте. Хранение не обязано быть пофактовым, если контекст запроса уже разделяет факты. Это аргумент за конструкцию, а не против неё.'
      ),
    },
    { t: 'p', text: bi('A four-times wider address is strictly worse on every axis:', 'Вчетверо более широкий адрес строго хуже по каждой оси:') },
    {
      t: 'table',
      head: [bi('', ''), bi('16 slots', '16 слотов'), bi('64 slots', '64 слота')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('efficacy, one fact', 'efficacy, один факт'), bi('**99.0%**', '**99.0%**'), bi('95.3%', '95.3%')],
        [bi('efficacy, two facts', 'efficacy, два факта'), bi('**99.7%**', '**99.7%**'), bi('97.7%', '97.7%')],
        [bi('generalization, one fact', 'обобщение, один факт'), bi('**96.3%**', '**96.3%**'), bi('88.8%', '88.8%')],
        [bi('perplexity on mentions of *untrained* entities', 'перплексия на упоминаниях *необученных* сущностей'), bi('**+1.36%**', '**+1.36%**'), bi('+10.90%', '+10.90%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Reading is a uniform average over the entity\'s slots, so at 64 slots each value enters at weight 1/64 instead of 1/16. For the same number of steps the signal is diluted fourfold, the shared output projection compensates by amplifying, and an amplified projection also drags the random initialization of untrained entities into the residual stream. Hence the last row. Sixteen slots is not "enough for now" — it is better than more.',
        'Чтение — равномерное усреднение по слотам сущности, поэтому при 64 слотах каждое значение входит с весом 1/64 вместо 1/16. При том же числе шагов сигнал разбавлен вчетверо, общая выходная проекция компенсирует усилением, а усиленная проекция заодно затаскивает в остаточный поток случайную инициализацию необученных сущностей. Отсюда последняя строка. Шестнадцать слотов — это не «пока хватит», это лучше, чем больше.'
      ),
    },

    // ---------------------------------------------------------------- 10
    { t: 'h2', id: 'stops', text: bi('10. Where the addressing genuinely stops', '10. Где адресация действительно кончается') },
    {
      t: 'p',
      text: bi(
        'Three failure modes in surface matching were found by measurement on real data, each silent, each worth a point or two, each easily written off as "the data is like that": possessive forms gluing a name to its apostrophe; a trailing period in a canonical key that a text slice never reaches; and a common noun registered as an entity, which the sticky address then jumped to. After fixing them, the subject is located in 100.0% of write prompts, paraphrases and generation prompts; neighborhood prompts find no address 76.1% of the time and a foreign registered entity 23.9% of the time.',
        'Три способа отказа поверхностного сопоставления были найдены замером на реальных данных — каждый молчаливый, каждый ценой в пункт-другой, каждый легко списываемый на «такие данные»: притяжательные формы, приклеивающие имя к апострофу; завершающая точка в каноническом ключе, до которой срез текста никогда не доходит; и нарицательное существительное, зарегистрированное как сущность, на которое затем прыгал липкий адрес. После починки субъект находится в 100.0% промптов записи, парафразов и промптов генерации; соседские промпты не находят адреса в 76.1% случаев и находят чужую зарегистрированную сущность в 23.9%.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'One defect deserves its own paragraph, because it repeats the central error of the project. During training the address was computed over the **entire** training text, answer included — and 40.7% of CounterFact target values are themselves registered entities. The sticky address jumped to the answer, and the fact was written into the answer\'s slots and read from the subject\'s. Measured: **37.6% of training texts landed on the wrong address.** After the fix, 0.00%.',
        'Один дефект заслуживает отдельного абзаца, потому что он повторяет центральную ошибку проекта. При обучении адрес вычислялся по **всему** обучающему тексту, включая ответ, — а 40.7% целевых значений CounterFact сами являются зарегистрированными сущностями. Липкий адрес прыгал на ответ, и факт записывался в слоты ответа, а читался из слотов субъекта. Замерено: **37.6% обучающих текстов попадали не по тому адресу.** После починки — 0.00%.'
      ),
    },
    {
      t: 'quote',
      text: bi(
        'A counter for "address not on the intended subject" belongs in the log permanently. This class of failure raises no exception and produces no loss spike — only a quiet zero on the metric, which is subsequently explained by the architecture.',
        'Счётчик «адрес не на предполагаемом субъекте» должен стоять в логе постоянно. Этот класс отказов не поднимает исключений и не даёт всплеска лосса — только тихий ноль на метрике, который потом объясняют архитектурой.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'And the real boundary, the one that is a property of the design rather than a bug:',
        'И настоящая граница — та, которая свойство конструкции, а не баг:'
      ),
    },
    {
      t: 'ul',
      items: [
        bi(
          'Where the entity is not mentioned, no address is computed and the memory returns exactly zero.',
          'Там, где сущность не упомянута, адрес не вычисляется и память возвращает ровно ноль.'
        ),
        bi(
          'Supplying the address externally on the indirect MQuAKE bucket recovers **+37.0 points**. So the ceiling is known and the bottleneck is the address computation, not the reading. (Caveat found inside that measurement and worth stating: in 60.7% of indirect questions the edited target value coincides with the chain\'s answer, which makes part of that bucket tautological.)',
          'Подача адреса снаружи на косвенной корзине MQuAKE возвращает **+37.0 пункта**. Значит потолок известен, а узкое место — вычисление адреса, а не чтение. (Оговорка, найденная внутри этого замера и достойная упоминания: в 60.7% косвенных вопросов отредактированное целевое значение совпадает с ответом цепочки, что делает часть этой корзины тавтологичной.)'
        ),
        bi(
          '**Computing the address from the model\'s own hidden state is closed as a general solution.** At the depth where the memory is read, the identity of the entity is no longer recoverable from the residual stream: top-1 recovery 0.003, against 0.694 measured on the name token itself. The precise claim is narrower than "the information is gone": 0.003 means it is not present *in the same form*, so a learned mapping between positions is not ruled out — but the cheap version, decoding the identity directly where the memory reads, does not exist.',
          '**Вычисление адреса по собственному скрытому состоянию модели закрыто как общее решение.** На глубине, где читается память, личность сущности из остаточного потока уже не восстанавливается: top-1 восстановление 0.003 против 0.694, измеренных на самом токене имени. Точное утверждение уже, чем «информация исчезла»: 0.003 означает, что её нет *в том же виде*, поэтому обученное отображение между позициями не исключено — но дешёвого варианта, декодирования личности прямо там, где память читает, не существует.'
        ),
        bi(
          'For code and documentation this does not bite. A symbol name and a file path repeat verbatim, so a hash of the string is a sufficient address, and the open vocabulary comes free. For prose it bites, and that is a separate chapter.',
          'Для кода и документации это не мешает. Имя символа и путь к файлу повторяются дословно, поэтому хэша от строки достаточно в качестве адреса, а открытый словарь достаётся бесплатно. Для прозы мешает, и это отдельная глава.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 11
    { t: 'h2', id: 'related', text: bi('11. Related work and where this sits', '11. Смежные работы и место этой') },
    {
      t: 'p',
      text: bi(
        '**Memory layers.** *Memory Layers at Scale* (Meta FAIR, 2024) is where the mechanism comes from — trainable key-value lookup that adds parameters without adding FLOPs, scaled to 128B memory parameters, with gains most pronounced on factual tasks. The critical difference is that memory layers are introduced **at pretraining time**. Whether one can be attached to a finished frozen model was, at the start of this project, unresolved; §5 answers it affirmatively.',
        '**Слои памяти.** *Memory Layers at Scale* (Meta FAIR, 2024) — источник механизма: обучаемый поиск ключ-значение, добавляющий параметры без добавления FLOPs, отмасштабированный до 128B параметров памяти, с наибольшим выигрышем на фактологических задачах. Критическое различие в том, что слои памяти вводятся **на предобучении**. Можно ли приделать такой слой к готовой замороженной модели, на старте этого проекта было неясно; §5 отвечает утвердительно.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Sparse memory finetuning.** The closest existing work is the *Continual Learning via Sparse Memory Finetuning* line (Meta, 2025) and its 2026 follow-ups, which insert key-value memory layers and, on each step, train only the value rows the current batch reads most heavily, ranked by TF-IDF or KL. Reported forgetting is dramatically better than the alternatives — an 11% relative drop on NaturalQuestions against 71% for LoRA and 89% for full fine-tuning at comparable acquisition of new knowledge.',
        '**Разреженное дообучение памяти.** Ближайшая существующая работа — линия *Continual Learning via Sparse Memory Finetuning* (Meta, 2025) и её продолжения 2026 года, где вставляются слои памяти ключ-значение и на каждом шаге обучаются только те строки значений, которые текущий батч читает интенсивнее всего, ранжированные по TF-IDF или KL. Заявленное забывание там драматически лучше альтернатив: относительное падение 11% на NaturalQuestions против 71% у LoRA и 89% у полного дообучения при сопоставимом усвоении нового знания.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The difference is in where the isolation comes from, and it is the difference between statistical and structural. There, the set of rows to update is *inferred* from activation statistics, so isolation is very good but approximate. Here the address is a **deterministic function of a string that exists in the source**, so the set of touched slots is known before the forward pass and disjointness is decidable rather than measured. That is what buys the 0.0 rather than a small number, and what makes an update auditable — you can state which slots an update will touch before running it. The price is stated plainly in §10: no mention, no address, no memory. Sparse memory finetuning has no such blind spot, because its addressing is content-based. **The two numbers are not directly comparable** — different benchmarks, different forgetting probes — and I present this as a difference in construction, not as a win.',
        'Различие в том, откуда берётся изоляция, и это различие между статистической и структурной. Там множество обновляемых строк *выводится* из статистики активаций, поэтому изоляция очень хорошая, но приблизительная. Здесь адрес — **детерминированная функция строки, существующей в источнике**, поэтому множество затронутых слотов известно до прямого прохода, и раздельность разрешима, а не измеряема. Именно это покупает 0.0 вместо маленького числа и делает обновление проверяемым: можно назвать, каких слотов коснётся обновление, до его запуска. Цена прямо названа в §10: нет упоминания — нет адреса — нет памяти. У разреженного дообучения памяти такой слепой зоны нет, потому что его адресация основана на содержании. **Два числа напрямую не сравнимы** — разные бенчмарки, разные пробы на забывание, — и я подаю это как различие конструкций, а не как победу.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Knowledge injection into frozen models.** *TokenMem* (2026) injects knowledge into frozen LLMs through a dedicated cross-attention channel specifically to avoid competing with parametric memory in the residual stream, training a small gating adapter and reporting large gains in compliance with counterfactual knowledge over vanilla RAG. It shares my premise — the base stays frozen, the knowledge lives outside it — and differs in the channel: cross-attention over retrieved tokens against a direct residual-stream addition read by symbolic address. *Memory Grafting* (2026) uses frozen hidden states as n-gram memory retrieved by longest-match exact lookup, which is architecturally the closest thing to my addressing scheme that I am aware of, though aimed at pretraining efficiency rather than at updatability.',
        '**Внедрение знания в замороженные модели.** *TokenMem* (2026) внедряет знание в замороженные LLM через выделенный канал перекрёстного внимания именно для того, чтобы не конкурировать с параметрической памятью в остаточном потоке; обучается маленький управляющий адаптер, и заявляется большой выигрыш в следовании контрфактическому знанию по сравнению с обычным RAG. Работа разделяет мою посылку — база остаётся замороженной, знание живёт вне её — и различается каналом: перекрёстное внимание по извлечённым токенам против прямого добавления в остаточный поток, читаемого по символьному адресу. *Memory Grafting* (2026) использует замороженные скрытые состояния как n-граммную память, извлекаемую точным поиском по самому длинному совпадению, — архитектурно это ближайшее к моей схеме адресации из известного мне, хотя нацелено на эффективность предобучения, а не на обновляемость.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Model editing.** ROME and MEMIT define the metric set I report against. The active problem in that literature is precisely sequential degradation — recent surveys and benchmarks find that edit success, locality and portability all degrade under long edit sequences across essentially all methods, which is what the 2026 crop of sequential-editing methods is built to postpone. My claim in this chapter is narrower and structurally different: not that degradation is slow, but that for a single pointwise edit it is absent, because the edit does not touch the parameters that carry the other facts. Whether that survives twenty sequential updates is Chapter 3, and I do not claim it here.',
        '**Редактирование моделей.** ROME и MEMIT задают набор метрик, относительно которого я отчитываюсь. Активная проблема в той литературе — как раз последовательная деградация: недавние обзоры и бенчмарки находят, что успешность правки, локальность и переносимость деградируют при длинных сериях правок практически у всех методов, и урожай методов последовательного редактирования 2026 года построен, чтобы это отсрочить. Моё утверждение в этой главе уже и структурно иное: не что деградация медленная, а что для одной точечной правки её нет, потому что правка не касается параметров, несущих остальные факты. Переживает ли это двадцать последовательных обновлений — глава 3, и здесь я этого не утверждаю.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**LoRA.** *LoRA Learns Less and Forgets Less* (TMLR 2024) sets the rank/forgetting tradeoff that the control arm is configured against, and is the reason the control uses rank 53 rather than the conventional 8–16. It also predicts the shape of the result I got: the adapter learns the edit perfectly and disturbs more of its surroundings.',
        '**LoRA.** *LoRA Learns Less and Forgets Less* (TMLR 2024) задаёт компромисс «ранг против забывания», под который настроено контрольное плечо, и является причиной, по которой контроль использует ранг 53, а не привычные 8–16. Она же предсказывает форму полученного мной результата: адаптер идеально выучивает правку и сильнее возмущает окружение.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Capacity.** *Knowledge Capacity Scaling Laws* (ICLR 2025) puts the ceiling at roughly 2 bits of knowledge per parameter and shows int8 quantization does not lower it while int4 does. This is why I do not pursue "forget something to make room": there is no capacity shortage to relieve.',
        '**Ёмкость.** *Knowledge Capacity Scaling Laws* (ICLR 2025) ставит потолок примерно в 2 бита знания на параметр и показывает, что квантование int8 его не снижает, а int4 снижает. Поэтому я не иду по пути «забыть что-нибудь, чтобы освободить место»: дефицита ёмкости, который надо облегчать, нет.'
      ),
    },

    // ---------------------------------------------------------------- 12
    { t: 'h2', id: 'notshown', text: bi('12. What this does not show', '12. Чего эта работа не показывает') },
    {
      t: 'p',
      text: bi(
        'An honest list, so the result is not read for more than it is.',
        'Честный список, чтобы результат не прочитали шире, чем он есть.'
      ),
    },
    {
      t: 'ol',
      items: [
        bi(
          '**Benchmark facts are not documentation.** CounterFact and MQuAKE are more realistic than synthetic triples and still do not test a coherent API surface, code examples, or contradictions between versions.',
          '**Факты из бенчмарков — не документация.** CounterFact и MQuAKE реалистичнее синтетических троек и всё же не проверяют ни связную поверхность API, ни примеры кода, ни противоречия между версиями.'
        ),
        bi(
          '**Crowding is verified only to three facts per entity**, and only 31 subjects at three. An API symbol has dozens of facts — signature, return value, exceptions, defaults, deprecation, examples — and where the limit falls is unknown.',
          '**Теснота проверена только до трёх фактов на сущность**, причём на трёх — всего 31 субъект. У символа API десятки фактов: сигнатура, возвращаемое значение, исключения, значения по умолчанию, устаревание, примеры, — и где проходит предел, неизвестно.'
        ),
        bi(
          '**Indirect addressing is unsolved, and its ceiling is now measured.** +37.0 points of headroom, with the hidden-state route closed.',
          '**Косвенная адресация не решена, и её потолок теперь измерен.** Запас +37.0 пункта при закрытом пути через скрытое состояние.'
        ),
        bi(
          '**The baseline comparison is incomplete.** A global LoRA of matched capacity has been run. Routed LoRA, a keyed soft prompt and a codebook baseline have not, and without them the effect of the gate is not separated from the effect of the storage.',
          '**Сравнение с бейзлайнами неполно.** Глобальная LoRA равной ёмкости прогнана. Маршрутизируемая LoRA, мягкий промпт с ключом и кодбук-бейзлайн — нет, а без них эффект гейта не отделён от эффекта хранения.'
        ),
        bi(
          '**One model size, one graft depth, one seed.** Everything substantive is Qwen3-8B at 0.66 depth. The positioning of the project is 27B and above, and between those two statements there is currently nothing.',
          '**Один размер модели, одна глубина врезки, один сид.** Всё содержательное — Qwen3-8B на глубине 0.66. Позиционирование проекта — 27B и выше, и между этими двумя утверждениями сейчас нет ничего.'
        ),
        bi(
          '**The 8.4-point LoRA figure carries the budget qualification of §7.1** until it is re-shot at an equal step budget.',
          '**Цифра 8.4 пункта у LoRA несёт бюджетную оговорку §7.1** до переснятия при равном бюджете шагов.'
        ),
        bi(
          '**The repeated edit on the injection set did not converge.** Injecting 62 previously unknown facts works — efficacy 1.6% → 100%, generalization 30.6% → 91.9%, greedy generation 93.5% against 0% with the memory disabled and 6.5% at a foreign address — but updating half of that small sample requires a separately tuned regime. This is an open result, not a success.',
          '**Повторная правка на наборе внедрения не сошлась.** Внедрение 62 ранее неизвестных фактов работает — efficacy 1.6% → 100%, обобщение 30.6% → 91.9%, жадная генерация 93.5% против 0% с отключённой памятью и 6.5% по чужому адресу, — но обновление половины этой маленькой выборки требует отдельно настроенного режима. Это открытый результат, а не успех.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 13
    { t: 'h2', id: 'next', text: bi('13. What comes next', '13. Что дальше') },
    {
      t: 'p',
      text: bi(
        'The chapters that follow this one, in the order the measurements exist:',
        'Главы, следующие за этой, в том порядке, в каком существуют замеры:'
      ),
    },
    {
      t: 'ul',
      items: [
        bi(
          '**Chapter 2 — why the memory damages text where it fires, and what the volume knob actually trades.** The regression probe had to be rebuilt: on the project\'s neutral corpus 0.0% of tokens are addressed, so equality with the base follows from the construction and proves nothing. A probe carrying entity mentions addresses 93% of tokens and tells a different story.',
          '**Глава 2 — почему память портит текст там, где срабатывает, и чем на самом деле торгует ручка громкости.** Пробу на регрессию пришлось перестроить: на нейтральном корпусе проекта адресуются 0.0% токенов, поэтому равенство базе следует из конструкции и не доказывает ничего. Проба, несущая упоминания сущностей, адресует 93% токенов и рассказывает другую историю.'
        ),
        bi(
          '**Chapter 3 — incrementality.** Whether pointwise locality survives a series of updates, which is the flagship claim of the product and is currently measured at a handful of waves rather than the twenty it needs.',
          '**Глава 3 — инкрементальность.** Переживает ли точечная локальность серию обновлений — это флагманское утверждение продукта, и сейчас оно измерено на горстке волн вместо нужных двадцати.'
        ),
        bi(
          '**Chapter 4 — the price in hardware.** Training cost against corpus volume, VRAM, quantization, and whether the table can live outside the GPU.',
          '**Глава 4 — цена в железе.** Стоимость обучения против объёма корпуса, VRAM, квантование и может ли таблица жить вне видеокарты.'
        ),
        bi(
          '**Chapter 5 — the first real domain, and the bar set by RAG.** A real library, a generated and audited question set, and a row of five retrievers with an oracle ceiling. I will state in advance what this chapter already knows: the base model does not know the domain at all, any retriever takes 38–40 points of the gap, and **symbolic addressing measured as a retriever currently loses to plain BM25**. The threshold the memory has to clear is a specific number, and whether it clears it is not yet decided.',
          '**Глава 5 — первый настоящий домен и планка, которую ставит RAG.** Настоящая библиотека, сгенерированный и проверенный набор вопросов и ряд из пяти извлекателей с оракульным потолком. Скажу заранее то, что эта глава уже знает: базовая модель не знает домен вообще, любой извлекатель забирает 38–40 пунктов разрыва, а **символьная адресация, измеренная как извлекатель, сейчас проигрывает обычному BM25**. Порог, который памяти надо взять, — конкретное число, и берёт ли она его, ещё не решено.'
        ),
      ],
    },

    // ---------------------------------------------------------------- disclosure
    { t: 'h2', id: 'disclosure', text: bi('Reproducibility and disclosure', 'Воспроизводимость и раскрытие') },
    {
      t: 'p',
      text: bi(
        'This is a preview of a closed project. Every measured number, every control, every failed run and every defect found in my own harness is reported here. The implementation — the addressing scheme\'s internals, the ingestion component, hyperparameters and code — is not. Public artifacts are the datasets, which are third-party and cited, and the base model, which is publicly released.',
        'Это превью закрытого проекта. Каждое измеренное число, каждый контроль, каждый провалившийся прогон и каждый дефект, найденный в собственном стенде, приведены здесь. Реализация — внутренности схемы адресации, компонент разбора источников, гиперпараметры и код — нет. Публичные артефакты — это наборы данных, сторонние и процитированные, и базовая модель, выпущенная публично.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I state this plainly because it is a real limitation: nothing in this chapter is independently reproducible from the chapter alone. What it can do is state a result and its boundary precisely enough that someone can decide whether the boundary matters to them.',
        'Я говорю это прямо, потому что это настоящее ограничение: ничто в этой главе не воспроизводимо независимо по одной только главе. Что она может — назвать результат и его границу достаточно точно, чтобы кто-то мог решить, важна ли ему эта граница.'
      ),
    },
    { t: 'h2', id: 'funding', text: bi('Funding and conflicts', 'Финансирование и конфликты интересов') },
    {
      t: 'p',
      text: bi(
        'No funding. No institutional affiliation. No revenue. Compute was rented personally: the main runs cost single-digit dollars — one full run on an L4 spot instance is roughly twenty minutes and about twenty-four cents.',
        'Финансирования нет. Институциональной принадлежности нет. Выручки нет. Вычисления арендованы лично: основные прогоны стоили однозначные суммы в долларах — один полный прогон на спот-инстансе L4 занимает примерно двадцать минут и стоит около двадцати четырёх центов.'
      ),
    },

    { t: 'h2', id: 'refs', text: bi('References', 'Литература') },
    {
      t: 'refs',
      items: [
        'Lample et al., Large Memory Layers with Product Keys, 2019.',
        'Meta FAIR, Memory Layers at Scale, 2024. arXiv:2412.09764',
        'Meta, Continual Learning via Sparse Memory Finetuning, 2025. arXiv:2510.15103; and Sparse Memory Finetuning as a Low-Forgetting Alternative to LoRA and Full Finetuning, 2026. arXiv:2605.03229',
        'TokenMem: Faithful Knowledge Injection for Frozen LLMs, 2026. arXiv:2607.22625',
        'Memory Grafting: Scaling Language Model Pre-training via Offline Conditional Memory, 2026. arXiv:2605.20948',
        'Meng et al., Locating and Editing Factual Associations in GPT (ROME), 2022; Mass-Editing Memory in a Transformer (MEMIT), 2023.',
        'Zhong et al., MQuAKE: Assessing Knowledge Editing in Language Models via Multi-Hop Questions, 2023.',
        'Biderman et al., LoRA Learns Less and Forgets Less, TMLR 2024. arXiv:2405.09673',
        'Allen-Zhu & Li, Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws, ICLR 2025. arXiv:2404.05405',
        'Yang et al., Synthetic Continued Pretraining (EntiGraph), ICLR 2025. arXiv:2409.07431',
      ],
    },
  ],
};
