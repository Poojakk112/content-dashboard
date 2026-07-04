'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveSection, ActiveSection } from '@/store/features/uiSlice';

const NAV_ITEMS: { key: ActiveSection; label: string; icon: string }[] = [
  { key: 'feed', label: 'Feed', icon: '📰' },
  { key: 'trending', label: 'Trending', icon: '🔥' },
  { key: 'favorites', label: 'Favorites', icon: '⭐' },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 h-full p-4">
      <h1 className="text-xl font-bold mb-6 px-2">Dashboard</h1>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => dispatch(setActiveSection(item.key))}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
              activeSection === item.key
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}