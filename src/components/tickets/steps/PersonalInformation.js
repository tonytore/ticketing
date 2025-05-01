import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Grid, Paper, TextField, Divider, FormControlLabel, Checkbox, Alert, InputAdornment, MenuItem, FormControl, InputLabel, Select, FormHelperText, } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";
const countries = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "PH", name: "Philippines" },
    { code: "OTHER", name: "Other" },
];
const PersonalInformation = ({ purchaseData, updatePurchaseData }) => {
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        nationality: false,
    });
    const handleChange = (field) => (event) => {
        const value = event.target.value;
        // Validate field
        let fieldError = false;
        if (field === "email" && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            fieldError = !emailRegex.test(value);
        }
        if (field === "phone" && value) {
            const phoneRegex = /^\+?[0-9\s\-()]{8,}$/;
            fieldError = !phoneRegex.test(value);
        }
        setErrors({
            ...errors,
            [field]: fieldError,
        });
        // Update purchase data
        updatePurchaseData({
            personalInfo: {
                ...purchaseData.personalInfo,
                [field]: value,
            },
        });
    };
    const handleSubscriptionChange = (event) => {
        updatePurchaseData({
            subscribeToNewsletter: event.target.checked,
        });
    };
    // Determine if fields are required based on visitor type
    const isFieldRequired = (field) => {
        if (!purchaseData.isLocal) {
            // Non-local visitors must provide all information
            return true;
        }
        if (purchaseData.isGroupTicket) {
            // Group tickets require contact information
            return field === "name" || field === "phone";
        }
        // Local individual visitors have optional fields
        return false;
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Personal Information" }), _jsx(Typography, { variant: "body1", paragraph: true, children: purchaseData.isLocal
                    ? "Please provide your contact information. For local individual visitors, this is optional but recommended."
                    : "Please provide your contact information. All fields are required for non-local visitors." }), _jsx(Paper, { variant: "outlined", sx: { p: 3, mb: 4 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Full Name", value: purchaseData.personalInfo.name, onChange: handleChange("name"), required: isFieldRequired("name"), error: errors.name, helperText: errors.name ? "Please enter a valid name" : "", InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(PersonIcon, {}) })),
                                } }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Email Address", type: "email", value: purchaseData.personalInfo.email, onChange: handleChange("email"), required: isFieldRequired("email"), error: errors.email, helperText: errors.email ? "Please enter a valid email address" : "", InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(EmailIcon, {}) })),
                                } }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Phone Number", value: purchaseData.personalInfo.phone, onChange: handleChange("phone"), required: isFieldRequired("phone"), error: errors.phone, helperText: errors.phone ? "Please enter a valid phone number" : "", InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(PhoneIcon, {}) })),
                                } }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, required: !purchaseData.isLocal, children: [_jsx(InputLabel, { id: "nationality-label", children: "Nationality" }), _jsx(Select, { labelId: "nationality-label", value: purchaseData.personalInfo.nationality || "", label: "Nationality", onChange: handleChange("nationality"), error: errors.nationality, startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(FlagIcon, {}) }), children: countries.map((country) => (_jsx(MenuItem, { value: country.name, children: country.name }, country.code))) }), errors.nationality && (_jsx(FormHelperText, { error: true, children: "Please select your nationality" }))] }) }), purchaseData.isGroupTicket && (_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 2 } }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Group Information" }), _jsx(Alert, { severity: "info", sx: { mb: 2 }, children: "As the contact person for this group, you will be responsible for all members of your group during the visit." }), _jsx(TextField, { fullWidth: true, label: "Group Name (Optional)", placeholder: "e.g., Smith Family, ABC School Group", InputProps: {
                                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(PublicIcon, {}) })),
                                    } })] })), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 2 } }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: purchaseData.subscribeToNewsletter || false, onChange: handleSubscriptionChange, name: "subscribeToNewsletter" }), label: "Subscribe to our newsletter for updates on exhibitions and events" })] })] }) }), _jsx(Alert, { severity: "info", children: _jsx(Typography, { variant: "body2", children: "Your personal information is protected under our Privacy Policy. We will only use your contact information for ticket-related communications unless you opt in to our newsletter." }) })] }));
};
export default PersonalInformation;
