import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import preferencesReducer from './features/preferencesSlice';
import favoritesReducer from './features/favoritesSlice';
import uiReducer from './features/uiSlice';
import contentReducer from './features/contentSlice';

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  ui: uiReducer,
  content: contentReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;