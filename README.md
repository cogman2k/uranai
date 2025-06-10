# Fullstack Todo App

A modern Todo application built with React, Express, and MongoDB, featuring JWT authentication and Ant Design UI.

## Features

- User authentication (Register/Login)
- JWT-based authentication
- Create, Read, Update, and Delete todos
- Mark todos as complete/incomplete
- Modern UI with Ant Design
- Responsive design
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

4. Start MongoDB (if running locally)

## Running the Application

1. Start both frontend and backend concurrently:
   ```bash
   npm start
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Todos
- GET /api/todos - Get all todos
- POST /api/todos - Create a new todo
- PATCH /api/todos/:id - Update a todo
- DELETE /api/todos/:id - Delete a todo

## Technologies Used

- Frontend:
  - React with TypeScript
  - Ant Design
  - React Router
  - Axios
  - Context API for state management

- Backend:
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcryptjs for password hashing

## Security Features

- Password hashing
- JWT authentication
- Protected routes
- Input validation
- Error handling 