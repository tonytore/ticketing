import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Card, CardContent, Alert, FormControl, InputLabel, Select, MenuItem, Divider, Stepper, Step, StepLabel, FormControlLabel, Checkbox, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { TicketType, Currency } from "@/lib/types";
const TicketCreation = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [ticketType, setTicketType] = useState(TicketType.REGULAR);
    const [isGroupTicket, setIsGroupTicket] = useState(false);
    const [visitDate, setVisitDate] = useState(new Date());
    const [expirationDate, setExpirationDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)) // 30 days from now
    );
    const [isLocal, setIsLocal] = useState(true);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [currency, setCurrency] = useState(Currency.USD);
    const [success, setSuccess] = useState(false);
    const [qrCode, setQrCode] = useState("");
    const steps = ["Ticket Details", "Visitor Information", "Confirmation"];
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleCreateTicket();
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
        setTicketType(TicketType.REGULAR);
        setIsGroupTicket(false);
        setVisitDate(new Date());
        setExpirationDate(new Date(new Date().setDate(new Date().getDate() + 30)));
        setIsLocal(true);
        setContactName("");
        setContactEmail("");
        setContactPhone("");
        setNumberOfTickets(1);
        setCurrency(Currency.USD);
        setSuccess(false);
        setQrCode("");
    };
    const handleCreateTicket = () => {
        // In a real app, this would send data to an API to create the ticket
        console.log("Creating ticket:", {
            ticketType,
            isGroupTicket,
            visitDate,
            expirationDate,
            isLocal,
            contactName,
            contactEmail,
            contactPhone,
            numberOfTickets,
            currency,
        });
        // Simulate success and generate a QR code
        setSuccess(true);
        setQrCode(`MUSEUM-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
    };
    const getTicketPrice = () => {
        // In a real app, this would fetch the price from the database
        if (ticketType === TicketType.REGULAR) {
            return currency === Currency.USD
                ? 15
                : currency === Currency.POUND
                    ? 12
                    : currency === Currency.EURO
                        ? 14
                        : currency === Currency.YEN
                            ? 2000
                            : 500;
        }
        else {
            return currency === Currency.USD
                ? 30
                : currency === Currency.POUND
                    ? 24
                    : currency === Currency.EURO
                        ? 28
                        : currency === Currency.YEN
                            ? 4000
                            : 1000;
        }
    };
    const getCurrencySymbol = () => {
        return currency === Currency.USD
            ? "$"
            : currency === Currency.POUND
                ? "£"
                : currency === Currency.EURO
                    ? "€"
                    : currency === Currency.YEN
                        ? "¥"
                        : "₱";
    };
    const getTotalPrice = () => {
        return getTicketPrice() * numberOfTickets;
    };
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Ticket Details" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "ticket-type-label", children: "Ticket Type" }), _jsxs(Select, { labelId: "ticket-type-label", value: ticketType, label: "Ticket Type", onChange: (e) => setTicketType(e.target.value), children: [_jsx(MenuItem, { value: TicketType.REGULAR, children: "Regular" }), _jsx(MenuItem, { value: TicketType.VIP, children: "VIP" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "currency-label", children: "Currency" }), _jsxs(Select, { labelId: "currency-label", value: currency, label: "Currency", onChange: (e) => setCurrency(e.target.value), children: [_jsx(MenuItem, { value: Currency.LOCAL, children: "Local Currency (\u20B1)" }), _jsx(MenuItem, { value: Currency.USD, children: "US Dollar ($)" }), _jsx(MenuItem, { value: Currency.POUND, children: "British Pound (\u00A3)" }), _jsx(MenuItem, { value: Currency.EURO, children: "Euro (\u20AC)" }), _jsx(MenuItem, { value: Currency.YEN, children: "Japanese Yen (\u00A5)" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "Visit Date", value: visitDate, onChange: (newValue) => setVisitDate(newValue), slotProps: {
                                                textField: { fullWidth: true, margin: "normal" },
                                            } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(DatePicker, { label: "Expiration Date", value: expirationDate, onChange: (newValue) => setExpirationDate(newValue), slotProps: {
                                                textField: { fullWidth: true, margin: "normal" },
                                            } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Number of Tickets", type: "number", InputProps: { inputProps: { min: 1 } }, value: numberOfTickets, onChange: (e) => setNumberOfTickets(parseInt(e.target.value)) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: isGroupTicket, onChange: (e) => setIsGroupTicket(e.target.checked) }), label: "Group Ticket", sx: { mt: 3 } }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Card, { sx: { mt: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Price Summary" }), _jsx(Divider, { sx: { mb: 2 } }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 8, children: _jsxs(Typography, { children: [ticketType, " Ticket (", getCurrencySymbol(), getTicketPrice(), " x ", numberOfTickets, ")"] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Typography, { align: "right", children: [getCurrencySymbol(), getTotalPrice()] }) })] })] }) }) })] })] }));
            case 1:
                return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Visitor Information" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "visitor-type-label", children: "Visitor Type" }), _jsxs(Select, { labelId: "visitor-type-label", value: isLocal, label: "Visitor Type", onChange: (e) => setIsLocal(e.target.value === "true"), children: [_jsx(MenuItem, { value: "true", children: "Local" }), _jsx(MenuItem, { value: "false", children: "Non-Local" })] })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 2 }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: isGroupTicket
                                                ? "Contact Person Details"
                                                : "Visitor Details" }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Name", value: contactName, onChange: (e) => setContactName(e.target.value), required: isGroupTicket || !isLocal }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Email", type: "email", value: contactEmail, onChange: (e) => setContactEmail(e.target.value), required: isGroupTicket || !isLocal }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Phone", value: contactPhone, onChange: (e) => setContactPhone(e.target.value), required: isGroupTicket || !isLocal }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Alert, { severity: "info", sx: { mt: 2 }, children: isLocal
                                            ? "For local visitors, personal information is optional unless it's a group ticket."
                                            : "For non-local visitors, personal information is mandatory for all ticket types." }) })] })] }));
            case 2:
                return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Ticket Summary" }), _jsx(Card, { sx: { mb: 3 }, children: _jsx(CardContent, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Ticket Type" }), _jsxs(Typography, { variant: "body1", children: [ticketType, " ", isGroupTicket ? "(Group)" : ""] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Number of Tickets" }), _jsx(Typography, { variant: "body1", children: numberOfTickets })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Visit Date" }), _jsx(Typography, { variant: "body1", children: visitDate?.toLocaleDateString() })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Expiration Date" }), _jsx(Typography, { variant: "body1", children: expirationDate?.toLocaleDateString() })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Visitor Type" }), _jsx(Typography, { variant: "body1", children: isLocal ? "Local" : "Non-Local" })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Total Price" }), _jsxs(Typography, { variant: "body1", fontWeight: "bold", children: [getCurrencySymbol(), getTotalPrice()] })] }), (isGroupTicket || !isLocal) && (_jsxs(_Fragment, { children: [_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 1 } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: isGroupTicket
                                                                ? "Contact Person"
                                                                : "Visitor Information" })] }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Typography, { variant: "body1", children: contactName }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Typography, { variant: "body1", children: contactEmail }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Typography, { variant: "body1", children: contactPhone }) })] }))] }) }) }), _jsx(Alert, { severity: "info", sx: { mb: 3 }, children: "Please confirm the ticket details before proceeding. Once created, the ticket will be available for the visitor." })] }));
            default:
                return null;
        }
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Ticket Creation" }), _jsx(Paper, { sx: { p: 3, mb: 4 }, children: success ? (_jsxs(Box, { sx: { textAlign: "center", py: 3 }, children: [_jsx(Alert, { severity: "success", sx: { mb: 3 }, children: "Ticket created successfully!" }), _jsx(Box, { sx: { display: "flex", justifyContent: "center", mb: 3 }, children: _jsx(Card, { sx: { maxWidth: 300, p: 3 }, children: _jsxs(CardContent, { children: [_jsx(QrCodeIcon, { sx: {
                                                fontSize: 120,
                                                color: "primary.main",
                                                display: "block",
                                                mx: "auto",
                                                mb: 2,
                                            } }), _jsxs(Typography, { variant: "body2", align: "center", sx: { mb: 2 }, children: ["QR Code: ", qrCode] }), _jsxs(Typography, { variant: "body1", align: "center", fontWeight: "bold", children: [ticketType, " Ticket"] }), _jsxs(Typography, { variant: "body2", align: "center", children: ["Valid until: ", expirationDate?.toLocaleDateString()] })] }) }) }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleReset, startIcon: _jsx(ConfirmationNumberIcon, {}), children: "Create Another Ticket" })] })) : (_jsxs(_Fragment, { children: [_jsx(Stepper, { activeStep: activeStep, sx: { mb: 4 }, children: steps.map((label) => (_jsx(Step, { children: _jsx(StepLabel, { children: label }) }, label))) }), renderStepContent(activeStep), _jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mt: 3 }, children: [_jsx(Button, { disabled: activeStep === 0, onClick: handleBack, children: "Back" }), _jsx(Button, { variant: "contained", onClick: handleNext, children: activeStep === steps.length - 1 ? "Create Ticket" : "Next" })] })] })) })] }));
};
export default TicketCreation;
