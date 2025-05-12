# SnapLogic Snap Inventory Manager

A full-stack application to manage SnapLogic Snap Packs and their associated snaps. Built using **React**, **Express (Node.js)**, and **MongoDB (Mongoose)**.

## Features

- 🔍 View Snap Packs and their individual Snaps
- ➕ Add new Snap Packs and Snaps
- 📝 Edit Snap Packs and Snaps
- ❌ Delete Snap Packs and individual Snaps
- 🔍 Search and filter Snap Packs
- 👤 Admin-only edit/delete access
- 📜 Expandable rows for detailed Snap information

## Tech Stack

- **Frontend**: React, Tailwind CSS, @tanstack/react-table
- **Backend**: Express.js, Node.js
- **Database**: MongoDB (Mongoose)

## Folder Structure
project-root/
│
├── client/ # React frontend app
│ ├── src/
│ │ ├── components/ # UI components (SnapTable, AddSnapPackForm, etc.)
│ │ ├── data/ # API methods (fetch, post, update, delete)
│ │ └── App.js
├── .env # MongoDB URI & other secrets
├── README.md
└── package.json

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Atlas or local)
- npm or yarn

### 1. Clone the repo

```bash
git clone https://github.com/your-username/snaplogic-snap-manager.git
cd snaplogic-snap-manager

npm install

## API END POINTS

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/snapPacks`     | Get all Snap Packs     |
| POST   | `/api/snapPacks`     | Add a new Snap Pack    |
| PUT    | `/api/snapPacks/:id` | Update Snap Pack by ID |
| DELETE | `/api/snapPacks/:id` | Delete Snap Pack by ID |
