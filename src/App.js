import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-6 bg-gray-100">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
