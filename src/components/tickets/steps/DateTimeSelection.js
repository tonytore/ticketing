import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Divider, Card, CardContent, Alert, Chip, } from "@mui/material";
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
    const [selectedDate, setSelectedDate] = useState(purchaseData.visitDate || null);
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
        }
        else {
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
        }
        else {
            updatePurchaseData({
                eventId: null,
            });
        }
    };
    // Calculate if selected date is a peak day (weekend or holiday)
    const isPeakDay = (date) => {
        if (!date)
            return false;
        // Weekends are peak days
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6)
            return true;
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
        if (!date)
            return "";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Select Date & Time" }), _jsx(Typography, { variant: "body1", paragraph: true, children: "Choose when you would like to visit the museum. Please note that the museum is closed on Mondays." }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsxs(Typography, { variant: "h6", gutterBottom: true, children: [_jsx(EventIcon, { sx: { mr: 1, verticalAlign: "middle" } }), "Visit Date"] }), _jsx(TextField, { fullWidth: true, label: "Select Date", type: "date", value: selectedDate ? selectedDate.toISOString().split("T")[0] : "", onChange: handleDateChange, InputLabelProps: {
                                        shrink: true,
                                    }, inputProps: {
                                        min: getTodayString(),
                                    }, helperText: "Museum is closed on Mondays", sx: { mt: 2 } }), selectedDate && (_jsxs(Box, { sx: { mt: 2 }, children: [_jsxs(Typography, { variant: "body2", children: ["Selected date: ", formatDate(selectedDate)] }), isPeakDay(selectedDate) ? (_jsx(Chip, { label: "Peak Day", color: "warning", icon: _jsx(InfoIcon, {}), sx: { mt: 1 } })) : (_jsx(Chip, { label: "Regular Day", color: "success", sx: { mt: 1 } }))] }))] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsxs(Typography, { variant: "h6", gutterBottom: true, children: [_jsx(AccessTimeIcon, { sx: { mr: 1, verticalAlign: "middle" } }), "Visit Time"] }), _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "time-slot-label", children: "Select Time Slot" }), _jsx(Select, { labelId: "time-slot-label", value: purchaseData.visitTime, label: "Select Time Slot", onChange: handleTimeChange, disabled: !selectedDate, children: availableTimeSlots.map((timeSlot) => (_jsx(MenuItem, { value: timeSlot, children: timeSlot }, timeSlot))) })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 2 }, children: "Please arrive 15 minutes before your selected time slot. Your ticket allows entry within 30 minutes of the selected time." })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: { my: 2 }, children: _jsx(Chip, { label: "OR" }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Paper, { variant: "outlined", sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Special Events" }), _jsx(Typography, { variant: "body2", paragraph: true, children: "Alternatively, you can select a special event to attend. Your visit date and time will be set according to the event schedule." }), _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "event-label", children: "Select Event (Optional)" }), _jsxs(Select, { labelId: "event-label", value: purchaseData.eventId || "", label: "Select Event (Optional)", onChange: handleEventChange, children: [_jsx(MenuItem, { value: "", children: "No Event" }), mockEvents
                                                    .filter((event) => new Date(event.startDate) > new Date()) // Only future events
                                                    .map((event) => (_jsxs(MenuItem, { value: event.id, children: [event.title, " -", " ", new Date(event.startDate).toLocaleDateString()] }, event.id)))] })] }), selectedEvent && (_jsx(Card, { variant: "outlined", sx: { mt: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: selectedEvent.title }), _jsx(Typography, { variant: "body2", paragraph: true, children: selectedEvent.description }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Date:" }), _jsx(Typography, { variant: "body1", children: new Date(selectedEvent.startDate).toLocaleDateString() })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Time:" }), _jsx(Typography, { variant: "body1", children: new Date(selectedEvent.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })] }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Location:" }), _jsx(Typography, { variant: "body1", children: selectedEvent.location })] })] })] }) }))] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Alert, { severity: "info", children: _jsx(Typography, { variant: "body2", children: "The museum is busiest between 11:00 AM and 2:00 PM. For a more relaxed experience, consider visiting during early morning or late afternoon hours." }) }) })] })] }));
};
export default DateTimeSelection;
