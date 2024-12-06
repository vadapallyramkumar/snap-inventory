import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Snaps from "./pages/Snaps";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/outline";

function App() {
  const [activeItem, setActiveItem] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdmin = searchParams.get("admin") === "true";

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "Snaps", icon: <ShoppingBagIcon className="h-6 w-6" /> },
  ];

  const components = [<Dashboard />, <Snaps isAdmin={isAdmin} />];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isAdmin={isAdmin}
      />
      <main className="bg-white my-5 rounded-lg flex-1 p-6 overflow-auto">
        {components[activeItem]}
      </main>
    </div>
  );
}

export default App;
