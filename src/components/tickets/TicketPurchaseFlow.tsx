import { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Container,
} from "@mui/material";
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
        return (
          <TicketTypeSelection
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 1:
        return (
          <RulesAgreement
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 3:
        return (
          <VisitorTypeSelection
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 4:
        return (
          <PersonalInformation
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 5:
        return (
          <Payment
            purchaseData={purchaseData}
            updatePurchaseData={updatePurchaseData}
          />
        );
      case 6:
        return <Confirmation purchaseData={purchaseData} />;
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
          return (
            !purchaseData.personalInfo.name ||
            !purchaseData.personalInfo.email ||
            !purchaseData.personalInfo.phone ||
            !purchaseData.personalInfo.nationality
          );
        }
        if (purchaseData.isGroupTicket) {
          return (
            !purchaseData.personalInfo.name || !purchaseData.personalInfo.phone
          );
        }
        return false;
      case 5:
        return !purchaseData.paymentComplete;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Museum Ticket Purchase
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = "/")}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                {activeStep === steps.length - 2 ? "Complete Purchase" : "Next"}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TicketPurchaseFlow;
