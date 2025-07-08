import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { deleteTask } from '../api';
import { useTaskFilters } from '../hooks/useTaskFilters';
import SearchBox from './SearchBox';
import StatusFilter from './StatusFilter';
import FilterInfo from './FilterInfo';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import AddTaskModal from './AddTaskModal';
import DeleteConfirmModal from './DeleteConfirmModal';

function TaskList() {
  const { tasks, loading, error, refreshTasks } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    taskId: string;
    taskTitle: string;
  }>({ isOpen: false, taskId: '', taskTitle: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredTasks,
    taskCounts,
    clearAllFilters,
  } = useTaskFilters(tasks);

  const handleDeleteClick = (taskId: string, taskTitle: string) => {
    setDeleteModalState({ isOpen: true, taskId, taskTitle });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(deleteModalState.taskId);
      await refreshTasks();
      setDeleteModalState({ isOpen: false, taskId: '', taskTitle: '' });
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalState({ isOpen: false, taskId: '', taskTitle: '' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Task List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          + Add New Task
        </button>
      </div>

      {/* Search and Filters */}
      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={() => setSearchTerm('')}
      />

      <StatusFilter
        currentFilter={statusFilter}
        onFilterChange={setStatusFilter}
        taskCounts={taskCounts}
      />

      <FilterInfo
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        filteredTasksCount={filteredTasks.length}
        totalTasksCount={tasks.length}
        onClearAllFilters={clearAllFilters}
      />

      {/* Task List */}
      {tasks.length === 0 ? (
        <EmptyState type="no-tasks" />
      ) : filteredTasks.length === 0 ? (
        <EmptyState type="no-results" onClearFilters={clearAllFilters} />
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskTitle={deleteModalState.taskTitle}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default TaskList;