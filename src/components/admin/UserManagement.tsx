import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Chip,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";

import { mockUsers, mockStaff, mockTourists } from "@/lib/mockData";
import { User, UserRole, UserStatus } from "@/lib/types";

interface UserFormData {
  name: string;
  email: string;
  password?: string; // Password is optional for editing
  role: UserRole;
  status: UserStatus;
  department?: string; // For Staff
  nationality?: string; // For Tourist
  preferences?: string[]; // For Tourist (assuming this is how you handle preferences)
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: UserRole.STAFF,
    status: UserStatus.ACTIVE,
    department: "",
    nationality: "",
    preferences: [],
  });

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      const userData: UserFormData = {
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
      } else if (user.role === UserRole.TOURIST) {
        const touristUser = mockTourists.find(
          (tourist) => tourist.id === user.id
        );
        if (touristUser) {
          userData.nationality = touristUser.nationality;
          userData.preferences = touristUser.preferences;
        }
      }
      setFormData(userData);
    } else {
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

  const handleOpenResetDialog = (user: User) => {
    setSelectedUser(user);
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
  };

  const handleFormChange = (field: keyof UserFormData, value: unknown) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveUser = () => {
    // In a real app, this would send data to an API
    console.log("Saving user:", formData);

    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
                updatedAt: new Date(),
              }
            : user
        )
      );
    } else {
      const newUser: User = {
        id: (users.length + 1).toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password!, // Password should be defined for new users
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

  const handleToggleStatus = (user: User) => {
    const newStatus =
      user.status === UserStatus.ACTIVE
        ? UserStatus.DISABLED
        : UserStatus.ACTIVE;
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus, updatedAt: new Date() } : u
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, consider disabling instead of deleting
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) => {
    if (currentTab === 0) return true;
    if (currentTab === 1) return user.role === UserRole.ADMIN;
    if (currentTab === 2) return user.role === UserRole.STAFF;
    if (currentTab === 3) return user.role === UserRole.TOURIST;
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant={currentTab === 0 ? "contained" : "outlined"}
                onClick={() => handleTabChange(0)}
              >
                All Users
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 1 ? "contained" : "outlined"}
                onClick={() => handleTabChange(1)}
                startIcon={<AdminPanelSettingsIcon />}
              >
                Admins
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 2 ? "contained" : "outlined"}
                onClick={() => handleTabChange(2)}
                startIcon={<BadgeIcon />}
              >
                Staff
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 3 ? "contained" : "outlined"}
                onClick={() => handleTabChange(3)}
                startIcon={<PersonIcon />}
              >
                Tourists
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Admins
              </Typography>
              <Typography variant="h3">
                {users.filter((user) => user.role === UserRole.ADMIN).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staff
              </Typography>
              <Typography variant="h3">
                {users.filter((user) => user.role === UserRole.STAFF).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tourists
              </Typography>
              <Typography variant="h3">
                {users.filter((user) => user.role === UserRole.TOURIST).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor:
                          user.role === UserRole.ADMIN
                            ? "error.main"
                            : user.role === UserRole.STAFF
                            ? "primary.main"
                            : "success.main",
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={
                      user.role === UserRole.ADMIN
                        ? "error"
                        : user.role === UserRole.STAFF
                        ? "primary"
                        : "success"
                    }
                    size="small"
                    icon={
                      user.role === UserRole.ADMIN ? (
                        <AdminPanelSettingsIcon />
                      ) : user.role === UserRole.STAFF ? (
                        <BadgeIcon />
                      ) : (
                        <PersonIcon />
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={
                      user.status === UserStatus.ACTIVE ? "success" : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color={
                      user.status === UserStatus.ACTIVE ? "error" : "success"
                    }
                    onClick={() => handleToggleStatus(user)}
                  >
                    {user.status === UserStatus.ACTIVE ? (
                      <LockIcon fontSize="small" />
                    ) : (
                      <LockOpenIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenResetDialog(user)}
                  >
                    <LockIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit User Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? "Edit User" : "Create New User"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
            </Grid>
            {!selectedUser && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-role-label">Role</InputLabel>
                <Select
                  labelId="user-role-label"
                  value={formData.role}
                  label="Role"
                  onChange={(e) => handleFormChange("role", e.target.value)}
                >
                  <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                  <MenuItem value={UserRole.STAFF}>Staff</MenuItem>
                  <MenuItem value={UserRole.TOURIST}>Tourist</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-status-label">Status</InputLabel>
                <Select
                  labelId="user-status-label"
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleFormChange("status", e.target.value)}
                >
                  <MenuItem value={UserStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={UserStatus.DISABLED}>Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Role-specific fields */}
            {formData.role === UserRole.STAFF && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Department"
                  value={formData.department || ""}
                  onChange={(e) =>
                    handleFormChange("department", e.target.value)
                  }
                />
              </Grid>
            )}

            {formData.role === UserRole.TOURIST && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="tourist-nationality-label">
                      Nationality
                    </InputLabel>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Nationality"
                      value={formData.nationality || ""}
                      onChange={(e) =>
                        handleFormChange("nationality", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                {/* You can add more Tourist-specific fields here based on your requirements */}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset the password for {selectedUser?.name}
            ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This will generate a new temporary password and send it to the
            user's email.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
