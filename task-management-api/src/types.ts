export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: string;
  dueDate?: string | null;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  isCompleted?: boolean;
  dueDate?: string | null;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string | null;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface Config {
  port: number;
  mongodbUri: string;
  dbName: string;
  collectionName: string;
  nodeEnv: string;
} 