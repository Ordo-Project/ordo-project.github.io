import type { Bilingual } from '../types';

/** Plain-language framing for a reader who is not an ML engineer: what the
 *  problem costs, what the project builds, and who gains what if it works. */
const en = {
    tag: 'EXECUTIVE SUMMARY',
    title: 'Update what a model knows without retraining the model',
    lead: 'A language model learns everything it knows once, during training, and then that knowledge is frozen inside its weights. The moment a library ships a new version, an internal policy changes or a price list is revised, the model is confidently wrong — and the only sanctioned way to fix it is to train again. Ordo is building the alternative: knowledge held in a separate, rewritable store that the frozen model reads from, so a documentation update becomes a small write instead of a training run.',

    problemTitle: 'The problem, in business terms',
    problems: [
      {
        title: 'Knowledge expires faster than models ship',
        text: 'A model release takes months. The documentation it answers questions about changes weekly. Every day in between, the assistant gives answers that were correct last quarter.',
      },
      {
        title: 'Retraining is expensive and destructive',
        text: 'Teaching one new fact by fine-tuning damages neighbouring knowledge. We measured it: an equal-capacity adapter corrupts 8.4% of unrelated facts on a single edit, so every update forces a full re-verification of everything else.',
      },
      {
        title: 'Bolting on search is a running cost, not a fix',
        text: 'Retrieval pipelines move the problem to the client: every query pays for indexing, extra tokens and latency, and the model still has no idea what it does not know.',
      },
    ],

    solutionTitle: 'What Ordo is building',
    solutionText: 'A rewritable memory attached to a frozen model. The model weights are never touched — they stay bit-for-bit identical — while the facts live in an external store the model reads through during generation. Updating knowledge becomes a diff against that store.',
    solutionPoints: [
      'A point edit causes 0.0% collateral damage, against 8.4% for the fine-tuning baseline of equal capacity.',
      'Knowledge and model become separately shippable: two release cycles instead of one.',
      'The second track, OrdoGen, measures where a long context window stops working, so nobody buys capacity that does not function.',
    ],

    valueTitle: 'Who gains, and how',
    values: [
      {
        who: 'Companies running assistants on their own hardware',
        gain: 'Current answers on private documentation',
        detail: 'Internal specifications, contracts and codebases stay in-house, and a new version is written into memory in the time a build takes — no vendor round-trip, no retraining budget.',
      },
      {
        who: 'AI product and agent vendors',
        gain: 'Ship knowledge updates separately from the model',
        detail: 'A coding agent such as Claude Code could carry current knowledge of popular libraries in the model itself, refreshed on the library’s release schedule, instead of asking every customer to run retrieval or MCP servers on their side.',
      },
      {
        who: 'Teams already paying for retrieval',
        gain: 'A smaller bill and a shorter prompt',
        detail: 'Knowledge read from memory does not have to be pasted into every prompt, which removes both the token cost and the failure mode where the right passage is in the window and the model still misses it.',
      },
    ],

    agentTitle: 'The case for model vendors, spelled out',
    agentText: 'Today a coding assistant that must know the current version of a framework depends on the customer wiring up retrieval or an MCP server, and on that retrieval returning the right page. With a rewritable memory the vendor can update the library knowledge centrally, on the library’s own release cadence, and ship it as a memory update rather than a new model. The client gets correct answers with nothing extra installed; the vendor gets a knowledge release cycle that no longer waits on a training run.',

    honestTitle: 'Where it actually stands',
    honestText: 'This is a research prototype, and the site publishes the failures next to the results. The memory has cleared the bar it set for itself against retrieval on one domain of two; on the second it fell 6.5 points short, and we can now say arithmetically why. That honesty is the point: every number here comes with the control arm that could have refuted it.',

    contactTitle: 'Contact',
    contactText: 'Open to joint runs, replication, review of the evaluation logs, and to conversations with teams for whom this is a real constraint.',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const summary: Bilingual<typeof en> = {
  en,
  ru: {
    tag: 'КРАТКО ДЛЯ НЕСПЕЦИАЛИСТА',
    title: 'Обновлять знания модели, не переобучая саму модель',
    lead: 'Языковая модель узнаёт всё, что знает, один раз — при обучении, и дальше это знание заморожено в её весах. Как только выходит новая версия библиотеки, меняется внутренний регламент или обновляется прайс, модель уверенно отвечает неправильно, а единственный штатный способ это починить — обучать заново. Ordo строит альтернативу: знание лежит в отдельном перезаписываемом хранилище, из которого замороженная модель читает, и обновление документации становится небольшой записью вместо прогона обучения.',

    problemTitle: 'Проблема на языке бизнеса',
    problems: [
      {
        title: 'Знание устаревает быстрее, чем выходят модели',
        text: 'Релиз модели готовится месяцами. Документация, о которой её спрашивают, меняется еженедельно. Всё это время ассистент отвечает так, как было верно в прошлом квартале.',
      },
      {
        title: 'Переобучение дорого и разрушительно',
        text: 'Дообучение ради одного нового факта повреждает соседнее знание. Мы это измерили: адаптер равной ёмкости при одной правке портит 8.4% несвязанных фактов, поэтому каждое обновление требует перепроверять всё остальное.',
      },
      {
        title: 'Приделанный поиск — это постоянные расходы, а не решение',
        text: 'Поисковые контуры переносят проблему на клиента: каждый запрос оплачивает индексацию, лишние токены и задержку, а модель по-прежнему не знает, чего она не знает.',
      },
    ],

    solutionTitle: 'Что делает Ordo',
    solutionText: 'Перезаписываемая память, приделанная к замороженной модели. Веса модели не трогаются вообще — они остаются побитово теми же, — а факты живут во внешнем хранилище, из которого модель читает во время генерации. Обновление знания превращается в дельту к этому хранилищу.',
    solutionPoints: [
      'Точечная правка даёт 0.0% побочного ущерба против 8.4% у дообучения равной ёмкости.',
      'Знание и модель становятся отдельно поставляемыми: два цикла релизов вместо одного.',
      'Второй трек, OrdoGen, измеряет, где длинное окно контекста перестаёт работать, — чтобы не покупать ёмкость, которая не функционирует.',
    ],

    valueTitle: 'Кому и что это даёт',
    values: [
      {
        who: 'Компаниям с ассистентом на своём железе',
        gain: 'Актуальные ответы по закрытой документации',
        detail: 'Внутренние спецификации, договоры и кодовые базы остаются внутри периметра, а новая версия записывается в память за время сборки — без обращения к вендору и без бюджета на переобучение.',
      },
      {
        who: 'Вендорам AI-продуктов и агентов',
        gain: 'Поставлять обновления знаний отдельно от модели',
        detail: 'Кодовый агент вроде Claude Code мог бы нести актуальное знание популярных библиотек в самой модели, обновляемое по графику релизов этих библиотек, вместо того чтобы просить каждого клиента поднимать у себя RAG или MCP-сервер.',
      },
      {
        who: 'Командам, уже платящим за поиск',
        gain: 'Меньше счёт и короче промпт',
        detail: 'Знание, прочитанное из памяти, не нужно вклеивать в каждый промпт: уходит и стоимость токенов, и отказ, при котором нужный фрагмент лежит в окне, а модель его всё равно не видит.',
      },
    ],

    agentTitle: 'Аргумент для вендоров моделей, по пунктам',
    agentText: 'Сегодня кодовый ассистент, которому нужна текущая версия фреймворка, зависит от того, поднял ли клиент поиск или MCP-сервер и вернул ли этот поиск нужную страницу. С перезаписываемой памятью вендор может обновлять знание библиотек централизованно, в такт их собственным релизам, и поставлять это как обновление памяти, а не как новую модель. Клиент получает верные ответы, ничего не устанавливая; вендор получает цикл релиза знаний, который больше не ждёт прогона обучения.',

    honestTitle: 'Честное состояние дел',
    honestText: 'Это исследовательский прототип, и на сайте неудачи публикуются рядом с результатами. Планку, которую память сама себе поставила против поиска, она взяла на одном домене из двух; на втором недобрала 6.5 пункта, и теперь мы умеем сказать арифметически, почему. В этой честности и смысл: за каждым числом здесь стоит контрольное плечо, которое могло его опровергнуть.',

    contactTitle: 'Контакты',
    contactText: 'Открыты к совместным прогонам, репликации, разбору логов замеров и к разговору с командами, для которых это реальное ограничение.',
  },
};
