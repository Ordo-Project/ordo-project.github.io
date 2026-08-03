import type { Bilingual } from '../types';

const en = {
    paperTag: 'TRACK 01 • REWRITABLE MEMORY ON A FROZEN MODEL',
    title: 'Ordo-M: an external value table addressed from text',
    description:
      'Ordo-M attaches a product-key memory table to a frozen model through a forward hook at 0.66 of network depth. The address is a hash of the canonical entity name found in the text, and the same address selects slots when writing and when reading. The output projection starts at zero, so at the moment of attachment the model is bit-identical to the original, and the hook can be switched off at runtime — without that, a regression cannot be measured honestly. Experiments run on Qwen3-8B, on a 24GB datacenter card and a 24GB consumer card.',
    mathTitle: 'How the hook works',
    math1Title: '// 1. Address from a canonical entity name',
    math1Formula: 'a(s) = hash(canonical(s)) mod N_slots',
    math1Desc:
      'The address is computed from an explicit mention of the entity in the text. No mention — the memory returns exactly zero. That is a property of the construction, not of training.',
    math2Title: '// 2. Injection into the residual stream at depth 0.66',
    math2Formula: 'h_l  ←  h_l + W_out · v[a(s)]',
    math2Desc:
      'The projection adds the memory vector inside the block at 0.66 depth. With an external address the query projection and the half-keys are never called at all: 9.4M of 145.8M memory parameters stay in reserve.',
    fig1Title: 'Point edit: what breaks around it',
    fig1Sub: 'CounterFact, Qwen3-8B, equal-capacity LoRA as the control arm',
    fig1Badge: '0.0% vs 8.4%',
    fig1Analysis:
      'This is the central number of the project. An adapter is a dense operator: it updates as a whole, and a local edit spills over. A table is a sparse lookup: a slot that was not addressed cannot change. That difference is what makes it possible to write a new documentation version over an old one without re-verifying the rest. Specificity is where the adapter fails hardest — it falls to roughly 30% while the table holds.',
    fig2Title: 'Incremental waves vs full retraining',
    fig2Sub: 'Consumer 24GB card, eight arms, average knowledge across waves',
    fig2Badge: '96.2% parity',
    fig2Analysis:
      'For a long time later waves learned at 27–32% against 88% for the first one, and that looked like the price of locality. It was not. With an external address exactly one shared parameter is alive — the output projection — and it starts at zero, so whichever wave trains first assigns both the directions and the loudness of the addition. Calibrating that projection on 500 records and then freezing it restores parity. A wave costs 45s against 75s for a full retrain, and the advantage grows: wave time depends on wave size, retrain time on the whole accumulated corpus.',
    fig3Title: 'Output gain: knowledge is flat above the knee, damage is not',
    fig3Sub: 'Real domain, three seeds per point; perplexity measured on entity mentions',
    fig3Badge: 'Working point: gain 50',
    fig3Analysis:
      'Gain is a free parameter of the construction, and it was expected to trade knowledge against text all the way up. It does not. Above 50 knowledge does not depend on it at all — four points inside a 67.8–70.5% band against a noise floor of 1.7 — while text damage moves fourfold. Below 50 it falls steeply: gain 25 gives 60.5% at +1.2% perplexity. So 50 is not a compromise, it is the knee: the slope is 0.347 points of knowledge per point of damage below it and 0.017 above. Gain is now exhausted as a lever on knowledge, which is a useful thing to know because it removes a knob people would otherwise keep turning.',
    fig4Title: 'The M1 phase, every arm on the same 183 questions',
    fig4Sub: '825 records of a public library; the memory arm is trained, the search arms are not',
    fig4Badge: 'Threshold 67.8% — reached, not exceeded',
    fig4Analysis:
      'This is the whole phase in one chart. The base does not know the domain at all (47.5% where a coin flip is 50%), any retriever takes 38–40 points of the gap, and closing half of it sets the memory bar at 67.8%. The memory trained on the raw documentation text scores 54.1% — a real gain over the base, and a rounding error against the search arms. The same memory trained on the same records, prepared into the form the questions actually ask about, reaches 68.1% across three seeds. The threshold is reached by 0.3 points at a spread of 1.38, so the honest statement is "reached, not significantly exceeded". The oracle ceiling shown here is the corrected one: it was assembled from the wrong record of the address until this was caught, which understated it by two points.',
    fig5Title: 'Addressing as a retriever, and where its last free points came from',
    fig5Sub: 'Recall@1 on the same 183 questions against the same 825 records',
    fig5Badge: 'Collisions split by content: 74.3% → 82.0%',
    fig5Analysis:
      'Addressing selects a record, so it can be scored by the same code as a search engine. The longest-mention rule is now exhausted: the correct name is present in only 137 of the 183 questions and the rule already takes 136 of them. What remained was collisions of surface form — 27 of 47 errors — and splitting the candidates by the content of their records is worth 74.3% → 82.0% of addressing and +2.0 ± 1.14 points of knowledge (p=0.0266). That is the last cheap improvement on this axis; everything left is either a question that does not name its own entity, or a parent competing with its child.',
    fig6Title: 'What the corpus is made of decides the outcome, not the carrier',
    fig6Sub: 'Same records, same memory, same training loop — only the form of the text differs',
    fig6Badge: 'Raw text carries nothing',
    fig6Analysis:
      'Raw documentation text does not transfer into the memory. The diagnosis is sharper than the score: on held-out tails the memory does not predict even the continuation of its own record (83.3% against 84.5% for the base), and a deliberately foreign address is statistically indistinguishable from the correct one — there is nothing in there to fetch. The memory had learned what the base did not know about the TEXT of the record, while the questions ask about its SUBJECT. Preparing the records into atomic facts in the form the questions use fixes it. A corpus written by the frozen base itself does not: the form is flawless and the facts are absorbed, but coverage of what gets asked is half (21.3% against 49.7%) — a local model can write facts and cannot choose which. Context distillation adds no knowledge at all and instead cuts the text damage by 43% with six times less variance.',
    fig7Title: 'Coverage predicts knowledge, and the prediction is a straight line',
    fig7Sub: 'Four points across two corpora, computed on a laptop in seconds',
    fig7Badge: 'R² = 0.996',
    fig7Analysis:
      'Knowledge = 49.14 + 0.539 × coverage, where coverage is the share of the evaluation questions whose fact appears anywhere in the corpus. The intercept lands exactly on the base level, which is what a sane fit should do. The practical value is that it moves corpus acceptance off the rented GPU: a corpus needs 34.6% coverage to clear the M1 bar, and that is now a laptop computation instead of half an hour of rent. It also closed a branch — selection cannot fix a corpus, because its ceiling is the coverage of the source, and reordering was measured at +3.8 points for the weak corpus and exactly zero for the strong one. The last point sits below the line, and that gap turned out to be the capacity of the address rather than the corpus.',
    fig8Title: 'Prose is addressable by page, not by section',
    fig8Sub: 'Eleven prose corpora screened; two question sets built by the same pipeline',
    fig8Badge: '95.0% vs 9.0%',
    fig8Analysis:
      'Every result in this project was measured on a code library, while the product promise is a company wiki. Screening eleven prose corpora against the acceptance metric, not one clears the 60% bar by sections — the best is 59.4% and a real corporate handbook gives 18.1%. The failures are identical everywhere and have names: "Overview", "What\'s next", "Introduction". Addressing the page instead of the section changes the answer: eight of eleven corpora clear the bar, and the page address lands in the right record for 95.0% and 96.9% of direct questions against 9.0% and 9.3% for sections. A section does not merely stay silent — it leads into a foreign record for 85.7% of questions. The cost is real: 12.5 records per address instead of 1.9, and the indirect bucket grows from 6.0% to 20.6%.',
    fig9Title: 'The prose bar sits in a different bucket',
    fig9Sub: 'Kubernetes concepts, 1.34 → 1.35, the same arms as the code domain',
    fig9Badge: 'Threshold 79.9%',
    fig9Analysis:
      'The prose domain is usable, and it is harder in a way worth stating rather than hiding. The base already knows Kubernetes: 64.8% against 47.5% on the code library, with a log-probability margin of +0.591 against −0.020. So on prose the question stops being "can the memory bring knowledge the model lacks" and becomes "can it add to what the model already has", and the phase threshold rises to 79.9%. The indirect bucket is 20.6% of the set there; search answers it at 94.9% and the memory is silent on it by construction, because no mention means no address. The memory arm on this domain has not been run yet — this chart is the bar, not the result.',
    tableTitle: 'What it costs in hardware',
    colAxis: 'Axis',
    colValue: 'Measured value',
    colAdv: 'What it means',
    rows: [
      { axis: 'Training vs corpus volume', val: 'Linear, exponent 1.05 — 0.076 s per record per epoch', adv: 'Scales cleanly to a real documentation corpus' },
      { axis: 'Quality at fixed epochs', val: '96.9% on 500 records vs 80.0% on 50', adv: 'More corpus makes it better, not worse' },
      { axis: 'Training VRAM', val: '0.0112 GB per 1M memory parameters', adv: 'Inference needs 0.0034 GB per 1M' },
      { axis: 'Generation speed', val: '15.1 → 15.1 tokens/s', adv: 'Memory at generation time is free' },
      { axis: 'Table in host RAM or on disk', val: '0.98× tokens/s', adv: 'Memory size is not capped by the GPU' },
      { axis: 'Drift of early records', val: '0.0 pp after four incremental retrains', adv: 'Waves forget nothing at all' },
      { axis: 'Quantization', val: 'int8 holds an edit series, int4 destroys it', adv: 'int8 is the recommended precision' },
      { axis: 'Which axis to grow', val: '×2 vector width → +16.8 pp; ×16 slots → +0.8 pp', adv: 'Quality pays for width, not for slot count' },
    ],
    noticeTitle: 'What is closed and what is open',
    noticeText:
      'The implementation, configurations, evaluation harnesses and raw run artefacts are closed. The methodology, the measured numbers, the negative results and the reasoning behind each decision are published here, and they are meant to be arguable. Researchers interested in joint runs or in reviewing evaluation logs can reach the lead researcher through the GitHub profile @8hrsk.',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const ordoM: Bilingual<typeof en> = {
  en,
  ru: {
    paperTag: 'ТРЕК 01 • ОБНОВЛЯЕМАЯ ПАМЯТЬ НА ЗАМОРОЖЕННОЙ МОДЕЛИ',
    title: 'Ordo-M: внешняя таблица значений с адресом из текста',
    description:
      'Ordo-M врезает product-key таблицу памяти в замороженную модель forward-хуком на 0.66 глубины сети. Адрес — хэш канонического имени сущности, найденного в тексте, и он же выбирает слоты при записи и при чтении. Выходная проекция стартует с нуля, поэтому в момент врезки модель побитово равна исходной, а хук отключается на лету — без этого нельзя честно замерить регрессию. Эксперименты идут на Qwen3-8B: серверная карта 24 ГБ и потребительская карта 24 ГБ.',
    mathTitle: 'Как работает хук',
    math1Title: '// 1. Адрес по каноническому имени сущности',
    math1Formula: 'a(s) = hash(canonical(s)) mod N_slots',
    math1Desc:
      'Адрес вычисляется из явного упоминания сущности в тексте. Нет упоминания — память возвращает ровно ноль. Это свойство устройства, а не обучения.',
    math2Title: '// 2. Инжекция в остаточный поток на глубине 0.66',
    math2Formula: 'h_l  ←  h_l + W_out · v[a(s)]',
    math2Desc:
      'Проекция добавляет вектор памяти внутри блока на 0.66 глубины. При внешнем адресе проекция запроса и полуключи не вызываются вовсе: 9.4M из 145.8M параметров памяти остаются про запас.',
    fig1Title: 'Точечная правка: что ломается вокруг неё',
    fig1Sub: 'CounterFact, Qwen3-8B, контрольное плечо — LoRA равной ёмкости',
    fig1Badge: '0.0% против 8.4%',
    fig1Analysis:
      'Это главное число проекта. Адаптер — плотный оператор: он обновляется целиком, и локальная правка расплёскивается. Таблица — разреженный поиск: слот, к которому не обратились, измениться не может. Именно эта разница позволяет записать новую версию документации поверх старой, не перепроверяя всё остальное. Тяжелее всего адаптер проваливает специфичность — она падает примерно до 30%, тогда как таблица держится.',
    fig2Title: 'Дообучение волнами против полного переобучения',
    fig2Sub: 'Потребительская карта 24 ГБ, восемь плеч, среднее знание по волнам',
    fig2Badge: 'Паритет 96.2%',
    fig2Analysis:
      'Долгое время поздние волны выучивались на 27–32% против 88% у первой, и это выглядело как цена локальности. Оказалось — нет. При внешнем адресе живой общий параметр ровно один — выходная проекция, — и он стартует с нуля, поэтому и направления, и громкость добавки назначает та волна, что обучалась первой. Калибровка этой проекции на 500 записях с последующей заморозкой возвращает паритет. Волна стоит 45 секунд против 75 у переобучения, и преимущество растёт: время волны зависит от размера волны, время переобучения — от всего накопленного корпуса.',
    fig3Title: 'Громкость: выше колена знание плоское, ущерб — нет',
    fig3Sub: 'Настоящий домен, три зерна на точку; перплексия на упоминаниях сущностей',
    fig3Badge: 'Рабочая точка: gain 50',
    fig3Analysis:
      'Громкость — свободный параметр конструкции, и ожидалось, что она торгует знание против текста на всём диапазоне. Не торгует. Выше 50 знание от неё не зависит вовсе — четыре точки в полосе 67.8–70.5% при шумовом поле 1.7, — тогда как ущерб тексту меняется вчетверо. Ниже 50 падает круто: громкость 25 даёт 60.5% при +1.2% перплексии. Значит 50 — это не компромисс, а ровно колено: наклон 0.347 пункта знания на пункт ущерба внизу против 0.017 вверху. Громкость как рычаг знания исчерпана, и знать это полезно: она снимает ручку, которую иначе продолжали бы крутить.',
    fig4Title: 'Фаза M1, все плечи на одних и тех же 183 вопросах',
    fig4Sub: '825 записей публичной библиотеки; плечо памяти обучено, поисковые — нет',
    fig4Badge: 'Порог 67.8% — достигнут, не превышен',
    fig4Analysis:
      'Это вся фаза на одном графике. База не знает домен вообще (47.5% при монетке 50%), любой извлекатель забирает 38–40 пунктов разрыва, и закрыть его половину — значит выставить планку памяти на 67.8%. Память, обученная на сыром тексте документации, даёт 54.1% — настоящий прирост к базе и ошибка округления против поисковых плеч. Та же память на тех же записях, подготовленных в ту форму, о которой вопросы и спрашивают, выходит на 68.1% на трёх зёрнах. Порог взят с запасом 0.3 пункта при разбросе 1.38, поэтому честная формулировка — «достигнут, но значимо не превышен». Оракульный потолок здесь показан исправленный: до обнаружения ошибки он собирался не из той записи адреса и был занижен на два пункта.',
    fig5Title: 'Адресация как извлекатель и откуда взялись её последние бесплатные пункты',
    fig5Sub: 'Recall@1 на тех же 183 вопросах против тех же 825 записей',
    fig5Badge: 'Коллизии разведены содержимым: 74.3% → 82.0%',
    fig5Analysis:
      'Адресация выбирает запись, поэтому её можно посчитать тем же кодом, что и поисковик. Правило «самое длинное упоминание» теперь исчерпано: верное имя присутствует лишь в 137 вопросах из 183, и правило берёт уже 136 из них. Оставались коллизии поверхностных форм — 27 ошибок из 47, — и разведение претендентов по содержимому их записей стоит 74.3% → 82.0% адресации и +2.0 ± 1.14 пункта знания (p=0.0266). Это последнее дешёвое улучшение на этой оси; всё остальное — либо вопрос, не называющий свою сущность, либо родитель, конкурирующий с ребёнком.',
    fig6Title: 'Решает состав корпуса, а не носитель',
    fig6Sub: 'Те же записи, та же память, тот же цикл обучения — различается только форма текста',
    fig6Badge: 'Сырой текст не несёт ничего',
    fig6Analysis:
      'Сырой текст документации в память не переносится. Диагноз резче самой оценки: на удержанных хвостах память не предсказывает даже продолжение собственной записи (83.3% против 84.5% у базы), а заведомо чужой адрес статистически неотличим от верного — доставать оттуда нечего. Память выучила то, чего база не знала о ТЕКСТЕ записи, тогда как вопросы спрашивают о её ПРЕДМЕТЕ. Подготовка записей в атомарные факты в той форме, которой пользуются вопросы, это чинит. Корпус, написанный самой замороженной базой, — нет: форма безупречна и факты впитаны, но покрытие того, о чём спрашивают, вдвое ниже (21.3% против 49.7%) — локальная модель умеет писать факты и не умеет выбирать, о чём. Контекстная дистилляция знания не добавляет вовсе и вместо этого срезает ущерб тексту на 43% при вшестеро меньшем разбросе.',
    fig7Title: 'Покрытие предсказывает знание, и предсказание — прямая',
    fig7Sub: 'Четыре точки на двух корпусах, считаются на ноутбуке за секунды',
    fig7Badge: 'R² = 0.996',
    fig7Analysis:
      'Знание = 49.14 + 0.539 × покрытие, где покрытие — доля вопросов замера, чей факт вообще присутствует в корпусе. Свободный член ложится ровно на уровень базы, что и должна делать здравая подгонка. Практическая ценность в том, что приёмка корпуса уезжает с арендованной карты: корпусу нужно покрытие 34.6%, чтобы взять планку M1, и теперь это вычисление на ноутбуке вместо получаса аренды. Она же закрыла ветку: отбор корпус не чинит, потому что его потолок равен покрытию исходника, а переупорядочивание замерено в +3.8 пункта для слабого корпуса и ровно ноль для сильного. Последняя точка лежит ниже прямой, и этот провал оказался ёмкостью адреса, а не корпусом.',
    fig8Title: 'Проза адресуется страницей, а не разделом',
    fig8Sub: 'Скрининг одиннадцати прозаических корпусов; два набора вопросов одним трактом',
    fig8Badge: '95.0% против 9.0%',
    fig8Analysis:
      'Вся доказательная база проекта снята на кодовой библиотеке, тогда как продуктовое обещание — вики компании. Скрининг одиннадцати прозаических корпусов приёмочной метрикой: по разделам порог 60% не берёт ни один — лучшее 59.4%, а настоящий корпоративный хендбук даёт 18.1%. Провалы одинаковы у всех и названы поимённо: «Overview», «What\'s next», «Introduction». Адресация страницы вместо раздела меняет ответ: порог берут восемь корпусов из одиннадцати, а адрес страницы попадает в нужную запись у 95.0% и 96.9% прямых вопросов против 9.0% и 9.3% по разделам. Раздел при этом не просто молчит — он ведёт в чужую запись у 85.7% вопросов. Цена настоящая: 12.5 записей на адрес вместо 1.9, а косвенная корзина растёт с 6.0% до 20.6%.',
    fig9Title: 'Планка для прозы стоит в другой корзине',
    fig9Sub: 'Концепты Kubernetes, 1.34 → 1.35, те же плечи, что и на кодовом домене',
    fig9Badge: 'Порог 79.9%',
    fig9Analysis:
      'Прозаический домен пригоден, и он труднее — это стоит проговорить, а не спрятать. База уже знает Kubernetes: 64.8% против 47.5% на кодовой библиотеке при разрыве логвероятностей +0.591 против −0.020. Значит на прозе вопрос перестаёт быть «может ли память принести знание, которого у модели нет», и становится «может ли она добавить к тому, что у модели уже есть», а порог фазы поднимается до 79.9%. Косвенная корзина там составляет 20.6% набора; поиск отвечает на неё в 94.9% случаев, а память по построению молчит — нет упоминания, нет адреса. Плечо памяти на этом домене ещё не прогонялось: этот график — планка, а не результат.',
    tableTitle: 'Сколько это стоит в железе',
    colAxis: 'Ось',
    colValue: 'Измеренное значение',
    colAdv: 'Что это значит',
    rows: [
      { axis: 'Обучение против объёма корпуса', val: 'Линейно, показатель 1.05 — 0.076 с на запись за эпоху', adv: 'Чисто масштабируется на настоящий корпус документации' },
      { axis: 'Качество при фиксированных эпохах', val: '96.9% на 500 записях против 80.0% на 50', adv: 'Больше корпус — лучше, а не хуже' },
      { axis: 'VRAM обучения', val: '0.0112 ГБ на 1M параметров памяти', adv: 'Инференсу нужно 0.0034 ГБ на 1M' },
      { axis: 'Скорость генерации', val: '15.1 → 15.1 токенов/с', adv: 'Память на генерации бесплатна' },
      { axis: 'Таблица в RAM или на диске', val: '0.98× токенов/с', adv: 'Размер памяти не упирается в видеокарту' },
      { axis: 'Дрейф ранних записей', val: '0.0 п.п. за четыре дообучения', adv: 'Волны не забывают ничего' },
      { axis: 'Разрядность', val: 'int8 держит серию правок, int4 её убивает', adv: 'Рекомендуемая разрядность — int8' },
      { axis: 'По какой оси расти', val: '×2 ширина вектора → +16.8 п.п.; ×16 слотов → +0.8 п.п.', adv: 'Качество платит за ширину, а не за число слотов' },
    ],
    noticeTitle: 'Что закрыто, а что открыто',
    noticeText:
      'Реализация, конфигурации, стенды замеров и сырые артефакты прогонов закрыты. Методика, измеренные числа, отрицательные результаты и рассуждение за каждым решением опубликованы здесь и предназначены для того, чтобы с ними спорили. Исследователи, которым интересны совместные прогоны или разбор логов замеров, могут написать через профиль на GitHub @8hrsk.',
  },
};
