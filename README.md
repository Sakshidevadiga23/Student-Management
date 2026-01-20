# Student Management System

A simple full-stack project using:

- React + Vite (Frontend)
- FastAPI (Backend)
- PostgreSQL (Database)

## Features
- Add new students
- View all students
- Delete students
- Clean and simple UI


## How to Run

### 1. Setup Database
Create a PostgreSQL database named:

studentsdb

Update the database URL in:
backend/database.py


### 2. Run Backend
Open terminal and run:

cd backend
pip install -r requirements.txt
uvicorn main:app

Backend runs on:
http://localhost:8000


### 3. Run Frontend
Open another terminal and run:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


## API Endpoints
- GET /students
- POST /students
- DELETE /students/{id}
