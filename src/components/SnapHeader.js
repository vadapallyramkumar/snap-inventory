import React, { useState } from 'react';

const SnapHeader = ({ onSearch, isAdmin, showAddSnapPackForm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="snap-header flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search Snap Pack..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar border rounded px-3 py-2"
        />
      </div>

      {isAdmin && (
        <button 
          onClick={showAddSnapPackForm}
          className="add-snap-btn bg-active text-white px-4 py-2 rounded">
          Add New Snap
        </button>
      )}
    </div>
  );
};

export default SnapHeader;
