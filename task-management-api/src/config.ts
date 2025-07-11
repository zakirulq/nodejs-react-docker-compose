import { Config } from './types';

const config: Config = {
  port: parseInt(process.env['PORT'] || '5469', 10),
  mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017',
  dbName: process.env['DB_NAME'] || 'taskdb',
  collectionName: 'tasks',
  nodeEnv: process.env['NODE_ENV'] || 'development'
};

export default config; 