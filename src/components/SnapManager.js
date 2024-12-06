import React, { useState } from "react";

const SnapManager = ({ showForm, setShowForm, onAddSnap, currentSnaps }) => {
  const [newSnap, setNewSnap] = useState({
    id: currentSnaps.length + 1,
    name: "",
    description: "",
    image: null,
    snapImage: null,
    docLink: "",
    type: "",
    category: "",
    version: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSnap((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewSnap((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleAddSnap = () => {
    onAddSnap(newSnap);
    setShowForm(false);
    setNewSnap({
      id: currentSnaps.length + 2,
      name: "",
      description: "",
      image: null,
      snapImage: null,
      docLink: "",
      type: "",
      category: "",
      version: "",
    });
  };

  return (
    <div>
      {showForm && (
        <div>
          <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
          <div className="snap-manager">
            <div className="form-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddSnap();
                }}
              >
                <label>
                  Title:
                  <input
                    type="text"
                    name="name"
                    className="border"
                    value={newSnap.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    className="border"
                    value={newSnap.description}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Snap Type:
                  <select
                    name="type"
                    value={newSnap.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Read Snap">Read Snap</option>
                    <option value="Write Snap">Write Snap</option>
                    <option value="Transform Snap">Transform Snap</option>
                  </select>
                </label>
                <label>
                  Documentation Link:
                  <input
                    type="url"
                    name="docLink"
                    value={newSnap.docLink}
                    onChange={handleInputChange}
                    required
                    className="border"
                  />
                </label>
                <label>
                  Snap Image:
                  <input
                    type="file"
                    name="snapImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border"
                  />
                </label>
                <label>
                  Category:
                  <input
                    type="text"
                    name="category"
                    value={newSnap.category}
                    onChange={handleInputChange}
                    required
                    className="border"
                  />
                </label>
                <label>
                  Version:
                  <input
                    type="text"
                    name="version"
                    value={newSnap.version}
                    onChange={handleInputChange}
                    className="border"
                  />
                </label>
                <button type="submit">Add Snap</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnapManager;
