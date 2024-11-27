import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Mock API call to fetch roles
    const mockRoles = [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    ];
    setRoles(mockRoles);
  }, []);

  const columns = [
    { title: "Role", dataIndex: "name", key: "name" },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => permissions.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <Button type="primary" className="mb-4">
        Add Role
      </Button>
      <Table dataSource={roles} columns={columns} rowKey="id" />
    </div>
  );
};

export default RoleManagement;
