import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import TicketManagement from "./TicketManagement";
import EventManagement from "./EventManagement";
import UserManagement from "./UserManagement";
import NotificationManagement from "./NotificationManagement";
import ReportManagement from "./ReportManagement";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, id: `admin-tabpanel-${index}`, "aria-labelledby": `admin-tab-${index}`, ...other, children: value === index && _jsx(Box, { sx: { p: 3 }, children: children }) }));
}
function a11yProps(index) {
    return {
        id: `admin-tab-${index}`,
        "aria-controls": `admin-tabpanel-${index}`,
    };
}
const AdminDashboard = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (_jsxs(Box, { sx: { width: "100%", bgcolor: "background.paper" }, children: [_jsx(Paper, { elevation: 3, sx: { mb: 3 }, children: _jsx(Box, { sx: { borderBottom: 1, borderColor: "divider" }, children: _jsxs(Tabs, { value: value, onChange: handleChange, "aria-label": "admin dashboard tabs", variant: "scrollable", scrollButtons: "auto", children: [_jsx(Tab, { label: "Ticket Management", ...a11yProps(0) }), _jsx(Tab, { label: "Event Management", ...a11yProps(1) }), _jsx(Tab, { label: "User Management", ...a11yProps(2) }), _jsx(Tab, { label: "Notification Management", ...a11yProps(3) }), _jsx(Tab, { label: "Report Management", ...a11yProps(4) })] }) }) }), _jsx(TabPanel, { value: value, index: 0, children: _jsx(TicketManagement, {}) }), _jsx(TabPanel, { value: value, index: 1, children: _jsx(EventManagement, {}) }), _jsx(TabPanel, { value: value, index: 2, children: _jsx(UserManagement, {}) }), _jsx(TabPanel, { value: value, index: 3, children: _jsx(NotificationManagement, {}) }), _jsx(TabPanel, { value: value, index: 4, children: _jsx(ReportManagement, {}) })] }));
};
export default AdminDashboard;
