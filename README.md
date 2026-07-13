# TaskFlow Backend

A RESTful Task Management API built with **Node.js**, **Express.js**, and **PostgreSQL**. The project implements secure user authentication using **JWT** and **bcrypt**, along with a complete task management system following a layered architecture.

## Features

### Authentication
- User Registration
- User Login
- Password Hashing with bcrypt
- JWT Authentication
- Protected Routes
- Authorization Middleware

### Task Management
- Create Task
- Get All Tasks
- Get Single Task
- Update Task
- Delete Task
- Mark Task as Complete

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- pg

## Project Structure

```
server/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── logger.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js
```

## Database Schema

### Users

| Column | Type |
|---------|------|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(100) |
| email | VARCHAR(255) UNIQUE |
| password | TEXT |
| created_at | TIMESTAMP |

### Tasks

| Column | Type |
|---------|------|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(100) |
| description | TEXT |
| completed | BOOLEAN |
| created_at | TIMESTAMP |
| user_id | INTEGER (Foreign Key) |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/complete` | Mark task as complete/incomplete |

## Authentication

Protected routes require a JWT.

Example:

```
Authorization: Bearer <your_jwt_token>
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d
```

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd taskflow-backend
```

Install dependencies

```bash
npm install
```

Create the `.env` file and configure PostgreSQL.

Start the server

```bash
npm run dev
```
