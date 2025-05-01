import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Card,
  CardContent,
  Alert,
  Chip,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";

import { mockEvents } from "@/lib/mockData";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const DateTimeSelection = ({ purchaseData, updatePurchaseData }) => {
  const [selectedDate, setSelectedDate] = useState(
    purchaseData.visitDate || null
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (event) => {
    const dateString = event.target.value;
    const newDate = dateString ? new Date(dateString) : null;

    setSelectedDate(newDate);
    updatePurchaseData({
      visitDate: newDate,
    });

    // In a real app, this would fetch available time slots for the selected date
    // Simulate different availability based on day of week
    const dayOfWeek = newDate ? newDate.getDay() : 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend
      setAvailableTimeSlots(timeSlots.filter((_, index) => index % 2 === 0)); // Less availability on weekends
    } else {
      setAvailableTimeSlots(timeSlots);
    }
  };

  const handleTimeChange = (event) => {
    updatePurchaseData({
      visitTime: event.target.value,
    });
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    const selectedEvent = eventId
      ? mockEvents.find((e) => e.id === eventId)
      : null;
    setSelectedEvent(selectedEvent);

    if (selectedEvent) {
      // If event selected, update date and time based on event
      const eventDate = new Date(selectedEvent.startDate);
      updatePurchaseData({
        visitDate: eventDate,
        visitTime: eventDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        eventId: eventId,
      });
      setSelectedDate(eventDate);
    } else {
      updatePurchaseData({
        eventId: null,
      });
    }
  };

  // Calculate if selected date is a peak day (weekend or holiday)
  const isPeakDay = (date) => {
    if (!date) return false;

    // Weekends are peak days
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;

    // Holidays would be checked here in a real app
    return false;
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Select Date & Time
      </Typography>

      <Typography variant="body1" paragraph>
        Choose when you would like to visit the museum. Please note that the
        museum is closed on Mondays.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Visit Date
            </Typography>

            <TextField
              fullWidth
              label="Select Date"
              type="date"
              value={
                selectedDate ? selectedDate.toISOString().split("T")[0] : ""
              }
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: getTodayString(),
              }}
              helperText="Museum is closed on Mondays"
              sx={{ mt: 2 }}
            />

            {selectedDate && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Selected date: {formatDate(selectedDate)}
                </Typography>
                {isPeakDay(selectedDate) ? (
                  <Chip
                    label="Peak Day"
                    color="warning"
                    icon={<InfoIcon />}
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Chip label="Regular Day" color="success" sx={{ mt: 1 }} />
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <AccessTimeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Visit Time
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
              <Select
                labelId="time-slot-label"
                value={purchaseData.visitTime}
                label="Select Time Slot"
                onChange={handleTimeChange}
                disabled={!selectedDate}
              >
                {availableTimeSlots.map((timeSlot) => (
                  <MenuItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Please arrive 15 minutes before your selected time slot. Your
              ticket allows entry within 30 minutes of the selected time.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Chip label="OR" />
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Special Events
            </Typography>

            <Typography variant="body2" paragraph>
              Alternatively, you can select a special event to attend. Your
              visit date and time will be set according to the event schedule.
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="event-label">Select Event (Optional)</InputLabel>
              <Select
                labelId="event-label"
                value={purchaseData.eventId || ""}
                label="Select Event (Optional)"
                onChange={handleEventChange}
              >
                <MenuItem value="">No Event</MenuItem>
                {mockEvents
                  .filter((event) => new Date(event.startDate) > new Date()) // Only future events
                  .map((event) => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.title} -{" "}
                      {new Date(event.startDate).toLocaleDateString()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {selectedEvent && (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedEvent.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Date:
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEvent.startDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Time:
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEvent.startDate).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Location:
                      </Typography>
                      <Typography variant="body1">
                        {selectedEvent.location}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="body2">
              The museum is busiest between 11:00 AM and 2:00 PM. For a more
              relaxed experience, consider visiting during early morning or late
              afternoon hours.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DateTimeSelection;
