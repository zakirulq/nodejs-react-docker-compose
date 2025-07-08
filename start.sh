#!/bin/bash

echo "🚀 Starting Task Management Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if we want to run in development mode
if [ "$1" = "dev" ]; then
    echo "🔧 Starting in DEVELOPMENT mode..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ Development environment started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔌 API: http://localhost:5469"
    echo "🗄️  MongoDB: localhost:27017"
    echo ""
    echo "📋 To view logs: docker-compose -f docker-compose.dev.yml logs -f"
    echo "🛑 To stop: docker-compose -f docker-compose.dev.yml down"
else
    echo "🏭 Starting in PRODUCTION mode..."
    docker-compose up -d
    echo "✅ Production environment started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔌 API: http://localhost:5469"
    echo "🗄️  MongoDB: localhost:27017"
    echo ""
    echo "📋 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
fi 