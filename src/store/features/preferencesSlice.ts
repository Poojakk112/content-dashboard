import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  categories: string[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  categories: ['technology'],
  darkMode: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    loadPreferences: (state, action: PayloadAction<PreferencesState>) => {
      state.categories = action.payload.categories;
      state.darkMode = action.payload.darkMode;
    },
  },
});

export const { toggleCategory, setCategories, toggleDarkMode, loadPreferences } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;