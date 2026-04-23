# Lost & Found Item Management System

Full-stack MERN project scaffolded for the AI Driven Full Stack Development MSE-2 case study.

## Folder Structure

- `backend/` - Express, MongoDB, JWT authentication, item CRUD APIs
- `frontend/` - React + Vite app with register, login, dashboard, search, add, update, delete, logout

## Backend Setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example` and add your MongoDB URL later:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   CLIENT_URL=http://localhost:5173
   ```
4. Start backend:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```

## Available API Endpoints

- `POST /api/register`
- `POST /api/login`
- `POST /api/items`
- `GET /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
- `GET /api/items/search?name=wallet&type=Lost`

## Notes

- Passwords are hashed using `bcrypt`
- JWT authentication is implemented using `jsonwebtoken`
- Only the owner of an item can update or delete that item
- JWT token is stored in `localStorage` after login
