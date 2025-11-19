# Picsum Photo Gallery (IA02)

React single page application that fulfills the IA02 assignment requirements: fetch photo data from the Lorem Picsum API, stream it into an infinite grid, and show full details for each item.

## Features

- **Responsive masonry-like grid** – Bootstrap-powered layout renders the Picsum feed with author attribution and hover animation.
- **Infinite scroll** – `IntersectionObserver` triggers page-by-page fetches while showing a spinner and graceful end-of-catalogue message.
- **Detail route** – `/photos/:id` reveals the full-resolution asset, metadata, download link, and navigation back to the list.
- **Robust API layer** – Centralized service with error handling, retry hooks, and placeholder copy whenever Picsum lacks titles/descriptions.
- **Testing & accessibility** – React Testing Library smoke test, mocked `fetch`/`IntersectionObserver`, semantic alt text, and focusable controls.

## Tech Stack

- [Create React App](https://create-react-app.dev/) (pure React, no Vite)
- React Router DOM v6 (with v7 futures enabled)
- Bootstrap 5 utility classes
- Custom hook (`useInfinitePhotos`) + service wrapper (`picsumApi`)

## Getting Started

From `picsum-gallery/`:

```cmd
npm install
```

### Development server

```cmd
npm start
```

### Run tests

```cmd
set CI=1&&npm test
```

### Production build

```cmd
npm run build
```

After `npm run build`, deploy the generated `build/` directory to any static host.

### Deploy to Vercel

```cmd
vercel login
vercel --prod
```

The included `vercel.json` already tells Vercel to run `npm run build` and serve the `build/` folder with an SPA fallback, so no extra configuration is required. On first deploy, follow the terminal prompts to link the project and select the `picsum-gallery` folder as the root. Subsequent deploys only require `vercel --prod`.

## Project Structure

- `src/pages/PhotoListPage.jsx` – landing grid, empty-state, loader, infinite scroll sentinel.
- `src/pages/PhotoDetailPage.jsx` – individual photo view with metadata + download.
- `src/hooks/useInfinitePhotos.js` – encapsulates pagination, loading/error state, retry/reset helpers.
- `src/components/*` – Header, cards, grid, loader, and reusable error banner.
- `src/services/picsumApi.js` – low-level REST helpers for list + detail endpoints.

Feel free to extend the UI (e.g., filters, search, favorites) by building atop the existing hook/service layers.
