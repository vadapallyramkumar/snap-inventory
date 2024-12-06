import React, { useState } from 'react';
import SnapHeader from './SnapHeader';
import SnapGrid from './SnapGrid';
import SnapDetailsPanel from './SnapDetailsPanel';
import SnapManager from './SnapManager';

const SnapExplorer = ({ categories, snaps: initialSnaps, isAdmin }) => {
  const [snaps, setSnaps] = useState(initialSnaps);
  const [filteredSnaps, setFilteredSnaps] = useState(initialSnaps);
  const [selectedSnap, setSelectedSnap] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (searchTerm) => {
    setFilteredSnaps(
      initialSnaps.filter((snap) =>
        snap.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleFilter = (category) => {
    setFilteredSnaps(
      category ? initialSnaps.filter((snap) => snap.category === category) : snaps
    );
  };

  const handleAddSnap = (newSnap) => {
    const updatedSnaps = [...initialSnaps, newSnap];
    setSnaps(updatedSnaps);
    setFilteredSnaps(updatedSnaps);
  };


  return (
    <div className="snap-explorer" style={{ position: 'relative' }}>
      <SnapHeader
        categories={categories}
        onSearch={handleSearch}
        onFilter={handleFilter}
        isAdmin={isAdmin}
        handleSnapManager={setShowForm}
        showForm={showForm}
      />
      <SnapGrid snaps={filteredSnaps} onSnapClick={setSelectedSnap} />
      <SnapDetailsPanel snap={selectedSnap} onClose={() => setSelectedSnap(null)} />
      <SnapManager
        showForm={showForm}
        setShowForm={setShowForm}
        onAddSnap={handleAddSnap}
        currentSnaps={snaps}
      />
    </div>
  );
};

export default SnapExplorer;
