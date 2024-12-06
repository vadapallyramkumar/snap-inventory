import React from 'react';
import ReadIcon from '../assets/icon_read.svg';
import WriteIcon from '../assets/icon_write.svg';
import TransformIcon from '../assets/icon_transform.svg';

const SnapCard = ({ snap, onClick }) => (
  <div className="snap-card" onClick={() => onClick(snap)}>
    <div style={{ position: 'relative' }}>
      <img src={snap.image} alt={snap.type} />
    </div>
    <h1 className='font-bold pb-2 pt-1'>{snap.name}</h1>
    <p className='text-sm text-justify'>{snap.description}</p>
    <span className="snap-version">v{snap.version}</span>
  </div>
);

const SnapGrid = ({ snaps, onSnapClick }) => (
  <div className="snap-grid">
    {
      snaps.map((snap) => {
        if (snap.type) {
          switch(snap.type) {
            case 'Read Snap':
              snap['image'] = ReadIcon;
              break;
            case 'Write Snap':
              snap['image'] = WriteIcon
              break;
            case 'Transform Snap':
              snap['image'] = TransformIcon;
              break;
            default:
              snap['image'] = ReadIcon
          }
        }
        return (<SnapCard key={snap.id} snap={snap} onClick={onSnapClick} />)
      })
    }
  </div>
);

export default SnapGrid;
