import React from 'react';

type StatusFilter = 'all' | 'completed' | 'pending';

interface StatusFilterProps {
  currentFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  taskCounts: {
    total: number;
    pending: number;
    completed: number;
  };
}

function StatusFilter({ currentFilter, onFilterChange, taskCounts }: StatusFilterProps) {
  const filterButtons = [
    { key: 'all' as const, label: 'All', count: taskCounts.total, color: '#007bff' },
    { key: 'pending' as const, label: 'Pending', count: taskCounts.pending, color: '#ffc107' },
    { key: 'completed' as const, label: 'Completed', count: taskCounts.completed, color: '#28a745' },
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {filterButtons.map(({ key, label, count, color }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentFilter === key ? color : '#f8f9fa',
              color: currentFilter === key ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusFilter;