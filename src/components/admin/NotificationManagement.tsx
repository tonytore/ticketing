import { useState, Fragment } from "react";
import {
  Box,
  Typography,
  Paper,
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
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
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
import {
  Notification,
  NotificationType,
  NotificationRecipient,
} from "@/lib/types";

interface NotificationFormData {
  type: NotificationType;
  recipients: NotificationRecipient;
  title: string;
  content: string;
}

const NotificationManagement = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<NotificationFormData>({
    type: NotificationType.ANNOUNCEMENT,
    recipients: NotificationRecipient.ALL,
    title: "",
    content: "",
  });

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const handleOpenDialog = (notification?: Notification) => {
    if (notification) {
      setSelectedNotification(notification);
      setFormData({
        type: notification.type,
        recipients: notification.recipients,
        title: notification.title,
        content: notification.content,
      });
    } else {
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

  const handleFormChange = (
    field: keyof NotificationFormData,
    value: unknown
  ) => {
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
      setNotifications(
        notifications.map((notification) =>
          notification.id === selectedNotification.id
            ? {
                ...notification,
                ...formData,
              }
            : notification
        )
      );
    } else {
      // Create new notification
      const newNotification: Notification = {
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

  const handleDeleteNotification = (notificationId: string) => {
    // In a real app, this would send data to an API
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.EVENT_CREATED:
      case NotificationType.EVENT_UPDATED:
      case NotificationType.EVENT_HIDDEN:
        return <EventIcon />;
      case NotificationType.ANNOUNCEMENT:
        return <AnnouncementIcon />;
      case NotificationType.TICKET_PURCHASED:
        return <ConfirmationNumberIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getRecipientIcon = (recipient: NotificationRecipient) => {
    switch (recipient) {
      case NotificationRecipient.STAFF:
        return <PersonIcon />;
      case NotificationRecipient.TOURISTS:
        return <GroupIcon />;
      case NotificationRecipient.ALL:
        return <GroupIcon />;
      default:
        return <GroupIcon />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (currentTab === 0) return true; // All notifications
    if (currentTab === 1)
      return notification.type === NotificationType.ANNOUNCEMENT; // Announcements
    if (currentTab === 2)
      return (
        notification.type &&
        typeof notification.type === "string" &&
        notification.type.includes("EVENT")
      ); // Event notifications
    if (currentTab === 3)
      return notification.type === NotificationType.TICKET_PURCHASED; // Ticket notifications
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notification Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Notification
        </Button>
      </Box>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant={currentTab === 0 ? "contained" : "outlined"}
                onClick={() => handleTabChange(0)}
              >
                All Notifications
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 1 ? "contained" : "outlined"}
                onClick={() => handleTabChange(1)}
                startIcon={<AnnouncementIcon />}
              >
                Announcements
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 2 ? "contained" : "outlined"}
                onClick={() => handleTabChange(2)}
                startIcon={<EventIcon />}
              >
                Event Notifications
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentTab === 3 ? "contained" : "outlined"}
                onClick={() => handleTabChange(3)}
                startIcon={<ConfirmationNumberIcon />}
              >
                Ticket Notifications
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Notifications
              </Typography>
              <Typography variant="h3">{notifications.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Announcements
              </Typography>
              <Typography variant="h3">
                {
                  notifications.filter(
                    (notification) =>
                      notification.type === NotificationType.ANNOUNCEMENT
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Event Notifications
              </Typography>
              <Typography variant="h3">
                {
                  notifications.filter(
                    (notification) =>
                      notification.type &&
                      typeof notification.type === "string" &&
                      notification.type.includes("EVENT")
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ticket Notifications
              </Typography>
              <Typography variant="h3">
                {
                  notifications.filter(
                    (notification) =>
                      notification.type === NotificationType.TICKET_PURCHASED
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {filteredNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              alignItems="flex-start"
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenDialog(notification)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      notification.type === NotificationType.ANNOUNCEMENT
                        ? "primary.main"
                        : notification.type &&
                          typeof notification.type === "string" &&
                          notification.type.includes("EVENT")
                        ? "secondary.main"
                        : "success.main",
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6">{notification.title}</Typography>
                    <Chip
                      label={notification.type}
                      size="small"
                      color={
                        notification.type === NotificationType.ANNOUNCEMENT
                          ? "primary"
                          : notification.type &&
                            typeof notification.type === "string" &&
                            notification.type.includes("EVENT")
                          ? "secondary"
                          : "success"
                      }
                    />
                    <Chip
                      label={notification.recipients}
                      size="small"
                      icon={getRecipientIcon(notification.recipients)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >
                      {notification.content}
                    </Typography>
                    <Typography
                      sx={{ display: "block", mt: 1 }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Sent on{" "}
                      {new Date(notification.createdAt).toLocaleDateString()} •
                      {notification.isRead ? " Read" : " Unread"}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Create/Edit Notification Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedNotification
            ? "Edit Notification"
            : "Create New Notification"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="notification-type-label">
                  Notification Type
                </InputLabel>
                <Select
                  labelId="notification-type-label"
                  value={formData.type}
                  label="Notification Type"
                  onChange={(e) => handleFormChange("type", e.target.value)}
                >
                  <MenuItem value={NotificationType.ANNOUNCEMENT}>
                    Announcement
                  </MenuItem>
                  <MenuItem value={NotificationType.EVENT_CREATED}>
                    Event Created
                  </MenuItem>
                  <MenuItem value={NotificationType.EVENT_UPDATED}>
                    Event Updated
                  </MenuItem>
                  <MenuItem value={NotificationType.EVENT_HIDDEN}>
                    Event Hidden
                  </MenuItem>
                  <MenuItem value={NotificationType.TICKET_PURCHASED}>
                    Ticket Purchased
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="notification-recipients-label">
                  Recipients
                </InputLabel>
                <Select
                  labelId="notification-recipients-label"
                  value={formData.recipients}
                  label="Recipients"
                  onChange={(e) =>
                    handleFormChange("recipients", e.target.value)
                  }
                >
                  <MenuItem value={NotificationRecipient.ALL}>All</MenuItem>
                  <MenuItem value={NotificationRecipient.STAFF}>
                    Staff Only
                  </MenuItem>
                  <MenuItem value={NotificationRecipient.TOURISTS}>
                    Tourists Only
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Notification Title"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Notification Content"
                multiline
                rows={4}
                value={formData.content}
                onChange={(e) => handleFormChange("content", e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveNotification}
            variant="contained"
            startIcon={<SendIcon />}
          >
            {selectedNotification ? "Update" : "Send Notification"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationManagement;
