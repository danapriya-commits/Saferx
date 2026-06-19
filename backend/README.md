# Saferx Backend

This is the backend for the Saferx web application, providing APIs for the public frontend, visual editor, and an administrative dashboard. It is built with FastAPI, SQLAlchemy, and Alembic, utilizing SQLite for local development with full support for PostgreSQL in production.

## Project Overview
The backend serves as the core data and authentication provider. Key features include:
- **Public APIs**: Serving medical equipment, knowledge center articles, and dynamic website content to the Next.js frontend.
- **Admin Authentication**: JWT-based authentication using secure HttpOnly cookies.
- **Visual Editor API**: Endpoints for dynamically updating website content, uploading images, and managing the CMS.
- **Async Database Operations**: Fully asynchronous database queries using SQLAlchemy 2.0 with `asyncpg` / `aiosqlite`.

---

## Prerequisites
- **Python**: 3.10 or newer
- **Node/npm** (optional, for frontend proxying/running the full stack)
- **Virtual Environment Tool**: `venv` or `virtualenv`

---

## Environment Variable Configuration
The backend strictly relies on a `.env` file for all configuration. Create a `.env` file in the `backend/` directory with the following variables:

```env
# Authentication
ADMIN_EMAIL=admin@saferx.com
ADMIN_PASSWORD=your_secure_password

# Database (Default: local SQLite)
# For Postgres: postgresql+asyncpg://user:password@localhost/dbname
DATABASE_URL=sqlite+aiosqlite:///./saferx.db

# Cryptography and JWT
SECRET_KEY=generate_a_strong_random_secret_string_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

> **Warning:** Ensure that your `.env` file is never committed to version control.

---

## Installation Steps

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   - On Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

---

## Database Setup

We use **Alembic** to manage database migrations. The database URL is read securely from your `.env` file.

1. **Run Migrations**: Apply the latest database schema.
   ```bash
   alembic upgrade head
   ```

2. **Seed the Admin User**: Run the seeding script to create the initial admin account (using the credentials specified in your `.env` file).
   ```bash
   python seed_admin.py
   ```

---

## Running the Development Server

Start the backend server locally using Uvicorn.

```bash
uvicorn main:app --reload --port 8000
```

The server will be available at `http://localhost:8000`.
FastAPI automatically generates interactive API documentation. You can access it at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## API Endpoints Overview

The backend exposes several modular routers:

- **Auth API** (`/api/auth`): 
  - `POST /api/auth/login`: Authenticate and set a JWT HttpOnly cookie.
  - `POST /api/auth/logout`: Invalidate the session cookie.
- **Public API** (`/api/public`): 
  - GET routes for fetching equipment, knowledge articles, and general website content. (No auth required).
- **Editor API** (`/api/editor`): 
  - Admin-only routes for saving/publishing content, uploading images to `/static/uploads`, and modifying the CMS.
- **Admin UI** (`/admin`):
  - Server-rendered HTML routes acting as a fallback or native administrative dashboard.

---

## Authentication Details
The system uses stateless JWT authentication. 
1. Upon logging in via `/api/auth/login`, a token is generated and signed with the `SECRET_KEY`.
2. The token is appended to the response as an `HttpOnly` cookie (`admin_token`).
3. Subsequent requests to protected routes (`Depends(get_current_admin)`) decode the cookie, validating the token and ensuring the user matches the `ADMIN_EMAIL` in the environment configuration.

---

## Project Structure

```text
backend/
├── alembic/                # Migration scripts and environment configuration
├── core/
│   ├── deps.py             # FastAPI dependencies (e.g., get_current_admin)
│   └── security.py         # JWT and password hashing utilities
├── models/                 # SQLAlchemy ORM definitions
├── routers/                # FastAPI endpoint routers (auth, editor, public, etc.)
├── static/
│   └── uploads/            # Directory for user-uploaded images and media
├── .env                    # Environment variables (ignored by Git)
├── alembic.ini             # Alembic configuration
├── database.py             # SQLAlchemy async engine and sessionmaker configuration
├── main.py                 # Application entry point and lifespan events
└── seed_admin.py           # Script to initialize the default admin user
```

---

## Production Deployment Instructions

1. **Database Strategy**: For production, replace the SQLite `DATABASE_URL` with a robust relational database like PostgreSQL (`postgresql+asyncpg://...`). Ensure `alembic upgrade head` is run against the production database.
2. **Static Files**: If heavily utilizing user uploads, consider moving the upload strategy from the local `/static/uploads` directory to an object storage provider like AWS S3.
3. **Web Server**: 
   - Do not run Uvicorn with `--reload` in production.
   - Use a process manager like **Gunicorn** with Uvicorn workers:
     ```bash
     gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
     ```
4. **Reverse Proxy**: Place the application behind a reverse proxy like Nginx or Caddy to handle HTTPS termination and serve static files more efficiently.

---

## Troubleshooting

- **Invalid email or password / Cannot Login**: 
  - Double check your `backend/.env` file. Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` exactly match what you are typing.
  - If you recently changed the `.env` credentials, re-run `python seed_admin.py`.
- **Database Locked Errors**:
  - SQLite is not meant for heavy concurrent use. If you see database locks during complex editing operations, switch to PostgreSQL.
- **Images Not Loading**:
  - Check the `static/uploads/` directory permissions. The application needs write access to this folder to save uploaded media.
- **Environment Variable Errors**:
  - If the application crashes on startup with `ValueError: No SECRET_KEY set...`, ensure you have correctly created and named the `.env` file in the root of the `backend/` directory.
