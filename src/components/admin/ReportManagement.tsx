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
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";

import { mockReports } from "@/lib/mockData";
import { Report, TicketType } from "@/lib/types";

interface ReportFormData {
  title: string;
  criteria: {
    startDate: Date | null;
    endDate: Date | null;
    ticketType?: TicketType;
    eventId?: string;
    isLocal?: boolean;
  };
  format: "pdf" | "excel";
}

const ReportManagement = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<ReportFormData>({
    title: "",
    criteria: {
      startDate: new Date(new Date().setDate(1)), // First day of current month
      endDate: new Date(),
    },
    format: "pdf",
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

  const handleOpenViewDialog = (report: Report) => {
    setSelectedReport(report);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleFormChange = (field: keyof ReportFormData, value: unknown) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCriteriaChange = (
    field: keyof ReportFormData["criteria"],
    value: unknown
  ) => {
    setFormData({
      ...formData,
      criteria: {
        ...formData.criteria,
        [field]: value,
      },
    });
  };

  const handleGenerateReport = () => {
    // In a real app, this would send data to an API to generate the report
    console.log("Generating report:", formData);

    // Create new report
    const newReport: Report = {
      id: (reports.length + 1).toString(),
      title: formData.title,
      criteria: { ...formData.criteria },
      generatedBy: "1", // Assuming admin ID is 1
      createdAt: new Date(),
      data: {
        // Mock data for demonstration
        totalSales: Math.floor(Math.random() * 100) + 50,
        regularTickets: Math.floor(Math.random() * 70) + 30,
        vipTickets: Math.floor(Math.random() * 30) + 20,
        revenue: {
          local: Math.floor(Math.random() * 50000) + 10000,
          usd: Math.floor(Math.random() * 1500) + 300,
          pound: Math.floor(Math.random() * 1200) + 240,
          euro: Math.floor(Math.random() * 1400) + 280,
          yen: Math.floor(Math.random() * 200000) + 40000,
        },
      },
      format: formData.format,
    };

    setReports([...reports, newReport]);
    handleCloseDialog();
  };

  const handleDeleteReport = (reportId: string) => {
    // In a real app, this would send data to an API
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
  };

  const handleExportReport = (report: Report) => {
    // In a real app, this would generate and download the file
    console.log(`Exporting report ${report.id} in ${report.format} format`);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Generate New Report
        </Button>
      </Box>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="report tabs"
        >
          <Tab label="All Reports" />
          <Tab label="Ticket Reports" />
          <Tab label="Event Reports" />
          <Tab label="Visitor Reports" />
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Reports
              </Typography>
              <Typography variant="h3">{reports.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                PDF Reports
              </Typography>
              <Typography variant="h3">
                {reports.filter((report) => report.format === "pdf").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Excel Reports
              </Typography>
              <Typography variant="h3">
                {reports.filter((report) => report.format === "excel").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                This Month
              </Typography>
              <Typography variant="h3">
                {
                  reports.filter((report) => {
                    const reportDate = new Date(report.createdAt);
                    const now = new Date();
                    return (
                      reportDate.getMonth() === now.getMonth() &&
                      reportDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="reports table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date Range</TableCell>
              <TableCell>Generated By</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .filter((report) => {
                if (currentTab === 0) return true; // All reports
                if (currentTab === 1)
                  return report.title.toLowerCase().includes("ticket"); // Ticket reports
                if (currentTab === 2)
                  return report.title.toLowerCase().includes("event"); // Event reports
                if (currentTab === 3)
                  return report.title.toLowerCase().includes("visitor"); // Visitor reports
                return true;
              })
              .map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>
                    {report.criteria.startDate && report.criteria.endDate
                      ? `${new Date(
                          report.criteria.startDate
                        ).toLocaleDateString()} - ${new Date(
                          report.criteria.endDate
                        ).toLocaleDateString()}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {report.format === "pdf" ? (
                      <PictureAsPdfIcon color="error" />
                    ) : (
                      <TableChartIcon color="primary" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenViewDialog(report)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleExportReport(report)}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Generate Report Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Report Title"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Report Criteria
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.criteria.startDate}
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
                  value={formData.criteria.endDate}
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
                  value={formData.criteria.ticketType || ""}
                  label="Ticket Type"
                  onChange={(e) =>
                    handleCriteriaChange("ticketType", e.target.value)
                  }
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
                <InputLabel id="visitor-type-label">Visitor Type</InputLabel>
                <Select
                  labelId="visitor-type-label"
                  value={
                    formData.criteria.isLocal === undefined
                      ? ""
                      : formData.criteria.isLocal
                      ? "local"
                      : "nonlocal"
                  }
                  label="Visitor Type"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      const newCriteria = { ...formData.criteria };
                      delete newCriteria.isLocal;
                      setFormData({
                        ...formData,
                        criteria: newCriteria,
                      });
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
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Report Format
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.format === "pdf"}
                        onChange={() => handleFormChange("format", "pdf")}
                        icon={<PictureAsPdfIcon />}
                        checkedIcon={<PictureAsPdfIcon />}
                      />
                    }
                    label="PDF"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.format === "excel"}
                        onChange={() => handleFormChange("format", "excel")}
                        icon={<TableChartIcon />}
                        checkedIcon={<TableChartIcon />}
                      />
                    }
                    label="Excel"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleGenerateReport} variant="contained">
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>
              Report Details
              <IconButton
                aria-label="close"
                onClick={handleCloseViewDialog}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    {selectedReport.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      Generated on{" "}
                      {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </Typography>
                    {selectedReport.format === "pdf" ? (
                      <PictureAsPdfIcon color="error" fontSize="small" />
                    ) : (
                      <TableChartIcon color="primary" fontSize="small" />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">Report Criteria</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {selectedReport.criteria.startDate &&
                          selectedReport.criteria.endDate && (
                            <Grid item xs={12} md={6}>
                              <Typography>
                                <strong>Date Range:</strong>{" "}
                                {new Date(
                                  selectedReport.criteria.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  selectedReport.criteria.endDate
                                ).toLocaleDateString()}
                              </Typography>
                            </Grid>
                          )}
                        {selectedReport.criteria.ticketType && (
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <strong>Ticket Type:</strong>{" "}
                              {selectedReport.criteria.ticketType}
                            </Typography>
                          </Grid>
                        )}
                        {selectedReport.criteria.eventId && (
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <strong>Event ID:</strong>{" "}
                              {selectedReport.criteria.eventId}
                            </Typography>
                          </Grid>
                        )}
                        {selectedReport.criteria.isLocal !== undefined && (
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <strong>Visitor Type:</strong>{" "}
                              {selectedReport.criteria.isLocal
                                ? "Local"
                                : "Non-Local"}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography variant="h6">Report Data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {selectedReport.data && (
                        <Grid container spacing={3}>
                          {selectedReport.data.totalSales !== undefined && (
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Total Sales
                                  </Typography>
                                  <Typography variant="h3">
                                    {selectedReport.data.totalSales}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          )}

                          {selectedReport.data.regularTickets !== undefined && (
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Regular Tickets
                                  </Typography>
                                  <Typography variant="h3">
                                    {selectedReport.data.regularTickets}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          )}

                          {selectedReport.data.vipTickets !== undefined && (
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    VIP Tickets
                                  </Typography>
                                  <Typography variant="h3">
                                    {selectedReport.data.vipTickets}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          )}

                          {selectedReport.data.revenue && (
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ mt: 2 }}
                              >
                                Revenue
                              </Typography>
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Currency</TableCell>
                                      <TableCell align="right">
                                        Amount
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Object.entries(
                                      selectedReport.data.revenue
                                    ).map(([currency, amount]) => (
                                      <TableRow key={currency}>
                                        <TableCell component="th" scope="row">
                                          {currency.charAt(0).toUpperCase() +
                                            currency.slice(1)}
                                        </TableCell>
                                        <TableCell align="right">
                                          {currency === "usd"
                                            ? "$"
                                            : currency === "pound"
                                            ? "£"
                                            : currency === "euro"
                                            ? "€"
                                            : currency === "yen"
                                            ? "¥"
                                            : "₱"}
                                          {amount}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          )}

                          {selectedReport.data.totalAttendance && (
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ mt: 2 }}
                              >
                                Attendance
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6" gutterBottom>
                                        Total Attendance
                                      </Typography>
                                      <Typography variant="h3">
                                        {selectedReport.data.totalAttendance}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                {selectedReport.data.localVisitors && (
                                  <Grid item xs={12} md={4}>
                                    <Card>
                                      <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                          Local Visitors
                                        </Typography>
                                        <Typography variant="h3">
                                          {selectedReport.data.localVisitors}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                )}
                                {selectedReport.data.foreignVisitors && (
                                  <Grid item xs={12} md={4}>
                                    <Card>
                                      <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                          Foreign Visitors
                                        </Typography>
                                        <Typography variant="h3">
                                          {selectedReport.data.foreignVisitors}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleExportReport(selectedReport)}
                      sx={{ mr: 1 }}
                    >
                      Download Report
                    </Button>
                    <Button variant="outlined" onClick={handleCloseViewDialog}>
                      Close
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ReportManagement;
