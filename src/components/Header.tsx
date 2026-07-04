'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/features/uiSlice';
import { toggleDarkMode } from '@/store/features/preferencesSlice';
import SettingsPanel from './SettingsPanel';

export default function Header() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const [inputValue, setInputValue] = useState('');

  // Debounce: wait 400ms after the user stops typing before updating Redux
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, dispatch]);

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-800">
      <input
        type="text"
        placeholder="Search content..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full max-w-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <SettingsPanel />
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          U
        </div>
      </div>
    </header>
  );
}