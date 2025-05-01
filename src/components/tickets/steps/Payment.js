import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Grid, Paper, Divider, FormControlLabel, Radio, RadioGroup, FormControl, Button, Alert, InputAdornment, CircularProgress, TextField, } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Currency } from "@/lib/types";
const Payment = ({ purchaseData, updatePurchaseData }) => {
    const [paymentMethod, setPaymentMethod] = useState(purchaseData.paymentMethod || "");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [currency, setCurrency] = useState(purchaseData.currency || Currency.USD);
    const [processing, setProcessing] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(purchaseData.paymentComplete || false);
    const [paymentError, setPaymentError] = useState("");
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        updatePurchaseData({
            paymentMethod: event.target.value,
        });
    };
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        updatePurchaseData({
            currency: event.target.value,
        });
    };
    const handleProcessPayment = () => {
        // Validate payment details
        if (paymentMethod === "credit_card") {
            if (!cardNumber || !cardName || !expiryDate || !cvv) {
                setPaymentError("Please fill in all card details");
                return;
            }
            // Simple validation
            if (cardNumber.replace(/\s/g, "").length !== 16) {
                setPaymentError("Invalid card number");
                return;
            }
            if (cvv.length < 3) {
                setPaymentError("Invalid CVV");
                return;
            }
        }
        setPaymentError("");
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setPaymentComplete(true);
            updatePurchaseData({
                paymentMethod,
                currency,
                paymentComplete: true,
                transactionId: `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            });
        }, 2000);
    };
    const getTicketPrice = () => {
        // In a real app, this would fetch the price from the database
        const basePrice = purchaseData.isVIP ? 30 : 15;
        // Apply currency conversion
        switch (currency) {
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
    const getCurrencySymbol = () => {
        switch (currency) {
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
    const getTotalPrice = () => {
        return getTicketPrice() * purchaseData.numberOfTickets;
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Payment" }), !paymentComplete ? (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "body1", paragraph: true, children: "Please select your preferred payment method and currency to complete your purchase." }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 8, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3, mb: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Payment Method" }), _jsx(FormControl, { component: "fieldset", sx: { width: "100%" }, children: _jsx(RadioGroup, { "aria-label": "payment-method", name: "payment-method", value: paymentMethod, onChange: handlePaymentMethodChange, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Paper, { variant: "outlined", sx: {
                                                                    p: 2,
                                                                    border: paymentMethod === "credit_card" ? 2 : 1,
                                                                    borderColor: paymentMethod === "credit_card"
                                                                        ? "primary.main"
                                                                        : "divider",
                                                                }, children: _jsx(FormControlLabel, { value: "credit_card", control: _jsx(Radio, {}), label: _jsxs(Box, { children: [_jsxs(Typography, { variant: "subtitle1", component: "div", children: ["Credit / Debit Card", _jsx(CreditCardIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Pay securely with your card" })] }), sx: {
                                                                        width: "100%",
                                                                        alignItems: "flex-start",
                                                                        m: 0,
                                                                    } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Paper, { variant: "outlined", sx: {
                                                                    p: 2,
                                                                    border: paymentMethod === "bank_transfer" ? 2 : 1,
                                                                    borderColor: paymentMethod === "bank_transfer"
                                                                        ? "primary.main"
                                                                        : "divider",
                                                                }, children: _jsx(FormControlLabel, { value: "bank_transfer", control: _jsx(Radio, {}), label: _jsxs(Box, { children: [_jsxs(Typography, { variant: "subtitle1", component: "div", children: ["Bank Transfer", _jsx(AccountBalanceIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Pay via bank transfer" })] }), sx: {
                                                                        width: "100%",
                                                                        alignItems: "flex-start",
                                                                        m: 0,
                                                                    } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Paper, { variant: "outlined", sx: {
                                                                    p: 2,
                                                                    border: paymentMethod === "paypal" ? 2 : 1,
                                                                    borderColor: paymentMethod === "paypal"
                                                                        ? "primary.main"
                                                                        : "divider",
                                                                }, children: _jsx(FormControlLabel, { value: "paypal", control: _jsx(Radio, {}), label: _jsxs(Box, { children: [_jsxs(Typography, { variant: "subtitle1", component: "div", children: ["PayPal", _jsx(PaymentsIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Pay with your PayPal account" })] }), sx: {
                                                                        width: "100%",
                                                                        alignItems: "flex-start",
                                                                        m: 0,
                                                                    } }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Paper, { variant: "outlined", sx: {
                                                                    p: 2,
                                                                    border: paymentMethod === "cash" ? 2 : 1,
                                                                    borderColor: paymentMethod === "cash"
                                                                        ? "primary.main"
                                                                        : "divider",
                                                                }, children: _jsx(FormControlLabel, { value: "cash", control: _jsx(Radio, {}), label: _jsxs(Box, { children: [_jsxs(Typography, { variant: "subtitle1", component: "div", children: ["Pay at Museum", _jsx(PaymentsIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Pay in cash upon arrival" })] }), sx: {
                                                                        width: "100%",
                                                                        alignItems: "flex-start",
                                                                        m: 0,
                                                                    } }) }) })] }) }) }), paymentMethod === "credit_card" && (_jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Divider, { sx: { mb: 3 } }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Card Details" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Card Number", value: cardNumber, onChange: (e) => setCardNumber(e.target.value), placeholder: "1234 5678 9012 3456", InputProps: {
                                                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(CreditCardIcon, {}) })),
                                                                } }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Cardholder Name", value: cardName, onChange: (e) => setCardName(e.target.value), placeholder: "John Doe" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Expiry Date", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value), placeholder: "MM/YY" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "CVV", value: cvv, onChange: (e) => setCvv(e.target.value), placeholder: "123", type: "password", InputProps: {
                                                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SecurityIcon, {}) })),
                                                                } }) })] })] })), paymentMethod === "bank_transfer" && (_jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Divider, { sx: { mb: 3 } }), _jsxs(Alert, { severity: "info", children: [_jsx(Typography, { variant: "body2", children: "Please use the following bank details to complete your transfer:" }), _jsxs(Box, { component: "ul", sx: { pl: 2, mt: 1 }, children: [_jsx(Box, { component: "li", children: "Bank: National Museum Bank" }), _jsx(Box, { component: "li", children: "Account Name: National Museum" }), _jsx(Box, { component: "li", children: "Account Number: 1234567890" }), _jsx(Box, { component: "li", children: "Reference: Your Name + Visit Date" })] })] })] })), paymentMethod === "paypal" && (_jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Divider, { sx: { mb: 3 } }), _jsx(Alert, { severity: "info", children: _jsx(Typography, { variant: "body2", children: "You will be redirected to PayPal to complete your payment after clicking \"Process Payment\"." }) })] })), paymentMethod === "cash" && (_jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Divider, { sx: { mb: 3 } }), _jsx(Alert, { severity: "info", children: _jsx(Typography, { variant: "body2", children: "Your tickets will be reserved, but payment must be made in cash upon arrival at the museum. Please arrive at least 15 minutes before your scheduled time." }) })] })), _jsx(Divider, { sx: { my: 3 } }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Currency" }), _jsx(FormControl, { component: "fieldset", sx: { width: "100%" }, children: _jsxs(RadioGroup, { "aria-label": "currency", name: "currency", value: currency, onChange: handleCurrencyChange, row: true, children: [_jsx(FormControlLabel, { value: Currency.LOCAL, control: _jsx(Radio, {}), label: "Philippine Peso (\u20B1)" }), _jsx(FormControlLabel, { value: Currency.USD, control: _jsx(Radio, {}), label: "US Dollar ($)" }), _jsx(FormControlLabel, { value: Currency.POUND, control: _jsx(Radio, {}), label: "British Pound (\u00A3)" }), _jsx(FormControlLabel, { value: Currency.EURO, control: _jsx(Radio, {}), label: "Euro (\u20AC)" }), _jsx(FormControlLabel, { value: Currency.YEN, control: _jsx(Radio, {}), label: "Japanese Yen (\u00A5)" })] }) }), paymentError && (_jsx(Alert, { severity: "error", sx: { mt: 3 }, children: paymentError })), _jsx(Box, { sx: { mt: 3, display: "flex", justifyContent: "center" }, children: _jsx(Button, { variant: "contained", color: "primary", size: "large", onClick: handleProcessPayment, disabled: !paymentMethod || processing, startIcon: processing ? (_jsx(CircularProgress, { size: 20 })) : (_jsx(PaymentsIcon, {})), children: processing ? "Processing..." : "Process Payment" }) })] }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Order Summary" }), _jsx(Divider, { sx: { mb: 2 } }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 8, children: _jsxs(Typography, { variant: "body2", children: [purchaseData.isVIP ? "VIP" : "Regular", " Ticket"] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Typography, { variant: "body2", align: "right", children: [getCurrencySymbol(), getTicketPrice().toFixed(2)] }) }), _jsx(Grid, { item: true, xs: 8, children: _jsx(Typography, { variant: "body2", children: "Quantity" }) }), _jsx(Grid, { item: true, xs: 4, children: _jsx(Typography, { variant: "body2", align: "right", children: purchaseData.numberOfTickets }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 1 } }) }), _jsx(Grid, { item: true, xs: 8, children: _jsx(Typography, { variant: "subtitle1", fontWeight: "bold", children: "Total" }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Typography, { variant: "subtitle1", fontWeight: "bold", align: "right", children: [getCurrencySymbol(), getTotalPrice().toFixed(2)] }) })] }), _jsx(Box, { sx: { mt: 3 }, children: _jsx(Alert, { severity: "info", children: _jsx(Typography, { variant: "body2", children: "Your tickets will be sent to your email after successful payment." }) }) })] }) })] })] })) : (_jsxs(Box, { sx: { textAlign: "center", py: 3 }, children: [_jsx(CheckCircleIcon, { sx: { fontSize: 80, color: "success.main", mb: 2 } }), _jsx(Typography, { variant: "h5", gutterBottom: true, children: "Payment Successful!" }), _jsx(Typography, { variant: "body1", paragraph: true, children: "Your payment has been processed successfully. Please proceed to the next step to complete your purchase." }), _jsx(Alert, { severity: "success", sx: { mt: 2, mb: 4 }, children: _jsxs(Typography, { variant: "body2", children: ["Transaction ID: ", purchaseData.transactionId] }) })] }))] }));
};
export default Payment;
