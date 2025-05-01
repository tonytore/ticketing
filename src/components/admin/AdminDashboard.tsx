import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import TicketManagement from "./TicketManagement";
import EventManagement from "./EventManagement";
import UserManagement from "./UserManagement";
import NotificationManagement from "./NotificationManagement";
import ReportManagement from "./ReportManagement";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
}

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Ticket Management" {...a11yProps(0)} />
            <Tab label="Event Management" {...a11yProps(1)} />
            <Tab label="User Management" {...a11yProps(2)} />
            <Tab label="Notification Management" {...a11yProps(3)} />
            <Tab label="Report Management" {...a11yProps(4)} />
          </Tabs>
        </Box>
      </Paper>

      <TabPanel value={value} index={0}>
        <TicketManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EventManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserManagement />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <NotificationManagement />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ReportManagement />
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard;
