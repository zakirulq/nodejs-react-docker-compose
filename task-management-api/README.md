# Task Management API

A Node.js REST API for the Task Management Application built with Express and MongoDB.

## Features

- CRUD operations for tasks
- MongoDB integration
- RESTful API endpoints
- CORS enabled
- Security middleware (Helmet)
- Request logging (Morgan)

## API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /health` - Health check endpoint

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` - Server port (default: 5469)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017)
- `NODE_ENV` - Environment (default: development)

## Task Model

```javascript
{
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  createdDate: string (ISO date),
  dueDate: string (ISO date, optional)
}
``` 