import React from 'react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results';
  searchTerm?: string;
  onClearFilters?: () => void;
}

function EmptyState({ type, searchTerm, onClearFilters }: EmptyStateProps) {
  if (type === 'no-tasks') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>No tasks found.</p>
        <p>Click "Add New Task" to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
      <p>No tasks found with the current filters</p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;