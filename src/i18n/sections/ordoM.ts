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
    fig3Title: 'The loudness knob trades knowledge against text',
    fig3Sub: 'Frozen random orthogonal output, perplexity delta on held-out text',
    fig3Badge: 'Working point: gain 100',
    fig3Analysis:
      'Output gain turned out to be a free knob of the construction, and it trades knowledge directly against damage to the text. At gain 250 waves reach 99.5–100%, but perplexity on sentences that mention the entity rises by 266%. The working point was fixed at gain 100: three times more knowledge than the old construction at one tenth of the damage. Perplexity on unrelated prose does not move at any setting — +0.00%.',
    fig4Title: 'First real domain: the bar that search sets',
    fig4Sub: '825 records of a public library, 183 audited questions, no training in any arm',
    fig4Badge: 'Memory must clear 67.8%',
    fig4Analysis:
      'Until this chapter every number came from synthetic single-fact benchmarks. This is the first real corpus, and it produced two unwelcome results. The base model does not know the domain at all — 47.5% where a coin flip is 50% — so the gap is real, and any retriever takes 38–40 points of it. And the class has a ceiling: even with the correct record handed to the model, one question in ten is still answered wrong. Closing half the gap to the strongest honest search arm means the memory has to reach 67.8%. That arm has not been measured yet, and saying so is the honest boundary of this chapter.',
    fig5Title: 'Symbolic addressing is a retriever too — and it loses',
    fig5Sub: 'Recall@1 on the same 183 questions against the same 825 records',
    fig5Badge: 'A free +15.1 pp is available',
    fig5Analysis:
      'Because addressing selects a record, it can be scored by exactly the same code as a search engine and put in the same table. On a real domain it loses to plain lexical search: 60.1% against 68.3%. Two measured causes: short names are contested — one common method name belongs to 50 different records — and the address is sticky, so the last mention in the question wins and often takes a foreign slot. Sweeping the selection rule found a free fix: pick the longest matching mention instead of the last one, worth +15.1 points with no training at all. It is implemented but not switched on by default, because changing the address would rewrite the meaning of every stored run.',
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
    fig3Title: 'Громкость добавки торгует знание против текста',
    fig3Sub: 'Замороженный случайный ортогональный выход, прирост перплексии на отложенном тексте',
    fig3Badge: 'Рабочая точка: gain 100',
    fig3Analysis:
      'Громкость выхода оказалась свободной ручкой конструкции, и она напрямую торгует знание против ущерба тексту. При gain 250 волны выходят на 99.5–100%, но перплексия на предложениях, называющих сущность, растёт на 266%. Рабочей точкой зафиксирован gain 100: втрое больше знания, чем у прежней конструкции, при вдесятеро меньшем ущербе. Перплексия на посторонней прозе не двигается ни при одной настройке — +0.00%.',
    fig4Title: 'Первый настоящий домен: планка, которую ставит поиск',
    fig4Sub: '825 записей публичной библиотеки, 183 проверенных вопроса, обучения нет ни в одном плече',
    fig4Badge: 'Памяти нужно взять 67.8%',
    fig4Analysis:
      'До этой главы все числа приходили с синтетических однофактовых наборов. Это первый настоящий корпус, и он дал два неприятных результата. База не знает домен вообще — 47.5% при монетке 50%, — значит разрыв реален, и любой извлекатель забирает 38–40 пунктов. И у класса есть потолок: даже когда нужная запись подана модели в контекст, каждый десятый вопрос всё равно отвечается неверно. Закрыть половину разрыва до сильнейшего честного поискового плеча — значит взять 67.8%. Это плечо ещё не замерено, и сказать об этом прямо — честная граница главы.',
    fig5Title: 'Адресация памяти — тоже извлекатель, и она проигрывает',
    fig5Sub: 'Recall@1 на тех же 183 вопросах против тех же 825 записей',
    fig5Badge: 'Есть бесплатные +15.1 п.п.',
    fig5Analysis:
      'Раз адресация выбирает запись, её можно посчитать ровно тем же кодом, что и поисковик, и поставить в ту же таблицу. На настоящем домене она проигрывает обычному лексическому поиску: 60.1% против 68.3%. Обе причины измерены: короткие имена оспариваются — одно распространённое имя метода принадлежит 50 разным записям, — и адрес липкий, поэтому побеждает последнее упоминание в вопросе, а оно часто уводит в чужой слот. Перебор правил выбора нашёл бесплатное исправление: брать самое длинное совпадение вместо последнего, +15.1 пункта без единого шага обучения. Оно реализовано, но не включено по умолчанию: смена адреса переписала бы смысл всех сохранённых прогонов.',
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
