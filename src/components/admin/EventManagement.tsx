import { useState, ChangeEvent } from "react";

import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  Divider,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Event, EventStatus } from "@/lib/types";
import { mockEvents } from "@/lib/mockData";

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    maxAttendees: 0,
    ticketsAvailable: true,
    isPublic: true,
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
  });

  const handleOpenDialog = (event: Event | null = null) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().split("T")[0]
          : "",
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().split("T")[0]
          : "",
        maxAttendees: event.maxAttendees,
        ticketsAvailable: event.ticketsAvailable,
        isPublic: event.isPublic,
        organizerName: event.organizer.name,
        organizerEmail: event.organizer.email,
        organizerPhone: event.organizer.phone,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        maxAttendees: 100,
        ticketsAvailable: true,
        isPublic: true,
        organizerName: "",
        organizerEmail: "",
        organizerPhone: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // const handleSelectChange = (
  //   e: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const name = e.target.name as string;
  //   const value = e.target.value as string;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = () => {
    const newEvent: Event = {
      id: selectedEvent ? selectedEvent.id : `event-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
      endDate: formData.endDate ? new Date(formData.endDate) : new Date(),
      maxAttendees: formData.maxAttendees,
      ticketsAvailable: formData.ticketsAvailable,
      isPublic: formData.isPublic,
      status: selectedEvent ? selectedEvent.status : EventStatus.PENDING,
      organizer: {
        name: formData.organizerName,
        email: formData.organizerEmail,
        phone: formData.organizerPhone,
      },
      createdAt: selectedEvent ? selectedEvent.createdAt : new Date(),
      updatedAt: new Date(),
    };

    if (selectedEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                ...newEvent,
              }
            : event
        )
      );
    } else {
      // Add new event
      setEvents([...events, newEvent]);
    }

    handleCloseDialog();
  };

  const handleDeleteConfirm = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
    }
    setDeleteConfirmOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setDeleteConfirmOpen(true);
  };

  const handleApprove = (event: Event) => {
    setEvents(
      events.map((e) =>
        e.id === event.id ? { ...e, status: EventStatus.APPROVED } : e
      )
    );
  };

  const handleReject = (event: Event) => {
    setEvents(
      events.map((e) =>
        e.id === event.id ? { ...e, status: EventStatus.REJECTED } : e
      )
    );
  };

  const handleToggleVisibility = (event: Event) => {
    setEvents(
      events.map((e) =>
        e.id === event.id ? { ...e, isPublic: !e.isPublic } : e
      )
    );
  };

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    if (filter === "pending") return event.status === EventStatus.PENDING;
    if (filter === "approved") return event.status === EventStatus.APPROVED;
    if (filter === "rejected") return event.status === EventStatus.REJECTED;
    return true;
  });

  const getStatusChip = (status: EventStatus) => {
    switch (status) {
      case EventStatus.PENDING:
        return <Chip label="Pending" color="warning" size="small" />;
      case EventStatus.APPROVED:
        return (
          <Chip
            label="Approved"
            color="success"
            size="small"
            icon={<CheckCircleIcon />}
          />
        );
      case EventStatus.REJECTED:
        return (
          <Chip
            label="Rejected"
            color="error"
            size="small"
            icon={<CancelIcon />}
          />
        );
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Event Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Event
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Events" value="all" />
          <Tab label="Pending" value="pending" />
          <Tab label="Approved" value="approved" />
          <Tab label="Rejected" value="rejected" />
        </Tabs>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {new Date(event.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{getStatusChip(event.status)}</TableCell>
                <TableCell>
                  {event.isPublic ? (
                    <Chip
                      icon={<VisibilityIcon />}
                      label="Public"
                      color="primary"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<VisibilityOffIcon />}
                      label="Hidden"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(event)}
                    aria-label="edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => handleDelete(event)}
                    aria-label="delete"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>

                  {event.status === EventStatus.PENDING && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleApprove(event)}
                        aria-label="approve"
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleReject(event)}
                        aria-label="reject"
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}

                  <IconButton
                    size="small"
                    onClick={() => handleToggleVisibility(event)}
                    aria-label="toggle visibility"
                  >
                    {event.isPublic ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Event Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedEvent ? "Edit Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Attendees"
                name="maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Organizer Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Organizer Name"
                name="organizerName"
                value={formData.organizerName}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Organizer Email"
                name="organizerEmail"
                type="email"
                value={formData.organizerEmail}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Organizer Phone"
                name="organizerPhone"
                value={formData.organizerPhone}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Event Settings
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.ticketsAvailable}
                    onChange={handleSwitchChange}
                    name="ticketsAvailable"
                    color="primary"
                  />
                }
                label="Tickets Available"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={handleSwitchChange}
                    name="isPublic"
                    color="primary"
                  />
                }
                label="Public Event"
              />
            </Grid>

            {selectedEvent && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Event Status: {selectedEvent.status}
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEvent ? "Update Event" : "Add Event"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventManagement;
