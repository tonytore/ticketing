import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Container, Paper, Typography, TextField, Button, Alert, InputAdornment, IconButton, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { mockUsers } from "@/lib/mockData"; // Assuming this path is correct
import { UserRole } from "@/lib/types"; // Assuming this path is correct
const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        // Find user with matching credentials
        const user = mockUsers.find((u) => u.email === email &&
            u.password === password &&
            u.role === UserRole.ADMIN);
        if (user) {
            // In a real app, you would set authentication tokens here
            localStorage.setItem("adminUser", JSON.stringify(user));
            navigate("/admin/dashboard");
        }
        else {
            setError("Invalid email or password");
        }
    };
    return (_jsx(Container, { maxWidth: "sm", children: _jsx(Box, { sx: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }, children: _jsxs(Paper, { elevation: 3, sx: {
                    p: 4,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }, children: [_jsx(Typography, { variant: "h4", component: "h1", align: "center", gutterBottom: true, children: "Admin Login" }), error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), _jsxs("form", { onSubmit: handleLogin, children: [_jsx(TextField, { fullWidth: true, label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, margin: "normal", InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(EmailIcon, {}) })),
                                } }), _jsx(TextField, { fullWidth: true, label: "Password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, margin: "normal", InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(LockIcon, {}) })),
                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => setShowPassword(!showPassword), edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                } }), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, size: "large", sx: { mt: 3 }, children: "Login" })] })] }) }) }));
};
export default AdminLoginPage;
