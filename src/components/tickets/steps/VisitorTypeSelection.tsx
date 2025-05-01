import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Alert,
  Slider,
  FormControlLabel,
  Switch,
  Chip,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";

const VisitorTypeSelection = ({ purchaseData, updatePurchaseData }) => {
  const handleLocalChange = (event) => {
    updatePurchaseData({
      isLocal: event.target.value === "local",
    });
  };

  const handleNumberOfTicketsChange = (event, newValue) => {
    updatePurchaseData({
      numberOfTickets: newValue,
    });
  };

  const handleGroupTicketChange = (event) => {
    updatePurchaseData({
      isGroupTicket: event.target.checked,
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Visitor Information
      </Typography>

      <Typography variant="body1" paragraph>
        Please provide information about your visit to help us serve you better.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Visitor Type
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="visitor-type-label">
                Select Visitor Type
              </InputLabel>
              <Select
                labelId="visitor-type-label"
                value={purchaseData.isLocal ? "local" : "nonlocal"}
                label="Select Visitor Type"
                onChange={handleLocalChange}
              >
                <MenuItem value="local">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    Local Resident
                  </Box>
                </MenuItem>
                <MenuItem value="nonlocal">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PublicIcon sx={{ mr: 1 }} />
                    Tourist / Non-Local
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {purchaseData.isLocal
                ? "Local residents may be eligible for special discounts. Proof of residency may be required at entry."
                : "Welcome to our museum! Non-local visitors must provide contact information for their visit."}
            </Typography>

            {purchaseData.isLocal && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Please bring a valid ID or proof of residency to verify your
                local status.
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Number of Tickets
            </Typography>

            <Box sx={{ px: 2, pt: 2 }}>
              <Slider
                value={purchaseData.numberOfTickets}
                onChange={handleNumberOfTicketsChange}
                aria-labelledby="number-of-tickets-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={10}
              />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="body2" color="text.secondary">
                Minimum: 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maximum: 10
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={purchaseData.isGroupTicket}
                  onChange={handleGroupTicketChange}
                  name="groupTicket"
                />
              }
              label="This is a group visit"
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Group visits allow all members to enter together under a single
              contact person.
            </Typography>

            {purchaseData.isGroupTicket && (
              <Alert severity="info" sx={{ mt: 2 }}>
                For group visits, the contact person must be present with valid
                ID at the time of entry.
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Chip label="Recommended Options" />
          </Divider>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({
                  isLocal: true,
                  numberOfTickets: 1,
                  isGroupTicket: false,
                })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/individual-visit.png"
                alt="Individual Visit"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Individual Visit
                  <PersonIcon sx={{ ml: 1, verticalAlign: "middle" }} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect for solo visitors who want to explore at their own
                  pace.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="1 Person" size="small" sx={{ mr: 1 }} />
                  <Chip label="Self-guided" size="small" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({
                  isLocal: true,
                  numberOfTickets: 2,
                  isGroupTicket: false,
                })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/couple-visit.png"
                alt="Couple Visit"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Couple Visit
                  <PeopleIcon sx={{ ml: 1, verticalAlign: "middle" }} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ideal for couples or friends who want to share the experience.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="2 People" size="small" sx={{ mr: 1 }} />
                  <Chip label="Self-guided" size="small" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({
                  isLocal: true,
                  numberOfTickets: 5,
                  isGroupTicket: true,
                })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/group-visit.png"
                alt="Group Visit"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Group Visit
                  <GroupIcon sx={{ ml: 1, verticalAlign: "middle" }} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect for families or small groups visiting together.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="5 People" size="small" sx={{ mr: 1 }} />
                  <Chip label="Group Entry" size="small" color="primary" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisitorTypeSelection;
