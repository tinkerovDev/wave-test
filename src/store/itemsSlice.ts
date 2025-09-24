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

const imagePath = (file: string) => `/items/${file}`;

const initialItems: Item[] = [
	{ id: 1, name: 'Арбалет', description: 'Очень точное оружие дальнего боя', category: 'оружие', image: imagePath('arbalet.png'), details: { damage: 45, durability: 200, weight: 5.2 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 2, name: 'Винтовка', description: 'Мощная, точная и дальнобойная винтовка.', category: 'оружие', image: imagePath('bolt.png'), details: { damage: 65, durability: 150, weight: 3.8 } },
	{ id: 3, name: 'Бумага для исследования', description: 'Используется в исследовательском столе для создания чертежей', category: 'ресурс', image: imagePath('paper.png'), details: { uses: 10, weight: 0.1 } },
	{ id: 4, name: 'Плащ Дракулы', description: 'Прочная толстая верхняя одежда, обеспечивающая надежную защиту одевающему...', category: 'одежда', image: imagePath('raincoat.png'), details: { defense: 35, durability: 180, weight: 2.5 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } },
	{ id: 5, name: 'Бинт', description: 'Лечите себя или других с помощью этого бинта. Левой кнопки мыши Вы лечите себ...', category: 'медикаменты', image: imagePath('bandage.png'), details: { healing: 25, uses: 1, weight: 0.2 } }
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

