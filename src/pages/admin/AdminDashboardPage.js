import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AdminDashboard from "@/components/admin/AdminDashboard"; // Adjust path as needed
import { UserRole } from "@/lib/types"; // Adjust path as needed
const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [adminUser, setAdminUser] = useState(null);
    useEffect(() => {
        // Check for admin authentication
        const storedUser = localStorage.getItem("adminUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.role === UserRole.ADMIN) {
                setAdminUser(user);
            }
            else {
                navigate("/admin/login");
            }
        }
        else {
            navigate("/admin/login");
        }
        setLoading(false);
    }, [navigate]);
    if (loading) {
        return (_jsx(Box, { sx: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }, children: _jsx(CircularProgress, {}) }));
    }
    if (!adminUser) {
        return null;
    }
    return _jsx(AdminDashboard, {});
};
export default AdminDashboardPage;
