import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button, Paper, Container, } from "@mui/material";
import TicketTypeSelection from "./steps/TicketTypeSelection";
import RulesAgreement from "./steps/RulesAgreement";
import DateTimeSelection from "./steps/DateTimeSelection";
import VisitorTypeSelection from "./steps/VisitorTypeSelection";
import PersonalInformation from "./steps/PersonalInformation";
import Payment from "./steps/Payment";
import Confirmation from "./steps/Confirmation";
import { Currency } from "@/lib/types";
const steps = [
    "Select Ticket Type",
    "Rules & Regulations",
    "Date & Time",
    "Visitor Information",
    "Personal Details",
    "Payment",
    "Confirmation",
];
const TicketPurchaseFlow = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [purchaseData, setPurchaseData] = useState({
        ticketType: null,
        isVIP: false,
        rulesAgreed: false,
        visitDate: null,
        visitTime: "",
        eventId: null,
        isLocal: true,
        numberOfTickets: 1,
        isGroupTicket: false,
        personalInfo: {
            name: "",
            email: "",
            phone: "",
            nationality: "",
        },
        subscribeToNewsletter: false,
        paymentMethod: "",
        currency: Currency.USD,
        paymentComplete: false,
        transactionId: null,
    });
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const updatePurchaseData = (newData) => {
        setPurchaseData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (_jsx(TicketTypeSelection, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 1:
                return (_jsx(RulesAgreement, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 2:
                return (_jsx(DateTimeSelection, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 3:
                return (_jsx(VisitorTypeSelection, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 4:
                return (_jsx(PersonalInformation, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 5:
                return (_jsx(Payment, { purchaseData: purchaseData, updatePurchaseData: updatePurchaseData }));
            case 6:
                return _jsx(Confirmation, { purchaseData: purchaseData });
            default:
                return "Unknown step";
        }
    };
    const isNextDisabled = () => {
        switch (activeStep) {
            case 0:
                return !purchaseData.ticketType;
            case 1:
                return !purchaseData.rulesAgreed;
            case 2:
                return !purchaseData.visitDate || !purchaseData.visitTime;
            case 3:
                return purchaseData.numberOfTickets < 1;
            case 4:
                if (!purchaseData.isLocal) {
                    return (!purchaseData.personalInfo.name ||
                        !purchaseData.personalInfo.email ||
                        !purchaseData.personalInfo.phone ||
                        !purchaseData.personalInfo.nationality);
                }
                if (purchaseData.isGroupTicket) {
                    return (!purchaseData.personalInfo.name || !purchaseData.personalInfo.phone);
                }
                return false;
            case 5:
                return !purchaseData.paymentComplete;
            default:
                return false;
        }
    };
    return (_jsx(Container, { maxWidth: "lg", children: _jsxs(Paper, { elevation: 0, sx: { p: 4, mb: 4 }, children: [_jsx(Typography, { variant: "h4", align: "center", gutterBottom: true, children: "Museum Ticket Purchase" }), _jsx(Stepper, { activeStep: activeStep, alternativeLabel: true, sx: { mb: 4 }, children: steps.map((label) => (_jsx(Step, { children: _jsx(StepLabel, { children: label }) }, label))) }), _jsxs(Box, { children: [getStepContent(activeStep), _jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mt: 4 }, children: [_jsx(Button, { variant: "outlined", disabled: activeStep === 0, onClick: handleBack, children: "Back" }), activeStep === steps.length - 1 ? (_jsx(Button, { variant: "contained", color: "primary", onClick: () => (window.location.href = "/"), children: "Finish" })) : (_jsx(Button, { variant: "contained", color: "primary", onClick: handleNext, disabled: isNextDisabled(), children: activeStep === steps.length - 2 ? "Complete Purchase" : "Next" }))] })] })] }) }));
};
export default TicketPurchaseFlow;
