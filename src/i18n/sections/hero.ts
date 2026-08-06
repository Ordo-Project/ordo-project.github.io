import type { Bilingual } from '../types';

const en = {
    badge: 'Closed-source lab • Research prototype • Data cut-off: 2026-08-06',
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
      effVal: '−96%',
      effLabel: 'Text damage removed by a gate with no trainable parameters',
      effSub: 'cost 2.0 points of knowledge, not significant (p = 0.229)',
      relayVal: '0.8 pp',
      relayLabel: 'How far the memory stopped short of the bar on the harder domain',
      relaySub: '70.4% ± 1.0 against 71.2%; the best single seed would have cleared it',
      penaltyVal: '35%',
      penaltyLabel: 'Answers that flip when the context is reordered',
      penaltySub: 'same tokens, evidence on the same index — 5% at a quarter of the window',
    },
    abstractTitle: 'Technical abstract',
    abstractText:
      'Two bottlenecks block a locally hosted assistant. First, updating facts by fine-tuning is destructive: an equal-capacity LoRA damages 8.4% of neighbouring knowledge on a point edit, so a new documentation version cannot be written over an old one without re-verifying everything else. Second, a physically accepted context window is not a functional one: within the native position limit of a small model, literal retrieval drops from 70/70 at 16K to 56/70 at 32K, and at 128K both plain prompts and the best prompt-level intervention score 0/15. Ordo-M answers the first by writing knowledge into an external value table addressed from text, leaving the base weights bit-identical. OrdoGen answers the second by measuring the collapse and localizing it causally to three attention heads in one late layer. Both are research prototypes, and the honest state is this. The damage half of Ordo-M is essentially solved: a gate with no trainable parameters, opening the memory where an answer is written and closing it on ordinary prose, removes 96% of the text damage for a cost of 2.0 points of knowledge that is not statistically significant — the first mechanism in the project to beat simply writing more quietly. The knowledge half is not. On the harder of two domains the best point inside the damage budget reaches 70.4% ± 1.0 against a bar of 71.2%, and the pre-registered rule of a second seed is what stopped a single lucky run from being announced as a pass. Everything that could have closed those 0.8 points has now been measured and closed: splitting an entity across slots fits best and reads worst, the addressing dividend has a hard ceiling of about one point, and training on the whole corpus instead of 62.5% of it moves knowledge not at all. The binding constraint is the capacity of a single address, which saturates near eight facts — not the content of the corpus, as an earlier and wrongly-measured coverage figure had suggested. In OrdoGen the correction is sharper: on most long-context cases every candidate route returns the same answer, so only about an eighth of any test set can be moved at all, and unconditional interventions — reordering, steering — destroy more than they repair.',
    statusTitle: 'Project status',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 cleared on the first domain by 0.3 points; on the second the shortfall is 0.8 and the construction has no mechanism left for it. Damage solved by the gate. Prose bar at 79.9%, not yet attempted.' },
      { label: 'OrdoGen', value: 'Bottleneck localized causally, but only an eighth of cases can be moved by routing at all. No subquadratic speed-up demonstrated.' },
      { label: 'Publication', value: 'Source code and evaluation harnesses are closed. Methods and numbers are open.' },
    ],
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const hero: Bilingual<typeof en> = {
  en,
  ru: {
    badge: 'Закрытая лаборатория • Исследовательский прототип • Срез данных: 2026-08-06',
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
      effVal: '−96%',
      effLabel: 'Порчи текста убирает вентиль без обучаемых параметров',
      effSub: 'цена 2.0 пункта знания, не значима (p = 0.229)',
      relayVal: '0.8 п.п.',
      relayLabel: 'Насколько память не дошла до планки на трудном домене',
      relaySub: '70.4% ± 1.0 против 71.2%; лучшее одиночное зерно планку бы взяло',
      penaltyVal: '35%',
      penaltyLabel: 'Ответов переворачивается от перестановки контекста',
      penaltySub: 'те же токены, факт на том же индексе — 5% на четверти окна',
    },
    abstractTitle: 'Техническая аннотация',
    abstractText:
      'Локальному ассистенту мешают два барьера. Первый: обновление фактов дообучением разрушительно — LoRA равной ёмкости при точечной правке повреждает 8.4% соседнего знания, поэтому новую версию документации нельзя записать поверх старой, не перепроверив всё остальное. Второй: физически принятое окно контекста не является рабочим — внутри штатного лимита позиций маленькой модели дословный поиск падает с 70/70 на 16K до 56/70 на 32K, а на 128K и обычный промпт, и лучшее промптовое вмешательство дают 0/15. Ordo-M отвечает на первый барьер записью знания во внешнюю таблицу значений, адресуемую из текста, оставляя веса базы побитово прежними. OrdoGen отвечает на второй: обрыв измерен и локализован причинно до трёх голов внимания в одном позднем слое. Оба — исследовательские прототипы, и честное состояние таково. Половина Ordo-M, отвечающая за порчу, по существу решена: вентиль без единого обучаемого параметра, открывающий память там, где пишется ответ, и закрывающий её на обычной прозе, убирает 96% порчи текста ценой 2.0 пункта знания, статистически не значимых, — первый механизм проекта, обыгравший простое «записывать тише». Половина, отвечающая за знание, не решена. На более трудном из двух доменов лучшая точка внутри бюджета порчи даёт 70.4% ± 1.0 при планке 71.2%, и записанное заранее правило второго зерна не дало объявить взятым один удачный прогон. Всё, что могло закрыть эти 0.8 пункта, теперь замерено и закрыто: дробление сущности на слоты даёт лучшую посадку и худшее чтение, у дивиденда адресации жёсткий потолок около пункта, а обучение на полном корпусе вместо 62.5% не сдвигает знание вовсе. Связывающее ограничение — ёмкость одного адреса, насыщающаяся около восьми фактов, а не содержание корпуса, как показывала прежняя, неверно измеренная оценка покрытия. В OrdoGen поправка резче: на большинстве длинных примеров любой маршрут-кандидат даёт один и тот же ответ, то есть сдвинуть можно лишь около восьмой части набора, а безусловные вмешательства — перестановка, стиринг — разрушают больше, чем чинят.',
    statusTitle: 'Статус проектов',
    statusItems: [
      { label: 'Ordo-M', value: 'M1 на первом домене взята с запасом 0.3 пункта; на втором недобор 0.8, и механизма на него у конструкции не осталось. Порча решена вентилем. Планка для прозы 79.9% и ещё не бралась.' },
      { label: 'OrdoGen', value: 'Узкое место локализовано причинно, но сдвинуть маршрутизацией можно лишь восьмую часть примеров. Субквадратичного ускорения нет.' },
      { label: 'Публикация', value: 'Исходный код и стенды замеров закрыты. Методика и числа открыты.' },
    ],
  },
};
