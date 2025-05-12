import React, { useState, useEffect } from "react";
import Button from "./Button";

const EditSnapForm = ({ snap, onClose, onSave }) => {
  const [formData, setFormData] = useState(snap || {});

  useEffect(() => {
    setFormData(snap);
  }, [snap]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2 className="text-lg font-semibold mb-4">Edit Snap</h2>
        <div className="grid gap-3">
          <input value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} placeholder="Name" className="snap-input" />
          <input value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} placeholder="Description" className="snap-input" />
          <input value={formData.snapCategory || ''} onChange={e => handleChange('snapCategory', e.target.value)} placeholder="Category" className="snap-input" />
          <input value={formData.type || ''} onChange={e => handleChange('type', e.target.value)} placeholder="Type" className="snap-input" />
          <input value={formData.docLink || ''} onChange={e => handleChange('docLink', e.target.value)} placeholder="Doc Link" className="snap-input" />
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="ml-3" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditSnapForm;
