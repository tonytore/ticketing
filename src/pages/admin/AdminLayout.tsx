import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        {children}
        <Outlet /> {/* Render nested route content here */}
      </Box>
    </Box>
  );
};
export default AdminLayout;
