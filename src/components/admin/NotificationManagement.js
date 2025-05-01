import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Fragment } from "react";
import { Box, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Chip, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import EventIcon from "@mui/icons-material/Event";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { mockNotifications } from "@/lib/mockData";
import { NotificationType, NotificationRecipient, } from "@/lib/types";
const NotificationManagement = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        type: NotificationType.ANNOUNCEMENT,
        recipients: NotificationRecipient.ALL,
        title: "",
        content: "",
    });
    const handleTabChange = (tabIndex) => {
        setCurrentTab(tabIndex);
    };
    const handleOpenDialog = (notification) => {
        if (notification) {
            setSelectedNotification(notification);
            setFormData({
                type: notification.type,
                recipients: notification.recipients,
                title: notification.title,
                content: notification.content,
            });
        }
        else {
            setSelectedNotification(null);
            setFormData({
                type: NotificationType.ANNOUNCEMENT,
                recipients: NotificationRecipient.ALL,
                title: "",
                content: "",
            });
        }
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleFormChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handleSaveNotification = () => {
        // In a real app, this would send data to an API
        console.log("Saving notification:", formData);
        if (selectedNotification) {
            // Update existing notification
            setNotifications(notifications.map((notification) => notification.id === selectedNotification.id
                ? {
                    ...notification,
                    ...formData,
                }
                : notification));
        }
        else {
            // Create new notification
            const newNotification = {
                id: (notifications.length + 1).toString(),
                ...formData,
                createdAt: new Date(),
                isRead: false,
                sentBy: "1", // Assuming admin ID is 1
            };
            setNotifications([...notifications, newNotification]);
        }
        handleCloseDialog();
    };
    const handleDeleteNotification = (notificationId) => {
        // In a real app, this would send data to an API
        const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
        setNotifications(updatedNotifications);
    };
    const getNotificationIcon = (type) => {
        switch (type) {
            case NotificationType.EVENT_CREATED:
            case NotificationType.EVENT_UPDATED:
            case NotificationType.EVENT_HIDDEN:
                return _jsx(EventIcon, {});
            case NotificationType.ANNOUNCEMENT:
                return _jsx(AnnouncementIcon, {});
            case NotificationType.TICKET_PURCHASED:
                return _jsx(ConfirmationNumberIcon, {});
            default:
                return _jsx(NotificationsIcon, {});
        }
    };
    const getRecipientIcon = (recipient) => {
        switch (recipient) {
            case NotificationRecipient.STAFF:
                return _jsx(PersonIcon, {});
            case NotificationRecipient.TOURISTS:
                return _jsx(GroupIcon, {});
            case NotificationRecipient.ALL:
                return _jsx(GroupIcon, {});
            default:
                return _jsx(GroupIcon, {});
        }
    };
    const filteredNotifications = notifications.filter((notification) => {
        if (currentTab === 0)
            return true; // All notifications
        if (currentTab === 1)
            return notification.type === NotificationType.ANNOUNCEMENT; // Announcements
        if (currentTab === 2)
            return (notification.type &&
                typeof notification.type === "string" &&
                notification.type.includes("EVENT")); // Event notifications
        if (currentTab === 3)
            return notification.type === NotificationType.TICKET_PURCHASED; // Ticket notifications
        return true;
    });
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", mb: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Notification Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(SendIcon, {}), onClick: () => handleOpenDialog(), children: "Create Notification" })] }), _jsx(Paper, { sx: { width: "100%", mb: 4 }, children: _jsx(Box, { sx: { borderBottom: 1, borderColor: "divider", p: 1 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 0 ? "contained" : "outlined", onClick: () => handleTabChange(0), children: "All Notifications" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 1 ? "contained" : "outlined", onClick: () => handleTabChange(1), startIcon: _jsx(AnnouncementIcon, {}), children: "Announcements" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 2 ? "contained" : "outlined", onClick: () => handleTabChange(2), startIcon: _jsx(EventIcon, {}), children: "Event Notifications" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: currentTab === 3 ? "contained" : "outlined", onClick: () => handleTabChange(3), startIcon: _jsx(ConfirmationNumberIcon, {}), children: "Ticket Notifications" }) })] }) }) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Total Notifications" }), _jsx(Typography, { variant: "h3", children: notifications.length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Announcements" }), _jsx(Typography, { variant: "h3", children: notifications.filter((notification) => notification.type === NotificationType.ANNOUNCEMENT).length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Event Notifications" }), _jsx(Typography, { variant: "h3", children: notifications.filter((notification) => notification.type &&
                                            typeof notification.type === "string" &&
                                            notification.type.includes("EVENT")).length })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Ticket Notifications" }), _jsx(Typography, { variant: "h3", children: notifications.filter((notification) => notification.type === NotificationType.TICKET_PURCHASED).length })] }) }) })] }), _jsx(Paper, { children: _jsx(List, { sx: { width: "100%", bgcolor: "background.paper" }, children: filteredNotifications.map((notification) => (_jsxs(ListItem, { alignItems: "flex-start", secondaryAction: _jsxs(Box, { children: [_jsx(IconButton, { edge: "end", "aria-label": "edit", onClick: () => handleOpenDialog(notification), children: _jsx(EditIcon, {}) }), _jsx(IconButton, { edge: "end", "aria-label": "delete", onClick: () => handleDeleteNotification(notification.id), children: _jsx(DeleteIcon, {}) })] }), sx: {
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            "&:last-child": {
                                borderBottom: "none",
                            },
                        }, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: {
                                        bgcolor: notification.type === NotificationType.ANNOUNCEMENT
                                            ? "primary.main"
                                            : notification.type &&
                                                typeof notification.type === "string" &&
                                                notification.type.includes("EVENT")
                                                ? "secondary.main"
                                                : "success.main",
                                    }, children: getNotificationIcon(notification.type) }) }), _jsx(ListItemText, { primary: _jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [_jsx(Typography, { variant: "h6", children: notification.title }), _jsx(Chip, { label: notification.type, size: "small", color: notification.type === NotificationType.ANNOUNCEMENT
                                                ? "primary"
                                                : notification.type &&
                                                    typeof notification.type === "string" &&
                                                    notification.type.includes("EVENT")
                                                    ? "secondary"
                                                    : "success" }), _jsx(Chip, { label: notification.recipients, size: "small", icon: getRecipientIcon(notification.recipients), variant: "outlined" })] }), secondary: _jsxs(Fragment, { children: [_jsx(Typography, { sx: { display: "block" }, component: "span", variant: "body1", color: "text.primary", children: notification.content }), _jsxs(Typography, { sx: { display: "block", mt: 1 }, component: "span", variant: "body2", color: "text.secondary", children: ["Sent on", " ", new Date(notification.createdAt).toLocaleDateString(), " \u2022", notification.isRead ? " Read" : " Unread"] })] }) })] }, notification.id))) }) }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: selectedNotification
                            ? "Edit Notification"
                            : "Create New Notification" }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 3, sx: { mt: 0 }, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "notification-type-label", children: "Notification Type" }), _jsxs(Select, { labelId: "notification-type-label", value: formData.type, label: "Notification Type", onChange: (e) => handleFormChange("type", e.target.value), children: [_jsx(MenuItem, { value: NotificationType.ANNOUNCEMENT, children: "Announcement" }), _jsx(MenuItem, { value: NotificationType.EVENT_CREATED, children: "Event Created" }), _jsx(MenuItem, { value: NotificationType.EVENT_UPDATED, children: "Event Updated" }), _jsx(MenuItem, { value: NotificationType.EVENT_HIDDEN, children: "Event Hidden" }), _jsx(MenuItem, { value: NotificationType.TICKET_PURCHASED, children: "Ticket Purchased" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { id: "notification-recipients-label", children: "Recipients" }), _jsxs(Select, { labelId: "notification-recipients-label", value: formData.recipients, label: "Recipients", onChange: (e) => handleFormChange("recipients", e.target.value), children: [_jsx(MenuItem, { value: NotificationRecipient.ALL, children: "All" }), _jsx(MenuItem, { value: NotificationRecipient.STAFF, children: "Staff Only" }), _jsx(MenuItem, { value: NotificationRecipient.TOURISTS, children: "Tourists Only" })] })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Notification Title", value: formData.title, onChange: (e) => handleFormChange("title", e.target.value) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, margin: "normal", label: "Notification Content", multiline: true, rows: 4, value: formData.content, onChange: (e) => handleFormChange("content", e.target.value) }) })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDialog, children: "Cancel" }), _jsx(Button, { onClick: handleSaveNotification, variant: "contained", startIcon: _jsx(SendIcon, {}), children: selectedNotification ? "Update" : "Send Notification" })] })] })] }));
};
export default NotificationManagement;
