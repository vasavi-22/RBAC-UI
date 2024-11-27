import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox, message } from "antd";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full access to all resources", permissions: { Read: true, Write: true, Delete: true } },
    { id: 2, name: "Editor", description: "Can edit content but cannot delete", permissions: { Read: true, Write: true, Delete: false } },
    { id: 3, name: "Viewer", description: "Can only view content", permissions: { Read: true, Write: false, Delete: false } },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

  const permissions = ["Read", "Write", "Delete"];

  const handleAddRole = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsModalVisible(true);
  };

  const handleDeleteRole = (role) => {
    Modal.confirm({
      title: "Are you sure you want to delete this role?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setRoles((prevRoles) => prevRoles.filter((r) => r.id !== role.id));
        message.success("Role deleted successfully");
      },
    });
  };

  const handlePermissionChange = (permission, value) => {
    const currentPermissions = form.getFieldValue("permissions") || {};
    form.setFieldsValue({
      permissions: {
        ...currentPermissions,
        [permission]: value,
      },
    });
  };

  const handleFormSubmit = (values) => {
    const roleData = {
      ...values,
      permissions: form.getFieldValue("permissions"),
    };

    if (editingRole) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === editingRole.id ? { ...role, ...roleData } : role
        )
      );
      message.success("Role updated successfully");
    } else {
      const newRole = {
        id: roles.length + 1,
        ...roleData,
      };
      setRoles((prevRoles) => [...prevRoles, newRole]);
      message.success("Role created successfully");
    }
    setIsModalVisible(false);
  };

  const roleColumns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Permissions",
      key: "permissions",
      render: (_, record) =>
        Object.entries(record.permissions)
          .filter(([, value]) => value)
          .map(([perm]) => perm)
          .join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEditRole(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteRole(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <Button type="primary" className="mb-4" onClick={handleAddRole}>
        Add Role
      </Button>
      <Table dataSource={roles} columns={roleColumns} rowKey="id" pagination={false} />

      <Modal
        title={editingRole ? "Edit Role" : "Add Role"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Please enter the role name" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>
          <Form.Item label="Permissions" name="permissions">
            <div>
              {permissions.map((permission) => (
                <Checkbox
                  key={permission}
                  checked={form.getFieldValue("permissions")?.[permission] || false}
                  onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                >
                  {permission}
                </Checkbox>
              ))}
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRole ? "Update Role" : "Create Role"}
            </Button>
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
