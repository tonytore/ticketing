import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Divider, Card, CardContent, CardActionArea, CardMedia, Alert, Slider, FormControlLabel, Switch, Chip, } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
const VisitorTypeSelection = ({ purchaseData, updatePurchaseData }) => {
    const handleLocalChange = (event) => {
        updatePurchaseData({
            isLocal: event.target.value === "local",
        });
    };
    const handleNumberOfTicketsChange = (event, newValue) => {
        updatePurchaseData({
            numberOfTickets: newValue,
        });
    };
    const handleGroupTicketChange = (event) => {
        updatePurchaseData({
            isGroupTicket: event.target.checked,
        });
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Visitor Information" }), _jsx(Typography, { variant: "body1", paragraph: true, children: "Please provide information about your visit to help us serve you better." }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Visitor Type" }), _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "visitor-type-label", children: "Select Visitor Type" }), _jsxs(Select, { labelId: "visitor-type-label", value: purchaseData.isLocal ? "local" : "nonlocal", label: "Select Visitor Type", onChange: handleLocalChange, children: [_jsx(MenuItem, { value: "local", children: _jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(HomeIcon, { sx: { mr: 1 } }), "Local Resident"] }) }), _jsx(MenuItem, { value: "nonlocal", children: _jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(PublicIcon, { sx: { mr: 1 } }), "Tourist / Non-Local"] }) })] })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 2 }, children: purchaseData.isLocal
                                        ? "Local residents may be eligible for special discounts. Proof of residency may be required at entry."
                                        : "Welcome to our museum! Non-local visitors must provide contact information for their visit." }), purchaseData.isLocal && (_jsx(Alert, { severity: "info", sx: { mt: 2 }, children: "Please bring a valid ID or proof of residency to verify your local status." }))] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Number of Tickets" }), _jsx(Box, { sx: { px: 2, pt: 2 }, children: _jsx(Slider, { value: purchaseData.numberOfTickets, onChange: handleNumberOfTicketsChange, "aria-labelledby": "number-of-tickets-slider", valueLabelDisplay: "on", step: 1, marks: true, min: 1, max: 10 }) }), _jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mt: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Minimum: 1" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Maximum: 10" })] }), _jsx(Divider, { sx: { my: 3 } }), _jsx(FormControlLabel, { control: _jsx(Switch, { checked: purchaseData.isGroupTicket, onChange: handleGroupTicketChange, name: "groupTicket" }), label: "This is a group visit" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1 }, children: "Group visits allow all members to enter together under a single contact person." }), purchaseData.isGroupTicket && (_jsx(Alert, { severity: "info", sx: { mt: 2 }, children: "For group visits, the contact person must be present with valid ID at the time of entry." }))] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 2 }, children: _jsx(Chip, { label: "Recommended Options" }) }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardActionArea, { onClick: () => updatePurchaseData({
                                    isLocal: true,
                                    numberOfTickets: 1,
                                    isGroupTicket: false,
                                }), children: [_jsx(CardMedia, { component: "img", height: "180", sx: { objectFit: "contain" }, image: "/images/individual-visit.png", alt: "Individual Visit" }), _jsxs(CardContent, { children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: ["Individual Visit", _jsx(PersonIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Perfect for solo visitors who want to explore at their own pace." }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Chip, { label: "1 Person", size: "small", sx: { mr: 1 } }), _jsx(Chip, { label: "Self-guided", size: "small" })] })] })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardActionArea, { onClick: () => updatePurchaseData({
                                    isLocal: true,
                                    numberOfTickets: 2,
                                    isGroupTicket: false,
                                }), children: [_jsx(CardMedia, { component: "img", height: "180", sx: { objectFit: "contain" }, image: "/images/couple-visit.png", alt: "Couple Visit" }), _jsxs(CardContent, { children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: ["Couple Visit", _jsx(PeopleIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Ideal for couples or friends who want to share the experience." }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Chip, { label: "2 People", size: "small", sx: { mr: 1 } }), _jsx(Chip, { label: "Self-guided", size: "small" })] })] })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { children: _jsxs(CardActionArea, { onClick: () => updatePurchaseData({
                                    isLocal: true,
                                    numberOfTickets: 5,
                                    isGroupTicket: true,
                                }), children: [_jsx(CardMedia, { component: "img", height: "180", sx: { objectFit: "contain" }, image: "/images/group-visit.png", alt: "Group Visit" }), _jsxs(CardContent, { children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: ["Group Visit", _jsx(GroupIcon, { sx: { ml: 1, verticalAlign: "middle" } })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Perfect for families or small groups visiting together." }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Chip, { label: "5 People", size: "small", sx: { mr: 1 } }), _jsx(Chip, { label: "Group Entry", size: "small", color: "primary" })] })] })] }) }) })] })] }));
};
export default VisitorTypeSelection;
