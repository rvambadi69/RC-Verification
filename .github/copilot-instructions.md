# Copilot Instructions for RC Verification

## Architecture Overview
- **Frontend**: Vite + React 18 + TypeScript, located in `frontend/`. Pages are in `frontend/src/pages/`, routes in `frontend/src/App.tsx`. UI uses shadcn/ui components (`frontend/src/components/ui/*`) and TailwindCSS. API calls are centralized in `frontend/src/lib/api.ts`.
- **Backend**: Spring Boot 4.x (Java 21), located in `backend/`. Main entry: `BackendApplication.java`. MVC structure: `controller/`, `service/`, `repository/`, `model/`, `config/` under `com.SmartVehicle.backend`. MongoDB Atlas is configured in `application.properties`.

## Key Developer Workflows
- **Frontend**: Start with `npm run dev` in `frontend/`. Use Vite config (`vite.config.ts`) for aliases and plugins. Lint with ESLint (`eslint.config.js`).
- **Backend**: Start with `mvn spring-boot:run` in `backend/`. Build with Maven wrapper (`mvnw`).
- **Testing**: (Add test details here if/when present.)

## API & Data Flow
- **Public Endpoints**: `/api/rc`, `/api/rc/{id}`, `/api/rc/search`, `/api/rc/stats`, `/api/rc/page`.
- **Admin Endpoints**: Require `X-ADMIN-KEY` header. Includes create, update, delete RCs. Ownership history tracked and exposed via `/api/rc/{id}/history`.
- **Frontend API Client**: All requests go through `frontend/src/lib/api.ts`. Admin mutations require the header.

## Project-Specific Patterns & Conventions
- **Validation**: Zod schemas in `frontend/src/lib/validation.ts` for forms.
- **UI Components**: Do not edit shadcn-generated primitives in `components/ui/*`.
- **State**: Owners count is derived on the backend; frontend normalizes before save.
- **Pagination & Filters**: Vehicles page uses `/api/rc/page` with query params for filtering.
- **Metrics**: Backend exposes Prometheus metrics at `/actuator/prometheus`.

## Integration Points
- **MongoDB Atlas**: Connection via `spring.mongodb.uri` in backend config.
- **Prometheus**: Metrics via Spring Actuator + Micrometer.

## Examples
- **Add Vehicle**: Form validated with Zod, POST to `/api/rc` with admin key.
- **Transfer Ownership**: PUT to `/api/rc/{id}`; history appended, warnings for stolen/suspicious RCs.
- **Analytics**: Charts consume `/api/rc/stats` for fraud and verification trends.

## Notes
- Admin operations always require `X-ADMIN-KEY`.
- Owners count is computed server-side.
- Do not modify shadcn/ui primitives.

---
If any section is unclear or missing, please provide feedback to improve these instructions.