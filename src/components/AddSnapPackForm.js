import React, { useState, useEffect } from "react";
import Button from "./Button";

const AddSnapPackForm = ({ open, onClose, onSave, editData, updateSnapPack }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [snapPack, setSnapPack] = useState({
    snapPack: "",
    type: "",
    snapPricingCategory: "",
    docLink: "",
    noOfSnaps: 0,
    snapVersion: "",
    sourceVersion: "",
    lastEnhanceMade: "",
    AhaBacklogLink: "",
    currentWorkItems: "",
    snaps: [],
  });

  const addSnap = () => {
    setSnapPack((prev) => ({
      ...prev,
      snaps: [
        ...prev.snaps,
        {
          id: "",
          name: "",
          description: "",
          category: "",
          type: "",
          docLink: "",
          imageName: "",
        },
      ],
    }));
  };

  useEffect(() => {
    if (editData) {
      setSnapPack(editData);
    } else {
      setSnapPack({
        name: "",
        type: "",
        pricingCategory: "",
        numberOfSnaps: 0,
        snapLogicVersion: "",
        sourceVersion: "",
        lastEnhancement: "",
        ahaLink: "",
        currentWorkItems: "",
        snaps: [],
      });
    }
  }, [editData, open]);

  const updateSnapField = (index, field, value) => {
    const updatedSnaps = [...snapPack.snaps];
    updatedSnaps[index][field] = value;
    setSnapPack({ ...snapPack, snaps: updatedSnaps });
  };

  const handleInputChange = (field, value) => {
    setSnapPack((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !snapPack.snapPack ||
        !snapPack.type ||
        !snapPack.snapPricingCategory
      ) {
        setErrorMsg("Please fill all required fields.");
        return;
      }

      await onSave(snapPack);
      setErrorMsg("");
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleUpdateSnapPack = async () => {
    try {
      if (
        !snapPack.snapPack ||
        !snapPack.type ||
        !snapPack.snapPricingCategory
      ) {
        setErrorMsg("Please fill all required fields.");
        return;
      }

      await updateSnapPack(snapPack._id, snapPack);
      setErrorMsg("");
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    open && (
      <React.Fragment>
        <div open={open} onOpenChange={onClose} className="dialog">
          <div className="dialog-content">
            <div>
              <div className="text-center text-gray-400 font-bold">
                {editData ? "Edit Snap Pack" : "Add New Snap Pack"}
              </div>
            </div>
            <div className="overflow-auto mt-3 mb-3">
              <div className="h-[65vh] pr-4">
                <div className="grid gap-4">
                  <div>
                    <label style={{ paddingBottom: "5px" }}>
                      Snap Pack Name<span className="required"> * </span>:
                    </label>
                    <input
                      className="snap-input"
                      placeholder="Enter Snap Pack Name"
                      value={snapPack.snapPack}
                      onChange={(e) =>
                        handleInputChange("snapPack", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Snap Pack Type<span className="required"> * </span>:
                    </label>
                    <input
                      className="snap-input"
                      placeholder="Enter Snap Pack Type"
                      value={snapPack.type}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Pricing Category<span className="required"> * </span>:
                    </label>
                    <input
                      className="snap-input"
                      placeholder="Enter Pricing Category"
                      value={snapPack.snapPricingCategory}
                      onChange={(e) =>
                        handleInputChange("snapPricingCategory", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Doc Link<span className="required"> * </span>:
                    </label>
                    <input
                      className="snap-input"
                      placeholder="Enter Doc Link"
                      value={snapPack.docLink}
                      onChange={(e) =>
                        handleInputChange("docLink", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Number of Snaps<span className="required"> * </span>:
                    </label>
                    <input
                      className="snap-input"
                      type="number"
                      placeholder="Enter Number of Snaps"
                      value={snapPack.noOfSnaps}
                      onChange={(e) =>
                        handleInputChange("noOfSnaps", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div>
                      SnapLogic Version<span className="required"> * </span>:
                    </div>
                    <input
                      className="snap-input"
                      placeholder="Enter SnapLogic Version"
                      value={snapPack.snapVersion}
                      onChange={(e) =>
                        handleInputChange("snapVersion", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Source Version:</label>
                    <input
                      className="snap-input"
                      placeholder="Enter Source Version"
                      value={snapPack.sourceVersion}
                      onChange={(e) =>
                        handleInputChange("sourceVersion", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Last Enhancement Made:</label>
                    <input
                      className="snap-input"
                      placeholder="Enter Last Enhancement Made"
                      value={snapPack.lastEnhanceMade}
                      onChange={(e) =>
                        handleInputChange("lastEnhanceMade", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Aha Backlog Link:</label>
                    <input
                      className="snap-input"
                      placeholder="Enter Aha Backlog Link"
                      value={snapPack.AhaBacklogLink}
                      onChange={(e) =>
                        handleInputChange("AhaBacklogLink", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Current Work Items:</label>
                    <input
                      className="snap-input"
                      placeholder="Enter Current Work Items"
                      value={snapPack.currentWorkItems}
                      onChange={(e) =>
                        handleInputChange("currentWorkItems", e.target.value)
                      }
                    />
                  </div>

                  {snapPack.snaps.map((snap, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md bg-gray-50"
                    >
                      <h4 className="font-medium mb-2">
                        Snap #{index + 1} Details
                      </h4>
                      <input
                        className="snap-data-item"
                        placeholder="Enter Name"
                        value={snap.name}
                        onChange={(e) =>
                          updateSnapField(index, "name", e.target.value)
                        }
                      />
                      <input
                        className="snap-data-item"
                        placeholder="Enter Description"
                        value={snap.description}
                        onChange={(e) =>
                          updateSnapField(index, "description", e.target.value)
                        }
                      />
                      <input
                        className="snap-data-item"
                        placeholder="Enter Category"
                        value={snap.snapCategory}
                        onChange={(e) =>
                          updateSnapField(index, "snapCategory", e.target.value)
                        }
                      />
                      <input
                        className="snap-data-item"
                        placeholder="Enter Type"
                        value={snap.type}
                        onChange={(e) =>
                          updateSnapField(index, "type", e.target.value)
                        }
                      />
                      <input
                        className="snap-data-item"
                        placeholder="Enter Doc Link"
                        value={snap.docLink}
                        onChange={(e) =>
                          updateSnapField(index, "docLink", e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <Button variant="outline" onClick={addSnap}>
                    + Add Another Snap
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button className="ml-3" onClick={editData ? handleUpdateSnapPack : handleSubmit}>
                {editData ? "Update" : "Save"} Snap Pack
              </Button>
            </div>
          </div>
        </div>
        {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
      </React.Fragment>
    )
  );
};

export default AddSnapPackForm;
