# Task Management Application

A modern task management application built with **React TypeScript** frontend, **Node.js Express** backend API, and **MongoDB** database, all orchestrated using **Docker Compose** for a seamless development and deployment experience.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Node.js API   │    │   MongoDB       │
│   (Port 3000)   │◄──►│   (Port 5469)   │◄──►│   (Port 27017)  │
│                 │    │                 │    │                 │
│ - Task List     │    │ - Express       │    │ - TaskDb        │
│ - Search        │    │ - REST API      │    │ - Collections   │
│ - CRUD Ops      │    │ - MongoDB       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          ▲                       ▲                       ▲
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                     ┌─────────────────┐
                     │   Docker        │
                     │   Compose       │
                     │                 │
                     │ - Orchestration │
                     │ - Networking    │
                     │ - Volumes       │
                     └─────────────────┘
```

## 🚀 Features

### Frontend (React + TypeScript)
- **Task Management**: Create, read, update, and delete tasks
- **Real-time Search**: Search tasks by title or description
- **Status Filtering**: Filter by All, Pending, or Completed tasks
- **Responsive Design**: Modern UI with clean, intuitive interface
- **Task Details**: Detailed view with full task information
- **Auto-refresh**: Automatic updates when tasks are modified

### Backend (Node.js + Express)
- **RESTful API**: Full CRUD operations for tasks
- **MongoDB Integration**: NoSQL database for flexible data storage
- **CORS Support**: Configured for React frontend
- **Health Check**: API health monitoring endpoint
- **Error Handling**: Comprehensive error handling and logging

### Infrastructure (Docker Compose)
- **Container Orchestration**: All services running in containers
- **Service Discovery**: Automatic service communication
- **Data Persistence**: MongoDB data persisted in Docker volumes
- **Port Management**: Automatic port allocation and exposure
- **Network Isolation**: Secure inter-service communication

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd NodeWithReactInDockerCompose
```

### 2. Start the Application

```bash
# Start all services
docker-compose up -d

# Or start with logs
docker-compose up
```

### 3. Access the Application

- **React Frontend**: http://localhost:3000
- **Node.js API**: http://localhost:5469
- **API Health Check**: http://localhost:5469/health

## 🐳 Docker Services

### MongoDB (Database)
- **Image**: mongo:7.0
- **Port**: 27017
- **Database**: taskdb
- **Volume**: mongodb_data (persistent storage)

### Node.js API (Backend)
- **Port**: 5469
- **Environment**: Production
- **Dependencies**: MongoDB
- **Health Check**: /health endpoint

### React Frontend (Frontend)
- **Port**: 3000
- **Environment**: Development
- **Dependencies**: Node.js API
- **Hot Reload**: Enabled

## 🔧 Development

### Running Individual Services

```bash
# Start only MongoDB
docker-compose up mongodb

# Start only the API
docker-compose up api

# Start only the frontend
docker-compose up frontend
```

### Viewing Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs api
docker-compose logs frontend
docker-compose logs mongodb
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v
```

### Rebuilding Services

```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build api
docker-compose build frontend
```

## 📡 API Endpoints

The Node.js API provides the following endpoints:

- `GET /health` - Health check
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Task Model

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "isCompleted": "boolean",
  "createdDate": "string (ISO date)",
  "dueDate": "string (ISO date, optional)"
}
```

## 🌐 Environment Variables

### Node.js API
- `PORT` - API server port (default: 5469)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017)
- `DB_NAME` - Database name (default: taskdb)
- `NODE_ENV` - Environment (default: development)

### React Frontend
- `REACT_APP_API_BASE_URL` - API base URL (default: http://localhost:5469)
- `CHOKIDAR_USEPOLLING` - Enable file watching in Docker (default: true)

## 🏗️ Project Structure

```
NodeWithReactInDockerCompose/
├── docker-compose.yml              # Docker Compose configuration
├── task-management-api/            # Node.js API
│   ├── Dockerfile                  # API container configuration
│   ├── src/server.ts               # Express server (TypeScript)
│   ├── src/config.ts               # Configuration (TypeScript)
│   ├── package.json                # Node.js dependencies
│   └── README.md                   # API documentation
├── task-management-client/         # React frontend
│   ├── Dockerfile                  # Frontend container configuration
│   ├── src/
│   │   ├── api.ts                  # API client
│   │   ├── components/             # React components
│   │   └── ...
│   └── package.json                # React dependencies
└── README.md                       # This file
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000  # For React
lsof -i :5469  # For API
lsof -i :27017 # For MongoDB

# Kill the process
kill -9 <PID>
```

#### MongoDB Connection Issues
```bash
# Check MongoDB container status
docker-compose ps mongodb

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

#### API Connection Issues
```bash
# Check API container status
docker-compose ps api

# View API logs
docker-compose logs api

# Test API health
curl http://localhost:5469/health
```

#### Frontend Build Issues
```bash
# Rebuild frontend container
docker-compose build frontend

# Restart frontend
docker-compose restart frontend
```

### Data Persistence

MongoDB data is persisted in a Docker volume. To reset the database:

```bash
# Stop all services
docker-compose down

# Remove the volume (⚠️ This will delete all data)
docker volume rm nodewithreactindockercompose_mongodb_data

# Start services again
docker-compose up -d
```

## 🚀 Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set production environment variables
2. **SSL/TLS**: Configure HTTPS for the frontend and API
3. **Database**: Use a managed MongoDB service
4. **Monitoring**: Add logging and monitoring solutions
5. **Scaling**: Configure load balancing and horizontal scaling

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the Docker Compose logs
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

---

**Happy Coding! 🚀**
