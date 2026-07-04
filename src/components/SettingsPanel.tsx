'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCategory } from '@/store/features/preferencesSlice';

const ALL_CATEGORIES = ['technology', 'sports', 'finance'];

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.preferences.categories);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
        aria-label="Open settings"
      >
        ⚙️
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-4 z-10">
          <h4 className="text-sm font-semibold mb-2">Preferred Categories</h4>
          <div className="flex flex-col gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm capitalize cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => dispatch(toggleCategory(cat))}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}