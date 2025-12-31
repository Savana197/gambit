# Copilot instructions for this repository

This project is a Next.js (app router) site with server API routes and a Postgres DB. Use these notes to make focused, safe code changes.

- **Architecture:** App router in `app/` (React Server Components by default). Server API routes live under `app/api/<resource>/route.js` and use `lib/db.js` (a `pg` Pool) for DB access.
- **Dev commands:** Start the app with `npm run dev` (runs `next dev`). Build with `npm run build` and serve with `npm run start`.
- **Environment:** The DB connection is `process.env.DATABASE_URL` (used in `lib/db.js`). Ensure the dev server is running on port 3000 when calling internal endpoints — many modules fetch `http://localhost:3000/api/...`.
- **Server actions vs API routes:** Server actions are implemented (see `lib/actions.js`) with `"use server"`; they upload images via Cloudinary, POST to internal API endpoints, call `revalidatePath()` and `redirect()` from `next/navigation`. Follow that pattern when adding form handlers.
- **API pattern:** API routes return `NextResponse` and usually call `pool.query(...)`. Example: `app/api/news/route.js` implements `GET` and `POST` and returns JSON with proper status codes.
- **DB usage:** Use the existing `lib/db.js` pool import (`import pool from '@/lib/db'`). Prefer parameterized queries where possible (existing routes use parameterized `INSERT` with `$1, $2...`). Keep `ssl: false` in the pool config unless updating connection handling.
- **Client components:** Files that need browser APIs include `"use client"` (example: `components/nav-bar.jsx`). CSS modules are used (e.g., `nav-bar.module.css`). Keep UI logic in client components and data fetching in server components or API routes.
- **Image uploads:** The code uploads to Cloudinary via `lib/cloudinary.js` (used from `lib/actions.js`). Follow that helper for image handling and return an `imageURL` to be stored in the DB.
- **Fetch conventions:** Existing code often fetches internal APIs using absolute URLs (`http://localhost:3000/api/...`) and sets `cache: 'no-store'` or `cache: 'no-cache'` when fresh data is required. Be careful: absolute URLs assume local dev host/port.
- **Error handling:** API routes log errors to console and return a JSON message + 500 status. Mirror that style for consistency.
- **Routing & pages:** App-level layout is `app/layout.jsx` (imports `components/bootstrap.jsx` and `globals.css`). Add pages under `app/` and follow folder-based routing (see `app/(group)/...`).
- **Conventions to preserve:** project uses ES modules (`type: module` in `package.json`), Next.js 16 app-router features, and server/client separation. Keep `"use client"` only in components requiring it.
- **Typical change flow:** For a new resource: add API routes under `app/api/<resource>/route.js`, create server helpers in `lib/` for data access, add UI under `app/<resource>/` and client components in `components/`.
- **Localhost caveat:** When writing server-side code that calls internal APIs, prefer importing DB helpers directly instead of fetching `http://localhost:3000` to avoid ordering/port issues in server environments.

If anything in these notes is unclear or you want additional examples (e.g., adding a new API route or a server action for a form), tell me which area and I'll expand with a short, copy-pasteable recipe.
