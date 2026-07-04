import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActiveSection = 'feed' | 'trending' | 'favorites';

export interface UiState {
  searchQuery: string;
  activeSection: ActiveSection;
}

const initialState: UiState = {
  searchQuery: '',
  activeSection: 'feed',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<ActiveSection>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setSearchQuery, setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;