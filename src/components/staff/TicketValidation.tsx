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
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import { mockTickets } from "@/lib/mockData";
import { Ticket } from "@/lib/types";

const TicketValidation = () => {
  const [qrCode, setQrCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null>(null);
  const [validationHistory, setValidationHistory] = useState<
    {
      timestamp: Date;
      qrCode: string;
      valid: boolean;
    }[]
  >([]);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [randomCheckMode, setRandomCheckMode] = useState(false);

  const handleQrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleValidateTicket = (code: string = qrCode) => {
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
      } else if (new Date(ticket.expirationDate) < new Date()) {
        result = {
          valid: false,
          message: "This ticket has expired.",
          ticket,
        };
      } else {
        result = {
          valid: true,
          message: "Ticket is valid.",
          ticket,
        };

        // Mark ticket as used (in a real app, this would update the database)
        ticket.isUsed = true;
      }
    } else {
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
    const randomMessage =
      Math.random() > 0.7
        ? "Please approach the visitor with the red jacket in the Egyptian exhibit."
        : "Please approach the family group near the entrance of the Modern Art gallery.";

    setValidationResult({
      valid: true,
      message: randomMessage,
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Ticket Validation
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">
                {randomCheckMode ? "Random Ticket Check" : "Scan QR Code"}
              </Typography>
              <Button
                variant={randomCheckMode ? "contained" : "outlined"}
                color={randomCheckMode ? "secondary" : "primary"}
                startIcon={<ShuffleIcon />}
                onClick={handleToggleRandomCheckMode}
              >
                {randomCheckMode ? "Exit Random Mode" : "Random Check Mode"}
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {randomCheckMode ? (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Typography paragraph>
                  Random check mode allows you to verify tickets from randomly
                  selected visitors to ensure compliance.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleRandomCheck}
                  sx={{ mt: 2 }}
                >
                  Generate Random Check
                </Button>
              </Box>
            ) : (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="QR Code"
                  value={qrCode}
                  onChange={handleQrCodeChange}
                  disabled={scanning}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        color="primary"
                        onClick={handleScanQrCode}
                        disabled={scanning}
                      >
                        <QrCodeScannerIcon />
                      </IconButton>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleScanQrCode}
                    disabled={scanning}
                    startIcon={<QrCodeScannerIcon />}
                  >
                    {scanning ? "Scanning..." : "Scan QR Code"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleValidateTicket()}
                    disabled={scanning || !qrCode}
                  >
                    Validate Ticket
                  </Button>
                </Box>
              </>
            )}

            {validationResult && (
              <Box sx={{ mt: 4 }}>
                <Alert
                  severity={validationResult.valid ? "success" : "error"}
                  icon={
                    validationResult.valid ? (
                      <CheckCircleIcon />
                    ) : (
                      <CancelIcon />
                    )
                  }
                  sx={{ mb: 2 }}
                >
                  {validationResult.message}
                </Alert>

                {validationResult.ticket && (
                  <Card variant="outlined" sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Ticket Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Ticket Type
                          </Typography>
                          <Typography variant="body1">
                            {validationResult.ticket.type}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Group Ticket
                          </Typography>
                          <Typography variant="body1">
                            {validationResult.ticket.isGroupTicket
                              ? "Yes"
                              : "No"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Visit Date
                          </Typography>
                          <Typography variant="body1">
                            {new Date(
                              validationResult.ticket.visitDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Expiration Date
                          </Typography>
                          <Typography variant="body1">
                            {new Date(
                              validationResult.ticket.expirationDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        {validationResult.ticket.isGroupTicket &&
                          validationResult.ticket.contactPersonDetails && (
                            <>
                              <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Contact Person
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body1">
                                  {
                                    validationResult.ticket.contactPersonDetails
                                      .name
                                  }{" "}
                                  |{" "}
                                  {
                                    validationResult.ticket.contactPersonDetails
                                      .email
                                  }{" "}
                                  |{" "}
                                  {
                                    validationResult.ticket.contactPersonDetails
                                      .phone
                                  }
                                </Typography>
                              </Grid>
                            </>
                          )}
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button variant="outlined" onClick={handleClearResult}>
                    Clear Result
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Recent Validations</Typography>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                onClick={handleOpenHistoryDialog}
                disabled={validationHistory.length === 0}
              >
                View Full History
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {validationHistory.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No validation history yet.
              </Typography>
            ) : (
              <List>
                {validationHistory.slice(0, 5).map((validation, index) => (
                  <ListItem
                    key={index}
                    divider={index < Math.min(validationHistory.length, 5) - 1}
                  >
                    <ListItemText
                      primary={validation.qrCode}
                      secondary={validation.timestamp.toLocaleTimeString()}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={validation.valid ? "Valid" : "Invalid"}
                        color={validation.valid ? "success" : "error"}
                        size="small"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>

          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Validation Guidelines
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Follow these steps when validating tickets:
              </Typography>
              <Box component="ol" sx={{ pl: 2, mb: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Scan the QR code on the visitor's ticket or enter it
                    manually.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Verify that the ticket is valid and has not expired.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    For group tickets, confirm that the contact person is
                    present.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Conduct random checks throughout the day to ensure
                    compliance.
                  </Typography>
                </Box>
              </Box>
              <Alert severity="info">
                Remember to be courteous and professional when interacting with
                visitors, especially during random checks.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Validation History Dialog */}
      <Dialog
        open={openHistoryDialog}
        onClose={handleCloseHistoryDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Validation History</DialogTitle>
        <DialogContent>
          <List>
            {validationHistory.map((validation, index) => (
              <ListItem
                key={index}
                divider={index < validationHistory.length - 1}
              >
                <ListItemText
                  primary={validation.qrCode}
                  secondary={`${validation.timestamp.toLocaleDateString()} ${validation.timestamp.toLocaleTimeString()}`}
                />
                <ListItemSecondaryAction>
                  <Chip
                    label={validation.valid ? "Valid" : "Invalid"}
                    color={validation.valid ? "success" : "error"}
                    size="small"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketValidation;
