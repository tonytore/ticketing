import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Alert,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1">
          Your museum tickets have been successfully booked. Please check your
          email for the ticket details.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5">Booking Details</Typography>
              <Chip
                label="Confirmed"
                color="success"
                icon={<CheckCircleIcon />}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Confirmation Number
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {confirmationNumber}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body1">
                  {purchaseData.transactionId || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  <EventIcon
                    sx={{ fontSize: "small", mr: 0.5, verticalAlign: "middle" }}
                  />
                  Visit Date
                </Typography>
                <Typography variant="body1">
                  {purchaseData.visitDate
                    ? purchaseData.visitDate.toLocaleDateString()
                    : "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  <AccessTimeIcon
                    sx={{ fontSize: "small", mr: 0.5, verticalAlign: "middle" }}
                  />
                  Visit Time
                </Typography>
                <Typography variant="body1">
                  {purchaseData.visitTime || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  <ConfirmationNumberIcon
                    sx={{ fontSize: "small", mr: 0.5, verticalAlign: "middle" }}
                  />
                  Ticket Type
                </Typography>
                <Typography variant="body1">
                  {purchaseData.isVIP ? "VIP" : "Regular"} Ticket
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  <PersonIcon
                    sx={{ fontSize: "small", mr: 0.5, verticalAlign: "middle" }}
                  />
                  Number of Tickets
                </Typography>
                <Typography variant="body1">
                  {purchaseData.numberOfTickets}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Visitor Information
                </Typography>
                <Typography variant="body1">
                  {purchaseData.personalInfo.name || "N/A"}
                </Typography>
                <Typography variant="body2">
                  {purchaseData.personalInfo.email || "N/A"} |{" "}
                  {purchaseData.personalInfo.phone || "N/A"}
                </Typography>
                {purchaseData.isGroupTicket && (
                  <Chip
                    label="Group Visit"
                    size="small"
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="body1">
                  {purchaseData.paymentMethod === "credit_card"
                    ? "Credit/Debit Card"
                    : purchaseData.paymentMethod === "bank_transfer"
                    ? "Bank Transfer"
                    : purchaseData.paymentMethod === "paypal"
                    ? "PayPal"
                    : purchaseData.paymentMethod === "cash"
                    ? "Pay at Museum"
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Important Information
            </Typography>

            <List>
              <ListItem>
                <ListItemText
                  primary="Arrival Time"
                  secondary="Please arrive at least 15 minutes before your scheduled time slot."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ticket Validation"
                  secondary="Present your QR code at the entrance for validation. Digital or printed tickets are accepted."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Cancellation Policy"
                  secondary="Tickets are non-refundable. Date changes may be accommodated with at least 48 hours notice."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Group Visits"
                  secondary="For group tickets, all members must enter together with the contact person present."
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              QR Code
            </Typography>

            <Box sx={{ textAlign: "center", py: 3 }}>
              <QrCodeIcon sx={{ fontSize: 150, color: "primary.main" }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {qrCodeData}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="outlined" startIcon={<PrintIcon />} size="small">
                Print
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                size="small"
              >
                Download
              </Button>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {purchaseData.isVIP ? "VIP" : "Regular"} Ticket x{" "}
                      {purchaseData.numberOfTickets}
                    </TableCell>
                    <TableCell align="right">
                      {getCurrencySymbol()}
                      {getTicketPrice().toFixed(2)} x{" "}
                      {purchaseData.numberOfTickets}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {getCurrencySymbol()}
                      {getTotalPrice().toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth startIcon={<EmailIcon />}>
                Email Receipt
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1">
            Thank you for your purchase! We look forward to welcoming you to our
            museum.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default Confirmation;
