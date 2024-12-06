import React from 'react'
import SnapExplorer from '../components/SnapExplore';
import { snaps, categories } from '../data/snaps';

function Snaps({ isAdmin }) {
  return (
    <div>
      <SnapExplorer snaps={snaps} categories={categories} isAdmin={isAdmin} />
    </div>
  )
}

export default Snaps