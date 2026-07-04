import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from '@/store/features/preferencesSlice';
import favoritesReducer from '@/store/features/favoritesSlice';
import uiReducer from '@/store/features/uiSlice';
import contentReducer from '@/store/features/contentSlice';
import ContentCard from './ContentCard';
import { ContentItem } from '@/types/content';

const mockItem: ContentItem = {
  id: 'test-1',
  type: 'news',
  category: 'technology',
  title: 'Test Article Title',
  description: 'This is a test description.',
  image: 'https://picsum.photos/seed/test/400/240',
  source: 'TestSource',
};

function renderWithStore(item: ContentItem) {
  const store = configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      ui: uiReducer,
      content: contentReducer,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <ContentCard item={item} />
      </Provider>
    ),
  };
}

describe('ContentCard', () => {
  it('renders the title, description, and source', () => {
    renderWithStore(mockItem);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByText('TestSource')).toBeInTheDocument();
  });

  it('shows "Read More" for news items and "Play Now" for movies', () => {
    renderWithStore(mockItem);
    expect(screen.getByText('Read More')).toBeInTheDocument();

    renderWithStore({ ...mockItem, id: 'test-2', type: 'movie' });
    expect(screen.getByText('Play Now')).toBeInTheDocument();
  });

  it('toggles favorite state when the star button is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(mockItem);

    const starButton = screen.getByLabelText('Toggle favorite');
    expect(store.getState().favorites.items).toHaveLength(0);

    await user.click(starButton);
    expect(store.getState().favorites.items).toHaveLength(1);
    expect(store.getState().favorites.items[0].id).toBe('test-1');

    await user.click(starButton);
    expect(store.getState().favorites.items).toHaveLength(0);
  });
});