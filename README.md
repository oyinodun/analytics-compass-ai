# InsightFlow AI

AI-powered enterprise analytics platform for non-technical teams.

## What this app now includes

- **Cleaner app architecture** with a frontend-to-backend service boundary (`src/lib/backend.ts`).
- **Backend logic layer** for dashboard composition, assistant bootstrapping, and dataset search.
- **Database structure** documented as SQL schema (`dbSchemaSql`) in `src/lib/database.ts`.
- **Mock data seed** centralized as a typed in-memory store (`seedDb`) in `src/lib/database.ts`.
- **Route loaders wired to backend logic** so core pages use async data loading.

## Data model

The schema currently models:

- `datasets`
- `dataset_tags`
- `access_requests`

This keeps catalog, governance, and request workflows aligned with a future real database migration.

## Key files

- `src/lib/database.ts` — typed records, SQL schema, and seed data.
- `src/lib/backend.ts` — backend service functions used by route loaders/components.
- `src/routes/_app.index.tsx` — home page now loads data through backend loader.
- `src/routes/_app.datasets.tsx` — dataset search now calls backend logic asynchronously.
- `src/routes/_app.assistant.tsx` — assistant sidebar/bootstrap now comes from backend loader.

## Run

```bash
bun install
bun run dev
```

## Goal

Reduce enterprise data friction and democratize analytics access.
