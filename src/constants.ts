import type { Item } from './store/itemsSlice';

export const CATEGORY_ORDER: Record<Item['category'], number> = {
  'оружие': 0,
  'ресурс': 1,
  'одежда': 2,
  'медикаменты': 3,
};

export type Rarity = 'обычный' | 'редкий' | 'эпический' | 'легендарный';
