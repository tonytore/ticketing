import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Chip, Tabs, Tab, Card, CardContent, Divider, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { mockTickets } from "@/lib/mockData";
import { TicketType, Currency } from "@/lib/types";
const TicketManagement = () => {
    const [tickets, setTickets] = useState(mockTickets);
    console.log(setTickets);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        type: TicketType.REGULAR,
        prices: {
            [Currency.LOCAL]: 500,
            [Currency.USD]: 15,
            [Currency.POUND]: 12,
            [Currency.EURO]: 14,
            [Currency.YEN]: 2000,
        },
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isGroupTicket: false,
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
    const handleFormChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handlePriceChange = (currency, value) => {
        setFormData({
            ...formData,
            prices: {
                ...formData.prices,
                [currency]: value,
            },
        });
    };
    const handleSaveTicket = () => {
        // In a real app, this would send data to an API
        console.log("Saving ticket:", formData);
        handleCloseDialog();
    };
    const handleExportData = (format) => {
        // In a real app, this would generate and download the file
        console.log(`Exporting tickets in ${format} format`);
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mb: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Ticket Management" }), _jsxs(Box, { children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(DownloadIcon, {}), onClick: () => handleExportData("pdf"), sx: { mr: 1 }, children: "Export PDF" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(DownloadIcon, {}), onClick: () => handleExportData("excel"), sx: { mr: 1 }, children: "Export Excel" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: handleOpenDialog, children: "Create Ticket" })] })] }), _jsx(Paper, { sx: { width: "100%", mb: 4 }, children: _jsxs(Tabs, { value: currentTab, onChange: handleTabChange, "aria-label": "ticket management tabs", children: [_jsx(Tab, { label: "All Tickets" }), _jsx(Tab, { label: "Regular Tickets" }), _jsx(Tab, { label: "VIP Tickets" }), _jsx(Tab, { label: "Group Tickets" }), _jsx(Tab, { label: "Event Tickets" })] }) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Tickets" }), _jsx(Typography, { variant: "h3", children: tickets.length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Regular Tickets" }), _jsx(Typography, { variant: "h3", children: tickets.filter((ticket) => ticket.type === TicketType.REGULAR)
                                            .length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "VIP Tickets" }), _jsx(Typography, { variant: "h3", children: tickets.filter((ticket) => ticket.type === TicketType.VIP)
                                            .length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Group Tickets" }), _jsx(Typography, { variant: "h3", children: tickets.filter((ticket) => ticket.isGroupTicket).length })] }) }) })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "tickets table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { children: "Price (USD)" }), _jsx(TableCell, { children: "Expiration Date" }), _jsx(TableCell, { children: "Group Ticket" }), _jsx(TableCell, { children: "Purchase Date" }), _jsx(TableCell, { children: "Visit Date" }), _jsx(TableCell, { children: "Used" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: tickets
                                .filter((ticket) => {
                                if (currentTab === 0)
                                    return true;
                                if (currentTab === 1)
                                    return ticket.type === TicketType.REGULAR;
                                if (currentTab === 2)
                                    return ticket.type === TicketType.VIP;
                                if (currentTab === 3)
                                    return ticket.isGroupTicket;
                                if (currentTab === 4)
                                    return !!ticket.eventId;
                                return true;
                            })
                                .map((ticket) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: ticket.id }), _jsx(TableCell, { children: _jsx(Chip, { label: ticket.type, color: ticket.type === TicketType.VIP ? "secondary" : "primary", size: "small" }) }), _jsxs(TableCell, { children: ["$", ticket.prices.find((p) => p.currency === Currency.USD)
                                                ?.amount] }), _jsx(TableCell, { children: new Date(ticket.expirationDate).toLocaleDateString() }), _jsx(TableCell, { children: ticket.isGroupTicket ? "Yes" : "No" }), _jsx(TableCell, { children: new Date(ticket.purchasedAt).toLocaleDateString() }), _jsx(TableCell, { children: new Date(ticket.visitDate).toLocaleDateString() }), _jsx(TableCell, { children: ticket.isUsed ? "Yes" : "No" }), _jsxs(TableCell, { children: [_jsx(IconButton, { size: "small", color: "primary", children: _jsx(VisibilityIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "primary", children: _jsx(EditIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "error", children: _jsx(DeleteIcon, { fontSize: "small" }) })] })] }, ticket.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Create New Ticket" }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 3, sx: { mt: 0 }, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "ticket-type-label", children: "Ticket Type" }), _jsxs(Select, { labelId: "ticket-type-label", value: formData.type, label: "Ticket Type", onChange: (e) => handleFormChange("type", e.target.value), children: [_jsx(MenuItem, { value: TicketType.REGULAR, children: "Regular" }), _jsx(MenuItem, { value: TicketType.VIP, children: "VIP" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "group-ticket-label", children: "Group Ticket" }), _jsxs(Select, { labelId: "group-ticket-label", value: String(formData.isGroupTicket), label: "Group Ticket", onChange: (e) => handleFormChange("isGroupTicket", e.target.value === "true") // Convert back to boolean
                                                , children: [_jsx(MenuItem, { value: "false", children: "No" }), _jsx(MenuItem, { value: "true", children: "Yes" })] })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "Expiration Date", value: formData.expirationDate, onChange: (newValue) => handleFormChange("expirationDate", newValue), slotProps: {
                                                textField: { fullWidth: true, margin: "normal" },
                                            } }) }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 }, children: "Ticket Prices" }), _jsx(Divider, { sx: { mb: 2 } })] }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Local Price", type: "number", value: formData.prices[Currency.LOCAL], onChange: (e) => handlePriceChange(Currency.LOCAL, Number(e.target.value)), InputProps: { startAdornment: "₱" } }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "USD Price", type: "number", value: formData.prices[Currency.USD], onChange: (e) => handlePriceChange(Currency.USD, Number(e.target.value)), InputProps: { startAdornment: "$" } }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Pound Price", type: "number", value: formData.prices[Currency.POUND], onChange: (e) => handlePriceChange(Currency.POUND, Number(e.target.value)), InputProps: { startAdornment: "£" } }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Euro Price", type: "number", value: formData.prices[Currency.EURO], onChange: (e) => handlePriceChange(Currency.EURO, Number(e.target.value)), InputProps: { startAdornment: "€" } }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Yen Price", type: "number", value: formData.prices[Currency.YEN], onChange: (e) => handlePriceChange(Currency.YEN, Number(e.target.value)), InputProps: { startAdornment: "¥" } }) })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDialog, children: "Cancel" }), _jsx(Button, { onClick: handleSaveTicket, variant: "contained", children: "Save" })] })] })] }));
};
export default TicketManagement;
