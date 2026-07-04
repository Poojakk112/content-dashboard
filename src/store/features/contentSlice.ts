import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '@/types/content';
import { mockContent } from '@/data/mockContent';

interface ContentState {
  items: ContentItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  status: 'idle',
  error: null,
};

// Simulates a real API call with a network delay
export const fetchContent = createAsyncThunk('content/fetchContent', async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockContent;
});

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reorderItems: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const updated = [...state.items];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(destinationIndex, 0, moved);
      state.items = updated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch content';
      });
  },
});

export const { reorderItems } = contentSlice.actions;
export default contentSlice.reducer;