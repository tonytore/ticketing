import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Grid, Paper, Divider, Alert, Button, List, ListItem, ListItemText, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";
import EmailIcon from "@mui/icons-material/Email";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { Currency } from "@/lib/types";
const Confirmation = ({ purchaseData }) => {
    const getCurrencySymbol = () => {
        switch (purchaseData.currency) {
            case Currency.USD:
                return "$";
            case Currency.POUND:
                return "£";
            case Currency.EURO:
                return "€";
            case Currency.YEN:
                return "¥";
            case Currency.LOCAL:
            default:
                return "₱";
        }
    };
    const getTicketPrice = () => {
        // In a real app, this would fetch the price from the database
        const basePrice = purchaseData.isVIP ? 30 : 15;
        // Apply currency conversion
        switch (purchaseData.currency) {
            case Currency.USD:
                return basePrice;
            case Currency.POUND:
                return basePrice * 0.8;
            case Currency.EURO:
                return basePrice * 0.9;
            case Currency.YEN:
                return basePrice * 130;
            case Currency.LOCAL:
            default:
                return basePrice * 50;
        }
    };
    const getTotalPrice = () => {
        return getTicketPrice() * purchaseData.numberOfTickets;
    };
    // Generate a random confirmation number
    const confirmationNumber = `MUS-${Date.now()
        .toString()
        .slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    // Generate a random QR code data
    const qrCodeData = `TICKET-${confirmationNumber}`;
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { textAlign: "center", mb: 4 }, children: [_jsx(CheckCircleIcon, { sx: { fontSize: 80, color: "success.main", mb: 2 } }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: "Booking Confirmed!" }), _jsx(Typography, { variant: "body1", children: "Your museum tickets have been successfully booked. Please check your email for the ticket details." })] }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, children: [_jsxs(Paper, { variant: "outlined", sx: { p: 3, mb: 4 }, children: [_jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }, children: [_jsx(Typography, { variant: "h5", children: "Booking Details" }), _jsx(Chip, { label: "Confirmed", color: "success", icon: _jsx(CheckCircleIcon, {}) })] }), _jsx(Divider, { sx: { mb: 3 } }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Confirmation Number" }), _jsx(Typography, { variant: "body1", fontWeight: "bold", children: confirmationNumber })] }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Transaction ID" }), _jsx(Typography, { variant: "body1", children: purchaseData.transactionId || "N/A" })] }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsxs(Typography, { variant: "subtitle2", color: "text.secondary", children: [_jsx(EventIcon, { sx: { fontSize: "small", mr: 0.5, verticalAlign: "middle" } }), "Visit Date"] }), _jsx(Typography, { variant: "body1", children: purchaseData.visitDate
                                                            ? purchaseData.visitDate.toLocaleDateString()
                                                            : "N/A" })] }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsxs(Typography, { variant: "subtitle2", color: "text.secondary", children: [_jsx(AccessTimeIcon, { sx: { fontSize: "small", mr: 0.5, verticalAlign: "middle" } }), "Visit Time"] }), _jsx(Typography, { variant: "body1", children: purchaseData.visitTime || "N/A" })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 1 } }) }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsxs(Typography, { variant: "subtitle2", color: "text.secondary", children: [_jsx(ConfirmationNumberIcon, { sx: { fontSize: "small", mr: 0.5, verticalAlign: "middle" } }), "Ticket Type"] }), _jsxs(Typography, { variant: "body1", children: [purchaseData.isVIP ? "VIP" : "Regular", " Ticket"] })] }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsxs(Typography, { variant: "subtitle2", color: "text.secondary", children: [_jsx(PersonIcon, { sx: { fontSize: "small", mr: 0.5, verticalAlign: "middle" } }), "Number of Tickets"] }), _jsx(Typography, { variant: "body1", children: purchaseData.numberOfTickets })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 1 } }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Visitor Information" }), _jsx(Typography, { variant: "body1", children: purchaseData.personalInfo.name || "N/A" }), _jsxs(Typography, { variant: "body2", children: [purchaseData.personalInfo.email || "N/A", " |", " ", purchaseData.personalInfo.phone || "N/A"] }), purchaseData.isGroupTicket && (_jsx(Chip, { label: "Group Visit", size: "small", color: "primary", sx: { mt: 1 } }))] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 1 } }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Payment Method" }), _jsx(Typography, { variant: "body1", children: purchaseData.paymentMethod === "credit_card"
                                                            ? "Credit/Debit Card"
                                                            : purchaseData.paymentMethod === "bank_transfer"
                                                                ? "Bank Transfer"
                                                                : purchaseData.paymentMethod === "paypal"
                                                                    ? "PayPal"
                                                                    : purchaseData.paymentMethod === "cash"
                                                                        ? "Pay at Museum"
                                                                        : "N/A" })] })] })] }), _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Important Information" }), _jsxs(List, { children: [_jsx(ListItem, { children: _jsx(ListItemText, { primary: "Arrival Time", secondary: "Please arrive at least 15 minutes before your scheduled time slot." }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Ticket Validation", secondary: "Present your QR code at the entrance for validation. Digital or printed tickets are accepted." }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Cancellation Policy", secondary: "Tickets are non-refundable. Date changes may be accommodated with at least 48 hours notice." }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Group Visits", secondary: "For group tickets, all members must enter together with the contact person present." }) })] })] })] }), _jsxs(Grid, { item: true, xs: 12, md: 4, children: [_jsxs(Paper, { variant: "outlined", sx: { p: 3, mb: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "QR Code" }), _jsxs(Box, { sx: { textAlign: "center", py: 3 }, children: [_jsx(QrCodeIcon, { sx: { fontSize: 150, color: "primary.main" } }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1 }, children: qrCodeData })] }), _jsxs(Box, { sx: { display: "flex", justifyContent: "center", gap: 2 }, children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(PrintIcon, {}), size: "small", children: "Print" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(DownloadIcon, {}), size: "small", children: "Download" })] })] }), _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Order Summary" }), _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Item" }), _jsx(TableCell, { align: "right", children: "Price" })] }) }), _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsxs(TableCell, { children: [purchaseData.isVIP ? "VIP" : "Regular", " Ticket x", " ", purchaseData.numberOfTickets] }), _jsxs(TableCell, { align: "right", children: [getCurrencySymbol(), getTicketPrice().toFixed(2), " x", " ", purchaseData.numberOfTickets] })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { sx: { fontWeight: "bold" }, children: "Total" }), _jsxs(TableCell, { align: "right", sx: { fontWeight: "bold" }, children: [getCurrencySymbol(), getTotalPrice().toFixed(2)] })] })] })] }) }), _jsx(Box, { sx: { mt: 3 }, children: _jsx(Button, { variant: "contained", fullWidth: true, startIcon: _jsx(EmailIcon, {}), children: "Email Receipt" }) })] })] })] }), _jsx(Box, { sx: { mt: 4, textAlign: "center" }, children: _jsx(Alert, { severity: "success", sx: { mb: 3 }, children: _jsx(Typography, { variant: "body1", children: "Thank you for your purchase! We look forward to welcoming you to our museum." }) }) })] }));
};
export default Confirmation;
