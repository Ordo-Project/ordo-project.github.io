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
    fig10Title: 'Two domains: the gain is constant, the bar is not',
    fig10Sub: 'The same phase rule applied to a code library and to a protocol SDK',
    fig10Badge: 'Cleared 1 of 2',
    fig10Analysis:
      'Bringing both domains into one chart was more useful than either alone. What the memory adds over the base holds in a narrow band across two entirely different sources — 18.7 and 15.9 points — while the bar, defined as half the distance from the base to hybrid retrieval, moves with how well the domain happens to search. The SDK searches better (92.3% against 88.0%), so its bar sits 3.4 points higher, exactly where the memory does not reach at this model size: 65.6% ± 1.27 against 71.2%. The uncomfortable consequence is worth stating before someone else states it: a rule of "half the gap to retrieval" penalises a well-structured domain. It still works as a phase criterion, because the point was to compare the memory against the alternative rather than against zero — but it must be read as "has the memory caught up with retrieval", not as "does the memory bring knowledge". To the second question the answer on both domains is a firm yes.',
    fig11Title: 'The coverage law transfers in shape, not in slope',
    fig11Sub: 'Prediction written down before the run; the miss has the same sign on both points',
    fig11Badge: 'Missed by 7.3 and 8.6 points',
    fig11Analysis:
      'The straight line fitted on the first domain was used to predict the second before a single run — 72.0% and 76.1%. Measured: 64.7% and 67.5%. The miss is seven times the expected noise, so it is a property and not scatter. What transfers is only linearity: three coverage points on this domain fall on a line with R² = 0.9961, and the prediction of the third point, also written down first, held. Both coefficients turned out to belong to the domain — and the first version of this figure got one of them wrong. It said the intercept lands on the base level; on three points it is 51.95 against a base of 49.7, and the agreement on two points was an artefact. The slope is 0.307 against 0.539, flatter by a factor of 1.76. That turns a question about a domain into arithmetic: this threshold needs 62.7% coverage and the corpus can supply at most 54.8%, so no better selection of this corpus can clear the bar. Correcting the intercept made that conclusion stronger, not weaker.',
    fig12Title: 'The damage budget, read by a human',
    fig12Sub: '39 blind pairs across five damage levels; verdicts recorded before the key was opened',
    fig12Badge: 'Base 25, memory 3, p = 2.7·10⁻⁵',
    fig12Analysis:
      'Perplexity is a probe, and a probe can be arbitrarily strict. So the continuations were read blind, in pairs, with the verdict written down before the arm was revealed. The damage is visible, and it grows with the number: at +39.6% half the pairs are indistinguishable, and from +96.8% upward the memory loses every non-empty pair. Overall 25 against 3 with 12 ties, p = 2.7·10⁻⁵, Spearman ρ = 0.405. This overturns the author\'s own first impression, formed by reading continuations one at a time, that the budget was too strict — the base drifts into repetition too, but the memory arm drifts further. The conclusion is that ΔPPL is a fair measure and the budget of +36.8% sits about where it should. The judge is one person, blind to the arm but not disinterested.',
    fig13Title: 'A gate with no trainable parameters removes 96% of the damage',
    fig13Sub: 'Knowledge against text damage across six operating points; the budget is +36.8%',
    fig13Badge: 'Cost 2.0 points, p = 0.229',
    fig13Analysis:
      'This is the first mechanism in the project that beats simply turning the memory down, and the volume axis had been closed for a fortnight. The gate opens the memory where an answer is being written and closes it on ordinary prose, using keys in closed form — nothing here is trained, and fitting takes 22 seconds. At the matched flow share it turns +45.5% damage into +1.35% for a cost of 2.0 points of knowledge that is not significant on any reading rule. Compare the two arms at equal, near-zero damage: gate 56.8%, quiet memory 54.2%. Separability carried into the run with margin — 84.2% of prose positions closed while 78.8% of answer positions stayed open. What the freed budget buys is the last two bars: spending it on epochs gives 60.6% at +25.33%, still inside budget. Five gated points now sit at 59–62% and are pairwise indistinguishable, so on this model size that is a wall, and the binding constraint is no longer damage.',
    fig14Title: 'The larger model walks up to the bar and stops 0.8 points short',
    fig14Sub: 'Knowledge against the share of the residual flow the memory adds; the bar is 71.2%',
    fig14Badge: 'Best in budget 70.4% ± 1.0',
    fig14Analysis:
      'What transfers between model sizes is this share, not the volume setting that produces it — that was measured rather than assumed, and a volume that worked on the small model suffocates the memory here. Knowledge climbs with the share and flattens after about 1.8. The point that matters is the third one: seed 0 gave 71.4% and would have cleared the bar. A rule written down before the run — do not announce a threshold without a second seed — is what stopped the announcement, and the second seed gave 69.4%. The mean is 70.4% ± 1.0 against a bar of 71.2%, a shortfall of 0.8 points, and the same rule had already caught the same mistake once before. Two mechanisms were then measured and closed: splitting an entity across slots produced the best fitting error in the project and read 6.1 points worse, and the addressing dividend has a hard ceiling of +1.87 points of which about +1.0 is reachable. Inside this construction there is nothing left to try for those 0.8 points.',
    fig15Title: 'Four strata: what content buys, and what form buys',
    fig15Sub: 'The same question set, cut by whether the fact was trained and whether the wording matched',
    fig15Badge: 'Coverage 74.4%, not 54.8%',
    fig15Analysis:
      'The measure used to size corpora was counting a correct paraphrase as "not covered". Judged on the same addresses, coverage is 74.4% rather than 54.8% — both halves of the set reproduced the gap independently, and 128 deliberately swapped addresses gave a false-positive floor of exactly 0.0%. Cutting the set four ways instead of two gives the shape above and three conclusions. Content is necessary: where the fact is nowhere in the corpus, the gain cannot be told from zero at any operating point. Content is not sufficient: at two facts per address, 190 questions of 507 fall in the crowded-out stratum, where the answer was written and the memory never saw it. And form is worth a great deal but is poorly anchored — the same sign everywhere, the magnitude varying threefold. The ceiling under full coverage is 59.9–69.0%, all of it below the 71.2% bar, so the wall was never the content of the corpus.',
    fig16Title: 'Address capacity saturates near eight facts',
    fig16Sub: 'Training on more of the same corpus: the share rises, knowledge does not',
    fig16Badge: 'The discarded 37% was worth nothing',
    fig16Analysis:
      'An audit of our own bench found that the operating point was training on 62.5% of the corpus, because facts past the eighth on an address were being dropped — a live axis every chapter had missed. Two arms tested it against a criterion registered in advance, and the criterion rejected the audit\'s own hypothesis. Raising the cap to twelve gives 69.6%, removing it entirely gives 70.2%, against 70.4% ± 1.0 for the baseline: knowledge did not move, and damage rose to the edge of the budget. Three numbers give the diagnosis. The oracle arm did not move, so this is not addressing. Fitting error grows monotonically, 1.64 → 1.90 → 2.26, which is the signature of crowding. The flow share is unchanged, so the extra damage came from the number of training steps rather than from a stronger addition. Eight facts is not a grid point, it is the edge of saturation.',
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
    fig10Title: 'Два домена: прибавка постоянна, планка — нет',
    fig10Sub: 'Одно и то же правило фазы, применённое к кодовой библиотеке и к SDK протокола',
    fig10Badge: 'Взят 1 из 2',
    fig10Analysis:
      'Свести оба домена в один график оказалось полезнее, чем разбирать каждый порознь. Прибавка памяти над базой держится в узкой полосе на двух совершенно разных источниках — 18.7 и 15.9 пункта, — тогда как планка, заданная как половина расстояния от базы до гибридного поиска, ходит вслед за тем, насколько удачно домен ищется. SDK ищется лучше (92.3% против 88.0%), поэтому его планка стоит на 3.4 пункта выше — ровно там, куда память не достаёт на этом размере модели: 65.6% ± 1.27 против 71.2%. Неприятное следствие стоит проговорить раньше, чем это сделает кто-то снаружи: правило «половина разрыва до поиска» наказывает за хорошо структурированный домен. Как критерий фазы оно не отменяется — его придумали, чтобы сравнивать память с альтернативой, а не с нулём, — но читать его надо как «догнала ли память поиск», а не как «приносит ли память знание». На второй вопрос ответ на обоих доменах твёрдое да.',
    fig11Title: 'Закон покрытия переносится формой, но не наклоном',
    fig11Sub: 'Прогноз записан до прогона; промах на обеих точках одного знака',
    fig11Badge: 'Промах 7.3 и 8.6 пункта',
    fig11Analysis:
      'Прямая, подогнанная на первом домене, была использована для предсказания второго ещё до единого прогона — 72.0% и 76.1%. Измерено: 64.7% и 67.5%. Промах в семь раз больше ожидаемого шума, то есть это свойство, а не разброс. Переносится только линейность: три точки покрытия на этом домене ложатся на прямую с R² = 0.9961, и прогноз третьей точки, тоже записанный заранее, подтвердился. Оба коэффициента оказались свойствами домена — и первая версия этой фигуры один из них назвала неверно. В ней было сказано, что свободный член ложится на уровень базы; по трём точкам он 51.95 против базы 49.7%, а совпадение по двум было артефактом. Наклон 0.307 против 0.539, площе в 1.76 раза. Это превращает вопрос о домене в арифметику: порогу соответствует покрытие 62.7%, а корпус даёт максимум 54.8%, значит никакой отбор внутри этого корпуса планку не возьмёт. Исправление свободного члена сделало вывод крепче, а не слабее.',
    fig12Title: 'Бюджет порчи, прочитанный человеком',
    fig12Sub: '39 слепых пар на пяти уровнях порчи; приговоры записаны до открытия ключа',
    fig12Badge: 'База 25, память 3, p = 2.7·10⁻⁵',
    fig12Analysis:
      'Перплексия — это зонд, а зонд может быть сколь угодно строгим. Поэтому продолжения читались вслепую, парами, с приговором, записанным до раскрытия плеча. Порча видна и растёт вместе с числом: при +39.6% половина пар неразличима, а с +96.8% и выше память проигрывает каждую непустую пару. Итого 25 против 3 при 12 равных, p = 2.7·10⁻⁵, Спирмен ρ = 0.405. Это опровергает первое впечатление самого автора, сложившееся при чтении продолжений по одному, что бюджет чрезмерно строг: база тоже уходит в повтор, но плечо памяти уходит дальше. Вывод — ΔPPL мера годная, а бюджет +36.8% стоит примерно там, где надо. Судья один, слепой к плечу, но не незаинтересованный.',
    fig13Title: 'Вентиль без обучаемых параметров убирает 96% порчи',
    fig13Sub: 'Знание против порчи текста на шести точках; бюджет фазы +36.8%',
    fig13Badge: 'Цена 2.0 пункта, p = 0.229',
    fig13Analysis:
      'Это первый механизм проекта, обыгравший простое снижение громкости, а ось громкости была закрыта двумя неделями раньше. Вентиль открывает память там, где пишется ответ, и закрывает на обычной прозе; ключи в закрытой форме — здесь не обучается ничего, подбор занимает 22 секунды. На согласованной доле потока он превращает порчу +45.5% в +1.35% ценой 2.0 пункта знания, не значимых ни на одном правиле чтения. Сравнивать надо два плеча при одинаковой, почти нулевой порче: вентиль 56.8%, тихая память 54.2%. Разделимость перенеслась в прогон с запасом — закрыто 84.2% позиций прозы при 78.8% открытых позиций ответа. Что покупает освобождённый бюджет, видно на двух последних столбцах: потраченный на эпохи, он даёт 60.6% при +25.33%, всё ещё внутри бюджета. Пять точек с вентилем теперь стоят на 59–62% и попарно не различимы, то есть на этом размере модели это стена, и связывающее ограничение уже не порча.',
    fig14Title: 'Большая модель подходит к планке и останавливается в 0.8 пункта',
    fig14Sub: 'Знание против доли остаточного потока, которую добавляет память; планка 71.2%',
    fig14Badge: 'Лучшая в бюджете 70.4% ± 1.0',
    fig14Analysis:
      'Между размерами моделей переносится именно эта доля, а не громкость, её производящая, — это измерено, а не предположено: громкость, работавшая на малой модели, здесь память душит. Знание растёт по доле и выполаживается после ~1.8. Важна третья точка: зерно 0 дало 71.4% и планку бы взяло. Записанное до прогона правило — не объявлять порог без второго зерна — не дало этого сделать, а второе зерно дало 69.4%. Среднее 70.4% ± 1.0 при планке 71.2%, недобор 0.8 пункта, и то же правило уже ловило ту же ошибку однажды. Затем замерены и закрыты два механизма: дробление сущности на слоты дало лучшую за проект посадку и прочиталось на 6.1 пункта хуже, а у дивиденда адресации жёсткий потолок +1.87 пункта, из которых достижимо около +1.0. Внутри этой конструкции на недостачу пробовать больше нечего.',
    fig15Title: 'Четыре страты: что покупает содержание и что покупает форма',
    fig15Sub: 'Тот же набор вопросов, разрезанный по тому, обучен ли факт и совпала ли формулировка',
    fig15Badge: 'Покрытие 74.4%, а не 54.8%',
    fig15Analysis:
      'Мера, которой мерили корпуса, считала верный пересказ «непокрытым». По суждению на тех же адресах покрытие 74.4%, а не 54.8% — обе половины набора воспроизвели разрыв независимо, а 128 подмен адреса дали поле ложных срабатываний ровно 0.0%. Разрез набора на четыре страты вместо двух даёт форму выше и три вывода. Содержание необходимо: где факта нет во всём корпусе, прибавку не отличить от нуля ни в одной точке. Содержания недостаточно: при двух фактах на адрес 190 вопросов из 507 попадают в страту вытеснения, где ответ написан, а память его не видела. И форма стоит заметно, но плохо закреплена — знак один везде, величина разъезжается втрое. Потолок при полном покрытии 59.9–69.0%, всё ниже планки 71.2%, то есть стена никогда не была содержанием корпуса.',
    fig16Title: 'Ёмкость адреса насыщается около восьми фактов',
    fig16Sub: 'Обучение на большей части того же корпуса: доля растёт, знание нет',
    fig16Badge: 'Выброшенные 37% не стоили ничего',
    fig16Analysis:
      'Аудит собственного стенда обнаружил, что рабочая точка обучалась на 62.5% корпуса: факты после восьмого на адрес отбрасывались — живая ось, пропущенная всеми главами. Два плеча проверили её против критерия, зарегистрированного заранее, и критерий отверг гипотезу самого аудита. Потолок в двенадцать даёт 69.6%, снятие потолка — 70.2% против 70.4% ± 1.0 у опоры: знание не сдвинулось, а порча выросла до края бюджета. Диагноз дают три числа. Оракул не двинулся — значит дело не в адресации. Ошибка посадки растёт монотонно, 1.64 → 1.90 → 2.26, и это подпись вытеснения. Доля потока та же, то есть лишняя порча пришла от числа шагов обучения, а не от более сильной добавки. Восемь фактов — не точка сетки, а край насыщения.',
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
