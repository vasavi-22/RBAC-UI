import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrash, faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      roles: ["Admin"],
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      roles: ["Editor", "Viewer"],
      status: "Inactive",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const handleAddUser = () => {
    setIsModalVisible(true);
    setEditingUser(null);
    form.resetFields();
  };

  const handleEditUser = (user) => {
    setIsModalVisible(true);
    setEditingUser(user);
    form.setFieldsValue(user);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    message.success("User deleted successfully");
  };

  const handleFormSubmit = (values) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
      message.success("User updated successfully");
    } else {
      const newUser = { id: users.length + 1, ...values };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      message.success("User added successfully");
    }
    setIsModalVisible(false);
  };

  const handleRoleChange = (userId, roles) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, roles } : user))
    );
    message.success("Roles updated successfully");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles, record) => (
        <Select
          mode="multiple"
          value={roles}
          onChange={(selectedRoles) =>
            handleRoleChange(record.id, selectedRoles)
          }
          style={{ width: "100%" }}
        >
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Editor">Editor</Select.Option>
          <Select.Option value="Viewer">Viewer</Select.Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tooltip title={status === "Active" ? "Active" : "Inactive"}>
          <FontAwesomeIcon
            icon={status === "Active" ? faCheckCircle : faTimesCircle}
            style={{
              color: status === "Active" ? "green" : "red",
              fontSize: "16px",
              marginLeft: "10px"
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Tooltip title="Edit">
            <Button type="link" onClick={() => handleEditUser(record)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              danger
              onClick={() => handleDeleteUser(record.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Button type="primary" className="mb-4" onClick={handleAddUser}>
        Add User
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 5, // Set the default number of records per page
          // pageSizeOptions: ["5", "10", "20"],  Customize the page size options
          // showSizeChanger: true, Allow changing the page size
        }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the user's name" },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the user's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Roles"
            name="roles"
            rules={[
              { required: true, message: "Please select at least one role" },
            ]}
          >
            <Select mode="multiple" placeholder="Select roles">
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Editor">Editor</Select.Option>
              <Select.Option value="Viewer">Viewer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-2">
              {editingUser ? "Update" : "Add"}
            </Button>
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
