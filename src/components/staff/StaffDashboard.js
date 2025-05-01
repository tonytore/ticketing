import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import PasswordManagement from "./PasswordManagement";
import TicketCreation from "./TicketCreation";
import TicketValidation from "./TicketValidation";
import ReportGeneration from "./ReportGeneration";
import { useState } from "react";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, id: `staff-tabpanel-${index}`, "aria-labelledby": `staff-tab-${index}`, ...other, children: value === index && _jsx(Box, { sx: { p: 3 }, children: children }) }));
}
function a11yProps(index) {
    return {
        id: `staff-tab-${index}`,
        "aria-controls": `staff-tabpanel-${index}`,
    };
}
const StaffDashboard = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (_jsxs(Box, { sx: { width: "100%", bgcolor: "background.paper" }, children: [_jsx(Paper, { elevation: 3, sx: { mb: 3 }, children: _jsx(Box, { sx: { borderBottom: 1, borderColor: "divider" }, children: _jsxs(Tabs, { value: value, onChange: handleChange, "aria-label": "staff dashboard tabs", variant: "scrollable", scrollButtons: "auto", children: [_jsx(Tab, { label: "Password Management", ...a11yProps(0) }), _jsx(Tab, { label: "Ticket Creation", ...a11yProps(1) }), _jsx(Tab, { label: "Ticket Validation", ...a11yProps(2) }), _jsx(Tab, { label: "Report Generation", ...a11yProps(3) })] }) }) }), _jsx(TabPanel, { value: value, index: 0, children: _jsx(PasswordManagement, {}) }), _jsx(TabPanel, { value: value, index: 1, children: _jsx(TicketCreation, {}) }), _jsx(TabPanel, { value: value, index: 2, children: _jsx(TicketValidation, {}) }), _jsx(TabPanel, { value: value, index: 3, children: _jsx(ReportGeneration, {}) })] }));
};
export default StaffDashboard;
