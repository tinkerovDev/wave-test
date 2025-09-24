import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
    accent: string;
}

const initialState: ThemeState = {
    accent: '#646cff',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setAccent(state, action: PayloadAction<string>) {
            state.accent = action.payload;
        },
    },
});

export const { setAccent } = themeSlice.actions;
export default themeSlice.reducer;


