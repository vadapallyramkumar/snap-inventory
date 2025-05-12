import React from "react";
import Logo from "../../src/assets/snaplogic.svg";
import Profile from "../../src/assets/profile.png";

const Sidebar = ({ menuItems, activeItem, setActiveItem, isAdmin }) => {
  return (
    <div className="w-64 bg-background text-white h-screen flex flex-col">
      <div className="text-2xl font-bold p-6">
        <img src={Logo} alt="Snaplogic" className="w-10/12	" />
      </div>
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <div
            onClick={() => setActiveItem(index)}
            key={index}
            className={`${activeItem === index ? "bg-active" : "bg-background"}
            flex items-center px-6 py-3 hover:text-gray-400 hover:bg-active
            hover:cursor-pointer`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </div>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8">
            <img src={Profile} alt="Profile Icon" />
          </div>
          <div className="ml-3">
            <label className="block font-medium">Sasha Merkel</label>
            {isAdmin ? (
              <span className="block text-sm text-sky">Admin</span>
            ) : (
              <span className="block text-sm text-sky">Member</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
