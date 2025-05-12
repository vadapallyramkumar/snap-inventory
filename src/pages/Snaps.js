import React from 'react';
import SnapsInventory from '../components/SnapInventory';

function Snaps({ isAdmin }) {
  return (
    <SnapsInventory isAdmin={isAdmin} />
  );
}

export default Snaps;
