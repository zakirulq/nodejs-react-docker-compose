const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config');
require('dotenv').config();

const app = express();
const PORT = config.port;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = config.mongodbUri;
const DB_NAME = config.dbName;
const COLLECTION_NAME = config.collectionName;

// Debug: Log the config values
console.log('Config values:');
console.log('config.mongodbUri:', config.mongodbUri);
console.log('MONGODB_URI:', MONGODB_URI);

let db;

async function connectToMongo() {
  const maxRetries = 30;
  const retryDelay = 2000; // 2 seconds
  
  // Debug: Log environment variables
  console.log('Environment variables:');
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  console.log('CONNECTIONSTRINGS__TASKDB:', process.env.CONNECTIONSTRINGS__TASKDB);
  console.log('Final connection string:', MONGODB_URI);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting to connect to MongoDB (attempt ${attempt}/${maxRetries})...`);
      console.log(`Connection string: ${MONGODB_URI}`);
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db(DB_NAME);
      console.log('Connected to MongoDB successfully');
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      
      console.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

// Task model
class TaskItem {
  constructor(title, description, isCompleted = false, dueDate = null) {
    this.id = new ObjectId().toString();
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.createdDate = new Date().toISOString();
    this.dueDate = dueDate;
  }
}

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const tasks = await collection.find({}).toArray();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const task = await collection.findOne({ id: req.params.id });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    console.log('Received task:', req.body);
    
    const { title, description, isCompleted, dueDate } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    const task = new TaskItem(title, description, isCompleted, dueDate);
    const collection = db.collection(COLLECTION_NAME);
    
    await collection.insertOne(task);
    
    console.log('Task created successfully with ID:', task.id);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const existingTask = await collection.findOne({ id: req.params.id });
    
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = { ...req.body, id: req.params.id };
    await collection.replaceOne({ id: req.params.id }, updatedTask);
    
    res.status(204).send();
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const existingTask = await collection.findOne({ id: req.params.id });
    
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await collection.deleteOne({ id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await connectToMongo();
  
  app.listen(PORT, () => {
    console.log(`Task Management API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

startServer().catch(console.error); 