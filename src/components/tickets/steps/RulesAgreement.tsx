import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoFoodIcon from "@mui/icons-material/NoFood";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const RulesAgreement = ({ purchaseData, updatePurchaseData }) => {
  const handleAgreementChange = (event) => {
    updatePurchaseData({
      rulesAgreed: event.target.checked,
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Museum Rules & Regulations
      </Typography>

      <Typography variant="body1" paragraph>
        Please read and agree to the following rules and regulations before
        proceeding with your ticket purchase.
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">General Rules</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Opening Hours"
                  secondary="The museum is open from 9:00 AM to 5:00 PM, Tuesday through Sunday. Last entry is at 4:00 PM."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhotoCameraIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Photography"
                  secondary="Photography is permitted in most areas for personal use only. Flash photography, tripods, and selfie sticks are not allowed in exhibition halls."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NoFoodIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Food and Drinks"
                  secondary="Food and drinks are not allowed in the exhibition areas. Water in closed containers is permitted."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VolumeOffIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Noise Level"
                  secondary="Please maintain a reasonable noise level. Mobile phones should be set to silent mode."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Ticket Policies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Ticket Validation"
                  secondary="Tickets are valid only for the date and time specified. Entry may be refused if you arrive outside your designated time slot."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Refunds and Exchanges"
                  secondary="Tickets are non-refundable. Date changes may be accommodated with at least 48 hours notice, subject to availability."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Group Tickets"
                  secondary="Group tickets require all members to enter together. The contact person must be present with valid ID."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">Safety and Security</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Bag Inspection"
                  secondary="All bags are subject to inspection upon entry. Large bags and luggage must be stored in the cloakroom."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Prohibited Items"
                  secondary="Weapons, sharp objects, and hazardous materials are strictly prohibited. Umbrellas must be left at the cloakroom."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Emergency Procedures"
                  secondary="In case of emergency, follow staff instructions and proceed to the nearest exit."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography variant="h6">Special Exhibitions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Access"
                  secondary="Special exhibitions may require separate tickets or VIP access. Please check exhibition details before your visit."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Time Slots"
                  secondary="Special exhibitions may have specific time slots to manage visitor flow. Please arrive at your designated time."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          By agreeing to these rules, you acknowledge that violation may result
          in being asked to leave the premises without refund.
        </Alert>

        <FormControlLabel
          control={
            <Checkbox
              checked={purchaseData.rulesAgreed}
              onChange={handleAgreementChange}
              name="rulesAgreed"
            />
          }
          label="I have read and agree to the museum rules and regulations"
        />
      </Box>
    </Box>
  );
};

export default RulesAgreement;
