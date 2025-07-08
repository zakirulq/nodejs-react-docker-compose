export interface TaskItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: string;
  dueDate?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5469';

export async function fetchTasks(): Promise<TaskItem[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

export async function fetchTask(id: string): Promise<TaskItem> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
}

export async function updateTask(id: string, task: Partial<TaskItem>): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
}

export async function createTask(task: Omit<TaskItem, 'id' | 'createdDate'>): Promise<TaskItem> {
  try {
    console.log('Creating task:', task);
    
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to create task: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Task created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}