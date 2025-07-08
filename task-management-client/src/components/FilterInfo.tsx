import React from 'react';

interface FilterInfoProps {
  searchTerm: string;
  statusFilter: string;
  filteredTasksCount: number;
  totalTasksCount: number;
  onClearAllFilters: () => void;
}

function FilterInfo({ 
  searchTerm, 
  statusFilter, 
  filteredTasksCount, 
  totalTasksCount, 
  onClearAllFilters 
}: FilterInfoProps) {
  const hasActiveFilters = searchTerm || statusFilter !== 'all';
  
  if (!hasActiveFilters) return null;

  const filterDescription = filteredTasksCount === totalTasksCount 
    ? `Showing all ${totalTasksCount} tasks`
    : `Showing ${filteredTasksCount} of ${totalTasksCount} tasks`
      + (searchTerm ? ` matching "${searchTerm}"` : '')
      + (statusFilter !== 'all' ? ` (${statusFilter})` : '');

  return (
    <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
      {filterDescription}
      <button
        onClick={onClearAllFilters}
        style={{
          marginLeft: '0.5rem',
          padding: '0.25rem 0.5rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.8rem',
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterInfo;