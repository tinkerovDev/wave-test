import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../store/itemsSlice';
import themeReducer from '../store/themeSlice';

export const store = configureStore({
	reducer: {
		items: itemsReducer,
			theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

