import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchTask, updateTask, deleteTask, TaskItem } from '../api';
import { useTasks } from '../context/TaskContext';
import DeleteConfirmModal from './DeleteConfirmModal';

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refreshTasks } = useTasks();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<TaskItem>>({});
  const [saving, setSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTask(id)
        .then(setTask)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (task) {
      setEditForm({
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  const handleSave = async () => {
    if (!id || !task) return;
    
    setSaving(true);
    try {
      await updateTask(id, editForm);
      // Refresh both the current task and the task list
      const updatedTask = await fetchTask(id);
      setTask(updatedTask);
      await refreshTasks(); // This will update the task list
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (task) {
      setEditForm({
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        dueDate: task.dueDate,
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      await deleteTask(id);
      await refreshTasks();
      navigate('/'); // Redirect to task list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) return <div>Loading task...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
          ← Back to Task List
        </Link>
        {!isEditing && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Edit Task
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
      
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: '2rem' }}>
        {isEditing ? (
          <div>
            <h1>Edit Task</h1>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Title:
              </label>
              <input
                type="text"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Description:
              </label>
              <textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={editForm.isCompleted || false}
                  onChange={(e) => setEditForm({ ...editForm, isCompleted: e.target.checked })}
                />
                <span style={{ fontWeight: 'bold' }}>Completed</span>
              </label>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Due Date:
              </label>
              <input
                type="date"
                value={editForm.dueDate ? editForm.dueDate.split('T')[0] : ''}
                onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={handleSave}
                disabled={saving}
                style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.6 : 1
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancel}
                disabled={saving}
                style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.6 : 1
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>{task.title}</h1>
            <p style={{ fontSize: '1.1em', color: '#666' }}>{task.description}</p>
            
            <div style={{ marginTop: '2rem' }}>
              <div><strong>Status:</strong> {task.isCompleted ? '✅ Completed' : '⏳ Pending'}</div>
              <div><strong>Created:</strong> {new Date(task.createdDate).toLocaleString()}</div>
              {task.dueDate && (
                <div><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        taskTitle={task.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default TaskDetail;