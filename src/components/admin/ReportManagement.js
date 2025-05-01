import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Card, CardContent, Divider, Tabs, Tab, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import { mockReports } from "@/lib/mockData";
import { TicketType } from "@/lib/types";
const ReportManagement = () => {
    const [reports, setReports] = useState(mockReports);
    const [openDialog, setOpenDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        criteria: {
            startDate: new Date(new Date().setDate(1)), // First day of current month
            endDate: new Date(),
        },
        format: "pdf",
    });
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenViewDialog = (report) => {
        setSelectedReport(report);
        setOpenViewDialog(true);
    };
    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
    };
    const handleFormChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handleCriteriaChange = (field, value) => {
        setFormData({
            ...formData,
            criteria: {
                ...formData.criteria,
                [field]: value,
            },
        });
    };
    const handleGenerateReport = () => {
        // In a real app, this would send data to an API to generate the report
        console.log("Generating report:", formData);
        // Create new report
        const newReport = {
            id: (reports.length + 1).toString(),
            title: formData.title,
            criteria: { ...formData.criteria },
            generatedBy: "1", // Assuming admin ID is 1
            createdAt: new Date(),
            data: {
                // Mock data for demonstration
                totalSales: Math.floor(Math.random() * 100) + 50,
                regularTickets: Math.floor(Math.random() * 70) + 30,
                vipTickets: Math.floor(Math.random() * 30) + 20,
                revenue: {
                    local: Math.floor(Math.random() * 50000) + 10000,
                    usd: Math.floor(Math.random() * 1500) + 300,
                    pound: Math.floor(Math.random() * 1200) + 240,
                    euro: Math.floor(Math.random() * 1400) + 280,
                    yen: Math.floor(Math.random() * 200000) + 40000,
                },
            },
            format: formData.format,
        };
        setReports([...reports, newReport]);
        handleCloseDialog();
    };
    const handleDeleteReport = (reportId) => {
        // In a real app, this would send data to an API
        const updatedReports = reports.filter((report) => report.id !== reportId);
        setReports(updatedReports);
    };
    const handleExportReport = (report) => {
        // In a real app, this would generate and download the file
        console.log(`Exporting report ${report.id} in ${report.format} format`);
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mb: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Report Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: handleOpenDialog, children: "Generate New Report" })] }), _jsx(Paper, { sx: { width: "100%", mb: 4 }, children: _jsxs(Tabs, { value: currentTab, onChange: handleTabChange, "aria-label": "report tabs", children: [_jsx(Tab, { label: "All Reports" }), _jsx(Tab, { label: "Ticket Reports" }), _jsx(Tab, { label: "Event Reports" }), _jsx(Tab, { label: "Visitor Reports" })] }) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Reports" }), _jsx(Typography, { variant: "h3", children: reports.length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "PDF Reports" }), _jsx(Typography, { variant: "h3", children: reports.filter((report) => report.format === "pdf").length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Excel Reports" }), _jsx(Typography, { variant: "h3", children: reports.filter((report) => report.format === "excel").length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "This Month" }), _jsx(Typography, { variant: "h3", children: reports.filter((report) => {
                                            const reportDate = new Date(report.createdAt);
                                            const now = new Date();
                                            return (reportDate.getMonth() === now.getMonth() &&
                                                reportDate.getFullYear() === now.getFullYear());
                                        }).length })] }) }) })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "reports table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "Title" }), _jsx(TableCell, { children: "Date Range" }), _jsx(TableCell, { children: "Generated By" }), _jsx(TableCell, { children: "Created" }), _jsx(TableCell, { children: "Format" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: reports
                                .filter((report) => {
                                if (currentTab === 0)
                                    return true; // All reports
                                if (currentTab === 1)
                                    return report.title.toLowerCase().includes("ticket"); // Ticket reports
                                if (currentTab === 2)
                                    return report.title.toLowerCase().includes("event"); // Event reports
                                if (currentTab === 3)
                                    return report.title.toLowerCase().includes("visitor"); // Visitor reports
                                return true;
                            })
                                .map((report) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: report.id }), _jsx(TableCell, { children: report.title }), _jsx(TableCell, { children: report.criteria.startDate && report.criteria.endDate
                                            ? `${new Date(report.criteria.startDate).toLocaleDateString()} - ${new Date(report.criteria.endDate).toLocaleDateString()}`
                                            : "N/A" }), _jsx(TableCell, { children: "Admin" }), _jsx(TableCell, { children: new Date(report.createdAt).toLocaleDateString() }), _jsx(TableCell, { children: report.format === "pdf" ? (_jsx(PictureAsPdfIcon, { color: "error" })) : (_jsx(TableChartIcon, { color: "primary" })) }), _jsxs(TableCell, { children: [_jsx(IconButton, { size: "small", color: "primary", onClick: () => handleOpenViewDialog(report), children: _jsx(VisibilityIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "primary", onClick: () => handleExportReport(report), children: _jsx(DownloadIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "error", onClick: () => handleDeleteReport(report.id), children: _jsx(DeleteIcon, { fontSize: "small" }) })] })] }, report.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Generate New Report" }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 3, sx: { mt: 0 }, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Report Title", value: formData.title, onChange: (e) => handleFormChange("title", e.target.value) }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 }, children: "Report Criteria" }), _jsx(Divider, { sx: { mb: 2 } })] }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "Start Date", value: formData.criteria.startDate, onChange: (newValue) => handleCriteriaChange("startDate", newValue), slotProps: {
                                                textField: { fullWidth: true, margin: "normal" },
                                            } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "End Date", value: formData.criteria.endDate, onChange: (newValue) => handleCriteriaChange("endDate", newValue), slotProps: {
                                                textField: { fullWidth: true, margin: "normal" },
                                            } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "ticket-type-label", children: "Ticket Type" }), _jsxs(Select, { labelId: "ticket-type-label", value: formData.criteria.ticketType || "", label: "Ticket Type", onChange: (e) => handleCriteriaChange("ticketType", e.target.value), children: [_jsx(MenuItem, { value: "", children: "All Tickets" }), _jsx(MenuItem, { value: TicketType.REGULAR, children: "Regular Tickets" }), _jsx(MenuItem, { value: TicketType.VIP, children: "VIP Tickets" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "visitor-type-label", children: "Visitor Type" }), _jsxs(Select, { labelId: "visitor-type-label", value: formData.criteria.isLocal === undefined
                                                    ? ""
                                                    : formData.criteria.isLocal
                                                        ? "local"
                                                        : "nonlocal", label: "Visitor Type", onChange: (e) => {
                                                    if (e.target.value === "") {
                                                        const newCriteria = { ...formData.criteria };
                                                        delete newCriteria.isLocal;
                                                        setFormData({
                                                            ...formData,
                                                            criteria: newCriteria,
                                                        });
                                                    }
                                                    else {
                                                        handleCriteriaChange("isLocal", e.target.value === "local");
                                                    }
                                                }, children: [_jsx(MenuItem, { value: "", children: "All Visitors" }), _jsx(MenuItem, { value: "local", children: "Local Visitors" }), _jsx(MenuItem, { value: "nonlocal", children: "Non-Local Visitors" })] })] }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 }, children: "Report Format" }), _jsx(Divider, { sx: { mb: 2 } })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormControl, { component: "fieldset", children: _jsxs(FormGroup, { row: true, children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: formData.format === "pdf", onChange: () => handleFormChange("format", "pdf"), icon: _jsx(PictureAsPdfIcon, {}), checkedIcon: _jsx(PictureAsPdfIcon, {}) }), label: "PDF" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: formData.format === "excel", onChange: () => handleFormChange("format", "excel"), icon: _jsx(TableChartIcon, {}), checkedIcon: _jsx(TableChartIcon, {}) }), label: "Excel" })] }) }) })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDialog, children: "Cancel" }), _jsx(Button, { onClick: handleGenerateReport, variant: "contained", children: "Generate Report" })] })] }), _jsx(Dialog, { open: openViewDialog, onClose: handleCloseViewDialog, maxWidth: "md", fullWidth: true, children: selectedReport && (_jsxs(_Fragment, { children: [_jsxs(DialogTitle, { children: ["Report Details", _jsx(IconButton, { "aria-label": "close", onClick: handleCloseViewDialog, sx: {
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                    }, children: _jsx(DeleteIcon, {}) })] }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: selectedReport.title }), _jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 2 }, children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mr: 1 }, children: ["Generated on", " ", new Date(selectedReport.createdAt).toLocaleDateString()] }), selectedReport.format === "pdf" ? (_jsx(PictureAsPdfIcon, { color: "error", fontSize: "small" })) : (_jsx(TableChartIcon, { color: "primary", fontSize: "small" }))] })] }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Accordion, { defaultExpanded: true, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1a-content", id: "panel1a-header", children: _jsx(Typography, { variant: "h6", children: "Report Criteria" }) }), _jsx(AccordionDetails, { children: _jsxs(Grid, { container: true, spacing: 2, children: [selectedReport.criteria.startDate &&
                                                                selectedReport.criteria.endDate && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Typography, { children: [_jsx("strong", { children: "Date Range:" }), " ", new Date(selectedReport.criteria.startDate).toLocaleDateString(), " ", "-", " ", new Date(selectedReport.criteria.endDate).toLocaleDateString()] }) })), selectedReport.criteria.ticketType && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Typography, { children: [_jsx("strong", { children: "Ticket Type:" }), " ", selectedReport.criteria.ticketType] }) })), selectedReport.criteria.eventId && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Typography, { children: [_jsx("strong", { children: "Event ID:" }), " ", selectedReport.criteria.eventId] }) })), selectedReport.criteria.isLocal !== undefined && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Typography, { children: [_jsx("strong", { children: "Visitor Type:" }), " ", selectedReport.criteria.isLocal
                                                                            ? "Local"
                                                                            : "Non-Local"] }) }))] }) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Accordion, { defaultExpanded: true, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel2a-content", id: "panel2a-header", children: _jsx(Typography, { variant: "h6", children: "Report Data" }) }), _jsx(AccordionDetails, { children: selectedReport.data && (_jsxs(Grid, { container: true, spacing: 3, children: [selectedReport.data.totalSales !== undefined && (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Sales" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.totalSales })] }) }) })), selectedReport.data.regularTickets !== undefined && (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Regular Tickets" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.regularTickets })] }) }) })), selectedReport.data.vipTickets !== undefined && (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "VIP Tickets" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.vipTickets })] }) }) })), selectedReport.data.revenue && (_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 }, children: "Revenue" }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Currency" }), _jsx(TableCell, { align: "right", children: "Amount" })] }) }), _jsx(TableBody, { children: Object.entries(selectedReport.data.revenue).map(([currency, amount]) => (_jsxs(TableRow, { children: [_jsx(TableCell, { component: "th", scope: "row", children: currency.charAt(0).toUpperCase() +
                                                                                                    currency.slice(1) }), _jsxs(TableCell, { align: "right", children: [currency === "usd"
                                                                                                        ? "$"
                                                                                                        : currency === "pound"
                                                                                                            ? "£"
                                                                                                            : currency === "euro"
                                                                                                                ? "€"
                                                                                                                : currency === "yen"
                                                                                                                    ? "¥"
                                                                                                                    : "₱", amount] })] }, currency))) })] }) })] })), selectedReport.data.totalAttendance && (_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 }, children: "Attendance" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Attendance" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.totalAttendance })] }) }) }), selectedReport.data.localVisitors && (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Local Visitors" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.localVisitors })] }) }) })), selectedReport.data.foreignVisitors && (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Foreign Visitors" }), _jsx(Typography, { variant: "h3", children: selectedReport.data.foreignVisitors })] }) }) }))] })] }))] })) })] }) }), _jsx(Grid, { item: true, xs: 12, sx: { mt: 2 }, children: _jsxs(Box, { sx: { display: "flex", justifyContent: "flex-end" }, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(DownloadIcon, {}), onClick: () => handleExportReport(selectedReport), sx: { mr: 1 }, children: "Download Report" }), _jsx(Button, { variant: "outlined", onClick: handleCloseViewDialog, children: "Close" })] }) })] }) })] })) })] }));
};
export default ReportManagement;
