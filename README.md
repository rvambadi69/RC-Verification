# RC Shield - Vehicle Registration Verification & Fraud Detection System

A comprehensive full-stack application for verifying vehicle registration certificates (RC), detecting fraudulent registrations, and managing vehicle data efficiently.

## 🎯 Features

- **Vehicle Verification**: Search vehicles by RC number and verify registration
- **Fraud Detection**: Automated fraud scoring with multiple detection mechanisms
- **QR Code Scanning**: Quick verification via QR codes
- **Role-Based Access Control**: Different permissions for buyers, police, and RTO admins
- **Audit Trail**: Complete verification history with IP tracking and location logging
- **Real-Time Validation**: Insurance and PUC validity checking

## 🏗️ Architecture

```
┌─────────────────────┐
│  Frontend (React)   │  Port 5173
│  Vite + TypeScript  │
└──────────┬──────────┘
           │ REST API
┌──────────▼──────────┐
│ Backend (Spring)    │  Port 8081
│ Boot + Java 21      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ MongoDB Atlas       │
└─────────────────────┘
```

## 📦 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 5.4
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Query + React Router
- **Validation**: Zod

### Backend
- **Framework**: Spring Boot 4.0
- **Language**: Java 21
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JJWT 0.12.3)
- **Build**: Maven 3.9+

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (frontend)
- Java 21 (backend)
- MongoDB Atlas account
- Git

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
cd backend/SmartVehicle

# Install dependencies
mvn clean install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run the application (http://localhost:8081)
mvn spring-boot:run
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/rc_shield
JWT_SECRET=<your-256-bit-secret-key-minimum-64-characters>
JWT_EXPIRATION=604800000
```

## 📁 Project Structure

```
rc-shield-main/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # API client & utilities
│   │   └── hooks/           # Custom React hooks
│   └── package.json
│
├── backend/                 # Spring Boot backend
│   └── SmartVehicle/
│       ├── src/main/java/com/vehicle/SmartVehicle/
│       │   ├── model/       # Entity classes
│       │   ├── repository/  # Data access
│       │   ├── service/     # Business logic
│       │   ├── controller/  # API endpoints
│       │   ├── dto/         # Data transfer objects
│       │   ├── util/        # Utilities (JWT)
│       │   └── config/      # Configuration
│       └── pom.xml
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user

### Vehicles
- `GET /api/vehicles/search?rcNumber=AP01AB1234` - Search vehicle
- `POST /api/vehicles/fraud-check` - Check fraud for vehicle
- `GET /api/vehicles` - List all vehicles

## 📊 Database Collections

- **users**: User accounts with roles
- **vehicles**: Vehicle registration records
- **fraud_flags**: Fraud detection results
- **verifications**: Verification audit trail

## 🔐 Authentication Flow

1. User signs up/in via `/api/auth/signin`
2. Backend returns JWT token + user data
3. Frontend stores token in localStorage
4. Protected API calls include `Authorization: Bearer {token}`

## 👥 User Roles

| Role | Access |
|------|--------|
| public | View own verifications |
| buyer | Verify vehicles, view history |
| police | Full access + fraud reporting |
| rto_admin | Complete system management |

## 🧪 Sample Data

The application automatically loads sample data on first startup:
- 3 test users (buyer, police, rto_admin)
- 2 test vehicles with complete details
- Sample fraud flags and verifications

## 📝 Configuration

### Backend Configuration (application.properties)
```properties
server.port=8081
spring.data.mongodb.uri=${MONGODB_URI}
spring.data.mongodb.auto-index-creation=true
jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
```

### Frontend Configuration (vite.config.ts)
API base URL is configured in `src/lib/api.ts`:
```typescript
const API_BASE_URL = "http://localhost:8081";
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check .env MONGODB_URI and IP whitelist in Atlas |
| JWT token expired | Clear localStorage and re-login |
| API 404 errors | Verify backend is running on port 8081 |
| CORS errors | Check CORS configuration in Spring Security |
| Port already in use | Change port in application.properties |

## 📚 Documentation

See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for detailed documentation on:
- Complete architecture overview
- Database schema design
- API endpoint documentation
- Development workflows
- Deployment instructions

## 📄 License

This project is part of an academic database course.

## 👨‍💻 Development

Built with modern full-stack technologies emphasizing:
- Clean code architecture
- Type safety (TypeScript, Java)
- Database normalization (BCNF)
- Security best practices (JWT, password hashing)
- RESTful API design

