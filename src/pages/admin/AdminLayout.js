import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom"; // Import Outlet
const AdminLayout = ({ children }) => {
    return (_jsxs(Box, { sx: { display: "flex", flexDirection: "column", minHeight: "100vh" }, children: [_jsx(Header, {}), _jsxs(Box, { component: "main", sx: { flexGrow: 1, pt: 10 }, children: [children, _jsx(Outlet, {}), " "] })] }));
};
export default AdminLayout;
