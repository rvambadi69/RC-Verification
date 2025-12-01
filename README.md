# RC Verification — Project Overview

RC Verification is a full-stack application for searching, managing, and analyzing vehicle Registration Certificates (RCs). It has a React (Vite + TypeScript) frontend and a Spring Boot backend with MongoDB Atlas for persistence. Public users can search RCs; privileged admin actions require an admin key header.

## How It Works

- Frontend (Vite + React 18 + TS)
    - Routes in `frontend/src/App.tsx` with pages: `Index`, `Verify`, `Vehicles`, `RcDetail`, `TransferOwnership`, `Analytics`, `AdminUsers`, `NotFound`.
    - Central API client in `frontend/src/lib/api.ts` targets `http://localhost:8080` and uses `X-ADMIN-KEY` for admin mutations.
    - Zod validation in `frontend/src/lib/validation.ts` enforces form inputs for vehicle creation and ownership transfer.
    - UI built with shadcn/ui components in `frontend/src/components/ui/*` and TailwindCSS.

- Backend (Spring Boot 4.x + Java 21)
    - Entrypoint: `backend/src/main/java/com/SmartVehicle/backend/BackendApplication.java`.
    - MVC packages: `controller/`, `service/`, `repository/`, `model/`, `config/` under `com.SmartVehicle.backend`.
    - MongoDB Atlas configured in `backend/src/main/resources/application.properties` using `spring.mongodb.uri` and `spring.mongodb.database`.
    - Admin key requirement via header `X-ADMIN-KEY` checked by `config/AdminKeyValidator` (used in controller admin endpoints).
    - Data model: `Rc` document with root fields (`rcNumber`, `ownersCount`, `previousOwners`, `owner`, `vehicleInfo`, `registrationInfo`, `insurance`, `puc`, `chassisNumber`, `engineNumber`, `registrationState`, `stolen`, `suspicious`, `createdAt`, `updatedAt`). Unique index on `rcNumber` prevents duplicates.
    - Service validations: `RcServiceImpl` enforces required fields and recomputes `ownersCount = 1 + previousOwners.size()` on add/update.
    - Ownership history: `OwnershipHistory` collection records name changes on transfers; endpoint `GET /api/rc/{id}/history` returns timeline.
    - Metrics: Actuator + Micrometer Prometheus expose `/actuator/prometheus`; custom counters track RC operations.

## API Surface

- Public
    - `GET /api/rc` — list all RCs
    - `GET /api/rc/{id}` — get by id
    - `GET /api/rc/search?rcNumber=...` — search by number
    - `GET /api/rc/stats` — aggregate stats
    - `GET /api/rc/page?page=&size=&registrationState=&stolen=&suspicious=&make=&ownerName=` — filtered pagination

- Admin (requires header `X-ADMIN-KEY`)
    - `POST /api/rc` — create RC
    - `PUT /api/rc/{id}` — update RC (records ownership history if owner name changes)
    - `DELETE /api/rc/{id}` — delete RC

## Key Flows

- Verify RC: User enters RC number; frontend calls `/api/rc/search`; result shows owner/vehicle details and fraud flags.
- Add Vehicle (Admin): Form in `Vehicles` uses Zod to validate; submits to `POST /api/rc` with `X-ADMIN-KEY`.
- Transfer Ownership (Admin): Page loads RC by number, warns if stolen/suspicious using `AlertDialog`, validates with Zod, updates owner via `PUT /api/rc/{id}`. History is appended in `OwnershipHistory`.
- Analytics: Frontend charts consume `/api/rc/stats` to show totals, fraud counts, by-state distribution, and monthly verification trends.
- Pagination & Filters: `Vehicles` page queries `/api/rc/page` with filters for state, make, owner name, stolen, suspicious, and navigates pages.

## Development

Frontend:

```powershell
Push-Location "c:\Users\rohit\OneDrive\Desktop\study\projects\rc-shield-main\frontend"
npm install
npm run dev
Pop-Location
```

Backend:

```powershell
Push-Location "c:\Users\rohit\OneDrive\Desktop\study\projects\rc-shield-main\backend"
./mvnw clean install
./mvnw spring-boot:run
Pop-Location
```

Backend runs on `http://localhost:8080`. Prometheus metrics at `http://localhost:8080/actuator/prometheus`.

## Configuration

`backend/src/main/resources/application.properties`:
- `server.port=8080`
- `spring.mongodb.uri=<Atlas connection>`
- `spring.mongodb.database=vehicledb`
- `spring.mongodb.auto-index-creation=true`
- `admin.secret.key=<your_admin_key>`
- `management.endpoints.web.exposure.include=health,info,prometheus`

## Notes

- Do not edit shadcn-generated primitives in `components/ui/*`.
- Admin operations require `X-ADMIN-KEY` header.
- Owners count is derived on server; frontend value is normalized before save.

