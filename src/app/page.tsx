'use client';

import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import DashboardLayout from '@/components/DashboardLayout';
import ContentCard from '@/components/ContentCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContent, reorderItems } from '@/store/features/contentSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.content);
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const preferredCategories = useAppSelector((state) => state.preferences.categories);
  const favoriteIds = useAppSelector((state) =>
    new Set(state.favorites.items.map((f) => f.id))
  );

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  // Filter by preferred categories first
  let visibleItems = items.filter((item) => preferredCategories.includes(item.category));

  // Then filter based on active section
  if (activeSection === 'trending') {
    visibleItems = visibleItems.filter((item) => item.trending);
  } else if (activeSection === 'favorites') {
    visibleItems = visibleItems.filter((item) => favoriteIds.has(item.id));
  }

  // Apply search query on top
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    visibleItems = visibleItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }

  // Only allow drag-and-drop when showing the unfiltered feed (no search, no section filter)
  const canReorder =
    activeSection === 'feed' &&
    !searchQuery.trim() &&
    preferredCategories.length === 3;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dispatch(
      reorderItems({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  const sectionTitle =
    activeSection === 'feed'
      ? 'Your Feed'
      : activeSection === 'trending'
      ? 'Trending'
      : 'Favorites';

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-1">{sectionTitle}</h2>
      {canReorder && (
        <p className="text-xs text-gray-400 mb-4">Tip: drag cards to reorder your feed</p>
      )}

      {status === 'loading' && (
        <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
      )}

      {status === 'succeeded' && visibleItems.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No content found. Try a different search or section.
        </p>
      )}

      {canReorder ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="content-grid" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visibleItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={{
                          ...dragProvided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <ContentCard item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}