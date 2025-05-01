import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Paper, Grid, Button, TextField, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tabs, Tab, Divider, Alert, Switch, FormControlLabel, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { EventStatus } from "@/lib/types";
import { mockEvents } from "@/lib/mockData";
const EventManagement = () => {
    const [events, setEvents] = useState(mockEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [filter, setFilter] = useState("all");
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
    const handleOpenDialog = (event = null) => {
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
        }
        else {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSwitchChange = (e) => {
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
        const newEvent = {
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
            setEvents(events.map((event) => event.id === selectedEvent.id
                ? {
                    ...event,
                    ...newEvent,
                }
                : event));
        }
        else {
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
    const handleDelete = (event) => {
        setSelectedEvent(event);
        setDeleteConfirmOpen(true);
    };
    const handleApprove = (event) => {
        setEvents(events.map((e) => e.id === event.id ? { ...e, status: EventStatus.APPROVED } : e));
    };
    const handleReject = (event) => {
        setEvents(events.map((e) => e.id === event.id ? { ...e, status: EventStatus.REJECTED } : e));
    };
    const handleToggleVisibility = (event) => {
        setEvents(events.map((e) => e.id === event.id ? { ...e, isPublic: !e.isPublic } : e));
    };
    const handleFilterChange = (event, // Specify the event type
    newValue) => {
        setFilter(newValue);
    };
    const filteredEvents = events.filter((event) => {
        if (filter === "all")
            return true;
        if (filter === "pending")
            return event.status === EventStatus.PENDING;
        if (filter === "approved")
            return event.status === EventStatus.APPROVED;
        if (filter === "rejected")
            return event.status === EventStatus.REJECTED;
        return true;
    });
    const getStatusChip = (status) => {
        switch (status) {
            case EventStatus.PENDING:
                return _jsx(Chip, { label: "Pending", color: "warning", size: "small" });
            case EventStatus.APPROVED:
                return (_jsx(Chip, { label: "Approved", color: "success", size: "small", icon: _jsx(CheckCircleIcon, {}) }));
            case EventStatus.REJECTED:
                return (_jsx(Chip, { label: "Rejected", color: "error", size: "small", icon: _jsx(CancelIcon, {}) }));
            default:
                return _jsx(Chip, { label: "Unknown", size: "small" });
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }, children: [_jsx(Typography, { variant: "h5", children: "Event Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => handleOpenDialog(), children: "Add New Event" })] }), _jsx(Paper, { sx: { mb: 3 }, children: _jsxs(Tabs, { value: filter, onChange: handleFilterChange, indicatorColor: "primary", textColor: "primary", variant: "fullWidth", children: [_jsx(Tab, { label: "All Events", value: "all" }), _jsx(Tab, { label: "Pending", value: "pending" }), _jsx(Tab, { label: "Approved", value: "approved" }), _jsx(Tab, { label: "Rejected", value: "rejected" })] }) }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Title" }), _jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Location" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { children: "Visibility" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: filteredEvents.map((event) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: event.title }), _jsx(TableCell, { children: new Date(event.startDate).toLocaleDateString() }), _jsx(TableCell, { children: event.location }), _jsx(TableCell, { children: getStatusChip(event.status) }), _jsx(TableCell, { children: event.isPublic ? (_jsx(Chip, { icon: _jsx(VisibilityIcon, {}), label: "Public", color: "primary", size: "small" })) : (_jsx(Chip, { icon: _jsx(VisibilityOffIcon, {}), label: "Hidden", variant: "outlined", size: "small" })) }), _jsxs(TableCell, { children: [_jsx(IconButton, { size: "small", onClick: () => handleOpenDialog(event), "aria-label": "edit", children: _jsx(EditIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => handleDelete(event), "aria-label": "delete", children: _jsx(DeleteIcon, { fontSize: "small" }) }), event.status === EventStatus.PENDING && (_jsxs(_Fragment, { children: [_jsx(IconButton, { size: "small", color: "success", onClick: () => handleApprove(event), "aria-label": "approve", children: _jsx(CheckCircleIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", color: "error", onClick: () => handleReject(event), "aria-label": "reject", children: _jsx(CancelIcon, { fontSize: "small" }) })] })), _jsx(IconButton, { size: "small", onClick: () => handleToggleVisibility(event), "aria-label": "toggle visibility", children: event.isPublic ? (_jsx(VisibilityOffIcon, { fontSize: "small" })) : (_jsx(VisibilityIcon, { fontSize: "small" })) })] })] }, event.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: selectedEvent ? "Edit Event" : "Add New Event" }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Event Title", name: "title", value: formData.title, onChange: handleInputChange, margin: "normal", required: true }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Description", name: "description", value: formData.description, onChange: handleInputChange, margin: "normal", multiline: true, rows: 4 }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Location", name: "location", value: formData.location, onChange: handleInputChange, margin: "normal" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Max Attendees", name: "maxAttendees", type: "number", value: formData.maxAttendees, onChange: handleInputChange, margin: "normal" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "Start Date", name: "startDate", type: "date", value: formData.startDate, onChange: handleInputChange, margin: "normal", InputLabelProps: {
                                            shrink: true,
                                        } }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(TextField, { fullWidth: true, label: "End Date", name: "endDate", type: "date", value: formData.endDate, onChange: handleInputChange, margin: "normal", InputLabelProps: {
                                            shrink: true,
                                        } }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 2 } }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Organizer Information" })] }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Organizer Name", name: "organizerName", value: formData.organizerName, onChange: handleInputChange, margin: "normal" }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Organizer Email", name: "organizerEmail", type: "email", value: formData.organizerEmail, onChange: handleInputChange, margin: "normal" }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(TextField, { fullWidth: true, label: "Organizer Phone", name: "organizerPhone", value: formData.organizerPhone, onChange: handleInputChange, margin: "normal" }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Divider, { sx: { my: 2 } }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Event Settings" })] }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControlLabel, { control: _jsx(Switch, { checked: formData.ticketsAvailable, onChange: handleSwitchChange, name: "ticketsAvailable", color: "primary" }), label: "Tickets Available" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControlLabel, { control: _jsx(Switch, { checked: formData.isPublic, onChange: handleSwitchChange, name: "isPublic", color: "primary" }), label: "Public Event" }) }), selectedEvent && (_jsx(Grid, { item: true, xs: 12, children: _jsxs(Alert, { severity: "info", sx: { mt: 2 }, children: ["Event Status: ", selectedEvent.status] }) }))] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDialog, children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, variant: "contained", color: "primary", children: selectedEvent ? "Update Event" : "Add Event" })] })] }), _jsxs(Dialog, { open: deleteConfirmOpen, onClose: handleDeleteCancel, children: [_jsx(DialogTitle, { children: "Confirm Delete" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: "Are you sure you want to delete this event? This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleDeleteCancel, children: "Cancel" }), _jsx(Button, { onClick: handleDeleteConfirm, color: "error", children: "Delete" })] })] })] }));
};
export default EventManagement;
