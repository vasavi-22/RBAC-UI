import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md fixed">
      <h2 className="text-xl font-bold p-4 border-b">RBAC UI</h2>
      <nav className="p-4">
        <ul>
          <li className="mb-4">
            <Link to="/users" className="text-blue-600 hover:underline">
              User Management
            </Link>
          </li>
          <li>
            <Link to="/roles" className="text-blue-600 hover:underline">
              Role Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
