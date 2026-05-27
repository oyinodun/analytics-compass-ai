# InsightFlow AI

InsightFlow AI is a modern analytics workspace that helps non-technical teams explore governed company data, get AI-assisted insights, and request dataset access without writing SQL.

Built as a production-ready prototype, it combines a polished frontend UX with a lightweight backend service layer and typed mock database models so teams can iterate quickly before wiring real infrastructure.

---

## What the app does

InsightFlow AI gives business users one place to:

- **View executive analytics at a glance** (KPIs, alerts, governance activity, trending datasets)
- **Ask data questions in natural language** through an AI Query Assistant
- **Discover datasets** across internal data platforms
- **Request governed access** to restricted data
- **Monitor operational and product health** through dashboards and insights

---

## Core product areas

### 1) Home dashboard
- KPI cards with trend visuals
- Executive insight feed (risk, trends, anomalies)
- Governance activity feed
- Quick entry into AI analysis and dashboards

### 2) AI Query Assistant
- Chat-style analytics workflow
- Prompt suggestions for common business questions
- SQL visibility for generated query logic
- Confidence and source context presentation
- Charted output for fast interpretation

### 3) Dataset Marketplace
- Searchable dataset catalog
- Metadata preview (owner, source, freshness, usage, tags)
- Access-level indicators (public/internal/restricted)
- Access request flow for governed datasets

### 4) Governance and analytics workflows
- Access request records and approvals model
- Data lineage-style UI primitives
- Structured mock data model to simulate enterprise behavior

---

## Architecture

The codebase is organized with a clear frontend/backend boundary to make future scaling easier.

### Frontend
- **React 19** + **TanStack Router / React Start**
- Component-first UI with reusable design system primitives
- Route loaders for async data hydration

### Backend service layer (in-repo)
- `src/lib/backend.ts`
- Async service functions for:
  - Home dashboard payload
  - Assistant bootstrap payload
  - Dataset search
- Simulated latency to mimic real API behavior during development

### Data and schema layer (in-repo)
- `src/lib/database.ts`
- Typed domain records (datasets, access requests, dashboard/insight payloads)
- Seed data (`seedDb`) used by services
- SQL schema draft (`dbSchemaSql`) for future migration to a real DB

---

## Database structure (current draft)

The included schema models:

- `datasets`
- `dataset_tags`
- `access_requests`

This supports catalog discovery, dataset tagging, and governance request workflows out of the box.

---

## Tech stack

- **Framework:** React, TanStack Router, TanStack Start
- **Build tooling:** Vite
- **Runtime/package manager:** Bun
- **UI:** Tailwind CSS + component primitives
- **Icons/charts:** Lucide React + chart components

---

## Project structure

```text
src/
  components/insiflow/      # app-specific UI blocks (top bar, charts, modals)
  components/ui/            # reusable UI primitives
  lib/
    backend.ts              # async backend-style service layer
    database.ts             # typed mock DB + SQL schema + seed data
  routes/                   # file-based app routes
  server.ts                 # server entry and SSR error handling
```

---

## Getting started

### Prerequisites
- [Bun](https://bun.sh/) installed

### Install

```bash
bun install
```

### Run locally

```bash
bun run dev
```

### Production build

```bash
bun run build
```

---

## Roadmap ideas

- Replace mock services with real API endpoints
- Connect SQL schema to a managed database (e.g., Postgres/Supabase)
- Add authentication + role-based access control
- Add persistent query history and saved analyses
- Add real LLM orchestration + tool execution for assistant responses

---

## Why this repo is useful

This project is intentionally structured to be:

- **Demo-friendly** for product and stakeholder walkthroughs
- **Developer-friendly** for incremental backend integration
- **Migration-ready** for moving from prototype data to production systems

If you want, I can also generate:
- a shorter **marketing-style README** for public visibility, and
- a separate **engineering README** with setup, conventions, and contribution flow.
