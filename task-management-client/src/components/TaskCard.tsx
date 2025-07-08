import React from 'react';
import { Link } from 'react-router-dom';
import { TaskItem } from '../api';

interface TaskCardProps {
  task: TaskItem;
  onDelete: (taskId: string, taskTitle: string) => void;
}

function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <li style={{ border: '1px solid #ccc', borderRadius: 8, margin: '1rem 0', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Link to={`/task/${task.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
          <h2 style={{ margin: 0, color: '#333' }}>{task.title}</h2>
          <p style={{ color: '#666' }}>{task.description}</p>
          <div style={{ fontWeight: 'bold' }}>
            Status: {task.isCompleted ? '✅ Completed' : '⏳ Pending'}
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(task.id, task.title);
          }}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            marginLeft: '1rem',
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskCard;