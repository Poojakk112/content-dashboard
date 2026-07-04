# Personalized Content Dashboard

**Live Demo:** https:/content-dashboard-p380v9rz7-poojakk112s-projects.vercel.app

A responsive, interactive content dashboard built for the SDE Intern Frontend Assignment...

## Features

- **Personalized Feed** — content filtered by user-selected categories (technology, sports, finance)
- **Trending Section** — highlights trending items across all content types
- **Favorites Section** — save and view favorite content
- **Debounced Search** — search across titles and descriptions with a 400ms debounce
- **Drag-and-Drop Reordering** — reorder feed cards (available when viewing the unfiltered Feed)
- **Dark Mode** — toggle with persistence across reloads
- **State Persistence** — preferences and favorites saved to localStorage via redux-persist
- **Async Data Handling** — simulated API fetch using Redux Toolkit's `createAsyncThunk` with loading/error states
- **Unit Tests** — Jest + React Testing Library covering components and Redux slices

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **State Management:** Redux Toolkit, React-Redux, Redux Persist
- **Styling:** Tailwind CSS v4
- **Drag-and-Drop:** @hello-pangea/dnd
- **Testing:** Jest, React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
git clone https://github.com/Poojakk112/content-dashboard.git
cd content-dashboard
npm install
```

### Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running tests

```bash
npm test
```

## Project Structure

src/
app/
page.tsx          # Main dashboard page
layout.tsx         # Root layout with Redux Provider
components/
Sidebar.tsx         # Navigation sidebar
Header.tsx          # Search bar, dark mode toggle, settings
SettingsPanel.tsx   # Category preferences panel
DashboardLayout.tsx # Combines sidebar + header + content area
ContentCard.tsx     # Individual content card
store/
store.ts            # Redux store with persistence config
features/
preferencesSlice.ts  # Categories + dark mode
favoritesSlice.ts    # Favorited items
uiSlice.ts            # Search query + active section
contentSlice.ts       # Content items + async fetch + reordering
data/
mockContent.ts       # Mock content dataset
types/
content.ts            # Shared TypeScript types

## Notes & Design Decisions

- **Mock Data:** Content (news, movie recommendations, social posts) is served from a local mock dataset rather than live third-party APIs (NewsAPI, TMDB, Twitter), avoiding the need for API keys during development. The async fetch is simulated with `createAsyncThunk` and an artificial delay to demonstrate real-world async state handling (loading/success/error).
- **Drag-and-Drop Scope:** Reordering is fully supported when viewing the unfiltered Feed (all categories selected, no active search). This avoids index-mismatch issues between the filtered view and the underlying data array.
- **Persistence:** Only `preferences` and `favorites` are persisted to localStorage; search query and active section are intentionally not persisted, as they represent transient UI state.

## Future Improvements

- Integrate live APIs (NewsAPI, TMDB) behind environment-variable-protected keys
- Add infinite scroll/pagination for larger datasets
- Add E2E tests with Cypress or Playwright
- Add authentication (NextAuth.js)