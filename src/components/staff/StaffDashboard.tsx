import { Box, Tabs, Tab, Paper } from "@mui/material";
import PasswordManagement from "./PasswordManagement";
import TicketCreation from "./TicketCreation";
import TicketValidation from "./TicketValidation";
import ReportGeneration from "./ReportGeneration";
import { useState } from "react";

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
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `staff-tab-${index}`,
    "aria-controls": `staff-tabpanel-${index}`,
  };
}

const StaffDashboard = () => {
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
            aria-label="staff dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Password Management" {...a11yProps(0)} />
            <Tab label="Ticket Creation" {...a11yProps(1)} />
            <Tab label="Ticket Validation" {...a11yProps(2)} />
            <Tab label="Report Generation" {...a11yProps(3)} />
          </Tabs>
        </Box>
      </Paper>

      <TabPanel value={value} index={0}>
        <PasswordManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TicketCreation />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TicketValidation />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ReportGeneration />
      </TabPanel>
    </Box>
  );
};

export default StaffDashboard;
