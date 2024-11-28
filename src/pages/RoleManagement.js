import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  Checkbox,
  Input,
  Select,
  Button,
  Modal,
  Form,
  message,
  Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [auditLogs, setAuditLogs] = useState([]);

  const addAuditLog = (actor, action) => {
    const timestamp = new Date().toLocaleString();
    const newLog = { timestamp, actor, action };
    setAuditLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const modalTriggerRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isModalVisible && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isModalVisible]);

  const handleFilterChange = (value) => {
    setSelectedPermissions(value || []);
  };

  const filteredRoles = roles.filter(
    (role) =>
      selectedPermissions.length === 0 ||
      selectedPermissions.every((perm) => role.permissions.includes(perm))
  );

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
        addAuditLog("Admin", `Deleted role: ${role.name}`);
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
      addAuditLog("Admin", `Updated role: ${editingRole.name}`);
      message.success("Role updated successfully");
    } else {
      const newRole = {
        id: roles.length + 1,
        ...roleData,
      };
      setRoles((prevRoles) => [...prevRoles, newRole]);
      addAuditLog("Admin", `Added new role: ${roleData.name}`);
      message.success("Role created successfully");
    }
    if (modalTriggerRef.current) modalTriggerRef.current.focus();
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
          aria-label={`Permission ${permission} for ${record.name}`}
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
            <Button type="link" aria-label={`Edit role ${record.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleEditRole(record);
                  e.preventDefault();
                }
              }}
              onClick={() => handleEditRole(record)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="link" danger aria-label={`Delete role ${record.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleDeleteRole(record);
                  e.preventDefault();
                }
              }}
              onClick={() => handleDeleteRole(record)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const auditLogColumns = [
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
    { title: "Actor", dataIndex: "actor", key: "actor" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <Select
        mode="multiple"
        allowClear
        placeholder="Filter by permissions"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={handleFilterChange}
        aria-label="Filter roles by permissions"
      >
        {availablePermissions.map((permission) => (
          <Select.Option key={permission} value={permission}>
            {permission}
          </Select.Option>
        ))}
      </Select>

      <Button type="primary" className="mb-4" onClick={handleAddRole} aria-label="Add a new role" ref={modalTriggerRef}>
        Add Role
      </Button>
      <Table
        dataSource={filteredRoles}
        columns={columns}
        rowKey="id"
        pagination={false}
        aria-label="Roles table"
      />

      <Modal
        title={editingRole ? "Edit Role" : "Add Role"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          if (modalTriggerRef.current) modalTriggerRef.current.focus();
        }}
        footer={null}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Please enter the role name" }]}
          >
            <Input placeholder="Enter role name" ref={firstInputRef} aria-label="Role name input" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Enter description" aria-label="Role description input"/>
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

      <h2 className="text-xl font-bold mt-12 mb-4">Audit Logs</h2>
      <Table
        dataSource={auditLogs}
        columns={auditLogColumns}
        rowKey="timestamp"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default RoleManagement;
