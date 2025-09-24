export type LangKey = 'ru' | 'en';

export const t = (key: string, lang: LangKey = 'ru') => {
	const dict: Record<LangKey, Record<string, string>> = {
		ru: {
			'app.title': 'Список всех предметов',
			'app.total': 'Всего предметов',
			'search.placeholder': 'Поиск',
			'category.label': 'Категория',
			'category.all': 'Категории',
			'category.weapon': 'Оружие',
			'category.resource': 'Ресурсы',
			'category.clothes': 'Одежда',
			'category.meds': 'Медикаменты',
			'empty': 'Ничего не найдено',
			'close': 'Закрыть',
		},
		en: {
			'app.title': 'All items',
			'app.total': 'Total items',
			'search.placeholder': 'Search',
			'category.label': 'Category',
			'category.all': 'All',
			'category.weapon': 'Weapons',
			'category.resource': 'Resources',
			'category.clothes': 'Clothes',
			'category.meds': 'Medications',
			'empty': 'Nothing found',
			'close': 'Close',
		},
	};
	return dict[lang][key] ?? key;
};

