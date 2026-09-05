# AQVYRON

**Intelligent Business Intelligence & Data Analytics System**

AQVYRON is a college/personal project demonstrating a modern business-intelligence workflow: connected data sources, analytics, forward-looking signals and decision support. The dashboard uses a clearly labelled demo dataset.

## Stack

- Frontend: React + Vite + CSS
- Backend: Python + Django + Django REST Framework
- Database: PostgreSQL in production / SQLite fallback for local development
- Deployment: Render + Gunicorn + WhiteNoise

## Project structure

```text
AQVYRON/
├── frontend/      # React/Vite application
└── backend/       # Django REST API
```

## Local development

### Backend

```bash
cd backend
python -m venv venv
# Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

Create `frontend/.env` from `.env.example` and point it to the local Django server.

```bash
cd frontend
npm install
npm run dev
```

## Production environment

Backend variables:

```text
DJANGO_SECRET_KEY=<strong-random-secret>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<render-backend-host>
DATABASE_URL=<render-postgres-connection-string>
CORS_ALLOWED_ORIGINS=https://<render-frontend-host>
CSRF_TRUSTED_ORIGINS=https://<render-frontend-host>
```

Frontend variable:

```text
VITE_API_BASE_URL=https://<render-backend-host>
```

### Render backend

- Root directory: `backend`
- Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- Start command: `gunicorn config.wsgi:application`
- Health check: `/api/health/`
- Root response: `/`

### Render frontend

- Root directory: `frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://aqvyron-backend.onrender.com`

## Important

The dashboard contains a clearly labelled demo dataset for the college project. It should not be presented as real customer or production business data.
