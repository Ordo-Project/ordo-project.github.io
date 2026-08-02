import type { Bilingual } from '../types';

const en = {
    tag: 'RESEARCH LOG',
    title: 'What happened, in order, including what failed',
    subtitle:
      'Both projects are written as diaries rather than result sheets. Entries are dated from the working logs; the ones marked as negative results are the ones that changed the direction of the work.',
    kinds: { win: 'Confirmed', fail: 'Negative result', pivot: 'Direction change' },
    filterAll: 'All entries',
    entries: [
      { date: '2026-07-29', proj: 'Ordo-M', kind: 'pivot', title: 'Project opens as an adapter pipeline', text: 'The original plan was a pipeline turning documentation into adapters: synthetic corpus expansion, an evaluation gate, a library of domain packs, a router.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'fail', title: 'First laptop pilots are confounded', text: 'A 4-bit checkpoint on a laptop failed latent retrieval, multi-hop, aggregation and update tracking — but an FP16 baseline on a desktop card solved two of them. Low scores could not be attributed to context length; quantization and checkpoint conversion were confounders, and the harness was rebuilt around paired tests.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'win', title: 'Context rot reproduced and localized', text: '375 cases across five lengths and five positions. Literal retrieval falls 20 points at 16K→32K, paired p=0.0001, and the failure concentrates in a band at 0.70–0.80 rather than growing with distance.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'fail', title: 'Evidence-first prompting moves the hole', text: 'Forcing the model to quote its evidence first repaired all 14 known failures and introduced 30 new ones at other positions. A consistency gate between the two decoding branches recovered 139/140 — the ensemble works, the prompt alone does not.' },
      { date: '2026-07-31', proj: 'Ordo-M', kind: 'pivot', title: 'The adapter track is closed', text: 'One measurement decided it: an adapter updates only as a whole, and a point edit damages 8.4% of neighbouring knowledge against 0.0% for the table. The pipeline materials were kept only as controls.' },
      { date: '2026-07-31', proj: 'OrdoGen', kind: 'fail', title: 'The sparse router fails its systems gate', text: 'A hierarchical index reduced scored pairs 20× at 2M tokens, but every configuration either lost recall or ran slower than dense attention. Saving arithmetic without kernel co-design loses to a dense matrix multiply.' },
      { date: '2026-07-31', proj: 'OrdoGen', kind: 'win', title: 'Prompt-level relay is significant at 32K and 64K', text: 'Periodically restating what is being looked for — never the answer — lifted retrieval from 10/30 to 17/30 at 32K and from 6/30 to 17/30 at 64K, at about 4% latency.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'fail', title: '128K does not yield', text: 'On a rented 48GB card the model physically executes a 128K prefill, but both the plain and the intervention arm score 0/15, and no hierarchical marker variant passes. Compositional tasks got worse, not better. The packet did not solve 128K — it localized why.' },
      { date: '2026-08-01', proj: 'Ordo-M', kind: 'win', title: 'The hardware cost is measured end to end', text: 'Training is linear in corpus size, memory at generation time is free, the table can live in host RAM at a 2% cost, int8 holds an edit series and int4 destroys it.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'win', title: 'The bottleneck is localized causally', text: 'Ablating three heads of one late layer costs 8 of 32 correct answers on held-out cases; matched control heads cost nothing. The effect is specific to distant evidence.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'win', title: 'Steering those heads repairs the failures', text: 'An oracle address in the same three heads repairs 9 of 35 frozen failures, zero regressions, p=0.0039. The same address in control heads repairs nothing — necessity and partial sufficiency in one design.' },
      { date: '2026-08-01', proj: 'Ordo-M', kind: 'win', title: 'Incremental retraining reaches parity', text: 'The wave collapse was a step at the freeze boundary, not accumulated forgetting. Calibrating the single live shared parameter and freezing it lifts wave knowledge from 29.5% to 96.2%, against 96.9% for a full retrain.' },
      { date: '2026-08-02', proj: 'OrdoGen', kind: 'win', title: 'A learned selector replaces the oracle', text: 'Trained only on 4K/8K and evaluated frozen at 32K, it keeps 5 of the 9 repairs with no regressions, and the effect vanishes in control heads. Reported honestly as not two-sided significant.' },
      { date: '2026-08-02', proj: 'Ordo-M', kind: 'fail', title: 'On a real domain, addressing loses to lexical search', text: 'On 825 records of a public library and 183 audited questions, symbolic addressing retrieves the right record 60.1% of the time against 68.3% for plain lexical search. A free fix worth +15.1 points was found in the mention-selection rule and is not yet the default.' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const timeline: Bilingual<typeof en> = {
  en,
  ru: {
    tag: 'ХОД ИССЛЕДОВАНИЯ',
    title: 'Что происходило по порядку, включая то, что не получилось',
    subtitle:
      'Оба проекта ведутся дневниками, а не отчётами о результатах. Записи датированы по рабочим журналам; те, что помечены отрицательным результатом, — это те, которые меняли направление работы.',
    kinds: { win: 'Подтверждено', fail: 'Отрицательный результат', pivot: 'Смена направления' },
    filterAll: 'Все записи',
    entries: [
      { date: '2026-07-29', proj: 'Ordo-M', kind: 'pivot', title: 'Проект открывается как конвейер адаптеров', text: 'Исходный план — конвейер, превращающий документацию в адаптеры: синтетическое расширение корпуса, шлюз замеров, библиотека доменных паков, роутер.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'fail', title: 'Первые пилоты на ноутбуке загрязнены', text: '4-битный чекпоинт на ноутбуке провалил латентный поиск, многошаговые вопросы, агрегацию и отслеживание обновлений — но FP16 на настольной карте решил две из них. Значит низкие оценки нельзя приписывать длине контекста: квантование и конвертация чекпоинта оказались смешивающими факторами, а стенд был перестроен вокруг парных тестов.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'win', title: 'Деградация контекста воспроизведена и локализована', text: '375 примеров на пяти длинах и пяти позициях. Дословный поиск теряет 20 пунктов на переходе 16K→32K, парный p=0.0001, и провал сосредоточен в полосе 0.70–0.80, а не растёт с расстоянием.' },
      { date: '2026-07-30', proj: 'OrdoGen', kind: 'fail', title: 'Промпт «сначала факт» переносит яму', text: 'Требование сперва выписать основание починило все 14 известных ошибок и создало 30 новых на других позициях. Шлюз согласованности между двумя ветвями декодирования вытянул 139/140 — работает ансамбль, а не сам промпт.' },
      { date: '2026-07-31', proj: 'Ordo-M', kind: 'pivot', title: 'Трек адаптеров закрыт', text: 'Решило одно измерение: адаптер обновляется только целиком, и точечная правка повреждает 8.4% соседнего знания против 0.0% у таблицы. Материалы конвейера оставлены только как контроли.' },
      { date: '2026-07-31', proj: 'OrdoGen', kind: 'fail', title: 'Разреженный роутер не проходит системный шлюз', text: 'Иерархический индекс сократил число сравниваемых пар в 20 раз на 2M токенов, но каждая конфигурация либо теряла полноту, либо работала медленнее плотного внимания. Экономия арифметики без совместной разработки ядра проигрывает плотному матричному умножению.' },
      { date: '2026-07-31', proj: 'OrdoGen', kind: 'win', title: 'Промптовое реле значимо на 32K и 64K', text: 'Периодическое повторение того, что именно ищется — но никогда ответа, — подняло поиск с 10/30 до 17/30 на 32K и с 6/30 до 17/30 на 64K ценой около 4% задержки.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'fail', title: '128K не поддаётся', text: 'На арендованной карте 48 ГБ модель физически исполняет прогон на 128K, но и обычное плечо, и плечо вмешательства дают 0/15, и ни один иерархический вариант маркеров не проходит. Композиционные задачи стали хуже, а не лучше. Пакет не решил 128K — он локализовал причину.' },
      { date: '2026-08-01', proj: 'Ordo-M', kind: 'win', title: 'Цена в железе посчитана целиком', text: 'Обучение линейно по объёму корпуса, память на генерации бесплатна, таблицу можно вынести в системную RAM за 2% скорости, int8 держит серию правок, а int4 её убивает.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'win', title: 'Узкое место локализовано причинно', text: 'Зануление трёх голов одного позднего слоя стоит 8 из 32 верных ответов на отложенных примерах; согласованные контрольные головы не стоят ничего. Эффект специфичен к удалённым фактам.' },
      { date: '2026-08-01', proj: 'OrdoGen', kind: 'win', title: 'Стиринг тех же голов чинит ошибки', text: 'Оракульный адрес в тех же трёх головах чинит 9 из 35 замороженных ошибок, ноль регрессий, p=0.0039. Тот же адрес в контрольных головах не чинит ничего — необходимость и частичная достаточность в одном дизайне.' },
      { date: '2026-08-01', proj: 'Ordo-M', kind: 'win', title: 'Дообучение волнами выходит на паритет', text: 'Провал волн оказался ступенькой на границе заморозки, а не накопленным забыванием. Калибровка единственного живого общего параметра с последующей заморозкой поднимает знание волн с 29.5% до 96.2% против 96.9% у полного переобучения.' },
      { date: '2026-08-02', proj: 'OrdoGen', kind: 'win', title: 'Обучаемый селектор заменяет оракула', text: 'Обученный только на 4K/8K и проверенный замороженным на 32K, он удерживает 5 из 9 починок без регрессий, а в контрольных головах эффект исчезает. Подан честно как двусторонне незначимый.' },
      { date: '2026-08-02', proj: 'Ordo-M', kind: 'fail', title: 'На настоящем домене адресация проигрывает лексическому поиску', text: 'На 825 записях публичной библиотеки и 183 проверенных вопросах символьная адресация достаёт нужную запись в 60.1% случаев против 68.3% у обычного лексического поиска. В правиле выбора упоминания найдено бесплатное исправление на +15.1 пункта, пока не включённое по умолчанию.' },
    ],
  },
};
