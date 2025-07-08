import React from 'react';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

function SearchBox({ searchTerm, onSearchChange, onClearSearch }: SearchBoxProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={onSearchChange}
          style={{
            width: '100%',
            padding: '0.75rem 2.5rem 0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#666',
              padding: '0.25rem',
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBox;