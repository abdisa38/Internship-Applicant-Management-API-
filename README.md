# Internship Applicant Management API

This is the backend service for managing internship applications, built with NestJS, Prisma, and SQLite.

## Technologies Used
- **NestJS** (v11) - Progressive Node.js framework
- **Prisma** (v5) - Next-generation ORM
- **SQLite** - Relational database (for simplicity of local setup)
- **JWT (Passport)** - Authentication
- **Swagger** - OpenAPI Documentation
- **Jest** - Unit Testing

## Prerequisites
- Node.js (v18+)
- npm

## Setup Instructions

1. **Clone the repository** and navigate to the project directory:
   ```bash
   cd Internship-Applicant-Management-API-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Database Migration and Seeding**:
   Run the following commands to initialize the SQLite database and seed it with an initial admin user:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the application**:
   ```bash
   npm run start:dev
   ```

## Authentication Instructions
The API is protected with JWT Bearer authentication.
To access protected endpoints:
1. Make a `POST` request to `/api/auth/login` with the following credentials (seeded automatically):
   - **Email:** `admin@infnova.tech`
   - **Password:** `password123`
2. You will receive an `access_token`.
3. In Swagger UI or Postman, pass this token in the `Authorization` header as `Bearer <token>`.

## API Documentation (Swagger)
Once the application is running, the interactive OpenAPI documentation is available at:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

## Testing Instructions
To run the basic automated unit tests:
```bash
npm run test
```

## Architecture & Assumptions
- **Architecture:** The project follows standard NestJS conventions with modular separation (Auth, Applicants, Dashboard). Controllers handle HTTP routing, Services encapsulate business logic, and DTOs handle validation. Prisma is injected as a global service.
- **Soft Deletes:** Applicants are soft-deleted by setting the `deletedAt` timestamp. They are excluded from the main lists and dashboard summaries but remain in the database.
- **Assumptions:** 
  - To keep the setup extremely simple as requested, SQLite was chosen as the database (meaning no Docker container is strictly necessary for the DB, though `docker-compose` can still be added for the Node.js app).
  - Validation assumes tracks and statuses are fixed strings as per the challenge.
