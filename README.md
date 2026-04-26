# mini-crm-web

> **Companion repo:** [mini-crm-api](https://github.com/Markemil09/mini-crm-api) — Express REST API

React frontend for the Mini-CRM & Support Ticketing System.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS

## Pages

| Route    | Description               |
|----------|---------------------------|
| `/`      | Customer ticket submission form |
| `/admin` | Agent dashboard — view and resolve tickets |

## Setup

### Prerequisites
- Node.js 18+

### Install & Run

```bash
npm install
npm run dev
# Running on http://localhost:5173
```

> Requires `mini-crm-api` to be running on `http://localhost:3001`.

## Environment Variables

| Variable       | Default                    | Description              |
|----------------|----------------------------|--------------------------|
| `VITE_API_URL` | `http://localhost:3001`    | Base URL of the API      |

Create a `.env` file in this directory to override the default:

```env
VITE_API_URL=http://localhost:3001
```

## Scripts

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Start Vite dev server        |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
