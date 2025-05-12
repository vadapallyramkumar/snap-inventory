const API_BASE_URL = 'https://be-babb.onrender.com/api/snapPacks';

// GET all SnapPacks
export const fetchSnapPacks = async () => {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching snaps:', err);
    return [];
  }
};

// Add New SnapPack
export const addSnapPack = async (snapPackData) => {
  try {
    const res = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapPackData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to add snap pack');
    }

    return await res.json();
  } catch (err) {
    console.error(`Error adding new snappack`, err);
    throw err;
  }
};

// UPDATE a SnapPack by ID
export const updateSnapPack = async (snapPackId, updatedData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${snapPackId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (err) {
    console.error(`Error updating SnapPack ${snapPackId}:`, err);
  }
};

// DELETE a SnapPack by ID
export const deleteSnapPack = async (snapPackId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${snapPackId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    console.error(`Error deleting SnapPack ${snapPackId}:`, err);
  }
};

// UPDATE a single Snap inside a SnapPack
export const updateSnap = async (snapPackId, snapId, updatedSnap) => {
  try {
    const snapPack = await fetchSnapPacks(); // re-fetch all
    const pack = snapPack.find(sp => sp._id === snapPackId);

    if (!pack) throw new Error("SnapPack not found");

    const updatedSnaps = pack.snaps.map(snap =>
      snap._id === snapId ? { ...snap, ...updatedSnap } : snap
    );

    return await updateSnapPack(snapPackId, { ...pack, snaps: updatedSnaps });
  } catch (err) {
    console.error(`Error updating snap ${snapId} in SnapPack ${snapPackId}:`, err);
  }
};

// DELETE a single Snap inside a SnapPack
export const deleteSnap = async (snapPackId, snapId) => {
  try {
    const snapPack = await fetchSnapPacks();
    const pack = snapPack.find(sp => sp._id === snapPackId);
    debugger
    if (!pack) throw new Error("SnapPack not found");

    const updatedSnaps = pack.snaps.filter(snap => snap._id !== snapId);
    return await updateSnapPack(snapPackId, { ...pack, snaps: updatedSnaps });
  } catch (err) {
    console.error(`Error deleting snap ${snapId} in SnapPack ${snapPackId}:`, err);
  }
};
