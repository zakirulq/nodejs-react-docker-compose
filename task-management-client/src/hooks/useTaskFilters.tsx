import { useState, useMemo } from 'react';
import { TaskItem } from '../api';

type StatusFilter = 'all' | 'completed' | 'pending';

export function useTaskFilters(tasks: TaskItem[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => 
        statusFilter === 'completed' ? task.isCompleted : !task.isCompleted
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(lowerSearchTerm) ||
        task.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    return filtered;
  }, [tasks, searchTerm, statusFilter]);

  const taskCounts = useMemo(() => {
    const completed = tasks.filter(task => task.isCompleted).length;
    const pending = tasks.filter(task => !task.isCompleted).length;
    return { completed, pending, total: tasks.length };
  }, [tasks]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredTasks,
    taskCounts,
    clearAllFilters,
  };
}