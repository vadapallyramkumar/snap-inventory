import React, { useState } from 'react';

const SnapHeader = ({ categories, onSearch, onFilter, isAdmin, handleSnapManager, showForm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="snap-header flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search Snaps..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar border rounded px-3 py-2"
        />
        <select
          value={selectedCategory}
          onChange={handleFilter}
          className="filter-dropdown border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {isAdmin && (
        <button 
          onClick={() => handleSnapManager(!showForm)}
          className="add-snap-btn bg-active text-white px-4 py-2 rounded">
          Add New Snap
        </button>
      )}
    </div>
  );
};

export default SnapHeader;
