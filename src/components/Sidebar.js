import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faUserGear} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-xl fixed">
      <h2 className="text-xl font-bold p-4 border-b">
        <Link to="/">RBAC UI</Link>
      </h2>
      <nav className="p-0">
        <ul>
          <li className="p-4 hover:bg-blue-500 group">
            <Link to="/users" className="text-blue-500 group-hover:text-white">
              <FontAwesomeIcon icon={faUserGroup} className="mr-2"/> User Management
            </Link>
          </li>
          <li className="p-4 hover:bg-blue-500 group">
            <Link to="/roles" className="text-blue-500 group-hover:text-white">
              <FontAwesomeIcon icon={faUserGear} className="mr-2"/> Role Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
