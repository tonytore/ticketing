import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Button,
  Alert,
  InputAdornment,
  CircularProgress,
  TextField,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Currency } from "@/lib/types";

const Payment = ({ purchaseData, updatePurchaseData }) => {
  const [paymentMethod, setPaymentMethod] = useState(
    purchaseData.paymentMethod || ""
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [currency, setCurrency] = useState(
    purchaseData.currency || Currency.USD
  );
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(
    purchaseData.paymentComplete || false
  );
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

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Payment
      </Typography>

      {!paymentComplete ? (
        <>
          <Typography variant="body1" paragraph>
            Please select your preferred payment method and currency to complete
            your purchase.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: paymentMethod === "credit_card" ? 2 : 1,
                            borderColor:
                              paymentMethod === "credit_card"
                                ? "primary.main"
                                : "divider",
                          }}
                        >
                          <FormControlLabel
                            value="credit_card"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" component="div">
                                  Credit / Debit Card
                                  <CreditCardIcon
                                    sx={{ ml: 1, verticalAlign: "middle" }}
                                  />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Pay securely with your card
                                </Typography>
                              </Box>
                            }
                            sx={{
                              width: "100%",
                              alignItems: "flex-start",
                              m: 0,
                            }}
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: paymentMethod === "bank_transfer" ? 2 : 1,
                            borderColor:
                              paymentMethod === "bank_transfer"
                                ? "primary.main"
                                : "divider",
                          }}
                        >
                          <FormControlLabel
                            value="bank_transfer"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" component="div">
                                  Bank Transfer
                                  <AccountBalanceIcon
                                    sx={{ ml: 1, verticalAlign: "middle" }}
                                  />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Pay via bank transfer
                                </Typography>
                              </Box>
                            }
                            sx={{
                              width: "100%",
                              alignItems: "flex-start",
                              m: 0,
                            }}
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: paymentMethod === "paypal" ? 2 : 1,
                            borderColor:
                              paymentMethod === "paypal"
                                ? "primary.main"
                                : "divider",
                          }}
                        >
                          <FormControlLabel
                            value="paypal"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" component="div">
                                  PayPal
                                  <PaymentsIcon
                                    sx={{ ml: 1, verticalAlign: "middle" }}
                                  />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Pay with your PayPal account
                                </Typography>
                              </Box>
                            }
                            sx={{
                              width: "100%",
                              alignItems: "flex-start",
                              m: 0,
                            }}
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: paymentMethod === "cash" ? 2 : 1,
                            borderColor:
                              paymentMethod === "cash"
                                ? "primary.main"
                                : "divider",
                          }}
                        >
                          <FormControlLabel
                            value="cash"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" component="div">
                                  Pay at Museum
                                  <PaymentsIcon
                                    sx={{ ml: 1, verticalAlign: "middle" }}
                                  />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Pay in cash upon arrival
                                </Typography>
                              </Box>
                            }
                            sx={{
                              width: "100%",
                              alignItems: "flex-start",
                              m: 0,
                            }}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>

                {paymentMethod === "credit_card" && (
                  <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" gutterBottom>
                      Card Details
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Cardholder Name"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Expiry Date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SecurityIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {paymentMethod === "bank_transfer" && (
                  <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Alert severity="info">
                      <Typography variant="body2">
                        Please use the following bank details to complete your
                        transfer:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        <Box component="li">Bank: National Museum Bank</Box>
                        <Box component="li">Account Name: National Museum</Box>
                        <Box component="li">Account Number: 1234567890</Box>
                        <Box component="li">
                          Reference: Your Name + Visit Date
                        </Box>
                      </Box>
                    </Alert>
                  </Box>
                )}

                {paymentMethod === "paypal" && (
                  <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Alert severity="info">
                      <Typography variant="body2">
                        You will be redirected to PayPal to complete your
                        payment after clicking "Process Payment".
                      </Typography>
                    </Alert>
                  </Box>
                )}

                {paymentMethod === "cash" && (
                  <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Alert severity="info">
                      <Typography variant="body2">
                        Your tickets will be reserved, but payment must be made
                        in cash upon arrival at the museum. Please arrive at
                        least 15 minutes before your scheduled time.
                      </Typography>
                    </Alert>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Currency
                </Typography>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <RadioGroup
                    aria-label="currency"
                    name="currency"
                    value={currency}
                    onChange={handleCurrencyChange}
                    row
                  >
                    <FormControlLabel
                      value={Currency.LOCAL}
                      control={<Radio />}
                      label="Philippine Peso (₱)"
                    />
                    <FormControlLabel
                      value={Currency.USD}
                      control={<Radio />}
                      label="US Dollar ($)"
                    />
                    <FormControlLabel
                      value={Currency.POUND}
                      control={<Radio />}
                      label="British Pound (£)"
                    />
                    <FormControlLabel
                      value={Currency.EURO}
                      control={<Radio />}
                      label="Euro (€)"
                    />
                    <FormControlLabel
                      value={Currency.YEN}
                      control={<Radio />}
                      label="Japanese Yen (¥)"
                    />
                  </RadioGroup>
                </FormControl>

                {paymentError && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {paymentError}
                  </Alert>
                )}

                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleProcessPayment}
                    disabled={!paymentMethod || processing}
                    startIcon={
                      processing ? (
                        <CircularProgress size={20} />
                      ) : (
                        <PaymentsIcon />
                      )
                    }
                  >
                    {processing ? "Processing..." : "Process Payment"}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {purchaseData.isVIP ? "VIP" : "Regular"} Ticket
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      {getCurrencySymbol()}
                      {getTicketPrice().toFixed(2)}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body2">Quantity</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      {purchaseData.numberOfTickets}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      align="right"
                    >
                      {getCurrencySymbol()}
                      {getTotalPrice().toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      Your tickets will be sent to your email after successful
                      payment.
                    </Typography>
                  </Alert>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <CheckCircleIcon
            sx={{ fontSize: 80, color: "success.main", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" paragraph>
            Your payment has been processed successfully. Please proceed to the
            next step to complete your purchase.
          </Typography>
          <Alert severity="success" sx={{ mt: 2, mb: 4 }}>
            <Typography variant="body2">
              Transaction ID: {purchaseData.transactionId}
            </Typography>
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Payment;
