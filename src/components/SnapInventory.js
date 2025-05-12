import React, { useState, useEffect } from "react";
import SnapTable from "./SnapTable";
import AddSnapPackForm from "./AddSnapPackForm";
import DeleteToast from "./DeleteToast";
import EditSnapForm from "./EditSnapForm";
import {
  fetchSnapPacks,
  addSnapPack,
  updateSnapPack,
  updateSnap,
  deleteSnapPack,
  deleteSnap,
} from "../data/snapsData";
import SnapHeader from './SnapHeader';
import SnapDetailsPanel from './SnapDetailsPanel';

const SnapsInventory = ({ isAdmin }) => {
  const [listOfSnaps, setListOfSnaps] = useState([]);
  const [showAddSnapForm, setShowAddSnapForm] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [filteredSnaps, setFilteredSnaps] = useState(listOfSnaps);
  const [loading, setLoading] = useState(false);
  const [editSnapPackData, setEditSnapPackData] = useState('');
  const [selectedSnap, setselectedSnap] = useState('');
  const [deleteContext, setDeleteContext] = useState({ type: '', id: '', title: '', message: '', onConfirm: null });
  const [editSnap, setEditSnap] = useState(null);
  const [editSnapParentId, setEditSnapParentId] = useState(null);

  useEffect(() => {
    const loadSnaps = async () => {
      const snaps = await fetchSnapPacks();
      setListOfSnaps(snaps);
      setFilteredSnaps(snaps);
    };

    loadSnaps();
  }, []);

  const handleSearch = (searchTerm) => {
    const searchList = listOfSnaps.filter((snap) =>
      snap.snapPack?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSnaps(searchList);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const refreshed = await fetchSnapPacks();
      setListOfSnaps(refreshed);
      setFilteredSnaps(refreshed);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowAddSnapForm(false);
  };

  const handleSaveSnapPack = async (snapPack) => {
    try {
      await addSnapPack(snapPack);
      await refreshData();
    } catch (error) {
      console.error('Failed to add snap pack:', error.message);
      alert('Failed to add snap pack. Please try again.');
    }
  }

  const handleUpdateSnapPack = async (snapPackId, snapPack) => {
    try {
      await updateSnapPack(snapPackId, snapPack);
      await refreshData();
    } catch (error) {
      console.error('Failed to update snap pack:', error.message);
      alert('Failed to update snap pack. Please try again.');
    }
  }

  const handleShowAddSnapPack = () => {
    setShowAddSnapForm((prev) => !prev)
  }

  const handleDeleteSnapPack = async () => {
    try {
      setListOfSnaps(prev => prev.filter(snap => snap._id !== deleteId));
      setShowDeleteToast(false);
      await deleteSnapPack(deleteId);
      await refreshData();
    } catch (error) {
      console.error('Delete failed:', error.message);
      alert('Failed to delete snap pack. Please try again.');
    }
  };

  const handleConfirmDeleteSnapPack = (_id) => {
    setDeleteId(_id);
    setDeleteContext({
      type: 'snapPack',
      id: _id,
      title: 'Delete Snap Pack',
      message: 'Are you sure you want to delete this Snap Pack?',
      onConfirm: handleDeleteSnapPack
    });
    setShowDeleteToast(true);
  };

  const handleDeleteSnap = async (snapPackId, snapId) => {
    try {
      await deleteSnap(snapPackId, snapId);
      await refreshData();
      alert('Snap deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete snap. Please try again.');
    }
  };
  
  const handleConfirmDeleteSnap = (snapPackId, snapId) => {
    setDeleteContext({
      type: 'snap',
      id: snapId,
      title: 'Delete Snap',
      message: 'Are you sure you want to delete this Snap?',
      onConfirm: () => handleDeleteSnap(snapPackId, snapId)
    });
    setShowDeleteToast(true);
  };
  
  const handleEditSnapPackData = (row_data) => {
    setEditSnapPackData(row_data);
    setShowAddSnapForm(true);
  }

  const handleSnapSelect = (snap) => {
    setselectedSnap(snap);
  }

  const handleSnapEdit = (snapPackId, snap) => {
    setEditSnapParentId(snapPackId);
    setEditSnap(snap);
  };

  const handleSnapSave = async (updatedSnap) => {
    const updatedList = listOfSnaps.map(pack => {
      if (pack._id !== editSnapParentId) return pack;
      return {
        ...pack,
        snaps: pack.snaps.map(snap =>
          snap._id === updatedSnap._id ? updatedSnap : snap
        )
      };
    });
  
    setListOfSnaps(updatedList);
    await updateSnap(editSnapParentId, updatedSnap._id, updatedSnap);
  
    setEditSnap(null);
    setEditSnapParentId(null);
  };
  

  return (
    <div className="snap-explorer" style={{ position: "relative", height: "100%" }}>
      <SnapHeader
        onSearch={handleSearch}
        isAdmin={isAdmin}
        showAddSnapPackForm={handleShowAddSnapPack}
      />
      <SnapTable
        data={filteredSnaps}
        isAdmin={isAdmin}
        deleteSnapPack={handleConfirmDeleteSnapPack}
        loading={loading}
        onEdit={handleEditSnapPackData}
        onSnapSelect={handleSnapSelect}
        deleteSnap={handleConfirmDeleteSnap}
        onEditSnap={handleSnapEdit}
        />

      {
        showDeleteToast && (
          <DeleteToast
            title={deleteContext.title}
            message={deleteContext.message}
            onCancel={() => setShowDeleteToast(false)}
            onConfirm={() => {
              deleteContext.onConfirm();
              setShowDeleteToast(false);
            }}
          />
        )
      }

      {showAddSnapForm && (
        <AddSnapPackForm
          open={showAddSnapForm}
          onClose={handleCloseForm}
          onSave={handleSaveSnapPack}
          editData={editSnapPackData}
          updateSnapPack={handleUpdateSnapPack}
        />
      )}

      {
        selectedSnap && (
          <SnapDetailsPanel snap={selectedSnap} onClose={() => setselectedSnap(null)} />
        )
      }

      {editSnap && (
        <EditSnapForm
          snap={editSnap}
          onClose={() => setEditSnap(null)}
          onSave={handleSnapSave}
        />
      )}
    </div>
  );
};

export default SnapsInventory;
