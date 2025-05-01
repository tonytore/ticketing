import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Chip, Card, CardContent, Avatar, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import { mockUsers, mockStaff, mockTourists } from "@/lib/mockData";
import { UserRole, UserStatus } from "@/lib/types";
const UserManagement = () => {
    const [users, setUsers] = useState(mockUsers);
    const [openDialog, setOpenDialog] = useState(false);
    const [openResetDialog, setOpenResetDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: UserRole.STAFF,
        status: UserStatus.ACTIVE,
        department: "",
        nationality: "",
        preferences: [],
    });
    const handleTabChange = (tabIndex) => {
        setCurrentTab(tabIndex);
    };
    const handleOpenDialog = (user) => {
        if (user) {
            setSelectedUser(user);
            const userData = {
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            };
            if (user.role === UserRole.STAFF) {
                const staffUser = mockStaff.find((staff) => staff.id === user.id);
                if (staffUser) {
                    userData.department = staffUser.department;
                }
            }
            else if (user.role === UserRole.TOURIST) {
                const touristUser = mockTourists.find((tourist) => tourist.id === user.id);
                if (touristUser) {
                    userData.nationality = touristUser.nationality;
                    userData.preferences = touristUser.preferences;
                }
            }
            setFormData(userData);
        }
        else {
            setSelectedUser(null);
            setFormData({
                name: "",
                email: "",
                password: "",
                role: UserRole.STAFF,
                status: UserStatus.ACTIVE,
                department: "",
                nationality: "",
                preferences: [],
            });
        }
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenResetDialog = (user) => {
        setSelectedUser(user);
        setOpenResetDialog(true);
    };
    const handleCloseResetDialog = () => {
        setOpenResetDialog(false);
    };
    const handleFormChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handleSaveUser = () => {
        // In a real app, this would send data to an API
        console.log("Saving user:", formData);
        if (selectedUser) {
            setUsers(users.map((user) => user.id === selectedUser.id
                ? {
                    ...user,
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status,
                    updatedAt: new Date(),
                }
                : user));
        }
        else {
            const newUser = {
                id: (users.length + 1).toString(),
                name: formData.name,
                email: formData.email,
                password: formData.password, // Password should be defined for new users
                role: formData.role,
                status: formData.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setUsers([...users, newUser]);
        }
        handleCloseDialog();
    };
    const handleResetPassword = () => {
        // In a real app, this would send a password reset email
        console.log("Resetting password for user:", selectedUser?.id);
        handleCloseResetDialog();
    };
    const handleToggleStatus = (user) => {
        const newStatus = user.status === UserStatus.ACTIVE
            ? UserStatus.DISABLED
            : UserStatus.ACTIVE;
        const updatedUsers = users.map((u) => u.id === user.id ? { ...u, status: newStatus, updatedAt: new Date() } : u);
        setUsers(updatedUsers);
    };
    const handleDeleteUser = (userId) => {
        // In a real app, consider disabling instead of deleting
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    };
    const filteredUsers = users.filter((user) => {
        if (currentTab === 0)
            return true;
        if (currentTab === 1)
            return user.role === UserRole.ADMIN;
        if (currentTab === 2)
            return user.role === UserRole.STAFF;
        if (currentTab === 3)
            return user.role === UserRole.TOURIST;
        return true;
    });
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mb: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "User Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(PersonAddIcon, {}), onClick: () => handleOpenDialog(), children: "Add User" })] }), _jsx(Paper, { sx: { width: "100%", mb: 4 }, children: _jsx(Box, { sx: { borderBottom: 1, borderColor: "divider", p: 1 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 0 ? "contained" : "outlined", onClick: () => handleTabChange(0), children: "All Users" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 1 ? "contained" : "outlined", onClick: () => handleTabChange(1), startIcon: _jsx(AdminPanelSettingsIcon, {}), children: "Admins" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 2 ? "contained" : "outlined", onClick: () => handleTabChange(2), startIcon: _jsx(BadgeIcon, {}), children: "Staff" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 3 ? "contained" : "outlined", onClick: () => handleTabChange(3), startIcon: _jsx(PersonIcon, {}), children: "Tourists" }) })] }) }) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Users" }), _jsx(Typography, { variant: "h3", children: users.length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Admins" }), _jsx(Typography, { variant: "h3", children: users.filter((user) => user.role === UserRole.ADMIN).length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Staff" }), _jsx(Typography, { variant: "h3", children: users.filter((user) => user.role === UserRole.STAFF).length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Tourists" }), _jsx(Typography, { variant: "h3", children: users.filter((user) => user.role === UserRole.TOURIST).length })] }) }) })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "users table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "Role" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { children: "Created" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: filteredUsers.map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: user.id }), _jsx(TableCell, { children: _jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(Avatar, { sx: {
                                                        mr: 2,
                                                        bgcolor: user.role === UserRole.ADMIN
                                                            ? "error.main"
                                                            : user.role === UserRole.STAFF
                                                                ? "primary.main"
                                                                : "success.main",
                                                    }, children: user.name.charAt(0) }), user.name] }) }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: _jsx(Chip, { label: user.role, color: user.role === UserRole.ADMIN
                                                ? "error"
                                                : user.role === UserRole.STAFF
                                                    ? "primary"
                                                    : "success", size: "small", icon: user.role === UserRole.ADMIN ? (_jsx(AdminPanelSettingsIcon, {})) : user.role === UserRole.STAFF ? (_jsx(BadgeIcon, {})) : (_jsx(PersonIcon, {})) }) }), _jsx(TableCell, { children: _jsx(Chip, { label: user.status, color: user.status === UserStatus.ACTIVE ? "success" : "error", size: "small" }) }), _jsx(TableCell, { children: new Date(user.createdAt).toLocaleDateString() }), _jsxs(TableCell, { children: [_jsx(IconButton, { size: "small", color: "primary", onClick: () => handleOpenDialog(user), children: _jsx(EditIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: user.status === UserStatus.ACTIVE ? "error" : "success", onClick: () => handleToggleStatus(user), children: user.status === UserStatus.ACTIVE ? (_jsx(LockIcon, { fontSize: "small" })) : (_jsx(LockOpenIcon, { fontSize: "small" })) }), _jsx(IconButton, { size: "small", color: "primary", onClick: () => handleOpenResetDialog(user), children: _jsx(LockIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "error", onClick: () => handleDeleteUser(user.id), children: _jsx(DeleteIcon, { fontSize: "small" }) })] })] }, user.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: selectedUser ? "Edit User" : "Create New User" }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 3, sx: { mt: 0 }, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Name", value: formData.name, onChange: (e) => handleFormChange("name", e.target.value) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Email", type: "email", value: formData.email, onChange: (e) => handleFormChange("email", e.target.value) }) }), !selectedUser && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Password", type: "password", value: formData.password, onChange: (e) => handleFormChange("password", e.target.value) }) })), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "user-role-label", children: "Role" }), _jsxs(Select, { labelId: "user-role-label", value: formData.role, label: "Role", onChange: (e) => handleFormChange("role", e.target.value), children: [_jsx(MenuItem, { value: UserRole.ADMIN, children: "Admin" }), _jsx(MenuItem, { value: UserRole.STAFF, children: "Staff" }), _jsx(MenuItem, { value: UserRole.TOURIST, children: "Tourist" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "user-status-label", children: "Status" }), _jsxs(Select, { labelId: "user-status-label", value: formData.status, label: "Status", onChange: (e) => handleFormChange("status", e.target.value), children: [_jsx(MenuItem, { value: UserStatus.ACTIVE, children: "Active" }), _jsx(MenuItem, { value: UserStatus.DISABLED, children: "Disabled" })] })] }) }), formData.role === UserRole.STAFF && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Department", value: formData.department || "", onChange: (e) => handleFormChange("department", e.target.value) }) })), formData.role === UserRole.TOURIST && (_jsx(_Fragment, { children: _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "tourist-nationality-label", children: "Nationality" }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Nationality", value: formData.nationality || "", onChange: (e) => handleFormChange("nationality", e.target.value) })] }) }) }))] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDialog, children: "Cancel" }), _jsx(Button, { onClick: handleSaveUser, variant: "contained", children: "Save" })] })] }), _jsxs(Dialog, { open: openResetDialog, onClose: handleCloseResetDialog, children: [_jsx(DialogTitle, { children: "Reset Password" }), _jsxs(DialogContent, { children: [_jsxs(Typography, { children: ["Are you sure you want to reset the password for ", selectedUser?.name, "?"] }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 2 }, children: "This will generate a new temporary password and send it to the user's email." })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseResetDialog, children: "Cancel" }), _jsx(Button, { onClick: handleResetPassword, variant: "contained", color: "primary", children: "Reset Password" })] })] })] }));
};
export default UserManagement;
