import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AdminDashboard from "@/components/admin/AdminDashboard"; // Adjust path as needed
import { User, UserRole } from "@/lib/types"; // Adjust path as needed

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for admin authentication
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.role === UserRole.ADMIN) {
        setAdminUser(user);
      } else {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!adminUser) {
    return null;
  }

  return <AdminDashboard />;
};

export default AdminDashboardPage;
