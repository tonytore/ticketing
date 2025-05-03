import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom"; // Import Outlet

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        <Outlet /> {/* Only use Outlet to render nested route content */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
