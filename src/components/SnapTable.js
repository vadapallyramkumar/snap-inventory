import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import loader from "../assets/loader.gif";
import "../App.css";
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';


const columnHelper = createColumnHelper();

const SnapTable = ({ data, isAdmin, deleteSnapPack, loading, onEdit, onSnapSelect, deleteSnap, onEditSnap }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");

  const filteredData = useMemo(() => {
    return typeFilter ? data.filter((row) => row.type === typeFilter) : data;
  }, [data, typeFilter]);

  const columns = [
    columnHelper.accessor("snapPack", {
      header: "Snap Pack",
      cell: (info) => {
        const rowId = info.row.id;
        const isExpanded = expandedRowId === rowId;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px" }}>{isExpanded ? "▼" : "▶"}</span>
            <span>{info.getValue()}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("type", {
      header: () => (
        <div>
          <div>Type</div>
          {/* <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ marginTop: "4px", fontSize: "12px" }}
          >
            <option value="">All</option>
            <option value="Public">Public</option>
            <option value="Premium">Premium</option>
          </select> */}
        </div>
      ),
      cell: (info) => info.getValue(),
      enableResizing: true,
      size: 200,
    }),
    columnHelper.accessor("snapPricingCategory", {
      header: "Pricing Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("docLink", {
      header: "Doc Link",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("noOfSnaps", {
      header: "No Of Snaps",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("snapVersion", {
      header: "Snaplogic Version",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sourceVersion", {
      header: "Source Version",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastEnhanceMade", {
      header: "Last Enhancement Made",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("AhaBacklogLink", {
      header: "Aha Backlog Link",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("currentWorkItems", {
      header: "Current Work Items",
      cell: (info) => info.getValue(),
    }),
    ...(isAdmin
      ? [
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row.original);
                  }}
                  title="Edit Snap Pack"
                >
                  <PencilIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSnapPack(row.original._id);
                  }}
                  title="Delete Snap Pack"
                >
                  <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
                </button>
              </div>
            ),
          }),
        ]
      : []),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  const toggleExpand = (rowId) => {
    setExpandedRowId((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }} className="overflow-x-auto">
        {loading ? (
          <div className="loader">
            <img src={loader} alt="Loader" />
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }} className="min-w-[1000px] w-full table-fixed border border-gray-200 rounded-md shadow-sm text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide sticky top-0 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} style={{ background: "#f0f0f0" }}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        position: "relative",
                        width: header.getSize(),
                      }}
                      className="px-4 py-3 border border-gray-200 text-left w-40 truncate"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="divider"
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            height: "100%",
                            width: "5px",
                            cursor: "col-resize",
                            userSelect: "none",
                            touchAction: "none",
                          }}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => {
                const rowData = row.original;
                const isExpanded = expandedRowId === row.id;
                return (
                  <React.Fragment key={row.id}>
                    <tr
                      className="clickable-row hover:bg-gray-50 transition-colors even:bg-gray-50 odd:bg-white"
                      onClick={() => toggleExpand(row.id)}
                      style={{
                        backgroundColor: isExpanded ? "#f9f9f9" : "white",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{ padding: "10px", border: "1px solid #ddd" }}
                          className="w-40 px-4 py-2 border border-gray-100 truncate"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="p-4 bg-gray-50"
                        >
                          <div className="overflow-x-auto">
                            <table
                              className="min-w-full table-fixed border"
                            >
                              <thead>
                                <tr style={{ background: "#eaeaea" }}>
                                  <th
                                    style={{
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    Description
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    Category
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    Docs
                                  </th>
                                  {
                                    isAdmin ? <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                                    Actions
                                  </th> : ''
                                  }
                                </tr>
                              </thead>
                              <tbody>
                                {(rowData.snaps || []).map((snap, idx) => (
                                  <tr key={idx} onClick={() => onSnapSelect(snap)} className="clickable-row">
                                    <td
                                      style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    >
                                      {snap.name}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        width: "700px",
                                      }}
                                    >
                                      {snap.description}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    >
                                      {snap.type}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    >
                                      {snap.snapCategory}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    >
                                      <a
                                        href={snap.docLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        View Docs
                                      </a>
                                    </td>
                                    {
                                      isAdmin ? <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onEditSnap(rowData._id, snap);
                                          }}
                                          title="Edit Snap"
                                        >
                                          <PencilIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSnap(row.original._id, snap._id);
                                          }}
                                          title="Delete Snap"
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
                                        </button>
                                      </div>
                                    </td> : ''
                                    }
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default SnapTable;
