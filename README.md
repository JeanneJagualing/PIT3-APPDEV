# My To-Do App

PIT 3 - To-Do List
Jeanne B. Jagualing

## Backend API Endpoints
- **GET /api/todos/**: List all tasks
- **POST /api/todos/**: Add a task (send: `{"title": "Task", "completed": false}`)
- **GET /api/todos/<id>/**: Get one task
- **PUT /api/todos/<id>/**: Update a task (send: `{"title": "New", "completed": true}`)
- **DELETE /api/todos/<id>/**: Delete a task

## Setup
### Backend
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate`
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## Live Links
- Backend: 
https://todo-backend-ul0j.onrender.com/api/
https://todo-backend-ul0j.onrender.com
- Frontend:
https://pit-3-appdev.vercel.app/
- Frontend: [Add Vercel link]
