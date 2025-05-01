import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Card, CardContent, Alert, FormControl, InputLabel, Select, MenuItem, Divider, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, FormGroup, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, IconButton, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockTickets, mockEvents } from "@/lib/mockData";
import { TicketType, Currency } from "@/lib/types";
const ReportGeneration = () => {
    const [criteria, setCriteria] = useState({
        title: "",
        startDate: new Date(new Date().setDate(1)), // First day of current month
        endDate: new Date(),
        format: "pdf",
        includeCharts: true,
        includeRawData: true,
    });
    const [reportGenerated, setReportGenerated] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [savedReports, setSavedReports] = useState([]);
    const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
    const handleCriteriaChange = (field, value) => {
        setCriteria({
            ...criteria,
            [field]: value,
        });
    };
    const handleGenerateReport = () => {
        // In a real app, this would send data to an API to generate the report
        console.log("Generating report with criteria:", criteria);
        // Simulate report generation
        const filteredTickets = mockTickets.filter((ticket) => {
            const ticketDate = new Date(ticket.purchasedAt);
            const startDate = criteria.startDate
                ? new Date(criteria.startDate)
                : null;
            const endDate = criteria.endDate ? new Date(criteria.endDate) : null;
            let matchesDateRange = true;
            if (startDate && endDate) {
                matchesDateRange = ticketDate >= startDate && ticketDate <= endDate;
            }
            let matchesTicketType = true;
            if (criteria.ticketType) {
                matchesTicketType = ticket.type === criteria.ticketType;
            }
            let matchesEvent = true;
            if (criteria.eventId) {
                matchesEvent = ticket.eventId === criteria.eventId;
            }
            let matchesVisitorType = true;
            if (criteria.isLocal !== undefined) {
                matchesVisitorType = ticket.isLocal === criteria.isLocal;
            }
            return (matchesDateRange &&
                matchesTicketType &&
                matchesEvent &&
                matchesVisitorType);
        });
        // Generate report data
        const reportData = {
            totalTickets: filteredTickets.length,
            regularTickets: filteredTickets.filter((t) => t.type === TicketType.REGULAR).length,
            vipTickets: filteredTickets.filter((t) => t.type === TicketType.VIP)
                .length,
            groupTickets: filteredTickets.filter((t) => t.isGroupTicket).length,
            eventTickets: filteredTickets.filter((t) => t.eventId).length,
            revenue: {
                [Currency.LOCAL]: filteredTickets.reduce((sum, ticket) => {
                    const price = ticket.prices.find((p) => p.currency === Currency.LOCAL);
                    return sum + (price ? price.amount : 0);
                }, 0),
                [Currency.USD]: filteredTickets.reduce((sum, ticket) => {
                    const price = ticket.prices.find((p) => p.currency === Currency.USD);
                    return sum + (price ? price.amount : 0);
                }, 0),
                [Currency.POUND]: filteredTickets.reduce((sum, ticket) => {
                    const price = ticket.prices.find((p) => p.currency === Currency.POUND);
                    return sum + (price ? price.amount : 0);
                }, 0),
                [Currency.EURO]: filteredTickets.reduce((sum, ticket) => {
                    const price = ticket.prices.find((p) => p.currency === Currency.EURO);
                    return sum + (price ? price.amount : 0);
                }, 0),
                [Currency.YEN]: filteredTickets.reduce((sum, ticket) => {
                    const price = ticket.prices.find((p) => p.currency === Currency.YEN);
                    return sum + (price ? price.amount : 0);
                }, 0),
            },
            tickets: filteredTickets,
        };
        setReportData(reportData);
        setReportGenerated(true);
    };
    const handleSaveReport = () => {
        // In a real app, this would save the report to the database
        const newReport = {
            id: `report-${Date.now()}`,
            title: criteria.title,
            createdAt: new Date(),
            criteria: { ...criteria },
        };
        setSavedReports([...savedReports, newReport]);
        // Show success message
        alert("Report saved successfully!");
    };
    const handleExportReport = () => {
        // In a real app, this would generate and download the file
        console.log(`Exporting report in ${criteria.format} format`);
        // Show success message
        alert(`Report exported as ${criteria.format.toUpperCase()} successfully!`);
    };
    const handleOpenPreviewDialog = () => {
        setOpenPreviewDialog(true);
    };
    const handleClosePreviewDialog = () => {
        setOpenPreviewDialog(false);
    };
    const handleReset = () => {
        setCriteria({
            title: "",
            startDate: new Date(new Date().setDate(1)),
            endDate: new Date(),
            format: "pdf",
            includeCharts: true,
            includeRawData: true,
        });
        setReportGenerated(false);
        setReportData(null);
    };
    const handleDeleteSavedReport = (id) => {
        setSavedReports(savedReports.filter((report) => report.id !== id));
        alert("Report deleted successfully!");
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Report Generation" }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, children: [_jsxs(Paper, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Report Criteria" }), _jsx(Divider, { sx: { mb: 3 } }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Report Title", value: criteria.title, onChange: (e) => handleCriteriaChange("title", e.target.value) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "Start Date", value: criteria.startDate, onChange: (newValue) => handleCriteriaChange("startDate", newValue), slotProps: {
                                                            textField: { fullWidth: true, margin: "normal" },
                                                        } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "End Date", value: criteria.endDate, onChange: (newValue) => handleCriteriaChange("endDate", newValue), slotProps: {
                                                            textField: { fullWidth: true, margin: "normal" },
                                                        } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "ticket-type-label", children: "Ticket Type" }), _jsxs(Select, { labelId: "ticket-type-label", value: criteria.ticketType || "", label: "Ticket Type", onChange: (e) => {
                                                                if (e.target.value === "") {
                                                                    const newCriteria = { ...criteria };
                                                                    delete newCriteria.ticketType;
                                                                    setCriteria(newCriteria);
                                                                }
                                                                else {
                                                                    handleCriteriaChange("ticketType", e.target.value);
                                                                }
                                                            }, children: [_jsx(MenuItem, { value: "", children: "All Tickets" }), _jsx(MenuItem, { value: TicketType.REGULAR, children: "Regular Tickets" }), _jsx(MenuItem, { value: TicketType.VIP, children: "VIP Tickets" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "event-label", children: "Event" }), _jsxs(Select, { labelId: "event-label", value: criteria.eventId || "", label: "Event", onChange: (e) => {
                                                                if (e.target.value === "") {
                                                                    const newCriteria = { ...criteria };
                                                                    delete newCriteria.eventId;
                                                                    setCriteria(newCriteria);
                                                                }
                                                                else {
                                                                    handleCriteriaChange("eventId", e.target.value);
                                                                }
                                                            }, children: [_jsx(MenuItem, { value: "", children: "All Events" }), mockEvents.map((event) => (_jsx(MenuItem, { value: event.id, children: event.title }, event.id)))] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "visitor-type-label", children: "Visitor Type" }), _jsxs(Select, { labelId: "visitor-type-label", value: criteria.isLocal === undefined
                                                                ? ""
                                                                : criteria.isLocal
                                                                    ? "local"
                                                                    : "nonlocal", label: "Visitor Type", onChange: (e) => {
                                                                if (e.target.value === "") {
                                                                    const newCriteria = { ...criteria };
                                                                    delete newCriteria.isLocal;
                                                                    setCriteria(newCriteria);
                                                                }
                                                                else {
                                                                    handleCriteriaChange("isLocal", e.target.value === "local");
                                                                }
                                                            }, children: [_jsx(MenuItem, { value: "", children: "All Visitors" }), _jsx(MenuItem, { value: "local", children: "Local Visitors" }), _jsx(MenuItem, { value: "nonlocal", children: "Non-Local Visitors" })] })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 2 }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Report Format" }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControl, { component: "fieldset", children: _jsxs(FormGroup, { children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: criteria.format === "pdf", onChange: () => handleCriteriaChange("format", "pdf"), icon: _jsx(PictureAsPdfIcon, {}), checkedIcon: _jsx(PictureAsPdfIcon, {}) }), label: "PDF" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: criteria.format === "excel", onChange: () => handleCriteriaChange("format", "excel"), icon: _jsx(TableChartIcon, {}), checkedIcon: _jsx(TableChartIcon, {}) }), label: "Excel" })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControl, { component: "fieldset", children: _jsxs(FormGroup, { children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: criteria.includeCharts, onChange: (e) => handleCriteriaChange("includeCharts", e.target.checked) }), label: "Include Charts" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: criteria.includeRawData, onChange: (e) => handleCriteriaChange("includeRawData", e.target.checked) }), label: "Include Raw Data" })] }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Box, { sx: {
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        mt: 2,
                                                    }, children: [_jsx(Button, { variant: "outlined", onClick: handleReset, children: "Reset" }), _jsx(Button, { variant: "contained", onClick: handleGenerateReport, disabled: !criteria.title, startIcon: _jsx(AssessmentIcon, {}), children: "Generate Report" })] }) })] })] }), reportGenerated && reportData && (_jsxs(Paper, { sx: { p: 3, mt: 3 }, children: [_jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }, children: [_jsx(Typography, { variant: "h6", children: "Report Preview" }), _jsxs(Box, { children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(SaveIcon, {}), onClick: handleSaveReport, sx: { mr: 1 }, children: "Save Report" }), _jsxs(Button, { variant: "contained", startIcon: _jsx(DownloadIcon, {}), onClick: handleExportReport, children: ["Export ", criteria.format.toUpperCase()] })] })] }), _jsx(Divider, { sx: { mb: 3 } }), _jsx(Typography, { variant: "h5", gutterBottom: true, children: criteria.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", paragraph: true, children: [criteria.startDate?.toLocaleDateString(), " -", " ", criteria.endDate?.toLocaleDateString()] }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 3 }, children: [_jsx(Grid, { item: true, xs: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Tickets" }), _jsx(Typography, { variant: "h3", children: reportData.totalTickets })] }) }) }), _jsx(Grid, { item: true, xs: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Regular" }), _jsx(Typography, { variant: "h3", children: reportData.regularTickets })] }) }) }), _jsx(Grid, { item: true, xs: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "VIP" }), _jsx(Typography, { variant: "h3", children: reportData.vipTickets })] }) }) }), _jsx(Grid, { item: true, xs: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Group" }), _jsx(Typography, { variant: "h3", children: reportData.groupTickets })] }) }) })] }), _jsxs(Accordion, { defaultExpanded: true, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1a-content", id: "panel1a-header", children: _jsx(Typography, { variant: "h6", children: "Revenue Summary" }) }), _jsx(AccordionDetails, { children: _jsx(TableContainer, { component: Paper, variant: "outlined", children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Currency" }), _jsx(TableCell, { align: "right", children: "Amount" })] }) }), _jsx(TableBody, { children: Object.entries(reportData.revenue).map(([currency, amount]) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: currency === Currency.LOCAL
                                                                                ? "Local Currency (₱)"
                                                                                : currency === Currency.USD
                                                                                    ? "US Dollar ($)"
                                                                                    : currency === Currency.POUND
                                                                                        ? "British Pound (£)"
                                                                                        : currency === Currency.EURO
                                                                                            ? "Euro (€)"
                                                                                            : currency === Currency.YEN
                                                                                                ? "Japanese Yen (¥)"
                                                                                                : currency }), _jsxs(TableCell, { align: "right", children: [currency === Currency.LOCAL
                                                                                    ? "₱"
                                                                                    : currency === Currency.USD
                                                                                        ? "$"
                                                                                        : currency === Currency.POUND
                                                                                            ? "£"
                                                                                            : currency === Currency.EURO
                                                                                                ? "€"
                                                                                                : currency === Currency.YEN
                                                                                                    ? "¥"
                                                                                                    : "", amount] })] }, currency))) })] }) }) })] }), criteria.includeCharts && (_jsxs(Accordion, { children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel2a-content", id: "panel2a-header", children: _jsx(Typography, { variant: "h6", children: "Charts" }) }), _jsx(AccordionDetails, { children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { textAlign: "center" }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Ticket Distribution" }), _jsx(PieChartIcon, { sx: { fontSize: 100, color: "primary.main" } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Chart preview not available in this demo" })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { textAlign: "center" }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Revenue by Currency" }), _jsx(BarChartIcon, { sx: { fontSize: 100, color: "secondary.main" } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Chart preview not available in this demo" })] }) }) })] }) })] })), criteria.includeRawData && (_jsxs(Accordion, { children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel3a-content", id: "panel3a-header", children: _jsx(Typography, { variant: "h6", children: "Raw Data" }) }), _jsx(AccordionDetails, { children: _jsx(Button, { variant: "outlined", onClick: handleOpenPreviewDialog, startIcon: _jsx(TableChartIcon, {}), children: "View Data Table" }) })] }))] }))] }), _jsxs(Grid, { item: true, xs: 12, md: 4, children: [_jsxs(Paper, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Saved Reports" }), _jsx(Divider, { sx: { mb: 3 } }), savedReports.length === 0 ? (_jsx(Typography, { color: "text.secondary", align: "center", sx: { py: 4 }, children: "No saved reports yet." })) : (_jsx(List, { children: savedReports.map((report) => (_jsxs(ListItem, { secondaryAction: _jsx(IconButton, { edge: "end", "aria-label": "delete", onClick: () => handleDeleteSavedReport(report.id), children: _jsx(DeleteIcon, {}) }), children: [_jsx(ListItemText, { primary: report.title, secondary: `Created: ${report.createdAt.toLocaleDateString()}` }), _jsx(Button, { size: "small", startIcon: _jsx(DownloadIcon, {}), onClick: () => alert(`Exporting ${report.title} as ${report.criteria.format.toUpperCase()}`), sx: { ml: 2 }, children: "Export" })] }, report.id))) }))] }), _jsx(Card, { sx: { mt: 3, p: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Report Generation Tips" }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(Typography, { variant: "body2", paragraph: true, children: "Follow these tips for effective reports:" }), _jsxs(Box, { component: "ul", sx: { pl: 2, mb: 2 }, children: [_jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Use specific date ranges for more accurate data." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Include charts for visual representation of data." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Export as PDF for sharing with management." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Use Excel format for further data analysis." }) })] }), _jsx(Alert, { severity: "info", children: "Staff-generated reports are only visible to the staff member who created them and administrators." })] }) })] })] }), _jsxs(Dialog, { open: openPreviewDialog, onClose: handleClosePreviewDialog, maxWidth: "lg", fullWidth: true, children: [_jsx(DialogTitle, { children: "Raw Data Preview" }), _jsx(DialogContent, { children: reportData && reportData.tickets && (_jsx(TableContainer, { component: Paper, variant: "outlined", children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { children: "Group" }), _jsx(TableCell, { children: "Purchase Date" }), _jsx(TableCell, { children: "Visit Date" }), _jsx(TableCell, { children: "Price (USD)" }), _jsx(TableCell, { children: "Used" }), _jsx(TableCell, { children: "Local" }), _jsx(TableCell, { children: "Event ID" })] }) }), _jsx(TableBody, { children: reportData.tickets.map((ticket) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: ticket.id }), _jsx(TableCell, { children: ticket.type }), _jsx(TableCell, { children: ticket.isGroupTicket ? "Yes" : "No" }), _jsx(TableCell, { children: new Date(ticket.purchasedAt).toLocaleDateString() }), _jsx(TableCell, { children: new Date(ticket.visitDate).toLocaleDateString() }), _jsxs(TableCell, { children: ["$", ticket.prices.find((p) => p.currency === Currency.USD)
                                                            ?.amount] }), _jsx(TableCell, { children: ticket.isUsed ? "Yes" : "No" }), _jsx(TableCell, { children: ticket.isLocal ? "Yes" : "No" }), _jsx(TableCell, { children: ticket.eventId || "-" })] }, ticket.id))) })] }) })) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: handleClosePreviewDialog, children: "Close" }) })] })] }));
};
export default ReportGeneration;
