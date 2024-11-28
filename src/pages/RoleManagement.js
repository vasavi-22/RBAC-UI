import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Input,
  Button,
  Modal,
  Form,
  message,
  Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access to all resources",
      permissions: ["Read", "Write", "Delete"],
    },
    {
      id: 2,
      name: "Editor",
      description: "Can edit content but cannot delete",
      permissions: ["Read", "Write"],
    },
    {
      id: 3,
      name: "Viewer",
      description: "Can only view content",
      permissions: ["Read"],
    },
  ]);

  const [availablePermissions] = useState(["Read", "Write", "Delete"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

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

  const handlePermissionToggle = (roleId, permission) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(permission)
                ? role.permissions.filter((perm) => perm !== permission)
                : [...role.permissions, permission],
            }
          : role
      )
    );
    message.success("Permissions updated successfully!");
  };

  const handleDeleteRole = (role) => {
    Modal.confirm({
      title: "Are you sure you want to delete this role?",
      content: `Role: ${role.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setRoles((prevRoles) => prevRoles.filter((r) => r.id !== role.id));
        message.success("Role deleted successfully");
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

  const columns = [
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
    ...availablePermissions.map((permission) => ({
      title: permission,
      key: permission,
      render: (_, record) => (
        <Checkbox
          checked={record.permissions.includes(permission)}
          onChange={() => handlePermissionToggle(record.id, permission)}
        />
      ),
    })),
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Tooltip title="Edit">
            <Button type="link" onClick={() => handleEditRole(record)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="link" danger onClick={() => handleDeleteRole(record)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
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
      <Table
        dataSource={roles}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title={editingRole ? "Edit Role" : "Add Role"}
        open={isModalVisible}
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
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>
          <Form.Item label="Permissions" name="permissions">
            <Checkbox.Group>
              {availablePermissions.map((permission) => (
                <Checkbox
                  key={permission}
                  value={permission}
                  checked={
                    form.getFieldValue("permissions")?.[permission] || false
                  }
                  onChange={(e) =>
                    handlePermissionToggle(permission, e.target.checked)
                  }
                >
                  {permission}
                </Checkbox>
              ))}
            </Checkbox.Group>
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
