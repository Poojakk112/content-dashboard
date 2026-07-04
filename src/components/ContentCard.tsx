'use client';

import Image from 'next/image';
import { ContentItem } from '@/types/content';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFavorite, removeFavorite } from '@/store/features/favoritesSlice';

export default function ContentCard({ item }: { item: ContentItem }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((fav) => fav.id === item.id)
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(
        addFavorite({
          id: item.id,
          type: item.type,
          title: item.title,
          image: item.image,
          description: item.description,
        })
      );
    }
  };

  const ctaLabel = item.type === 'movie' ? 'Play Now' : 'Read More';

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative w-full h-40">
        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
        {item.trending && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            🔥 Trending
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
          <button
            onClick={handleToggleFavorite}
            aria-label="Toggle favorite"
            className="shrink-0 text-lg"
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400 uppercase">{item.source}</span>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}