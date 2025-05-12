import React, { useState } from 'react';
import SnapTable from './SnapTable';

const AccordionWrapper = ({ snapGroups }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (id) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <div>
      {snapGroups.map(group => (
        <div key={group.id} style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
          <div
            onClick={() => toggleAccordion(group.id)}
            style={{
              cursor: 'pointer',
              backgroundColor: '#eee',
              padding: '10px',
              fontWeight: 'bold',
            }}
          >
            {group.snapPack}
          </div>
          {expanded === group.id && (
            <div style={{ padding: '10px' }}>
              <SnapTable
                data={group.snaps.map(snap => ({
                  ...snap,
                  snapPricingCategory: group.snapPricingCategory,
                  sourceVersion: group.sourceVersion,
                  snapVersion: group.snapVersion,
                  lastEnhanceMade: group.lastEnhanceMade,
                  AhaBacklogLink: group.AhaBacklogLink,
                  currentWorkItems: group.currentWorkItems,
                }))}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionWrapper;
