import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Category = 'all' | 'оружие' | 'ресурс' | 'одежда' | 'медикаменты';

export interface ItemDetails {
	damage?: number;
	defense?: number;
	healing?: number;
	durability?: number;
	weight?: number;
	uses?: number;
	radius?: number;
	speed?: number;
	rarity?: 'обычный' | 'редкий' | 'эпический' | 'легендарный';
}

export interface Item {
	id: number;
	name: string;
	description: string;
	category: Exclude<Category, 'all'>;
	image: string;
	details: ItemDetails;
}

interface ItemsState {
	items: Item[];
	search: string;
	category: Category;
	page: number;
	itemsPerPage: number;
	isLoading: boolean;
}

const imagePath = (file: string) => `${import.meta.env.BASE_URL}items/${file}`;

const initialItems: Item[] = [
	{ id: 1, name: 'Арбалет', description: 'Очень точное оружие дальнего боя', category: 'оружие', image: imagePath('arbalet.png'), details: { damage: 45, durability: 200, rarity: 'редкий' } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, rarity: 'эпический' } },
	{ id: 3, name: 'Лук', description: 'Тихий выстрел на средней дистанции.', category: 'оружие', image: imagePath('bow.png'), details: { damage: 28, durability: 100, rarity: 'обычный' } },
	{ id: 4, name: 'Топор', description: 'Может использоваться как оружие и инструмент.', category: 'оружие', image: imagePath('axe.png'), details: { damage: 32, durability: 180, rarity: 'редкий' } },
	{ id: 5, name: 'Бумага для исследования', description: 'Используется в исследовательском столе для создания чертежей', category: 'ресурс', image: imagePath('paper.png'), details: { rarity: 'обычный' } },
	{ id: 6, name: 'Камень', description: 'Камень для улучшений дома и крафта.', category: 'ресурс', image: imagePath('stone.png'), details: { rarity: 'эпический' } },
	{ id: 7, name: 'Плащ Дракулы', description: 'Прочная толстая верхняя одежда, обеспечивающая надежную защиту одевающему...', category: 'одежда', image: imagePath('raincoat.png'), details: { defense: 35, durability: 180, rarity: 'редкий' } },
	{ id: 8, name: 'Шлем', description: 'Защищает голову от ударов.', category: 'одежда', image: imagePath('helmet.png'), details: { defense: 12, durability: 160, rarity: 'обычный' } },
	{ id: 9, name: 'Броня', description: 'Торс-пластина средней тяжести.', category: 'одежда', image: imagePath('armor.png'), details: { defense: 30, durability: 220, rarity: 'редкий' } },
	{ id: 10, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, rarity: 'обычный' } },
	{ id: 11, name: 'Аптечка', description: 'Быстро восстанавливает здоровье.', category: 'медикаменты', image: imagePath('big-box.png'), details: { healing: 50, rarity: 'редкий' } }
];

const initialState: ItemsState = {
	items: initialItems,
	search: '',
	category: 'all',
	page: 1,
	itemsPerPage: 5,
	isLoading: false,
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
			state.page = 1;
		},
		setCategory(state, action: PayloadAction<Category>) {
			state.category = action.payload;
			state.page = 1;
		},
		loadNextPage(state) {
			state.page += 1;
			state.isLoading = true;
		},
		finishLoading(state) {
			state.isLoading = false;
		},
	},
});

export const { setSearch, setCategory, loadNextPage, finishLoading } = itemsSlice.actions;
export default itemsSlice.reducer;

