import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";

import { TicketType, Currency } from "@/lib/types";

const TicketCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.REGULAR);
  const [isGroupTicket, setIsGroupTicket] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 30)) // 30 days from now
  );
  const [isLocal, setIsLocal] = useState(true);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [success, setSuccess] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const steps = ["Ticket Details", "Visitor Information", "Confirmation"];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleCreateTicket();
    } else {
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
    } else {
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ticket Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
                  <Select
                    labelId="ticket-type-label"
                    value={ticketType}
                    label="Ticket Type"
                    onChange={(e) =>
                      setTicketType(e.target.value as TicketType)
                    }
                  >
                    <MenuItem value={TicketType.REGULAR}>Regular</MenuItem>
                    <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={currency}
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                  >
                    <MenuItem value={Currency.LOCAL}>
                      Local Currency (₱)
                    </MenuItem>
                    <MenuItem value={Currency.USD}>US Dollar ($)</MenuItem>
                    <MenuItem value={Currency.POUND}>
                      British Pound (£)
                    </MenuItem>
                    <MenuItem value={Currency.EURO}>Euro (€)</MenuItem>
                    <MenuItem value={Currency.YEN}>Japanese Yen (¥)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Visit Date"
                    value={visitDate}
                    onChange={(newValue) => setVisitDate(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Expiration Date"
                    value={expirationDate}
                    onChange={(newValue) => setExpirationDate(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Number of Tickets"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isGroupTicket}
                      onChange={(e) => setIsGroupTicket(e.target.checked)}
                    />
                  }
                  label="Group Ticket"
                  sx={{ mt: 3 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Price Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography>
                          {ticketType} Ticket ({getCurrencySymbol()}
                          {getTicketPrice()} x {numberOfTickets})
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="right">
                          {getCurrencySymbol()}
                          {getTotalPrice()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Visitor Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="visitor-type-label">Visitor Type</InputLabel>
                  <Select
                    labelId="visitor-type-label"
                    value={isLocal}
                    label="Visitor Type"
                    onChange={(e) => setIsLocal(e.target.value === "true")}
                  >
                    <MenuItem value="true">Local</MenuItem>
                    <MenuItem value="false">Non-Local</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {isGroupTicket
                      ? "Contact Person Details"
                      : "Visitor Details"}
                  </Typography>
                </Divider>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required={isGroupTicket || !isLocal}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required={isGroupTicket || !isLocal}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required={isGroupTicket || !isLocal}
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  {isLocal
                    ? "For local visitors, personal information is optional unless it's a group ticket."
                    : "For non-local visitors, personal information is mandatory for all ticket types."}
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ticket Summary
            </Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Ticket Type
                    </Typography>
                    <Typography variant="body1">
                      {ticketType} {isGroupTicket ? "(Group)" : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Number of Tickets
                    </Typography>
                    <Typography variant="body1">{numberOfTickets}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Visit Date
                    </Typography>
                    <Typography variant="body1">
                      {visitDate?.toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Expiration Date
                    </Typography>
                    <Typography variant="body1">
                      {expirationDate?.toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Visitor Type
                    </Typography>
                    <Typography variant="body1">
                      {isLocal ? "Local" : "Non-Local"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Price
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {getCurrencySymbol()}
                      {getTotalPrice()}
                    </Typography>
                  </Grid>

                  {(isGroupTicket || !isLocal) && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {isGroupTicket
                            ? "Contact Person"
                            : "Visitor Information"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body1">{contactName}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body1">{contactEmail}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body1">{contactPhone}</Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>

            <Alert severity="info" sx={{ mb: 3 }}>
              Please confirm the ticket details before proceeding. Once created,
              the ticket will be available for the visitor.
            </Alert>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Ticket Creation
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        {success ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Ticket created successfully!
            </Alert>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Card sx={{ maxWidth: 300, p: 3 }}>
                <CardContent>
                  <QrCodeIcon
                    sx={{
                      fontSize: 120,
                      color: "primary.main",
                      display: "block",
                      mx: "auto",
                      mb: 2,
                    }}
                  />
                  <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                    QR Code: {qrCode}
                  </Typography>
                  <Typography variant="body1" align="center" fontWeight="bold">
                    {ticketType} Ticket
                  </Typography>
                  <Typography variant="body2" align="center">
                    Valid until: {expirationDate?.toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleReset}
              startIcon={<ConfirmationNumberIcon />}
            >
              Create Another Ticket
            </Button>
          </Box>
        ) : (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Create Ticket" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default TicketCreation;
