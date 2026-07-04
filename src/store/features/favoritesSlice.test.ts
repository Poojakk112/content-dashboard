import favoritesReducer, { addFavorite, removeFavorite, FavoritesState, FavoriteItem } from './favoritesSlice';

const mockItem: FavoriteItem = {
  id: 'fav-1',
  type: 'news',
  title: 'Sample Title',
  image: 'https://picsum.photos/seed/fav/400/240',
  description: 'Sample description',
};

describe('favoritesSlice', () => {
  const initialState: FavoritesState = { items: [] };

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a new favorite', () => {
    const state = favoritesReducer(initialState, addFavorite(mockItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem);
  });

  it('should not add a duplicate favorite (edge case)', () => {
    const stateWithOne = favoritesReducer(initialState, addFavorite(mockItem));
    const stateWithDuplicate = favoritesReducer(stateWithOne, addFavorite(mockItem));
    expect(stateWithDuplicate.items).toHaveLength(1);
  });

  it('should remove a favorite by id', () => {
    const stateWithOne = favoritesReducer(initialState, addFavorite(mockItem));
    const stateAfterRemoval = favoritesReducer(stateWithOne, removeFavorite('fav-1'));
    expect(stateAfterRemoval.items).toHaveLength(0);
  });

  it('should do nothing when removing a non-existent id (edge case)', () => {
    const stateWithOne = favoritesReducer(initialState, addFavorite(mockItem));
    const stateAfterRemoval = favoritesReducer(stateWithOne, removeFavorite('non-existent-id'));
    expect(stateAfterRemoval.items).toHaveLength(1);
  });
});