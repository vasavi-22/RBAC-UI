# Role-Based Access Control (RBAC) UI

This project is a simple Role-Based Access Control (RBAC) User Interface built using React.js. It provides basic functionality for managing users, roles, and permissions, and serves as a prototype for a functional RBAC system.

## Features

## 1. User Management
- Add users with:
    - Name
    - Role
    - Status (defaults to "Active")
    - View a list of all users.
    - Delete users from the list.

## 2. Role Management
- Add new roles.
- View all roles in the system.
- Delete existing roles.

## 3. Permission Management
- Placeholder for future enhancements.

## 4. Responsive Design
- The UI is responsive and adapts to different screen sizes.

## Technologies Used
- Frontend framework : React.js

## Project Setup
### Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (comes with Node.js)

### Installation

- Clone the repository:
    - git clone https://github.com/vasavi-22/RBAC-UI.git

- Install dependencies:
    - npm install

- Start the development server:
    - npm start

- Open the project in your browser:
    - http://localhost:3000


## How to Use
### Adding Users
1. Enter the user name in the "Name" input field.
2. Enter the user email in the "Email" input field.
3. Select the user roles in the "Roles" field.
4. Select the user status (Active or Inactive) in the "Status" field.
5. Click "Add" to add the user to the list.

### Deleting Users
- Click the "Delete" button in the Actions column for the user you want to remove.

### Editing Users
- Click the "Edit" button in the Actions column for editing the existing user in the table.

### Adding Roles
- Enter the role name in the "Role Name" input field.
- Provide the description for the role.
- Assign permissions (Read, Write, Delete) for the corresponding role.
- Click "Create Role" to add the role to the list.

### Deleting Roles
- Click the "Delete" button in the Actions column for the role you want to remove.

### Editing Roles
- Click the "Edit" button in the Actions column for editing the existing role.

## Permission Matrix 
- Used a matrix/table format for assigning permissions (e.g., checkboxes) dynamically.
- Columns: Permissions (Read, Write, Delete)
- Rows: Roles

