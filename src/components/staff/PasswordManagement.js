import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Card, CardContent, Alert, InputAdornment, IconButton, Divider, } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
const PasswordManagement = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChangePassword = () => {
        // Reset messages
        setError("");
        setSuccess("");
        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long");
            return;
        }
        // In a real app, this would send data to an API to change the password
        console.log("Changing password:", { currentPassword, newPassword });
        // Simulate success
        setSuccess("Password changed successfully");
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Password Management" }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Change Your Password" }), error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), success && (_jsx(Alert, { severity: "success", sx: { mb: 2 }, children: success })), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Current Password", type: showCurrentPassword ? "text" : "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), InputProps: {
                                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(LockIcon, {}) })),
                                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowCurrentPassword, onMouseDown: handleMouseDownPassword, edge: "end", children: showCurrentPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                    } }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "New Password", type: showNewPassword ? "text" : "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), InputProps: {
                                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(LockIcon, {}) })),
                                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowNewPassword, onMouseDown: handleMouseDownPassword, edge: "end", children: showNewPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                    } }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Confirm New Password", type: showConfirmPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), InputProps: {
                                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(LockIcon, {}) })),
                                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowConfirmPassword, onMouseDown: handleMouseDownPassword, edge: "end", children: showConfirmPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                    } }), _jsx(Box, { sx: { mt: 3 }, children: _jsx(Button, { variant: "contained", color: "primary", fullWidth: true, onClick: handleChangePassword, children: "Change Password" }) })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 2 }, children: [_jsx(SecurityIcon, { color: "primary", sx: { fontSize: 40, mr: 2 } }), _jsx(Typography, { variant: "h6", children: "Password Security Tips" })] }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(Typography, { variant: "body1", paragraph: true, children: "Strong passwords are essential for keeping your account secure. Follow these guidelines:" }), _jsxs(Box, { component: "ul", sx: { pl: 2 }, children: [_jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: "Use at least 8 characters, including uppercase and lowercase letters" }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: "Include numbers and special characters (e.g., @, #, $, %)" }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: "Avoid using easily guessable information like birthdays or names" }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: "Don't reuse passwords across different websites or services" }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: "Change your password regularly, at least every 90 days" }) })] }), _jsx(Alert, { severity: "info", sx: { mt: 2 }, children: "Remember: Museum staff should never share their passwords with anyone, including other staff members or administrators." })] }) }) })] })] }));
};
export default PasswordManagement;
