import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import { mockTickets } from "@/lib/mockData";
import { Ticket, TicketType, Currency } from "@/lib/types";

interface TicketFormData {
  type: TicketType;
  prices: {
    [key in Currency]: number;
  };
  expirationDate: Date | null;
  isGroupTicket: boolean;
}

const TicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  console.log(setTickets);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<TicketFormData>({
    type: TicketType.REGULAR,
    prices: {
      [Currency.LOCAL]: 500,
      [Currency.USD]: 15,
      [Currency.POUND]: 12,
      [Currency.EURO]: 14,
      [Currency.YEN]: 2000,
    },
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isGroupTicket: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (field: keyof TicketFormData, value: unknown) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePriceChange = (currency: Currency, value: number) => {
    setFormData({
      ...formData,
      prices: {
        ...formData.prices,
        [currency]: value,
      },
    });
  };

  const handleSaveTicket = () => {
    // In a real app, this would send data to an API
    console.log("Saving ticket:", formData);
    handleCloseDialog();
  };

  const handleExportData = (format: "pdf" | "excel") => {
    // In a real app, this would generate and download the file
    console.log(`Exporting tickets in ${format} format`);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Management
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportData("pdf")}
            sx={{ mr: 1 }}
          >
            Export PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportData("excel")}
            sx={{ mr: 1 }}
          >
            Export Excel
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Create Ticket
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="ticket management tabs"
        >
          <Tab label="All Tickets" />
          <Tab label="Regular Tickets" />
          <Tab label="VIP Tickets" />
          <Tab label="Group Tickets" />
          <Tab label="Event Tickets" />
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Tickets
              </Typography>
              <Typography variant="h3">{tickets.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Regular Tickets
              </Typography>
              <Typography variant="h3">
                {
                  tickets.filter((ticket) => ticket.type === TicketType.REGULAR)
                    .length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                VIP Tickets
              </Typography>
              <Typography variant="h3">
                {
                  tickets.filter((ticket) => ticket.type === TicketType.VIP)
                    .length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Group Tickets
              </Typography>
              <Typography variant="h3">
                {tickets.filter((ticket) => ticket.isGroupTicket).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tickets table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Group Ticket</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .filter((ticket) => {
                if (currentTab === 0) return true;
                if (currentTab === 1) return ticket.type === TicketType.REGULAR;
                if (currentTab === 2) return ticket.type === TicketType.VIP;
                if (currentTab === 3) return ticket.isGroupTicket;
                if (currentTab === 4) return !!ticket.eventId;
                return true;
              })
              .map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.type}
                      color={
                        ticket.type === TicketType.VIP ? "secondary" : "primary"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    $
                    {
                      ticket.prices.find((p) => p.currency === Currency.USD)
                        ?.amount
                    }
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.expirationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ticket.isGroupTicket ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {new Date(ticket.purchasedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.visitDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ticket.isUsed ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Ticket Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
                <Select
                  labelId="ticket-type-label"
                  value={formData.type}
                  label="Ticket Type"
                  onChange={(e) => handleFormChange("type", e.target.value)}
                >
                  <MenuItem value={TicketType.REGULAR}>Regular</MenuItem>
                  <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="group-ticket-label">Group Ticket</InputLabel>
                <Select
                  labelId="group-ticket-label"
                  value={String(formData.isGroupTicket)} // Convert boolean to string
                  label="Group Ticket"
                  onChange={
                    (e) =>
                      handleFormChange(
                        "isGroupTicket",
                        e.target.value === "true"
                      ) // Convert back to boolean
                  }
                >
                  <MenuItem value="false">No</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Expiration Date"
                  value={formData.expirationDate}
                  onChange={(newValue) =>
                    handleFormChange("expirationDate", newValue)
                  }
                  slotProps={{
                    textField: { fullWidth: true, margin: "normal" },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Ticket Prices
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Local Price"
                type="number"
                value={formData.prices[Currency.LOCAL]}
                onChange={(e) =>
                  handlePriceChange(Currency.LOCAL, Number(e.target.value))
                }
                InputProps={{ startAdornment: "₱" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="USD Price"
                type="number"
                value={formData.prices[Currency.USD]}
                onChange={(e) =>
                  handlePriceChange(Currency.USD, Number(e.target.value))
                }
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Pound Price"
                type="number"
                value={formData.prices[Currency.POUND]}
                onChange={(e) =>
                  handlePriceChange(Currency.POUND, Number(e.target.value))
                }
                InputProps={{ startAdornment: "£" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Euro Price"
                type="number"
                value={formData.prices[Currency.EURO]}
                onChange={(e) =>
                  handlePriceChange(Currency.EURO, Number(e.target.value))
                }
                InputProps={{ startAdornment: "€" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Yen Price"
                type="number"
                value={formData.prices[Currency.YEN]}
                onChange={(e) =>
                  handlePriceChange(Currency.YEN, Number(e.target.value))
                }
                InputProps={{ startAdornment: "¥" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTicket} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketManagement;
