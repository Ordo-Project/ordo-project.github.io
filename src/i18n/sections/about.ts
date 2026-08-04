import type { Bilingual } from '../types';

const en = {
    tag: 'INDEPENDENT AI RESEARCH',
    title: 'Non-destructive memory and functional context',
    bio: 'Ordo Project was founded by Russel Gavery (Gavrilov Ruslan, @8hrsk) to attack two constraints that keep capable models out of local deployments: knowledge cannot be updated without collateral damage, and a long context window is not a long working memory. The method is deliberately conservative — paired tests, pre-registered frozen sets, matched control arms, and negative results published alongside the positive ones.',
    role: 'Lead AI researcher & founder, Ordo Project',
    card1Title: 'Ordo-M — rewritable memory',
    card1Text: 'An external value table addressed from text, injected at 0.66 depth, leaving the frozen base bit-identical. A point edit costs 0.0% collateral damage.',
    card2Title: 'OrdoGen — functional context',
    card2Text: 'Causal localization of the retrieval bottleneck to three heads of a late layer, and a learned block selector that transfers from short context to long.',
    card3Title: 'Method',
    card3Text: 'Paired designs, evaluation sets frozen before the primary run, matched control arms, and negative results published with the positive ones.',
    contactTitle: 'Collaboration',
    contactText: 'Joint runs, replication and review of evaluation logs are welcome. Write to founder@ordo-project.com, or open an issue on the project organisation.',
  };

/** RU is typed against EN, so a missing or renamed key fails the build. */
export const about: Bilingual<typeof en> = {
  en,
  ru: {
    tag: 'НЕЗАВИСИМЫЕ ИССЛЕДОВАНИЯ AI',
    title: 'Безвредная память и функциональный контекст',
    bio: 'Проект Ordo основан исследователем Russel Gavery (Гаврилов Руслан, @8hrsk), чтобы атаковать два ограничения, которые держат сильные модели вне локальных развёртываний: знание нельзя обновить без побочного ущерба, а длинное окно контекста не равно длинной рабочей памяти. Метод намеренно консервативен — парные тесты, заранее замороженные наборы, согласованные контрольные плечи и отрицательные результаты, публикуемые наравне с положительными.',
    role: 'Ведущий AI-исследователь и основатель, Ordo Project',
    card1Title: 'Ordo-M — обновляемая память',
    card1Text: 'Внешняя таблица значений с адресом из текста, врезка на глубине 0.66, замороженная база остаётся побитово прежней. Точечная правка стоит 0.0% побочного ущерба.',
    card2Title: 'OrdoGen — функциональный контекст',
    card2Text: 'Причинная локализация узкого места поиска до трёх голов позднего слоя и обучаемый селектор блоков, переносящийся с короткого контекста на длинный.',
    card3Title: 'Метод',
    card3Text: 'Парные дизайны, замороженные до основного прогона наборы замеров, согласованные контрольные плечи и отрицательные результаты, публикуемые наравне с положительными.',
    contactTitle: 'Сотрудничество',
    contactText: 'Совместные прогоны, репликация и разбор логов замеров приветствуются. Пишите на founder@ordo-project.com или заводите issue в организации проекта.',
  },
};
