# AQVYRON

## Intelligent Business Intelligence & Data Analytics System

AQVYRON is a college/personal full-stack project that demonstrates a modern business intelligence and data analytics workflow. It combines data, analytics, insights, and decision-support features in a single web platform.

> **Note:** AQVYRON uses a clearly labelled demo dataset and is not presented as real customer or production business data.

### 🚀 Live Demo

**Frontend:** https://aqvyron-1.onrender.com/

**Backend API:** https://aqvyron.onrender.com/

### ✨ Features

- Interactive business analytics dashboard
- Analytics and data visualization
- Data source overview
- Business insights
- Forward-looking signals
- Decision-support information
- REST API integration
- Contact form with backend persistence
- Responsive web interface
- PostgreSQL database integration
- Production deployment with Render

### 🧩 Main Modules

**AQVYRON Intelligence** — Main dashboard for business data, analytics, and key information.

**Analytics Studio** — Analytical views and visual representations of available data.

**Predictive Signals** — Forward-looking signals based on available project data.

**Decision Support** — Organizes analytical information to support data interpretation and decision-making.

**Contact System** — Django REST API-powered contact system connected to the production database.

### 🏗️ Architecture

```text
User
  ↓
React + Vite Frontend
  ↓
HTTP / REST API Request
  ↓
Django + Django REST Framework
  ↓
PostgreSQL Database
  ↓
JSON Response
  ↓
React UI
🛠️ Technology Stack

Frontend: React.js, Vite, JavaScript/JSX, HTML, CSS

Backend: Python, Django, Django REST Framework, REST APIs

Database: PostgreSQL, SQLite

Deployment: Render, Gunicorn, WhiteNoise

Tools: Git, GitHub, VS Code

📁 Project Structure
AQVYRON/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── api/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
🔌 API Endpoints
Endpoint	Purpose
/api/analytics/	Analytics data
/api/datasources/	Data source information
/api/insights/	Business insights
/api/contact/	Contact form API
/api/health/	Backend health check
💻 Local Development
Backend
cd backend
python -m venv venv

Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Create .env from .env.example:

VITE_API_BASE_URL=http://127.0.0.1:8000
🌐 Production Deployment

Backend

Root Directory: backend

Build Command:
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate

Start Command:
gunicorn config.wsgi:application

Frontend

Root Directory: frontend

Build Command:
npm ci && npm run build

Publish Directory:
dist

Production API:

VITE_API_BASE_URL=https://aqvyron.onrender.com
🎓 Project Information

Project Name: AQVYRON

Official College Project Title:
Intelligent Business Intelligence & Data Analytics System

AQVYRON was developed to demonstrate practical skills in Python development, Django REST APIs, frontend development, database integration, analytics, and deployment.

👨‍💻 Developer

Bipul Kumar Pandey

B.Tech Computer Science & Engineering
Greater Noida, Uttar Pradesh

GitHub: https://github.com/bipulpandey110-hash

LinkedIn: https://linkedin.com/in/bipul-kumar-pandey-921494359

📌 Disclaimer

AQVYRON is a college/personal project. The dashboard contains a clearly labelled demo dataset for demonstration purposes and should not be interpreted as real customer, financial, or production business data.

⭐ If you find this project interesting, feel free to explore the code, try the live demo, and connect with me on GitHub or LinkedIn.


**Commit message:** `Polish AQVYRON README`
