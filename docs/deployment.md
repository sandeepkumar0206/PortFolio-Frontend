# Deployment Guide

Angular 19 frontend + Spring Boot 3.5 contact API.

## Architecture

| Layer | Local | Production |
|-------|-------|------------|
| Frontend | http://localhost:4200 | Netlify / Vercel / GitHub Pages |
| Backend | http://localhost:8080 | Railway / Render / Fly.io / VPS |
| Database | H2 file (`portfolio-backend/data/`) | PostgreSQL |

Only **contact messages** are stored in the database. Profile, skills, projects, and experience are static TypeScript in `src/app/data/`.

---

## Phase 1 — Deploy backend

### 1. Build the JAR

```bash
cd portfolio-backend
./mvnw -DskipTests package
# Windows:
mvnw.cmd -DskipTests package
```

Output: `target/portfolio-backend-0.0.1-SNAPSHOT.jar`

### 2. Create PostgreSQL

On your host (Railway, Render, Fly.io, etc.):

- Create a PostgreSQL database (e.g. name: `portfolio`)
- Note host, port, username, password

Spring expects JDBC URL format:

```
jdbc:postgresql://HOST:5432/portfolio
```

Some hosts provide `postgresql://user:pass@host:5432/db` — convert to JDBC or set separate username/password vars.

### 3. Set environment variables

| Variable | Required | Example |
|----------|----------|---------|
| `SPRING_PROFILES_ACTIVE` | Yes | `prod` |
| `DATABASE_URL` | Yes | `jdbc:postgresql://host:5432/portfolio` |
| `DATABASE_USERNAME` | Yes* | `portfolio` |
| `DATABASE_PASSWORD` | Yes* | `your-secure-password` |
| `CORS_ORIGINS` | Yes | `https://your-site.netlify.app` |

\*Use if not embedded in `DATABASE_URL`.

Optional (SMTP): see [smtp-setup.md](./smtp-setup.md). Mail is **not** required — messages still save to Postgres.

### Render PostgreSQL (your setup)

On **Render Web Service** → **Environment**, add:

| Variable | Value |
|----------|--------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DATABASE_URL` | `jdbc:postgresql://dpg-d98mbv67r5hc73a11hag-a:5432/portfolio_wfbz` |
| `DATABASE_USERNAME` | `portfolio_wfbz_user` |
| `DATABASE_PASSWORD` | *(from Render dashboard — do not commit)* |
| `PORTFOLIO_MAIL_ENABLED` | `false` |
| `CORS_ORIGINS` | your live site URL when frontend is deployed |

Use the **internal** hostname when the Spring Boot service runs on Render in the same region.  
For local prod testing from your PC, use the **External Database URL** from Render (full host with `.postgres.render.com`).

Local reference: `portfolio-backend/.env` (gitignored) and `.env.example`. Run:

```powershell
cd portfolio-backend
.\run-prod.ps1
```

Or link Postgres to the web service in Render — it may inject `DATABASE_URL` automatically (convert to JDBC if needed).

### 4. Deploy on host

Typical platform settings:

- **Build command:** `./mvnw -DskipTests package`
- **Start command:** `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
- Connect GitHub repo: `portfolio-backend`

### 5. Verify backend

```text
GET https://YOUR_API_HOST/api/health
```

Expected: `{ "status": "UP" }`

Test contact (optional):

```bash
curl -X POST https://YOUR_API_HOST/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from deploy test."}'
```

Expected: `201` with `{ "id": 1, "message": "Thanks - your message was received." }`

---

## Phase 2 — Deploy frontend

### 1. Set production API URL

Production uses **same origin** — `environment.prod.ts` sets `apiBaseUrl: ''` so requests go to `/api/contact` on the same host as the site. No separate API URL needed when the backend serves the built frontend.

If you deploy frontend and backend on **different domains**, set `apiBaseUrl` in `environment.prod.ts` to your API host (no trailing slash).

### 2. Build

```bash
cd portfolio-frontend
npm install
npm run build
```

Output: `dist/portfolio-frontend/browser/`

### 3. Host static files

Upload or connect CI to deploy `dist/portfolio-frontend/browser` on:

- **Netlify** — build command `npm run build`, publish directory `dist/portfolio-frontend/browser`
- **Vercel** — same
- **GitHub Pages** — copy browser output to `gh-pages` branch or use Actions

### 4. Match CORS

Backend `CORS_ORIGINS` must exactly match your live frontend URL:

```text
https://your-site.netlify.app
```

No trailing slash. Multiple origins: comma-separated.

---

## Phase 3 — End-to-end checklist

- [ ] `GET /api/health` returns 200 on production API
- [ ] Frontend loads at your domain
- [ ] Contact form submits without CORS errors (browser DevTools → Network)
- [ ] Row appears in PostgreSQL `contact_messages` table
- [ ] H2 console is **not** exposed in prod (`spring.h2.console.enabled=false` in prod profile)
- [ ] Resume PDF at `public/resume.pdf` (replace `resume.pdf.txt` placeholder)
- [ ] Optional: SMTP notifications — [smtp-setup.md](./smtp-setup.md)

---

## Environment reference

### Backend prod profile

Activated with `SPRING_PROFILES_ACTIVE=prod`. Uses PostgreSQL from `application-prod.properties`.

### Frontend environments

| File | Use |
|------|-----|
| `environment.local.ts` | `npm start` — API at `http://localhost:8080` |
| `environment.prod.ts` | `npm run build` — relative `/api` (same origin as backend) |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error in browser | Set `CORS_ORIGINS` to exact frontend URL (scheme + host, no path) |
| 502 / app won't start | Check `DATABASE_URL`, Java 17+, and host logs |
| Contact 201 but no email | Expected if mail disabled; see [smtp-setup.md](./smtp-setup.md) |
| H2 / DB lock locally | Only one backend instance; stop duplicate `spring-boot:run` |

---

## Suggested deploy order

1. PostgreSQL → backend + env vars → health check
2. Update `environment.prod.ts` → build frontend → deploy
3. Test contact form on live site
4. Enable SMTP later when ready
