# RC Verification — AI Coding Agent Instructions

## Project Overview
RC Verification is a vehicle RC search, listing, and admin management system with a React frontend and a Spring Boot backend. Data is stored in MongoDB Atlas. Public users can search RCs; admin operations require an admin key via request header.

**Frontend Stack:** Vite + React 18 + TypeScript + shadcn/ui + TailwindCSS + React Router + React Query + Zod  
**Backend Stack:** Spring Boot 4.x + Java 17/21 + MongoDB Atlas (no JWT in current backend; admin is via header key)

## Architecture & Data Flow

### Frontend (React)
- Routing in `frontend/src/App.tsx` with pages in `frontend/src/pages/` (`Index`, `Verify`, `Vehicles`, `RcDetail`, `TransferOwnership`, `Dashboard`, `Analytics`, `AdminUsers`, `Auth`, `NotFound`).
- API client centralized in `frontend/src/lib/api.ts` targeting `http://localhost:8080`.
- UI components from `frontend/src/components/ui/*` (shadcn/radix) — do not edit generated primitives.
- Styles and theme tokens in `frontend/src/index.css` and `tailwind.config.ts`.

### Backend (Spring Boot)
- Entrypoint: `backend/src/main/java/com/SmartVehicle/backend/BackendApplication.java`.
- Packages: `config/`, `controller/`, `exception/`, `model/`, `repository/`, `service/` under `backend/src/main/java/com/SmartVehicle/backend/`.
- Config: `backend/src/main/resources/application.properties`.
- Server port: `8080`.
- MongoDB: `spring.mongodb.uri` and `spring.mongodb.database`.
- Admin key: `admin.secret.key` config; pass via `X-ADMIN-KEY` request header for privileged endpoints.

## API Surface (Current)

Base URL: `http://localhost:8080`

- Public RC endpoints (no auth):
  - `GET /api/rc` → list all RCs
  - `GET /api/rc/{id}` → get RC by id
  - `GET /api/rc/search?rcNumber=...` → search RC by number

- Admin RC endpoints (require header `X-ADMIN-KEY`):
  - `POST /api/rc` → create RC
  - `PUT /api/rc/{id}` → update RC
  - `DELETE /api/rc/{id}` → remove RC

Note: Auth endpoints (`/api/auth/*`) are not implemented in current backend. `frontend/src/pages/Auth.tsx` may include placeholder UI/validation; do not wire to non-existent APIs.

## Frontend Conventions

- Centralized API client: `frontend/src/lib/api.ts`.
  - Set `API_BASE_URL` to `http://localhost:8080`.
  - Use `X-ADMIN-KEY` for admin mutations: create/update/delete.
- Forms: use Zod for validation; dispatch toast via `sonner` for async errors.
- Routing: add routes before the catch-all `"*"` route in `App.tsx`.
- Avoid direct edits in `components/ui/*` (generated shadcn components).

## Development Workflows

### Frontend
```powershell
Push-Location "c:\Users\rohit\OneDrive\Desktop\study\projects\rc-shield-main\frontend"
npm install
npm run dev
Pop-Location
```

### Backend
```powershell
Push-Location "c:\Users\rohit\OneDrive\Desktop\study\projects\rc-shield-main\backend"
./mvnw clean install
./mvnw spring-boot:run
Pop-Location
```

Backend runs on `http://localhost:8080`.

## Key Backend Config (`backend/src/main/resources/application.properties`)
- `server.port=8080`
- `spring.mongodb.uri=<MongoDB Atlas connection>`
- `spring.mongodb.database=vehicledb`
- `spring.mongodb.auto-index-creation=true`
- `admin.secret.key=<your_admin_key>`
- `spring.jackson.default-property-inclusion=non_null`

## Troubleshooting
- Backend fails to start (Exit Code 1):
  - Verify MongoDB URI and database exist; ensure network access/allowlist.
  - Check port `8080` availability; if busy, change `server.port` and update `API_BASE_URL` in `api.ts`.
  - Confirm `admin.secret.key` is set; admin endpoints compare header value.
- API 404/500:
  - Inspect `backend/src/main/java/com/SmartVehicle/backend/controller/` for endpoint mappings.
- CORS issues:
  - Add/verify a CORS config in `config/` to allow frontend origin (5173).
- Styles not applying:
  - Confirm Tailwind content paths in `tailwind.config.ts` include your files.

## Pathing & Imports
No `@/*` alias is configured by default; use relative imports like `import { apiClient } from "./lib/api"` or adjust `tsconfig.json` if you add a path alias.

## Notes
- This repo branch (`noauth`) uses admin key header flow rather than JWT. If you add auth, document new endpoints and storage (`authToken` and `user`) and update `api.ts` accordingly.
