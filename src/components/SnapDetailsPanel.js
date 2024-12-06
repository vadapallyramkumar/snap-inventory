import React from 'react';

const SnapDetailsPanel = ({ snap, onClose }) => {
  if (!snap) return null;

  return (
    <div className="my-5 snap-details-panel border-l border-background-VERY_LIGHT">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <img src={snap.image} alt={snap.type} />
      <h1 className='font-bold pt-4'>{snap.name}</h1>
      <p className='pt-2 pb-4 text-justify'>{snap.description}</p>
      <p><b>Category:</b> {snap.category}</p>
      <p><b>Version:</b> {snap.version}</p>
      <div className='py-2'>
        <b>Sample Info:</b>
        <img src={snap.snapImage} alt={snap.type} />
      </div>
      <p className='py-2'>
        <b>For more info refer to Doc</b>: 
        <a className='text-sky' href={snap.docLink} target='_blank' rel="noreferrer"> {snap.docLink}</a>
      </p>
    </div>
  );
};

export default SnapDetailsPanel;
