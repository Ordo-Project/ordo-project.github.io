import { bi } from '../../i18n/types';
import type { Publication } from './types';

const blank = bi('', '');

/**
 * Ordo-M Technical Report, Chapter 3 — published in full.
 * English is the language it was written in; the Russian side is a translation.
 */
export const ordoMChapter3: Publication = {
  id: 'ordo-m-ch3-incrementality',
  slug: 'ordo-m-ch3-incrementality',
  chapter: 3,
  project: 'Ordo-M',
  date: '2026-08-02',
  minutes: 26,
  author: 'Russel Gavery (Gavrilov Ruslan, @8hrsk)',
  cutoff: '2026-08-02',
  sourceFile: 'papers/ordo-m-ch3-incrementality.md',
  status: bi(
    'Independent research, single author, unfunded',
    'Независимое исследование, один автор, без финансирования'
  ),
  title: bi(
    'Locality Was Not Bought at the Price of Trainability: How a Zero-Initialized Decoder Silently Made the First Update Privileged',
    'Локальность не куплена ценой обучаемости: как декодер, инициализированный нулём, молча сделал первое обновление привилегированным'
  ),
  subtitle: bi(
    'Ordo-M Technical Report, Chapter 3 · Companion to Chapters 1 and 2',
    'Технический отчёт Ordo-M, глава 3 · Спутник глав 1 и 2'
  ),

  abstract: [
    bi(
      'Chapter 1 established that a single pointwise edit to an externally addressed memory grafted into a frozen Qwen3-8B damages 0.0 percentage points of the surrounding knowledge. That is not the product claim. The product claim is a *series* of updates — documentation changes, and you write the delta over what is already there. This chapter measures the series, and it does so in two passes, because the first pass produced a negative result that I published and that turns out to be wrong.',
      'Глава 1 установила, что одна точечная правка памяти с внешней адресацией, приделанной к замороженной Qwen3-8B, повреждает 0.0 процентного пункта окружающего знания. Это не продуктовое утверждение. Продуктовое утверждение — это *серия* обновлений: документация меняется, и вы пишете дельту поверх того, что уже есть. Эта глава измеряет серию и делает это в два захода, потому что первый заход дал отрицательный результат, который я опубликовал и который оказался неверным.'
    ),
    bi(
      '**The first pass.** Five waves of 100 records each, the first training everything and the rest touching only value slots. Forgetting was absent — the earliest wave went 88.0% → 88.0% across four subsequent retrainings, a drift of **0.0 points** against a criterion of 3. But the later waves themselves learned at only 27–32% against 88% for the first and 97.3% for full retraining of the combined corpus, at identical wall-clock time. Tripling the training budget bought 37 points and pushed the cost to 583 seconds against 227 for retraining. The conclusion I drew and wrote down was: **locality is bought at the price of trainability.**',
      '**Первый заход.** Пять волн по 100 записей, первая обучает всё, остальные трогают только слоты значений. Забывания не было — самая ранняя волна прошла 88.0% → 88.0% через четыре последующих дообучения, дрейф **0.0 пункта** при критерии 3. Но сами поздние волны выучивались всего на 27–32% против 88% у первой и 97.3% у полного переобучения объединённого корпуса, при одинаковом времени по часам. Утроение бюджета обучения купило 37 пунктов и подняло цену до 583 секунд против 227 у переобучения. Вывод, который я сделал и записал: **локальность куплена ценой обучаемости.**'
    ),
    bi(
      '**The second pass refutes it.** The failure was not a slope but a single step at the freezing boundary, which localizes the defect. Under external addressing exactly one shared parameter is live — the output projection — and it is initialized to zero, which is precisely what makes the graft bitwise identical to the base model at insertion. The consequence, which was not in anyone\'s plan: on the first step the gradient reaching the value table is proportional to that zero matrix, so the projection moves first and alone, driven by whatever data happens to train first. **The subspace and the amplitude the memory can ever write with are not chosen; they grow out of the first wave\'s hundred records and are then frozen together with that wave\'s bias.**',
      '**Второй заход это опровергает.** Провал был не наклоном, а одной ступенькой на границе заморозки, а это локализует дефект. При внешней адресации живым остаётся ровно один общий параметр — выходная проекция, — и он инициализируется нулём, что как раз и делает врезку побитово равной базовой модели в момент вставки. Последствие, которого не было ни в чьём плане: на первом шаге градиент, доходящий до таблицы значений, пропорционален этой нулевой матрице, поэтому проекция двигается первой и в одиночку, ведомая теми данными, которым случилось обучаться первыми. **Подпространство и амплитуда, которыми память вообще способна писать, не выбираются; они вырастают из сотни записей первой волны и затем замораживаются вместе с её смещением.**'
    ),
    bi(
      'The fix that worked is not the one I expected. Calibrating the shared part once on a larger corpus and freezing it recovers parity with full retraining (96.2% against 96.9%, inside the 0.6-point measurement noise, at zero drift). But a scale sweep then showed that **the shared part does not need to be trained at all**: a frozen random orthogonal decoder that has never seen a single record, given the right scale, reaches 99.4% with perfectly symmetric waves — above full retraining. What looked like a learned write subspace was learned *loudness*, one number, and it can be assigned as a constant. Loudness is paid for in text, which is Chapter 2\'s trade-off arriving from a different direction. The working point I settle on gives waves of 90.0–96.0%, drift of 0.0 points, +36.8% perplexity on entity mentions and **+0.00%** on neutral prose — three times the knowledge of the original construction at a tenth of the damage, with **no shared parameter trained even once during the run**.',
      'Сработавшая починка — не та, которую я ожидал. Калибровка общей части один раз на большем корпусе с последующей заморозкой возвращает паритет с полным переобучением (96.2% против 96.9%, внутри измерительного шума в 0.6 пункта, при нулевом дрейфе). Но перебор по масштабу затем показал, что **общую часть не нужно обучать вовсе**: замороженный случайный ортогональный декодер, не видевший ни одной записи, при верном масштабе выходит на 99.4% с идеально симметричными волнами — выше полного переобучения. То, что выглядело как обученное подпространство записи, было обученной *громкостью* — одним числом, которое можно назначить константой. За громкость платит текст, и это компромисс главы 2, пришедший с другой стороны. Рабочая точка, на которой я остановился, даёт волны 90.0–96.0%, дрейф 0.0 пункта, +36.8% перплексии на упоминаниях сущностей и **+0.00%** на нейтральной прозе — втрое больше знания, чем у исходной конструкции, при десятикратно меньшем ущербе, причём **ни один общий параметр за прогон не обучается ни разу**.'
    ),
  ],

  blocks: [
    // ---------------------------------------------------------------- 1
    { t: 'h2', id: 'why', text: bi('1. What has to be measured, and why one edit is not enough', '1. Что надо измерить и почему одной правки недостаточно') },
    {
      t: 'p',
      text: bi(
        'Chapter 1\'s locality result covers a single edit. The system I am describing is supposed to absorb a documentation diff every time a library releases, which is a sequence of tens of updates, each written on top of everything already stored. Two things can go wrong in a sequence that cannot go wrong in one edit: the old knowledge can erode gradually, and the new knowledge can stop being absorbable.',
        'Результат по локальности из главы 1 покрывает одну правку. Описываемая система должна впитывать дельту документации при каждом релизе библиотеки, а это последовательность из десятков обновлений, каждое поверх всего уже сохранённого. В последовательности могут сломаться две вещи, которые в одной правке сломаться не могут: старое знание может постепенно размываться, а новое — перестать впитываться.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The measurement is a series of waves. The first wave trains the module; each later wave trains only the value slots of its own records, with everything shared frozen — the arrangement Chapter 1 identified as necessary, since isolation is worth nothing while any parameter on the read path is both shared and trainable. After every wave, **all** previous waves are re-measured. The result is a retention matrix: rows are "after which wave", columns are "how well is which wave remembered".',
        'Замер — это серия волн. Первая волна обучает модуль; каждая последующая обучает только слоты значений своих записей, при замороженном общем — устройство, которое глава 1 назвала необходимым, поскольку изоляция не стоит ничего, пока хоть один параметр на пути чтения одновременно общий и обучаемый. После каждой волны перезамеряются **все** предыдущие. Результат — матрица удержания: строки — «после какой волны», столбцы — «насколько хорошо помнится какая волна».'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The control arm is full retraining of the accumulated corpus, which is what a conventional adapter would require.',
        'Контрольное плечо — полное переобучение накопленного корпуса, то есть то, чего потребовал бы обычный адаптер.'
      ),
    },

    // ---------------------------------------------------------------- 2
    { t: 'h2', id: 'firstpass', text: bi('2. The first pass: forgetting is absent, and absorption collapses', '2. Первый заход: забывания нет, а впитывание обваливается') },
    { t: 'p', text: bi('Five waves of 100 CounterFact records, Qwen3-8B.', 'Пять волн по 100 записей CounterFact, Qwen3-8B.') },
    {
      t: 'table',
      head: [bi('after \\ wave', 'после \\ волна'), bi('0', '0'), bi('1', '1'), bi('2', '2'), bi('3', '3'), bi('4', '4')],
      align: ['l', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('0', '0'), bi('88.0%', '88.0%'), blank, blank, blank, blank],
        [bi('1', '1'), bi('88.0%', '88.0%'), bi('32.0%', '32.0%'), blank, blank, blank],
        [bi('2', '2'), bi('88.0%', '88.0%'), bi('32.0%', '32.0%'), bi('32.0%', '32.0%'), blank, blank],
        [bi('3', '3'), bi('88.0%', '88.0%'), bi('32.0%', '32.0%'), bi('32.0%', '32.0%'), bi('28.0%', '28.0%'), blank],
        [bi('4', '4'), bi('88.0%', '88.0%'), bi('32.5%', '32.5%'), bi('32.0%', '32.0%'), bi('28.0%', '28.0%'), bi('27.0%', '27.0%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        '**The good half.** The columns do not move. The first wave across four subsequent retrainings: 88.0% → 88.0%, a drift of **0.0 points**. Forgetting here is not a phenomenon to be fought, it is a phenomenon that does not occur: disjoint slots plus a frozen shared part give locality directly.',
        '**Хорошая половина.** Столбцы не двигаются. Первая волна через четыре последующих дообучения: 88.0% → 88.0%, дрейф **0.0 пункта**. Забывание здесь — не явление, с которым надо бороться, а явление, которого не происходит: раздельные слоты плюс замороженная общая часть дают локальность напрямую.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The bad half.** The later waves learn at 27–32% against 88% for the first and 97.3% for full retraining, a mean across waves of 41.5% against 97.3%. And the wall-clock times were **identical**: 227 seconds either way. In that form, incremental updating loses on quality and wins nothing on speed.',
        '**Плохая половина.** Поздние волны выучиваются на 27–32% против 88% у первой и 97.3% у полного переобучения, среднее по волнам 41.5% против 97.3%. А время по часам было **одинаковым**: 227 секунд в обоих случаях. В таком виде инкрементальное обновление проигрывает по качеству и ничего не выигрывает по скорости.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Training loss for the later waves stalls at 4.03–4.15 against 3.46 for the first, which looks like undertraining rather than a ceiling. Two explanations were available and only a measurement separates them: **budget** (later waves get fewer steps and half the learning rate, so incremental updating works but costs more than assumed) or **freezing** (the shared parameters are fitted to the first wave\'s slots and do not serve new ones, so locality and trainability are incompatible in this construction).',
        'Обучающий лосс поздних волн застревает на 4.03–4.15 против 3.46 у первой, и это похоже на недообучение, а не на потолок. Объяснений было два, и разделяет их только замер: **бюджет** (поздние волны получают меньше шагов и вдвое меньший темп обучения, значит инкрементальное обновление работает, но стоит дороже, чем предполагалось) или **заморозка** (общие параметры подогнаны под слоты первой волны и не обслуживают новые, значит локальность и обучаемость в этой конструкции несовместимы).'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Tripling the budget answered: both, and budget is the larger part. Later waves rose from 27–32% to 66–70.5%, buying about 37 points, while the drift of the first wave stayed at noise (+0.5 points) — a threefold more aggressive training of later waves did not touch the earlier records at all, which is an independent confirmation of locality under load.',
        'Утроение бюджета ответило: и то и другое, причём бюджет — бо́льшая часть. Поздние волны поднялись с 27–32% до 66–70.5%, купив около 37 пунктов, тогда как дрейф первой волны остался на уровне шума (+0.5 пункта) — втрое более агрессивное обучение поздних волн вообще не тронуло ранние записи, и это независимое подтверждение локальности под нагрузкой.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'But the gap did not close, and the price had risen out of proportion:',
        'Но разрыв не закрылся, а цена выросла непропорционально:'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('mean across waves', 'среднее по волнам'), bi('time', 'время')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('waves, 6 epochs', 'волны, 6 эпох'), bi('41.5%', '41.5%'), bi('227 s', '227 с')],
        [bi('waves, 18 epochs', 'волны, 18 эпох'), bi('**72.5%**', '**72.5%**'), bi('583 s', '583 с')],
        [bi('full retraining', 'полное переобучение'), bi('**97.3%**', '**97.3%**'), bi('227 s', '227 с')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Slower by a factor of 2.6 and worse by 25 points, simultaneously. I published that as a negative result under the heading **"locality in the present construction is bought at the price of trainability, and budget reduces that price without removing it."** The rest of this chapter is about why that sentence was wrong.',
        'Медленнее в 2.6 раза и хуже на 25 пунктов одновременно. Я опубликовал это как отрицательный результат под заголовком **«локальность в нынешней конструкции куплена ценой обучаемости, и бюджет снижает эту цену, не устраняя её».** Остаток главы — о том, почему эта фраза была неверна.'
      ),
    },
    { t: 'h3', text: bi('2.1 An observation from the same run that deserves its own paragraph', '2.1 Наблюдение из того же прогона, заслуживающее отдельного абзаца') },
    {
      t: 'p',
      text: bi(
        '**Full retraining of the combined corpus wrecks the text.** Perplexity on a probe carrying mentions of trained entities came to **+17860%** for retraining against **+463%** for waves. The control arm here is not a benign reference point; on base-model damage it is the worst of the options. Waves pay in the quality of new records and buy text integrity with it. Retraining does exactly the opposite.',
        '**Полное переобучение объединённого корпуса громит текст.** Перплексия на пробе, несущей упоминания обученных сущностей, составила **+17860%** у переобучения против **+463%** у волн. Контрольное плечо здесь не безобидная точка отсчёта; по ущербу базовой модели оно худшее из вариантов. Волны платят качеством новых записей и покупают на это целостность текста. Переобучение делает ровно наоборот.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'This did not change the conclusion at the time, and it should have made me suspicious of it. A control arm that wins the headline metric by destroying the thing the headline metric is supposed to be protecting is not a control arm you should be conceding to.',
        'Тогда это вывода не изменило, а должно было заставить меня в нём усомниться. Контрольное плечо, выигрывающее заглавную метрику ценой уничтожения того, что заглавная метрика должна защищать, — не то плечо, которому следует уступать.'
      ),
    },

    // ---------------------------------------------------------------- 3
    { t: 'h2', id: 'step', text: bi('3. A step, not a slope', '3. Ступенька, а не наклон') },
    {
      t: 'p',
      text: bi(
        'The distinction that decides what to repair, and the first pass stated it insufficiently clearly.',
        'Различие, которое решает, что чинить, и первый заход сформулировал его недостаточно ясно.'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('0', '0'), bi('1', '1'), bi('2', '2'), bi('3', '3'), bi('4', '4')],
      align: ['l', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('6 epochs', '6 эпох'), bi('88.0%', '88.0%'), bi('32.5%', '32.5%'), bi('32.0%', '32.0%'), bi('28.0%', '28.0%'), bi('27.0%', '27.0%')],
        [bi('18 epochs', '18 эпох'), bi('90.0%', '90.0%'), bi('69.0%', '69.0%'), bi('70.5%', '70.5%'), bi('67.0%', '67.0%'), bi('66.0%', '66.0%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Between waves 1 and 4 the difference is within two records per hundred. Between wave 0 and wave 1 it is more than twenty points. A slope would mean the construction accumulates damage and is doomed. A step means a defect in one specific place — a one-time discontinuity at the freezing boundary.',
        'Между волнами 1 и 4 разница в пределах двух записей на сотню. Между волной 0 и волной 1 — более двадцати пунктов. Наклон означал бы, что конструкция накапливает ущерб и обречена. Ступенька означает дефект в одном конкретном месте — однократный разрыв на границе заморозки.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The place was found by reading the construction, not by running anything. This is the second time in this project that has worked (Chapter 2 §2 is the first), and it is beginning to look like a method rather than a coincidence.',
        'Место найдено чтением конструкции, а не запуском чего-либо. Это второй раз в проекте, когда так сработало (первый — глава 2 §2), и это начинает выглядеть методом, а не совпадением.'
      ),
    },

    // ---------------------------------------------------------------- 4
    { t: 'h2', id: 'shared', text: bi('4. Exactly one shared parameter is live, and it starts at zero', '4. Живым остаётся ровно один общий параметр, и он стартует с нуля') },
    {
      t: 'p',
      text: bi(
        'Under external addressing the learned lookup is never invoked — the address supplies the slots directly, so the query projection, the half-key tables, the normalization and the temperature are dead code, and the gate is off in these configurations. What remains is one shared parameter through which everything passes: the output projection that carries the retrieved value into the residual stream.',
        'При внешней адресации обученный поиск не вызывается никогда — адрес подаёт слоты напрямую, поэтому проекция запроса, таблицы полуключей, нормализация и температура являются мёртвым кодом, а гейт в этих конфигурациях выключен. Остаётся один общий параметр, через который проходит всё: выходная проекция, переносящая извлечённое значение в остаточный поток.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'And it is initialized to **zero**. That is not an oversight; it is what buys the property Chapter 1 relies on, that the graft is bitwise identical to the base model at the moment of insertion. It is the same device as the zero-initialized second factor in LoRA, and for the same reason.',
        'И инициализируется он **нулём**. Это не недосмотр; именно это покупает свойство, на которое опирается глава 1, — что врезка побитово равна базовой модели в момент вставки. Это тот же приём, что и инициализированный нулём второй множитель в LoRA, и по той же причине.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The consequence was in nobody\'s plan. The memory\'s output is a product of two factors: the retrieved value and this projection. On the first step, the gradient with respect to the values is mediated by the projection — and the projection is zero, so the gradient with respect to the values is zero too. The projection moves first, and alone, driven by terms of the form "upstream gradient ⊗ retrieved value", evaluated on the records of whichever wave happens to train first.',
        'Последствия не было ни в чьём плане. Выход памяти — произведение двух множителей: извлечённого значения и этой проекции. На первом шаге градиент по значениям опосредован проекцией, а проекция равна нулю, значит и градиент по значениям равен нулю. Проекция двигается первой и в одиночку, ведомая слагаемыми вида «градиент сверху ⊗ извлечённое значение», вычисленными на записях той волны, которой случилось обучаться первой.'
      ),
    },
    {
      t: 'quote',
      text: bi(
        '**The subspace of the residual stream into which the memory is capable of writing at all is not chosen in advance. It grows out of the first wave\'s data and is frozen together with that wave\'s bias.**',
        '**Подпространство остаточного потока, в которое память вообще способна писать, не выбирается заранее. Оно вырастает из данных первой волны и замораживается вместе с её смещением.**'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The bias is measurable, and measuring it also revealed what it depends on:',
        'Смещение измеримо, и его измерение заодно показало, от чего оно зависит:'
      ),
    },
    {
      t: 'table',
      head: [bi('what trained the projection', 'что обучало проекцию'), bi('condition number', 'число обусловленности'), bi('effective dimension', 'эффективная размерность')],
      align: ['l', 'r', 'r'],
      rows: [
        [bi('wave 0, 100 records', 'волна 0, 100 записей'), bi('272.0', '272.0'), bi('**187.7** of 512', '**187.7** из 512')],
        [bi('calibration slice, 500 records', 'калибровочный срез, 500 записей'), bi('261.1', '261.1'), bi('**267.5** of 512', '**267.5** из 512')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Directions are not closed off — Adam updates coordinate-wise and leaves near-full rank — but their weights are distributed very differently, and a hundred records yield eighty fewer working directions than five hundred. This confirms an earlier conjecture that the shared part learns *from volume*: a wave of a hundred records selects a narrow subspace fitted to its own hundred facts, freezes it, and every subsequent wave finds itself a guest inside somebody else\'s metric.',
        'Направления не закрываются — Adam обновляет покоординатно и оставляет почти полный ранг, — но их веса распределены очень по-разному, и сотня записей даёт на восемьдесят рабочих направлений меньше, чем пятьсот. Это подтверждает более раннюю догадку, что общая часть учится *от объёма*: волна в сто записей выбирает узкое подпространство, подогнанное под её собственные сто фактов, замораживает его, и каждая последующая волна оказывается гостем внутри чужой метрики.'
      ),
    },

    // ---------------------------------------------------------------- 5
    { t: 'h2', id: 'arms', text: bi('5. Eight arms, and a measurement noise floor', '5. Восемь плеч и порог измерительного шума') },
    {
      t: 'p',
      text: bi(
        'All runs: Qwen3-8B, RTX 4090, CounterFact in override mode, five waves of 100 records. A wave takes 15–16 seconds; a full arm with all measurements runs 140 to 240 seconds.',
        'Все прогоны: Qwen3-8B, RTX 4090, CounterFact в режиме перезаписи, пять волн по 100 записей. Волна занимает 15–16 секунд; полное плечо со всеми замерами — от 140 до 240 секунд.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The baseline arm was re-run from scratch on the new card specifically as an anchor, because the first-pass numbers were taken on an L4 and comparing new arms against them without that check would have been illegitimate. Reproduction was complete: wave 0 at 89.0% against 88.0%, later waves 27.0–32.0% against 27.0–32.5%, mean across waves 41.4% against 41.5%, full retraining 96.9% against 97.3%. Everything inside measurement noise, at a third of the time.',
        'Базовое плечо было перезапущено с нуля на новой карте специально как якорь, потому что числа первого захода сняты на L4, и сравнивать с ними новые плечи без такой проверки было бы незаконно. Воспроизведение полное: волна 0 на 89.0% против 88.0%, поздние волны 27.0–32.0% против 27.0–32.5%, среднее по волнам 41.4% против 41.5%, полное переобучение 96.9% против 97.3%. Всё внутри измерительного шума, за треть времени.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Two arms were run twice in identical configurations before the operation that distinguishes them, and calibration knowledge came out 97.5% against 96.9%. That gives a **measurement noise of roughly 0.6 points on a sample of a thousand items** — the figure every claim below is checked against. A drift of +0.5 points is noise. A step of −3.1 points is not.',
        'Два плеча были прогнаны дважды в одинаковых конфигурациях до операции, которая их различает, и калибровочное знание вышло 97.5% против 96.9%. Это даёт **измерительный шум порядка 0.6 пункта на выборке в тысячу элементов** — величину, относительно которой проверяется каждое утверждение ниже. Дрейф +0.5 пункта — шум. Ступенька −3.1 пункта — нет.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '"Step" here and below means wave 0 minus the mean of the later waves; positive means the first wave was privileged.',
        '«Ступенька» здесь и далее означает волну 0 минус среднее по поздним волнам; положительное значение означает, что первая волна была привилегированной.'
      ),
    },
    {
      t: 'table',
      head: [bi('arm', 'плечо'), bi('what changes', 'что меняется'), bi('wave 0', 'волна 0'), bi('later', 'поздние'), bi('step', 'ступенька'), bi('drift', 'дрейф')],
      align: ['l', 'l', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('**A** baseline, 6 epochs', '**A** базовое, 6 эпох'), bi('—', '—'), bi('89.0%', '89.0%'), bi('27.0–32.0%', '27.0–32.0%'), bi('+59.5 pts', '+59.5 п.п.'), bi('0.0 pts', '0.0 п.п.')],
        [bi('**A′** baseline, 18 epochs', '**A′** базовое, 18 эпох'), bi('budget', 'бюджет'), bi('89.5%', '89.5%'), bi('66.0–70.5%', '66.0–70.5%'), bi('+21.4 pts', '+21.4 п.п.'), bi('+0.5 pts', '+0.5 п.п.')],
        [bi('**C** frozen orthogonal decoder', '**C** замороженный ортогональный декодер'), bi('initialization', 'инициализация'), bi('17.5%', '17.5%'), bi('11.5–15.5%', '11.5–15.5%'), bi('+5.0 pts', '+5.0 п.п.'), bi('0.0 pts', '0.0 п.п.')],
        [bi('**E** same, doubled vector width', '**E** то же, удвоенная ширина вектора'), bi('and capacity', 'и ёмкость'), bi('18.0%', '18.0%'), bi('11.0–16.5%', '11.0–16.5%'), bi('+5.2 pts', '+5.2 п.п.'), bi('0.0 pts', '0.0 п.п.')],
        [bi('**B** calibrate on 500, then freeze', '**B** калибровка на 500, затем заморозка'), bi('training order', 'порядок обучения'), bi('78.0%', '78.0%'), bi('79.0–84.0%', '79.0–84.0%'), bi('**−3.1 pts**', '**−3.1 п.п.**'), bi('+0.5 pts', '+0.5 п.п.')],
        [bi('**D** B + whitening of the decoder', '**D** B + отбеливание декодера'), bi('conditioning', 'обусловленность'), bi('21.0%', '21.0%'), bi('27.0–33.0%', '27.0–33.0%'), bi('−9.2 pts', '−9.2 п.п.'), bi('0.0 pts', '0.0 п.п.')],
      ],
    },

    { t: 'h3', text: bi('5.1 Arms C and E: symmetry achieved, memory silent', '5.1 Плечи C и E: симметрия достигнута, память молчит') },
    {
      t: 'p',
      text: bi(
        'The intent of arm C was to remove the privilege radically. Make the decoder a random semi-orthogonal matrix, initialize the values to zero, and freeze the decoder from step zero. Graft identity is preserved — a zero value gives a zero output — the gradient with respect to values is isotropic, and the shared part is never trained at all. There is no privileged wave by construction.',
        'Замысел плеча C был в радикальном устранении привилегии. Сделать декодер случайной полуортогональной матрицей, инициализировать значения нулём и заморозить декодер с нулевого шага. Тождественность врезки сохраняется — нулевое значение даёт нулевой выход, — градиент по значениям изотропен, а общая часть не обучается вовсе. Привилегированной волны нет по построению.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The symmetry did arrive: the step fell from +21 to +5 points, with later waves spread across 11.5–15.5%. But the level collapsed to the floor. And the decisive clue is not in the percentages, it is in the training: **the loss does not fall, it rises** — 4.878 → 4.950. The memory did not learn "evenly and badly". It did not learn.',
        'Симметрия действительно пришла: ступенька упала с +21 до +5 пунктов, поздние волны легли в 11.5–15.5%. Но уровень обвалился в пол. И решающая подсказка не в процентах, а в обучении: **лосс не падает, а растёт** — 4.878 → 4.950. Память не выучила «ровно и плохо». Она не выучила.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Arm E tested the one honest objection — that a random 512-dimensional subspace inside 4096 is simply too small. Doubling the vector width gave the same result, 18.0% against 12.8%. Subspace dimensionality is not the issue.',
        'Плечо E проверило единственное честное возражение — что случайное 512-мерное подпространство внутри 4096 просто слишком мало. Удвоение ширины вектора дало тот же результат, 18.0% против 12.8%. Размерность подпространства ни при чём.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The cause is scale. With an orthonormal decoder, the addition to the residual stream has the same norm as the value itself, and the values start at zero. Adam moves a coordinate by roughly the learning rate per touch, a record\'s slot is touched about two dozen times across six epochs, so the value norm reaches around 5. A *trained* decoder has a leading singular value of 376. Two orders of magnitude of gap, and the memory has no way to reach the amplitude at which it is audible at all.',
        'Причина — масштаб. При ортонормальном декодере добавка к остаточному потоку имеет ту же норму, что и само значение, а значения стартуют с нуля. Adam двигает координату примерно на темп обучения за касание, слот записи касается около двух десятков раз за шесть эпох, поэтому норма значения доходит примерно до 5. У *обученного* декодера ведущее сингулярное число равно 376. Разрыв в два порядка, и у памяти нет способа дойти до амплитуды, на которой она вообще слышна.'
      ),
    },
    {
      t: 'quote',
      text: bi(
        '**Orthogonal initialization without scale matching is not a "neutral start". It is a silent switching-off of the memory.** No training metric reports it: the loss barely moves, addressing is 100%, nothing fails.',
        '**Ортогональная инициализация без согласования масштаба — это не «нейтральный старт». Это молчаливое выключение памяти.** Ни одна обучающая метрика этого не сообщает: лосс почти не двигается, адресация 100%, ничего не падает.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I record this as a standalone lesson because the failure mode is invisible to exactly the instruments one would normally trust.',
        'Записываю это отдельным уроком, потому что этот способ отказа невидим ровно для тех инструментов, которым обычно доверяют.'
      ),
    },

    { t: 'h3', text: bi('5.2 Arm B: the step changes sign', '5.2 Плечо B: ступенька меняет знак') },
    {
      t: 'p',
      text: bi(
        'Arm B changes not the construction but the order. The shared part is trained once on a calibration slice of 500 records and frozen permanently; only then do five product waves of 100 records each, drawn from a **different** slice, touch nothing but values.',
        'Плечо B меняет не конструкцию, а порядок. Общая часть обучается один раз на калибровочном срезе из 500 записей и замораживается навсегда; и только затем пять продуктовых волн по 100 записей, взятых из **другого** среза, трогают лишь значения.'
      ),
    },
    {
      t: 'table',
      head: [bi('after \\ wave', 'после \\ волна'), bi('0', '0'), bi('1', '1'), bi('2', '2'), bi('3', '3'), bi('4', '4')],
      align: ['l', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('0', '0'), bi('77.5%', '77.5%'), blank, blank, blank, blank],
        [bi('2', '2'), bi('77.5%', '77.5%'), bi('79.0%', '79.0%'), bi('79.0%', '79.0%'), blank, blank],
        [bi('4', '4'), bi('78.0%', '78.0%'), bi('79.0%', '79.0%'), bi('79.0%', '79.0%'), bi('84.0%', '84.0%'), bi('82.5%', '82.5%')],
      ],
    },
    {
      t: 'ul',
      items: [
        bi(
          'the calibration slice is learned to **97.5%**, matching the 96.9% obtained on the same 500 records in a separate volume measurement;',
          'калибровочный срез выучивается на **97.5%**, что совпадает с 96.9%, полученными на тех же 500 записях в отдельном замере по объёму;'
        ),
        bi('**the step is −3.1 points**: later waves learn slightly *better* than the first;', '**ступенька равна −3.1 пункта**: поздние волны выучиваются немного *лучше* первой;'),
        bi('drift of the first wave across four retrainings: **+0.5 points**, i.e. noise;', 'дрейф первой волны за четыре дообучения: **+0.5 пункта**, то есть шум;'),
        bi('calibration knowledge after all five waves: 97.5% → **97.6%** — untouched;', 'калибровочное знание после всех пяти волн: 97.5% → **97.6%** — не тронуто;'),
        bi(
          'wave loss actually falls, 4.64–4.70 → 3.52–3.58, against "does not fall at all" in arm C. The wave is learning rather than imitating learning;',
          'лосс волны действительно падает, 4.64–4.70 → 3.52–3.58, против «не падает вовсе» в плече C. Волна учится, а не изображает обучение;'
        ),
        bi(
          'timing: calibration 77 s, each wave 15 s, all four incremental updates 60 s.',
          'по времени: калибровка 77 с, каждая волна 15 с, все четыре инкрементальных обновления 60 с.'
        ),
      ],
    },
    {
      t: 'p',
      text: bi(
        '**A caveat without which the absolute numbers are unreadable.** Arm B\'s waves are drawn from a different slice of CounterFact than the baseline\'s. Quantities internal to an arm — the step and the drift — are comparable across arms; absolute levels between A and B are not, without that correction. Within arm B the comparison is clean, since all five waves come from one slice.',
        '**Оговорка, без которой абсолютные числа нечитаемы.** Волны плеча B взяты из другого среза CounterFact, чем у базового. Величины, внутренние для плеча, — ступенька и дрейф — сравнимы между плечами; абсолютные уровни между A и B без этой поправки — нет. Внутри плеча B сравнение чистое, поскольку все пять волн из одного среза.'
      ),
    },

    { t: 'h3', text: bi('5.3 How much calibration is needed', '5.3 Сколько нужно калибровки') },
    {
      t: 'p',
      text: bi(
        'If calibration works, it has a size, and the size has to be known before datasets are collected.',
        'Если калибровка работает, у неё есть размер, и размер надо знать до того, как собираются наборы данных.'
      ),
    },
    {
      t: 'table',
      head: [bi('calibration', 'калибровка'), bi('calibration knowledge', 'калибровочное знание'), bi('wave 0', 'волна 0'), bi('later', 'поздние'), bi('step', 'ступенька')],
      align: ['r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('250', '250'), bi('93.2%', '93.2%'), bi('68.5%', '68.5%'), bi('58.0–68.5%', '58.0–68.5%'), bi('+4.2 pts', '+4.2 п.п.')],
        [bi('500', '500'), bi('97.5%', '97.5%'), bi('78.0%', '78.0%'), bi('79.0–84.0%', '79.0–84.0%'), bi('−3.1 pts', '−3.1 п.п.')],
        [bi('1000', '1000'), bi('97.3%', '97.3%'), bi('87.5%', '87.5%'), bi('86.5–93.0%', '86.5–93.0%'), bi('−2.4 pts', '−2.4 п.п.')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'Monotone and not saturating by a thousand: doubling the calibration lifts the waves by about nine points. At 250 records the step is still positive — the shared part did not get enough volume, and the first wave\'s privilege returns. From 500 onward it is negative and stays there. Calibration knowledge itself does not change at any grid point across five waves (93.2 → 93.2, 97.5 → 97.6, 97.3 → 97.4): freezing protects the calibration corpus exactly as it protects the earlier waves.',
        'Монотонно и не насыщается к тысяче: удвоение калибровки поднимает волны примерно на девять пунктов. На 250 записях ступенька всё ещё положительна — общая часть не получила достаточного объёма, и привилегия первой волны возвращается. От 500 и далее она отрицательна и таковой остаётся. Само калибровочное знание не меняется ни в одной точке сетки за пять волн (93.2 → 93.2, 97.5 → 97.6, 97.3 → 97.4): заморозка защищает калибровочный корпус ровно так же, как защищает ранние волны.'
      ),
    },

    { t: 'h3', text: bi('5.4 Calibration plus budget reaches parity with retraining', '5.4 Калибровка плюс бюджет выходят на паритет с переобучением') },
    {
      t: 'p',
      text: bi(
        'The remaining question was whether the two levers compose. Calibration on 500 records, then waves at eighteen epochs instead of six — the same schedule that had hit a 70.5% ceiling in the first pass, but now on top of a calibrated shared part. The column is the mean over the four incremental waves.',
        'Оставался вопрос, складываются ли два рычага. Калибровка на 500 записях, затем волны по восемнадцать эпох вместо шести — то же расписание, которое в первом заходе упёрлось в потолок 70.5%, но теперь поверх откалиброванной общей части. Колонка — среднее по четырём инкрементальным волнам.'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('mean, incremental waves', 'среднее, инкрементальные волны'), bi('drift', 'дрейф'), bi('wave time', 'время волны')],
      align: ['l', 'r', 'r', 'r'],
      rows: [
        [bi('baseline, 6 epochs', 'базовое, 6 эпох'), bi('29.5%', '29.5%'), bi('0.0 pts', '0.0 п.п.'), bi('15 s', '15 с')],
        [bi('baseline, 18 epochs', 'базовое, 18 эпох'), bi('68.1%', '68.1%'), bi('+0.5 pts', '+0.5 п.п.'), bi('107 s', '107 с')],
        [bi('calibration 500, 6 epochs', 'калибровка 500, 6 эпох'), bi('81.1%', '81.1%'), bi('+0.5 pts', '+0.5 п.п.'), bi('15 s', '15 с')],
        [bi('calibration 1000, 6 epochs', 'калибровка 1000, 6 эпох'), bi('89.9%', '89.9%'), bi('+0.5 pts', '+0.5 п.п.'), bi('15 s', '15 с')],
        [bi('**calibration 500, 18 epochs**', '**калибровка 500, 18 эпох**'), bi('**96.2%**', '**96.2%**'), bi('**0.0 pts**', '**0.0 п.п.**'), bi('45 s', '45 с')],
        [bi('full retraining (control)', 'полное переобучение (контроль)'), bi('96.9%', '96.9%'), bi('—', '—'), bi('75 s', '75 с')],
      ],
    },
    {
      t: 'p',
      text: bi(
        '**The gap is closed.** 96.2% against 96.9% is inside the 0.6-point noise, at zero drift of the earlier records, and a wave costs 45 seconds against 75 for retraining. That advantage grows rather than shrinks: a wave\'s cost depends only on the size of the wave, while retraining\'s depends on the entire accumulated corpus.',
        '**Разрыв закрыт.** 96.2% против 96.9% — внутри шума в 0.6 пункта, при нулевом дрейфе ранних записей, и волна стоит 45 секунд против 75 у переобучения. Это преимущество растёт, а не сокращается: цена волны зависит только от размера волны, а цена переобучения — от всего накопленного корпуса.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The ceiling that the schedule had been hitting stopped existing the moment the shared part stopped being an inheritance from the first hundred records. Eighteen epochs on top of calibration give 96.2%; eighteen epochs on top of wave 0 gave 68.1%.',
        'Потолок, в который упиралось расписание, перестал существовать в тот момент, когда общая часть перестала быть наследством от первой сотни записей. Восемнадцать эпох поверх калибровки дают 96.2%; восемнадцать эпох поверх волны 0 давали 68.1%.'
      ),
    },

    { t: 'h3', text: bi('5.5 Arm D: whitening kills the memory, and that is the best result in the chapter', '5.5 Плечо D: отбеливание убивает память, и это лучший результат главы') },
    {
      t: 'p',
      text: bi(
        'Arm D differs from B by exactly one operation: after calibration, the decoder is replaced by its polar factor. The intent was to remove the conditioning while preserving the learned subspaces — the singular vectors stay, only their weights change.',
        'Плечо D отличается от B ровно одной операцией: после калибровки декодер заменяется своим полярным множителем. Замысел был убрать обусловленность, сохранив выученные подпространства, — сингулярные векторы остаются, меняются только их веса.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The operation worked perfectly in form and catastrophically in substance:',
        'Операция сработала идеально по форме и катастрофически по существу:'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('condition number', 'число обусловленности'), bi('effective dimension', 'эффективная размерность'), bi('calibration knowledge', 'калибровочное знание')],
      align: ['l', 'r', 'r', 'r'],
      rows: [
        [bi('after calibration', 'после калибровки'), bi('272.9', '272.9'), bi('266.8 of 512', '266.8 из 512'), bi('**96.9%**', '**96.9%**')],
        [bi('after whitening', 'после отбеливания'), bi('**1.0**', '**1.0**'), bi('**512.0 of 512**', '**512.0 из 512**'), bi('**18.3%**', '**18.3%**')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The spectrum is flattened exactly, all 512 directions are equal — and the knowledge is gone. Not degraded: gone, from 96.9% to 18.3%, with the subspaces untouched and not a single record retrained.',
        'Спектр выровнен точно, все 512 направлений равны — а знание исчезло. Не ухудшилось: исчезло, с 96.9% до 18.3%, при нетронутых подпространствах и без переобучения хоть одной записи.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The obvious first reading was that the spectral skew *is* the learned content, and that "where to write" cannot be separated from "on whose facts it was learned". The scale sweep in the next section showed that reading is wrong, and that the correct explanation is simpler.',
        'Очевидное первое прочтение состояло в том, что перекос спектра *и есть* выученное содержание, и что «куда писать» не отделяется от «на чьих фактах это выучено». Перебор по масштабу в следующем разделе показал, что это прочтение неверно и что правильное объяснение проще.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Whitening changes the decoder. The values in the table were fitted to the **old** matrix — to its directions and to its weights — and after the substitution they are being read by a decoder they were never trained under. The 96.9% → 18.3% collapse does not prove that knowledge lives in the singular values; it proves that **the values and the decoder are fitted to each other**, and that any modification of the decoder devalues the entire table at once.',
        'Отбеливание меняет декодер. Значения в таблице были подогнаны под **старую** матрицу — под её направления и её веса, — и после подмены их читает декодер, под которым они никогда не обучались. Обвал 96.9% → 18.3% не доказывает, что знание живёт в сингулярных числах; он доказывает, что **значения и декодер подогнаны друг под друга** и что любая модификация декодера обесценивает всю таблицу разом.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'That is worth knowing on its own, and its practical consequence is severe: after ingestion, the output projection must not be touched by anything, including "improvements" such as renormalization, further training on a new domain, or transferring a decoder between packages.',
        'Это ценно само по себе, и практическое следствие сурово: после разбора источника выходную проекцию нельзя трогать ничем, включая «улучшения» вроде перенормировки, дообучения на новом домене или переноса декодера между пакетами.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The more useful part is quantitative. After whitening, the decoder is an isotropic matrix at scale σ̄ — which is precisely arm C\'s construction, but with a scale of order thirty instead of one. Waves on it learn at **27–33%** against 11–15% at scale one. So scale is the cause of C\'s failure, and the next section tests that head-on.',
        'Более полезная часть — количественная. После отбеливания декодер является изотропной матрицей масштаба σ̄ — то есть ровно конструкцией плеча C, но с масштабом порядка тридцати вместо единицы. Волны на нём выучиваются на **27–33%** против 11–15% при масштабе один. Значит масштаб и есть причина провала C, и следующий раздел проверяет это в лоб.'
      ),
    },

    // ---------------------------------------------------------------- 6
    { t: 'h2', id: 'scale', text: bi('6. The scale sweep: it was only ever scale', '6. Перебор по масштабу: дело всё время было только в масштабе') },
    {
      t: 'p',
      text: bi(
        'One constant controls the magnitude of the orthogonal initialization; with it, the addition to the residual stream is exactly that many times the norm of the value. Nothing else in the construction changes: the decoder is frozen from step zero, the values start at zero, the shared part is never trained.',
        'Одна константа управляет величиной ортогональной инициализации; при ней добавка к остаточному потоку ровно во столько раз больше нормы значения. Больше в конструкции не меняется ничего: декодер заморожен с нулевого шага, значения стартуют с нуля, общая часть не обучается никогда.'
      ),
    },
    {
      t: 'table',
      head: [bi('scale', 'масштаб'), bi('wave 0', 'волна 0'), bi('later', 'поздние'), bi('step', 'ступенька'), bi('ΔPPL on mentions', 'ΔPPL на упоминаниях')],
      align: ['r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('1', '1'), bi('17.5%', '17.5%'), bi('11.5–15.5%', '11.5–15.5%'), bi('+5.0 pts', '+5.0 п.п.'), bi('−0.2%', '−0.2%')],
        [bi('10', '10'), bi('18.2%', '18.2%'), bi('15.2%', '15.2%'), bi('+3.0 pts', '+3.0 п.п.'), bi('**−0.8%**', '**−0.8%**')],
        [bi('50', '50'), bi('47.0%', '47.0%'), bi('47.4%', '47.4%'), bi('−0.4 pts', '−0.4 п.п.'), bi('**+4.8%**', '**+4.8%**')],
        [bi('250', '250'), bi('**99.2%**', '**99.2%**'), bi('**99.4%**', '**99.4%**'), bi('**−0.2 pts**', '**−0.2 п.п.**'), bi('+1164%', '+1164%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'This should be read literally. **A frozen random orthogonal matrix that has never seen a single record gives, at the right scale, 99.4% of the knowledge with perfectly symmetric waves — higher than full retraining (96.9%), and higher than a decoder that was trained on a calibration corpus and then frozen (80.5%).**',
        'Это следует читать буквально. **Замороженная случайная ортогональная матрица, не видевшая ни одной записи, даёт при верном масштабе 99.4% знания с идеально симметричными волнами — выше полного переобучения (96.9%) и выше декодера, обученного на калибровочном корпусе и затем замороженного (80.5%).**'
      ),
    },
    {
      t: 'p',
      text: bi(
        'So the hypothesis behind arms B and D was wrong twice over. The shared part does not need to be calibrated on volume; it does not need to be trained at all. The only thing it is obliged to do is land in the scale of the residual stream. Everything that looked like a *learned write subspace* was **learned loudness** — one number, which there is no reason to obtain by gradient descent.',
        'Значит гипотеза за плечами B и D была неверна дважды. Общую часть не нужно калибровать на объёме; её не нужно обучать вовсе. Единственное, что она обязана сделать, — попасть в масштаб остаточного потока. Всё, что выглядело как *обученное подпространство записи*, было **обученной громкостью** — одним числом, которое нет причин добывать градиентным спуском.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'This also explains the entire first pass in retrospect. Wave 0 trained the decoder and thereby assigned the loudness; later waves inherited it along with a fit to somebody else\'s hundred facts. The tripled budget was not compensating for a bad subspace but for insufficient value amplitude inside a scale it did not choose — which is why it bought 37 points and then stopped.',
        'Это же задним числом объясняет весь первый заход. Волна 0 обучала декодер и тем самым назначала громкость; поздние волны наследовали её вместе с подгонкой под чужую сотню фактов. Утроенный бюджет компенсировал не плохое подпространство, а недостаточную амплитуду значений внутри масштаба, который он не выбирал, — поэтому он купил 37 пунктов и остановился.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**But text pays for loudness, and this is Chapter 2\'s trade-off arriving from a different direction.** The perplexity cost grows faster than the scale: at 50 the text is essentially untouched (+4.8%), at 250 perplexity on mentions rises twelvefold. 99.4% knowledge at that cost is not a memory, it is a steering vector forcing an answer over the base model — precisely the failure Chapter 2 dissected, and it is repaired the same way.',
        '**Но за громкость платит текст, и это компромисс главы 2, пришедший с другой стороны.** Цена в перплексии растёт быстрее масштаба: на 50 текст практически не тронут (+4.8%), на 250 перплексия на упоминаниях вырастает в двенадцать раз. 99.4% знания такой ценой — это не память, а стиринг-вектор, продавливающий ответ поверх базовой модели: ровно тот провал, который разобрала глава 2, и чинится он так же.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'A caveat on that column: these resource benches run without the anchor and without answer masking, so the absolute perplexity values are an artifact of the configuration. They are comparable between arms of this chapter, which share one configuration, and not comparable with the product numbers in §7.',
        'Оговорка к этой колонке: эти ресурсные стенды прогоняются без якоря и без маскирования ответа, поэтому абсолютные значения перплексии — артефакт конфигурации. Они сравнимы между плечами этой главы, разделяющими одну конфигурацию, и несравнимы с продуктовыми числами в §7.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'And on that same comparison something unpleasant surfaces for calibration: **arm B damages text more than anything else measured, +22851%**, at 80.5% knowledge. The frozen random decoder at scale 250 delivers more knowledge at twenty times less damage. The scheme I spent most of the session building is dominated by the scheme that required no training at all.',
        'И на том же сравнении для калибровки всплывает неприятное: **плечо B портит текст сильнее всего измеренного, +22851%**, при 80.5% знания. Замороженный случайный декодер на масштабе 250 даёт больше знания при в двадцать раз меньшем ущербе. Схема, на которую я потратил бо́льшую часть сессии, доминируется схемой, не потребовавшей обучения вообще.'
      ),
    },

    // ---------------------------------------------------------------- 7
    { t: 'h2', id: 'product', text: bi('7. The product point: the same thing with Chapter 2\'s protections', '7. Продуктовая точка: то же самое с защитами главы 2') },
    {
      t: 'p',
      text: bi(
        'The numbers above were taken in a resource-bench configuration that has no text protection by construction. The real question is what remains of 99.4% once Chapter 2\'s mechanisms are enabled: one slot per entity, cross-entropy on the answer only, and a locally scoped anchor.',
        'Числа выше сняты в конфигурации ресурсного стенда, у которой защиты текста нет по построению. Настоящий вопрос в том, что останется от 99.4%, когда включены механизмы главы 2: один слот на сущность, кросс-энтропия только по ответу и локально ограниченный якорь.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The gate is deliberately left off, and this is a decision worth stating.** Chapter 2 found the gate worth a further factor of 4.5 on text damage. But the gate is shared and trainable, and Chapter 1\'s rule applies without exception: isolation is worth nothing while any parameter on the read path is both shared and trainable. Turning it on would mean every wave adjusts, for every previous wave, a parameter they all depend on — giving away exactly the property the system exists for. The protection here is carried by the anchor and the answer mask. **This is a real cost of incrementality, paid in text quality, and it is charged against a benefit Chapter 2 had already banked.**',
        '**Гейт намеренно оставлен выключенным, и это решение стоит проговорить.** Глава 2 оценила гейт ещё в множитель 4.5 по ущербу тексту. Но гейт общий и обучаемый, а правило главы 1 действует без исключений: изоляция не стоит ничего, пока хоть один параметр на пути чтения одновременно общий и обучаемый. Его включение означало бы, что каждая волна подстраивает для каждой предыдущей волны параметр, от которого они все зависят, — то есть отдаёт ровно то свойство, ради которого система существует. Защиту здесь несут якорь и маска ответа. **Это настоящая цена инкрементальности, оплаченная качеством текста, и списывается она с выигрыша, который глава 2 уже положила в банк.**'
      ),
    },
    {
      t: 'table',
      head: [bi('', ''), bi('wave 0', 'волна 0'), bi('later', 'поздние'), bi('step', 'ступенька'), bi('drift', 'дрейф'), bi('ΔPPL mentions', 'ΔPPL упоминания'), bi('ΔPPL prose', 'ΔPPL проза')],
      align: ['l', 'r', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('scale 100', 'масштаб 100'), bi('90.0%', '90.0%'), bi('91.5–96.0%', '91.5–96.0%'), bi('−3.2 pts', '−3.2 п.п.'), bi('0.0 pts', '0.0 п.п.'), bi('**+36.8%**', '**+36.8%**'), bi('**+0.00%**', '**+0.00%**')],
        [bi('scale 250', 'масштаб 250'), bi('99.5%', '99.5%'), bi('99.5–100.0%', '99.5–100.0%'), bi('−0.4 pts', '−0.4 п.п.'), bi('0.0 pts', '0.0 п.п.'), bi('+266.0%', '+266.0%'), bi('**+0.00%**', '**+0.00%**')],
        [bi('original construction', 'исходная конструкция'), bi('89.0%', '89.0%'), bi('27.0–32.0%', '27.0–32.0%'), bi('+59.5 pts', '+59.5 п.п.'), bi('0.0 pts', '0.0 п.п.'), bi('+470.2%', '+470.2%'), bi('+0.00%', '+0.00%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The retention curve at scale 100 is what the whole chapter was for:',
        'Кривая удержания на масштабе 100 — то, ради чего писалась вся глава:'
      ),
    },
    {
      t: 'table',
      head: [bi('after \\ wave', 'после \\ волна'), bi('0', '0'), bi('1', '1'), bi('2', '2'), bi('3', '3'), bi('4', '4')],
      align: ['l', 'r', 'r', 'r', 'r', 'r'],
      rows: [
        [bi('0', '0'), bi('90.0%', '90.0%'), blank, blank, blank, blank],
        [bi('2', '2'), bi('90.0%', '90.0%'), bi('91.5%', '91.5%'), bi('92.5%', '92.5%'), blank, blank],
        [bi('4', '4'), bi('90.0%', '90.0%'), bi('91.5%', '91.5%'), bi('92.5%', '92.5%'), bi('93.0%', '93.0%'), bi('96.0%', '96.0%')],
      ],
    },
    {
      t: 'p',
      text: bi(
        'The columns do not move by a tenth of a point, and the rows rise: the fifth wave learns better than the first. **No shared parameter was trained even once during the run.**',
        'Столбцы не двигаются ни на десятую пункта, а строки растут: пятая волна выучивается лучше первой. **Ни один общий параметр за прогон не обучался ни разу.**'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**The working point is scale 100.** Mean wave knowledge 93.2% at +36.8% damage on mentions. It beats the original construction on both axes simultaneously — three times the knowledge at a tenth of the damage. Scale 250 adds six points of knowledge for a sevenfold larger perplexity cost, which is a bad exchange, and the 99.9% there should be read as "the memory is forcing the answer" rather than "the memory is well trained."',
        '**Рабочая точка — масштаб 100.** Среднее знание волн 93.2% при ущербе +36.8% на упоминаниях. Она обыгрывает исходную конструкцию сразу по обеим осям — втрое больше знания при десятикратно меньшем ущербе. Масштаб 250 добавляет шесть пунктов знания ценой всемеро большей перплексии, и это плохой обмен, а 99.9% там следует читать как «память продавливает ответ», а не «память хорошо обучена».'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The anchor helps at both points: at scale 250 it reduced damage from +1164% to +266% while simultaneously raising knowledge from 99.4% to about 99.9%. It does not abolish the loudness/text trade-off, but it shifts the whole curve in the right direction.',
        'Якорь помогает в обеих точках: на масштабе 250 он снизил ущерб с +1164% до +266%, одновременно подняв знание с 99.4% примерно до 99.9%. Компромисс «громкость против текста» он не отменяет, но сдвигает всю кривую в нужную сторону.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Finally, the **+0.00% on neutral prose** at both points. The property "no mention, and the memory returns exactly zero" is neither approximate nor learned; it follows from how addressing works, and it holds at any loudness. All the damage that exists at all is concentrated on texts where a trained entity is named.',
        'Наконец, **+0.00% на нейтральной прозе** в обеих точках. Свойство «нет упоминания — память возвращает ровно ноль» не приблизительно и не выучено; оно следует из устройства адресации и держится при любой громкости. Весь существующий ущерб сосредоточен на текстах, где названа обученная сущность.'
      ),
    },

    // ---------------------------------------------------------------- 8
    { t: 'h2', id: 'known', text: bi('8. What is now known about the construction', '8. Что теперь известно о конструкции') },
    {
      t: 'ul',
      items: [
        bi(
          '**Drift of early records is zero in all eight arms without exception** — 0.0, 0.0, 0.0, 0.0, +0.5, +0.5, +0.5, 0.0 points. It does not depend on initialization, on scale, or on whether anything was learned at all. It is a property of disjoint slots plus freezing, and the construction got it for free. The *step*, by contrast, depended on exactly one thing: who assigned the loudness.',
          '**Дрейф ранних записей нулевой во всех восьми плечах без исключения** — 0.0, 0.0, 0.0, 0.0, +0.5, +0.5, +0.5, 0.0 пункта. Он не зависит ни от инициализации, ни от масштаба, ни от того, было ли вообще что-то выучено. Это свойство раздельных слотов плюс заморозки, и конструкция получила его бесплатно. *Ступенька*, напротив, зависела ровно от одного: кто назначил громкость.'
        ),
        bi(
          '**The shared part need not be trained.** A frozen random orthogonal decoder with a matched scale yields waves above full retraining.',
          '**Общую часть обучать не обязательно.** Замороженный случайный ортогональный декодер с согласованным масштабом даёт волны выше полного переобучения.'
        ),
        bi(
          '**Values and decoder are fitted to each other and do not transfer separately.** Whitening preserved every subspace and dropped knowledge from 96.9% to 18.3%.',
          '**Значения и декодер подогнаны друг под друга и порознь не переносятся.** Отбеливание сохранило все подпространства и уронило знание с 96.9% до 18.3%.'
        ),
        bi(
          '**Scale is a free parameter of the construction rather than an outcome of training.** It trades knowledge against text integrity directly and non-linearly: scale 10 gives 15% knowledge at −0.8% perplexity; scale 100 gives 93% at +37%; scale 250 gives ~99.9% at +266%. It is a knob to be set deliberately for a task, not inherited from the first ingestion.',
          '**Масштаб — свободный параметр конструкции, а не результат обучения.** Он напрямую и нелинейно торгует знание против целостности текста: масштаб 10 даёт 15% знания при −0.8% перплексии; масштаб 100 — 93% при +37%; масштаб 250 — около 99.9% при +266%. Это ручка, которую надо осознанно выставлять под задачу, а не наследовать от первого разбора источника.'
        ),
        bi(
          '**Damage to the base is concentrated, not smeared.** Neutral prose is at exactly +0.00% at any loudness.',
          '**Ущерб базе сосредоточен, а не размазан.** Нейтральная проза стоит ровно на +0.00% при любой громкости.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 9
    { t: 'h2', id: 'schemes', text: bi('9. Two schemes, and which to choose', '9. Две схемы и какую выбрать') },
    {
      t: 'p',
      text: bi(
        '**Scheme 1 — frozen random decoder.** Simpler, and currently preferred. The decoder is a random semi-orthogonal matrix at a fixed scale, frozen from step zero; values start at zero; the shared part is never trained; all waves are equal by construction. No calibration corpus is required at all.',
        '**Схема 1 — замороженный случайный декодер.** Проще и сейчас предпочтительнее. Декодер — случайная полуортогональная матрица фиксированного масштаба, замороженная с нулевого шага; значения стартуют с нуля; общая часть не обучается; все волны равны по построению. Калибровочный корпус не требуется вовсе.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'A side benefit that needs separate verification: with values initialized to zero, untouched slots stay exactly zero, and the package becomes genuinely sparse. The current table is initialized with noise, and 100% of its rows are non-zero, which affects both the on-disk size of a memory package and the cost of dequantization on untouched rows.',
        'Побочная выгода, требующая отдельной проверки: при значениях, инициализированных нулём, нетронутые слоты остаются ровно нулевыми, и пакет становится по-настоящему разреженным. Нынешняя таблица инициализируется шумом, и 100% её строк ненулевые, что влияет и на размер пакета памяти на диске, и на стоимость деквантования нетронутых строк.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Scheme 2 — calibration ingestion.** Needed if a learned decoder is wanted. Everything is trained once on a large corpus, the decoder is frozen permanently, and product waves touch only values. Calibration of 500 records plus eighteen epochs per wave gives 96.2% against 96.9% for full retraining. The calibration corpus then becomes part of the package specification: it determines the subspace, it cannot be replaced after the fact, and it must be *wider* than the product slice rather than identical to it.',
        '**Схема 2 — калибровочный разбор источника.** Нужна, если хочется обученный декодер. Всё обучается один раз на большом корпусе, декодер замораживается навсегда, и продуктовые волны трогают только значения. Калибровка на 500 записях плюс восемнадцать эпох на волну дают 96.2% против 96.9% у полного переобучения. Калибровочный корпус тогда становится частью спецификации пакета: он определяет подпространство, его нельзя заменить задним числом, и он должен быть *шире* продуктового среза, а не совпадать с ним.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Common to both: **the decoder is the immutable part of a memory package**, and a diff-driven update touches only rows of the table. A wave costs 15 seconds against 75 for full retraining, and the advantage grows with the accumulated corpus.',
        'Общее для обеих: **декодер является неизменяемой частью пакета памяти**, а обновление по дельте трогает только строки таблицы. Волна стоит 15 секунд против 75 у полного переобучения, и преимущество растёт вместе с накопленным корпусом.'
      ),
    },

    // ---------------------------------------------------------------- 10
    { t: 'h2', id: 'related', text: bi('10. Related work', '10. Смежные работы') },
    {
      t: 'p',
      text: bi(
        '**Sequential and continual editing.** The knowledge-editing literature treats degradation under long edit sequences as the central open problem — surveys and benchmarks find edit success, locality and portability all deteriorating across essentially all methods as edits accumulate, and the 2026 generation of methods (PRUNE, EAC, O-Edit, QueueEDIT, LyapLock and others) is built to postpone that collapse, in the strongest case out to twenty thousand edits. My claim is structurally different rather than quantitatively better: the drift here is not slowed, it is absent, because an update does not touch the parameters carrying the other records. The corresponding weakness is equally structural — those methods edit knowledge already in the base model\'s weights, whereas this construction can only reach knowledge it wrote itself, and only where an explicit mention supplies an address (Chapter 1 §10).',
        '**Последовательное и непрерывное редактирование.** Литература по редактированию знаний считает деградацию при длинных сериях правок центральной открытой проблемой: обзоры и бенчмарки находят, что успешность правки, локальность и переносимость ухудшаются практически у всех методов по мере накопления правок, и поколение методов 2026 года (PRUNE, EAC, O-Edit, QueueEDIT, LyapLock и другие) построено, чтобы этот обвал отсрочить — в сильнейшем случае до двадцати тысяч правок. Моё утверждение структурно иное, а не количественно лучшее: дрейф здесь не замедлен, а отсутствует, потому что обновление не трогает параметры, несущие остальные записи. Соответствующая слабость столь же структурна: те методы правят знание, уже находящееся в весах базовой модели, тогда как эта конструкция достаёт только то знание, которое сама записала, и только там, где явное упоминание даёт адрес (глава 1 §10).'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**Sparse memory finetuning.** The closest existing line — insert key-value memory layers, then per step train only the value rows the batch reads most heavily. Chapter 1 §11 compares the addressing. What this chapter adds to that comparison is the freezing schedule: in my construction the shared decoder is never updated after ingestion at all, which is why drift is exactly zero rather than small, and §5.5 shows what happens if you violate that even once with a well-intentioned transformation.',
        '**Разреженное дообучение памяти.** Ближайшая существующая линия: вставить слои памяти ключ-значение, затем на каждом шаге обучать только те строки значений, которые батч читает интенсивнее всего. Глава 1 §11 сравнивает адресацию. Эта глава добавляет к сравнению расписание заморозки: в моей конструкции общий декодер после разбора источника не обновляется вообще никогда, поэтому дрейф ровно нулевой, а не маленький, и §5.5 показывает, что бывает, если нарушить это хотя бы раз благонамеренным преобразованием.'
      ),
    },
    {
      t: 'p',
      text: bi(
        '**LoRA initialization.** This is the connection I did not expect, and I think it is the most transferable result in the chapter. An entire literature exists on how initialization determines which subspace a low-rank adapter can learn in — PiSSA initializing from the principal singular components of the pretrained matrix, MiLoRA from the least significant ones, LoRA-GA from an SVD of estimated gradients, LoRA-XS from the dominant subspaces of the pretrained weights, and rsLoRA addressing the scaling factor specifically. All of it assumes the standard zero-initialized second factor, and all of it studies a *single* fine-tuning episode.',
        '**Инициализация LoRA.** Это связь, которой я не ожидал, и, по-моему, самый переносимый результат главы. Существует целая литература о том, как инициализация определяет подпространство, в котором низкоранговый адаптер способен учиться: PiSSA инициализируется от главных сингулярных компонент предобученной матрицы, MiLoRA — от наименее значимых, LoRA-GA — от SVD оценённых градиентов, LoRA-XS — от доминирующих подпространств предобученных весов, а rsLoRA занимается конкретно масштабирующим множителем. Всё это предполагает стандартный второй множитель, инициализированный нулём, и всё это изучает *один* эпизод дообучения.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'What §4 reports is the sequential-learning consequence of the same fact. When the output factor starts at zero, the first data to arrive determines both the subspace *and* the amplitude of everything the adapter will ever write — and if the shared part is then frozen for the sake of isolation, that determination becomes permanent for every subsequent update. The privilege of the first batch, invisible in a single fine-tune, becomes a twenty-point step in an incremental system.',
        'То, о чём сообщает §4, — последствие того же факта для последовательного обучения. Когда выходной множитель стартует с нуля, первые пришедшие данные определяют и подпространство, *и* амплитуду всего, что адаптер когда-либо запишет, — а если общая часть затем заморожена ради изоляции, это определение становится постоянным для каждого последующего обновления. Привилегия первого батча, невидимая в одном дообучении, превращается в двадцатипунктовую ступеньку в инкрементальной системе.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'My resolution also runs against the grain of that literature. Its answer to "initialization determines the subspace" is to find a better, data-informed initialization. §6 says that in this setting the subspace was never the binding constraint — the amplitude was — and the correct move is not a smarter initialization but to stop training the shared part altogether and assign its scale as a constant. I would be interested to know whether an analogous statement holds for low-rank adapters, and I have not tested it.',
        'Моё разрешение к тому же идёт против шерсти этой литературы. Её ответ на «инициализация определяет подпространство» — найти лучшую, основанную на данных инициализацию. §6 говорит, что в этой постановке подпространство никогда не было связывающим ограничением — им была амплитуда, — и правильный ход не в более умной инициализации, а в том, чтобы вовсе перестать обучать общую часть и назначить её масштаб константой. Мне было бы интересно узнать, верно ли аналогичное утверждение для низкоранговых адаптеров, и я этого не проверял.'
      ),
    },

    // ---------------------------------------------------------------- 11
    { t: 'h2', id: 'notshown', text: bi('11. What this does not show', '11. Чего эта работа не показывает') },
    {
      t: 'ol',
      items: [
        bi(
          '**The drift is measured over five waves of a hundred records.** The product promise is dozens of updates. Zero over four retrainings is not zero over twenty, and this remains the largest single gap in the evidence base.',
          '**Дрейф измерен на пяти волнах по сотне записей.** Продуктовое обещание — десятки обновлений. Ноль за четыре дообучения не есть ноль за двадцать, и это остаётся крупнейшим единичным пробелом в доказательной базе.'
        ),
        bi(
          '**The working point was chosen on CounterFact, not on a real domain.** The optimal scale almost certainly depends on how far the target answer sits from what the base model would say unprompted: a counterfactual edit needs loudness, writing an unknown API perhaps does not. This has to be re-measured on the domain, and it is the reason Chapter 5 cannot simply reuse this number.',
          '**Рабочая точка выбрана на CounterFact, а не на настоящем домене.** Оптимальный масштаб почти наверняка зависит от того, насколько далеко целевой ответ стоит от того, что базовая модель сказала бы сама: контрфактическая правка требует громкости, запись неизвестного API — возможно, нет. Это надо перезамерить на домене, и поэтому глава 5 не может просто переиспользовать это число.'
        ),
        bi(
          '**Schemes 1 and 2 were not compared under identical conditions.** Scheme 1 was measured with the anchor and one slot per entity; scheme 2 in the resource-bench configuration with sixteen. A direct comparison costs one run and has not been made.',
          '**Схемы 1 и 2 не сравнивались в одинаковых условиях.** Схема 1 замерена с якорем и одним слотом на сущность; схема 2 — в конфигурации ресурсного стенда с шестнадцатью. Прямое сравнение стоит одного прогона и не сделано.'
        ),
        bi(
          '**The scale sweep ran on two waves while the product points ran on five**, and intermediate scales were not measured. The knowledge-versus-damage curve rests on four points.',
          '**Перебор по масштабу шёл на двух волнах, тогда как продуктовые точки — на пяти**, а промежуточные масштабы не измерялись. Кривая «знание против ущерба» держится на четырёх точках.'
        ),
        bi(
          '**Package sparsity under zero initialization is asserted from the construction and not measured**, and the earlier package-size and quantization-drift figures have not been recomputed under it.',
          '**Разреженность пакета при нулевой инициализации утверждается из конструкции и не измерена**, а прежние цифры по размеру пакета и дрейфу квантования под неё не пересчитаны.'
        ),
        bi(
          '**All eight arms are one model, one seed per arm.** Chapter 2 §8 showed that text-damage figures can vary by a factor of two across seeds; the perplexity columns here inherit that caveat.',
          '**Все восемь плеч — одна модель, один сид на плечо.** Глава 2 §8 показала, что цифры ущерба тексту могут различаться вдвое между сидами; колонки перплексии здесь наследуют эту оговорку.'
        ),
        bi(
          '**Refusing the gate costs text quality**, and I have not measured how much in this configuration — only that Chapter 2 valued it at 4.5× in a non-incremental setting.',
          '**Отказ от гейта стоит качества текста**, и сколько именно в этой конфигурации, я не замерял, — известно только, что глава 2 оценила его в 4.5× в неинкрементальной постановке.'
        ),
      ],
    },

    // ---------------------------------------------------------------- 12
    { t: 'h2', id: 'settles', text: bi('12. What this settles and what it opens', '12. Что это закрывает и что открывает') },
    {
      t: 'p',
      text: bi(
        'Two of the three things a series of updates could break are now answered. Old knowledge does not erode: zero drift, in every arm, independent of everything else. New knowledge is absorbable at parity with full retraining, and at a cost that improves relative to retraining as the corpus grows, because a wave\'s price depends only on the wave.',
        'На два из трёх вопросов, которые серия обновлений могла сломать, ответ получен. Старое знание не размывается: нулевой дрейф во всех плечах, независимо от всего остального. Новое знание впитывается на паритете с полным переобучением, причём ценой, которая относительно переобучения улучшается по мере роста корпуса, потому что цена волны зависит только от волны.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'The third is untouched. Everything here is CounterFact — subject, relation, object triples where the fact is pre-decomposed. Chapter 5 puts the construction on a real library\'s documentation, against a row of retrieval baselines with an oracle ceiling, and I will state in advance what that chapter already knows: the base model does not know the domain at all, any retriever closes 38–40 points of the gap, and symbolic addressing measured *as a retriever* currently loses to plain BM25. The threshold this construction has to clear is a specific number and it is not yet cleared.',
        'Третий не тронут. Всё здесь — CounterFact, тройки «субъект, отношение, объект», где факт уже разложен. Глава 5 ставит конструкцию на документацию настоящей библиотеки против ряда поисковых бейзлайнов с оракульным потолком, и я скажу заранее то, что эта глава уже знает: базовая модель не знает домен вообще, любой извлекатель закрывает 38–40 пунктов разрыва, а символьная адресация, измеренная *как извлекатель*, сейчас проигрывает обычному BM25. Порог, который этой конструкции надо взять, — конкретное число, и оно пока не взято.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Chapter 4, in between, is the price in hardware: training cost against corpus volume, VRAM, quantization, and whether the value table can live outside the GPU at all.',
        'Глава 4, между ними, — цена в железе: стоимость обучения против объёма корпуса, VRAM, квантование и может ли таблица значений вообще жить вне видеокарты.'
      ),
    },

    // ---------------------------------------------------------------- notes
    { t: 'h2', id: 'cost', text: bi('Methodological note on cost', 'Методологическая заметка о стоимости') },
    {
      t: 'p',
      text: bi(
        'The entire session behind this chapter — eight arms plus the scale sweep — took 57 minutes on a rented RTX 4090 and cost about seventy cents.',
        'Вся сессия, стоящая за этой главой, — восемь плеч плюс перебор по масштабу — заняла 57 минут на арендованной RTX 4090 и обошлась примерно в семьдесят центов.'
      ),
    },
    { t: 'h2', id: 'disclosure', text: bi('Reproducibility and disclosure', 'Воспроизводимость и раскрытие') },
    {
      t: 'p',
      text: bi(
        'As in Chapters 1 and 2: this is a preview of a closed project. Every measured number, every control, every failed arm and every retraction is reported. The implementation is withheld — the initialization procedure, the calibration schedule, the addressing internals, the anchor construction, and the code. Scales, epoch counts and calibration sizes appear because they are the axes of the experiments and the findings are meaningless without them.',
        'Как и в главах 1 и 2: это превью закрытого проекта. Каждое измеренное число, каждый контроль, каждое провалившееся плечо и каждый отзыв приведены. Реализация не раскрывается — процедура инициализации, расписание калибровки, внутренности адресации, устройство якоря и код. Масштабы, число эпох и размеры калибровки присутствуют, потому что это оси экспериментов и без них выводы бессмысленны.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'Nothing here is independently reproducible from this chapter alone.',
        'Ничто здесь не воспроизводимо независимо по одной этой главе.'
      ),
    },
    { t: 'h2', id: 'retraction', text: bi('Retraction', 'Отзыв утверждения') },
    {
      t: 'p',
      text: bi(
        '**"Locality in the present construction is bought at the price of trainability, and budget reduces that price without removing it."** Withdrawn. The measurements supporting it (§2) stand; the interpretation does not. The later waves failed not because freezing denied them the shared part, but because the shared part started at zero and therefore had its amplitude assigned by whichever wave trained first. Once that amplitude is assigned as a constant, waves reach 90.0–96.0% at zero drift with nothing shared trained at any point.',
        '**«Локальность в нынешней конструкции куплена ценой обучаемости, и бюджет снижает эту цену, не устраняя её.»** Отозвано. Замеры, его подкреплявшие (§2), в силе; интерпретация — нет. Поздние волны провалились не потому, что заморозка отказала им в общей части, а потому, что общая часть стартовала с нуля и её амплитуду назначала та волна, которая обучалась первой. Как только эта амплитуда назначается константой, волны выходят на 90.0–96.0% при нулевом дрейфе, и ничего общего не обучается ни в один момент.'
      ),
    },
    {
      t: 'p',
      text: bi(
        'I am keeping the original negative result in the record rather than quietly replacing it, because the sequence — publish the negative finding, find the step, read the construction, refute your own conclusion — is the part of this that generalizes.',
        'Я оставляю исходный отрицательный результат в записи, а не подменяю его молча, потому что обобщается здесь именно последовательность: опубликовать отрицательную находку, найти ступеньку, прочитать конструкцию, опровергнуть собственный вывод.'
      ),
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
        'Meta FAIR, Memory Layers at Scale, 2024. arXiv:2412.09764',
        'Meta, Continual Learning via Sparse Memory Finetuning, 2025. arXiv:2510.15103',
        'Hu et al., LoRA: Low-Rank Adaptation of Large Language Models, 2021. arXiv:2106.09685',
        'Meng et al., PiSSA: Principal Singular Values and Singular Vectors Adaptation, 2024. arXiv:2404.02948',
        'Wang et al., LoRA-GA: Low-Rank Adaptation with Gradient Approximation, NeurIPS 2024. arXiv:2407.05000',
        'Kalajdzievski, A Rank Stabilization Scaling Factor for Fine-Tuning with LoRA (rsLoRA), 2023. arXiv:2312.03732',
        'Bałazy et al., LoRA-XS: Low-Rank Adaptation with Extremely Small Number of Parameters, 2024. arXiv:2405.17604',
        'Biderman et al., LoRA Learns Less and Forgets Less, TMLR 2024. arXiv:2405.09673',
        'Meng et al., Mass-Editing Memory in a Transformer (MEMIT), 2023.',
        'Allen-Zhu & Li, Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws, ICLR 2025. arXiv:2404.05405',
      ],
    },
  ],
};
