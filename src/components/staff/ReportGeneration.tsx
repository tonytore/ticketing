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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DeleteIcon from "@mui/icons-material/Delete";

import { mockTickets, mockEvents } from "@/lib/mockData";
import { TicketType, Currency, Ticket } from "@/lib/types";

interface ReportCriteria {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  ticketType?: TicketType;
  eventId?: string;
  isLocal?: boolean;
  format: "pdf" | "excel";
  includeCharts: boolean;
  includeRawData: boolean;
}

interface SavedReport {
  id: string;
  title: string;
  createdAt: Date;
  criteria: ReportCriteria;
}

interface ReportData {
  totalTickets: number;
  regularTickets: number;
  vipTickets: number;
  groupTickets: number;
  eventTickets: number;
  revenue: {
    [key in Currency]: number;
  };
  tickets: Ticket[];
}

const ReportGeneration = () => {
  const [criteria, setCriteria] = useState<ReportCriteria>({
    title: "",
    startDate: new Date(new Date().setDate(1)), // First day of current month
    endDate: new Date(),
    format: "pdf",
    includeCharts: true,
    includeRawData: true,
  });
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  const handleCriteriaChange = (
    field: keyof ReportCriteria,
    value: unknown
  ) => {
    setCriteria({
      ...criteria,
      [field]: value,
    });
  };

  const handleGenerateReport = () => {
    // In a real app, this would send data to an API to generate the report
    console.log("Generating report with criteria:", criteria);

    // Simulate report generation
    const filteredTickets = mockTickets.filter((ticket) => {
      const ticketDate = new Date(ticket.purchasedAt);
      const startDate = criteria.startDate
        ? new Date(criteria.startDate)
        : null;
      const endDate = criteria.endDate ? new Date(criteria.endDate) : null;

      let matchesDateRange = true;
      if (startDate && endDate) {
        matchesDateRange = ticketDate >= startDate && ticketDate <= endDate;
      }

      let matchesTicketType = true;
      if (criteria.ticketType) {
        matchesTicketType = ticket.type === criteria.ticketType;
      }

      let matchesEvent = true;
      if (criteria.eventId) {
        matchesEvent = ticket.eventId === criteria.eventId;
      }

      let matchesVisitorType = true;
      if (criteria.isLocal !== undefined) {
        matchesVisitorType = ticket.isLocal === criteria.isLocal;
      }

      return (
        matchesDateRange &&
        matchesTicketType &&
        matchesEvent &&
        matchesVisitorType
      );
    });

    // Generate report data
    const reportData: ReportData = {
      totalTickets: filteredTickets.length,
      regularTickets: filteredTickets.filter(
        (t) => t.type === TicketType.REGULAR
      ).length,
      vipTickets: filteredTickets.filter((t) => t.type === TicketType.VIP)
        .length,
      groupTickets: filteredTickets.filter((t) => t.isGroupTicket).length,
      eventTickets: filteredTickets.filter((t) => t.eventId).length,
      revenue: {
        [Currency.LOCAL]: filteredTickets.reduce((sum, ticket) => {
          const price = ticket.prices.find(
            (p) => p.currency === Currency.LOCAL
          );
          return sum + (price ? price.amount : 0);
        }, 0),
        [Currency.USD]: filteredTickets.reduce((sum, ticket) => {
          const price = ticket.prices.find((p) => p.currency === Currency.USD);
          return sum + (price ? price.amount : 0);
        }, 0),
        [Currency.POUND]: filteredTickets.reduce((sum, ticket) => {
          const price = ticket.prices.find(
            (p) => p.currency === Currency.POUND
          );
          return sum + (price ? price.amount : 0);
        }, 0),
        [Currency.EURO]: filteredTickets.reduce((sum, ticket) => {
          const price = ticket.prices.find((p) => p.currency === Currency.EURO);
          return sum + (price ? price.amount : 0);
        }, 0),
        [Currency.YEN]: filteredTickets.reduce((sum, ticket) => {
          const price = ticket.prices.find((p) => p.currency === Currency.YEN);
          return sum + (price ? price.amount : 0);
        }, 0),
      },
      tickets: filteredTickets,
    };

    setReportData(reportData);
    setReportGenerated(true);
  };

  const handleSaveReport = () => {
    // In a real app, this would save the report to the database
    const newReport: SavedReport = {
      id: `report-${Date.now()}`,
      title: criteria.title,
      createdAt: new Date(),
      criteria: { ...criteria },
    };

    setSavedReports([...savedReports, newReport]);

    // Show success message
    alert("Report saved successfully!");
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download the file
    console.log(`Exporting report in ${criteria.format} format`);

    // Show success message
    alert(`Report exported as ${criteria.format.toUpperCase()} successfully!`);
  };

  const handleOpenPreviewDialog = () => {
    setOpenPreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  const handleReset = () => {
    setCriteria({
      title: "",
      startDate: new Date(new Date().setDate(1)),
      endDate: new Date(),
      format: "pdf",
      includeCharts: true,
      includeRawData: true,
    });
    setReportGenerated(false);
    setReportData(null);
  };

  const handleDeleteSavedReport = (id: string) => {
    setSavedReports(savedReports.filter((report) => report.id !== id));
    alert("Report deleted successfully!");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Report Generation
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Report Criteria
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Report Title"
                  value={criteria.title}
                  onChange={(e) =>
                    handleCriteriaChange("title", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={criteria.startDate}
                    onChange={(newValue) =>
                      handleCriteriaChange("startDate", newValue)
                    }
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={criteria.endDate}
                    onChange={(newValue) =>
                      handleCriteriaChange("endDate", newValue)
                    }
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
                  <Select
                    labelId="ticket-type-label"
                    value={criteria.ticketType || ""}
                    label="Ticket Type"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        const newCriteria = { ...criteria };
                        delete newCriteria.ticketType;
                        setCriteria(newCriteria);
                      } else {
                        handleCriteriaChange(
                          "ticketType",
                          e.target.value as TicketType
                        );
                      }
                    }}
                  >
                    <MenuItem value="">All Tickets</MenuItem>
                    <MenuItem value={TicketType.REGULAR}>
                      Regular Tickets
                    </MenuItem>
                    <MenuItem value={TicketType.VIP}>VIP Tickets</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="event-label">Event</InputLabel>
                  <Select
                    labelId="event-label"
                    value={criteria.eventId || ""}
                    label="Event"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        const newCriteria = { ...criteria };
                        delete newCriteria.eventId;
                        setCriteria(newCriteria);
                      } else {
                        handleCriteriaChange("eventId", e.target.value);
                      }
                    }}
                  >
                    <MenuItem value="">All Events</MenuItem>
                    {mockEvents.map((event) => (
                      <MenuItem key={event.id} value={event.id}>
                        {event.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="visitor-type-label">Visitor Type</InputLabel>
                  <Select
                    labelId="visitor-type-label"
                    value={
                      criteria.isLocal === undefined
                        ? ""
                        : criteria.isLocal
                        ? "local"
                        : "nonlocal"
                    }
                    label="Visitor Type"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        const newCriteria = { ...criteria };
                        delete newCriteria.isLocal;
                        setCriteria(newCriteria);
                      } else {
                        handleCriteriaChange(
                          "isLocal",
                          e.target.value === "local"
                        );
                      }
                    }}
                  >
                    <MenuItem value="">All Visitors</MenuItem>
                    <MenuItem value="local">Local Visitors</MenuItem>
                    <MenuItem value="nonlocal">Non-Local Visitors</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Report Format
                  </Typography>
                </Divider>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteria.format === "pdf"}
                          onChange={() => handleCriteriaChange("format", "pdf")}
                          icon={<PictureAsPdfIcon />}
                          checkedIcon={<PictureAsPdfIcon />}
                        />
                      }
                      label="PDF"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteria.format === "excel"}
                          onChange={() =>
                            handleCriteriaChange("format", "excel")
                          }
                          icon={<TableChartIcon />}
                          checkedIcon={<TableChartIcon />}
                        />
                      }
                      label="Excel"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteria.includeCharts}
                          onChange={(e) =>
                            handleCriteriaChange(
                              "includeCharts",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Include Charts"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteria.includeRawData}
                          onChange={(e) =>
                            handleCriteriaChange(
                              "includeRawData",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Include Raw Data"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button variant="outlined" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleGenerateReport}
                    disabled={!criteria.title}
                    startIcon={<AssessmentIcon />}
                  >
                    Generate Report
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {reportGenerated && reportData && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Report Preview</Typography>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveReport}
                    sx={{ mr: 1 }}
                  >
                    Save Report
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportReport}
                  >
                    Export {criteria.format.toUpperCase()}
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h5" gutterBottom>
                {criteria.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                {criteria.startDate?.toLocaleDateString()} -{" "}
                {criteria.endDate?.toLocaleDateString()}
              </Typography>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Total Tickets
                      </Typography>
                      <Typography variant="h3">
                        {reportData.totalTickets}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Regular
                      </Typography>
                      <Typography variant="h3">
                        {reportData.regularTickets}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        VIP
                      </Typography>
                      <Typography variant="h3">
                        {reportData.vipTickets}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Group
                      </Typography>
                      <Typography variant="h3">
                        {reportData.groupTickets}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">Revenue Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Currency</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(reportData.revenue).map(
                          ([currency, amount]) => (
                            <TableRow key={currency}>
                              <TableCell>
                                {currency === Currency.LOCAL
                                  ? "Local Currency (₱)"
                                  : currency === Currency.USD
                                  ? "US Dollar ($)"
                                  : currency === Currency.POUND
                                  ? "British Pound (£)"
                                  : currency === Currency.EURO
                                  ? "Euro (€)"
                                  : currency === Currency.YEN
                                  ? "Japanese Yen (¥)"
                                  : currency}
                              </TableCell>
                              <TableCell align="right">
                                {currency === Currency.LOCAL
                                  ? "₱"
                                  : currency === Currency.USD
                                  ? "$"
                                  : currency === Currency.POUND
                                  ? "£"
                                  : currency === Currency.EURO
                                  ? "€"
                                  : currency === Currency.YEN
                                  ? "¥"
                                  : ""}
                                {amount}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              {criteria.includeCharts && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6">Charts</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom>
                              Ticket Distribution
                            </Typography>
                            <PieChartIcon
                              sx={{ fontSize: 100, color: "primary.main" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              Chart preview not available in this demo
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom>
                              Revenue by Currency
                            </Typography>
                            <BarChartIcon
                              sx={{ fontSize: 100, color: "secondary.main" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              Chart preview not available in this demo
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}

              {criteria.includeRawData && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography variant="h6">Raw Data</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button
                      variant="outlined"
                      onClick={handleOpenPreviewDialog}
                      startIcon={<TableChartIcon />}
                    >
                      View Data Table
                    </Button>
                  </AccordionDetails>
                </Accordion>
              )}
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Saved Reports
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {savedReports.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No saved reports yet.
              </Typography>
            ) : (
              <List>
                {savedReports.map((report) => (
                  <ListItem
                    key={report.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteSavedReport(report.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={report.title}
                      secondary={`Created: ${report.createdAt.toLocaleDateString()}`}
                    />
                    <Button
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() =>
                        alert(
                          `Exporting ${
                            report.title
                          } as ${report.criteria.format.toUpperCase()}`
                        )
                      }
                      sx={{ ml: 2 }}
                    >
                      Export
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>

          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Generation Tips
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Follow these tips for effective reports:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Use specific date ranges for more accurate data.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Include charts for visual representation of data.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Export as PDF for sharing with management.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Use Excel format for further data analysis.
                  </Typography>
                </Box>
              </Box>
              <Alert severity="info">
                Staff-generated reports are only visible to the staff member who
                created them and administrators.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Raw Data Preview Dialog */}
      <Dialog
        open={openPreviewDialog}
        onClose={handleClosePreviewDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Raw Data Preview</DialogTitle>
        <DialogContent>
          {reportData && reportData.tickets && (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell>Purchase Date</TableCell>
                    <TableCell>Visit Date</TableCell>
                    <TableCell>Price (USD)</TableCell>
                    <TableCell>Used</TableCell>
                    <TableCell>Local</TableCell>
                    <TableCell>Event ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>
                        {ticket.isGroupTicket ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.purchasedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.visitDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        $
                        {
                          ticket.prices.find((p) => p.currency === Currency.USD)
                            ?.amount
                        }
                      </TableCell>
                      <TableCell>{ticket.isUsed ? "Yes" : "No"}</TableCell>
                      <TableCell>{ticket.isLocal ? "Yes" : "No"}</TableCell>
                      <TableCell>{ticket.eventId || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportGeneration;
