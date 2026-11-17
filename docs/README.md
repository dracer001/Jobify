# Jobify

A free marketplace that connects clients with service providers, whether freelancers or companies. Clients post jobs, providers send proposals, and the client picks one. Everyone can both hire and offer services.

> **Status: work in progress.** This is a ground-up rebuild of my first attempt, done in public to measure how much I've grown. The original version is preserved on the [`legacy`](../../tree/legacy) branch (tag `legacy-v1`). Follow the progress on LinkedIn and X.

## Stack

| Part | Tech |
| --- | --- |
| `api/` | Laravel 11, Sanctum, MariaDB (MySQL-compatible) |
| `web/` | Vite, React, TypeScript, ESLint |

Planned for the frontend: Tailwind, React Router, TanStack Query, react-hook-form and zod. Planned AI features: job-post drafting and provider matching.

## Repo layout

```
api/    Laravel backend (REST API)
web/    React frontend (single-page app)
docs/   Product spec and design notes
```

The two apps run separately and talk to each other over HTTP.

## Getting started

### Prerequisites

PHP 8.2 or newer, Composer, Node 20 or newer, and MariaDB or MySQL.

### API

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan serve        # http://127.0.0.1:8000
```

Database setup arrives with the data-model work (Section 1). Until then `/api/health` reports `database: down`.

### Web

```bash
cd web
npm install
cp .env.example .env.local
npm run dev              # http://localhost:5173
```

Open `http://localhost:5173` exactly. The API only allows that origin (`FRONTEND_URL` in `api/.env`).

### Check that it works

The home page calls `GET /api/health` and shows whether the API and database are reachable.

## Roadmap

See [`docs/spec.md`](docs/spec.md) for the product spec and the planned sections: data model, auth, jobs, proposals, profiles, notifications, payments, chat, tests and deployment, and AI features.

## Contributing

Issues and ideas are welcome. Check the open issues and the spec first, then open an issue before sending a larger change.
