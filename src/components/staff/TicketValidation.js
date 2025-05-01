import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Card, CardContent, Alert, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { mockTickets } from "@/lib/mockData";
const TicketValidation = () => {
    const [qrCode, setQrCode] = useState("");
    const [scanning, setScanning] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [validationHistory, setValidationHistory] = useState([]);
    const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
    const [randomCheckMode, setRandomCheckMode] = useState(false);
    const handleQrCodeChange = (e) => {
        setQrCode(e.target.value);
    };
    const handleScanQrCode = () => {
        // In a real app, this would activate the camera to scan a QR code
        setScanning(true);
        // Simulate scanning process
        setTimeout(() => {
            // Generate a random QR code for demonstration
            const randomQrCode = `qr-code-data-${Math.floor(Math.random() * 10) + 1}`;
            setQrCode(randomQrCode);
            setScanning(false);
            // Automatically validate after scanning
            handleValidateTicket(randomQrCode);
        }, 2000);
    };
    const handleValidateTicket = (code = qrCode) => {
        // In a real app, this would send the QR code to an API for validation
        console.log("Validating ticket with QR code:", code);
        // Find the ticket in mock data
        const ticket = mockTickets.find((t) => t.qrCode === code);
        let result;
        if (ticket) {
            if (ticket.isUsed) {
                result = {
                    valid: false,
                    message: "This ticket has already been used.",
                    ticket,
                };
            }
            else if (new Date(ticket.expirationDate) < new Date()) {
                result = {
                    valid: false,
                    message: "This ticket has expired.",
                    ticket,
                };
            }
            else {
                result = {
                    valid: true,
                    message: "Ticket is valid.",
                    ticket,
                };
                // Mark ticket as used (in a real app, this would update the database)
                ticket.isUsed = true;
            }
        }
        else {
            result = {
                valid: false,
                message: "Invalid QR code. Ticket not found.",
            };
        }
        setValidationResult(result);
        // Add to validation history
        setValidationHistory([
            {
                timestamp: new Date(),
                qrCode: code,
                valid: result.valid,
            },
            ...validationHistory,
        ]);
    };
    const handleClearResult = () => {
        setValidationResult(null);
        setQrCode("");
    };
    const handleOpenHistoryDialog = () => {
        setOpenHistoryDialog(true);
    };
    const handleCloseHistoryDialog = () => {
        setOpenHistoryDialog(false);
    };
    const handleToggleRandomCheckMode = () => {
        setRandomCheckMode(!randomCheckMode);
        setValidationResult(null);
        setQrCode("");
    };
    const handleRandomCheck = () => {
        // In a real app, this would select a random visitor and request their ticket
        setRandomCheckMode(true);
        // Simulate a random check
        const randomMessage = Math.random() > 0.7
            ? "Please approach the visitor with the red jacket in the Egyptian exhibit."
            : "Please approach the family group near the entrance of the Modern Art gallery.";
        setValidationResult({
            valid: true,
            message: randomMessage,
        });
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Ticket Validation" }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { sx: { p: 3 }, children: [_jsxs(Box, { sx: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                    }, children: [_jsx(Typography, { variant: "h6", children: randomCheckMode ? "Random Ticket Check" : "Scan QR Code" }), _jsx(Button, { variant: randomCheckMode ? "contained" : "outlined", color: randomCheckMode ? "secondary" : "primary", startIcon: _jsx(ShuffleIcon, {}), onClick: handleToggleRandomCheckMode, children: randomCheckMode ? "Exit Random Mode" : "Random Check Mode" })] }), _jsx(Divider, { sx: { mb: 3 } }), randomCheckMode ? (_jsxs(Box, { sx: { textAlign: "center", py: 2 }, children: [_jsx(Typography, { paragraph: true, children: "Random check mode allows you to verify tickets from randomly selected visitors to ensure compliance." }), _jsx(Button, { variant: "contained", color: "primary", size: "large", onClick: handleRandomCheck, sx: { mt: 2 }, children: "Generate Random Check" })] })) : (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, margin: "normal", label: "QR Code", value: qrCode, onChange: handleQrCodeChange, disabled: scanning, InputProps: {
                                                endAdornment: (_jsx(IconButton, { color: "primary", onClick: handleScanQrCode, disabled: scanning, children: _jsx(QrCodeScannerIcon, {}) })),
                                            } }), _jsxs(Box, { sx: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mt: 3,
                                            }, children: [_jsx(Button, { variant: "outlined", onClick: handleScanQrCode, disabled: scanning, startIcon: _jsx(QrCodeScannerIcon, {}), children: scanning ? "Scanning..." : "Scan QR Code" }), _jsx(Button, { variant: "contained", onClick: () => handleValidateTicket(), disabled: scanning || !qrCode, children: "Validate Ticket" })] })] })), validationResult && (_jsxs(Box, { sx: { mt: 4 }, children: [_jsx(Alert, { severity: validationResult.valid ? "success" : "error", icon: validationResult.valid ? (_jsx(CheckCircleIcon, {})) : (_jsx(CancelIcon, {})), sx: { mb: 2 }, children: validationResult.message }), validationResult.ticket && (_jsx(Card, { variant: "outlined", sx: { mt: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Ticket Details" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Ticket Type" }), _jsx(Typography, { variant: "body1", children: validationResult.ticket.type })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Group Ticket" }), _jsx(Typography, { variant: "body1", children: validationResult.ticket.isGroupTicket
                                                                            ? "Yes"
                                                                            : "No" })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Visit Date" }), _jsx(Typography, { variant: "body1", children: new Date(validationResult.ticket.visitDate).toLocaleDateString() })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Expiration Date" }), _jsx(Typography, { variant: "body1", children: new Date(validationResult.ticket.expirationDate).toLocaleDateString() })] }), validationResult.ticket.isGroupTicket &&
                                                                validationResult.ticket.contactPersonDetails && (_jsxs(_Fragment, { children: [_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 1 } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Contact Person" })] }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Typography, { variant: "body1", children: [validationResult.ticket.contactPersonDetails
                                                                                    .name, " ", "|", " ", validationResult.ticket.contactPersonDetails
                                                                                    .email, " ", "|", " ", validationResult.ticket.contactPersonDetails
                                                                                    .phone] }) })] }))] })] }) })), _jsx(Box, { sx: { display: "flex", justifyContent: "center", mt: 3 }, children: _jsx(Button, { variant: "outlined", onClick: handleClearResult, children: "Clear Result" }) })] }))] }) }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsxs(Paper, { sx: { p: 3 }, children: [_jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }, children: [_jsx(Typography, { variant: "h6", children: "Recent Validations" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(HistoryIcon, {}), onClick: handleOpenHistoryDialog, disabled: validationHistory.length === 0, children: "View Full History" })] }), _jsx(Divider, { sx: { mb: 3 } }), validationHistory.length === 0 ? (_jsx(Typography, { color: "text.secondary", align: "center", sx: { py: 4 }, children: "No validation history yet." })) : (_jsx(List, { children: validationHistory.slice(0, 5).map((validation, index) => (_jsxs(ListItem, { divider: index < Math.min(validationHistory.length, 5) - 1, children: [_jsx(ListItemText, { primary: validation.qrCode, secondary: validation.timestamp.toLocaleTimeString() }), _jsx(ListItemSecondaryAction, { children: _jsx(Chip, { label: validation.valid ? "Valid" : "Invalid", color: validation.valid ? "success" : "error", size: "small" }) })] }, index))) }))] }), _jsx(Card, { sx: { mt: 3, p: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Validation Guidelines" }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(Typography, { variant: "body2", paragraph: true, children: "Follow these steps when validating tickets:" }), _jsxs(Box, { component: "ol", sx: { pl: 2, mb: 2 }, children: [_jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Scan the QR code on the visitor's ticket or enter it manually." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Verify that the ticket is valid and has not expired." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "For group tickets, confirm that the contact person is present." }) }), _jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body2", children: "Conduct random checks throughout the day to ensure compliance." }) })] }), _jsx(Alert, { severity: "info", children: "Remember to be courteous and professional when interacting with visitors, especially during random checks." })] }) })] })] }), _jsxs(Dialog, { open: openHistoryDialog, onClose: handleCloseHistoryDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Validation History" }), _jsx(DialogContent, { children: _jsx(List, { children: validationHistory.map((validation, index) => (_jsxs(ListItem, { divider: index < validationHistory.length - 1, children: [_jsx(ListItemText, { primary: validation.qrCode, secondary: `${validation.timestamp.toLocaleDateString()} ${validation.timestamp.toLocaleTimeString()}` }), _jsx(ListItemSecondaryAction, { children: _jsx(Chip, { label: validation.valid ? "Valid" : "Invalid", color: validation.valid ? "success" : "error", size: "small" }) })] }, index))) }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: handleCloseHistoryDialog, children: "Close" }) })] })] }));
};
export default TicketValidation;
