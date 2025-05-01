import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

import { TicketType } from "@/lib/types";

const TicketTypeSelection = ({ purchaseData, updatePurchaseData }) => {
  const handleTicketTypeChange = (event) => {
    updatePurchaseData({
      ticketType: event.target.value,
      isVIP: event.target.value === TicketType.VIP,
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Select Ticket Type
      </Typography>

      <Typography variant="body1" paragraph>
        Choose the type of ticket that best suits your visit to our museum. We
        offer different options to enhance your experience.
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 4, width: "100%" }}>
        <FormLabel component="legend">Ticket Options</FormLabel>
        <RadioGroup
          aria-label="ticket-type"
          name="ticket-type"
          value={purchaseData.ticketType}
          onChange={handleTicketTypeChange}
        >
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  border:
                    purchaseData.ticketType === TicketType.REGULAR ? 2 : 1,
                  borderColor:
                    purchaseData.ticketType === TicketType.REGULAR
                      ? "primary.main"
                      : "divider",
                }}
              >
                <FormControlLabel
                  value={TicketType.REGULAR}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="h6" component="div">
                        Regular Ticket
                        <ConfirmationNumberIcon
                          sx={{ ml: 1, verticalAlign: "middle" }}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Standard museum access with all permanent exhibitions
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label="Basic Access"
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label="Permanent Exhibitions"
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      </Box>
                      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        $15.00
                      </Typography>
                    </Box>
                  }
                  sx={{ width: "100%", alignItems: "flex-start", m: 0 }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  border: purchaseData.ticketType === TicketType.VIP ? 2 : 1,
                  borderColor:
                    purchaseData.ticketType === TicketType.VIP
                      ? "primary.main"
                      : "divider",
                }}
              >
                <FormControlLabel
                  value={TicketType.VIP}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="h6" component="div">
                        VIP Ticket
                        <StarIcon
                          sx={{ ml: 1, verticalAlign: "middle", color: "gold" }}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Premium access with special exhibitions and guided tour
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label="Premium Access"
                          size="small"
                          color="primary"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label="Special Exhibitions"
                          size="small"
                          color="primary"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label="Guided Tour"
                          size="small"
                          color="primary"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label="Priority Entry"
                          size="small"
                          color="primary"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      </Box>
                      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        $30.00
                      </Typography>
                    </Box>
                  }
                  sx={{ width: "100%", alignItems: "flex-start", m: 0 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Popular Packages
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({
                  ticketType: TicketType.REGULAR,
                  isVIP: false,
                })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/individual.png"
                alt="Individual Package"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Individual Package
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
                {/* <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() =>
                    updatePurchaseData({
                      ticketType: TicketType.REGULAR,
                      isVIP: false,
                    })
                  }
                >
                  Select
                </Button> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({
                  ticketType: TicketType.REGULAR,
                  isVIP: false,
                })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/couple.png"
                alt="Family Package"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Family Package
                  <GroupIcon sx={{ ml: 1, verticalAlign: "middle" }} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ideal for families with children, includes interactive
                  exhibits.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="2-5 People" size="small" sx={{ mr: 1 }} />
                  <Chip label="Kid-friendly" size="small" />
                </Box>
                {/* <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() =>
                    updatePurchaseData({
                      ticketType: TicketType.REGULAR,
                      isVIP: false,
                    })
                  }
                >
                  Select
                </Button> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea
              onClick={() =>
                updatePurchaseData({ ticketType: TicketType.VIP, isVIP: true })
              }
            >
              <CardMedia
                component="img"
                height="180"
                sx={{ objectFit: "contain" }}
                image="/images/vip.png"
                alt="VIP Experience"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  VIP Experience
                  <VpnKeyIcon
                    sx={{ ml: 1, verticalAlign: "middle", color: "gold" }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium access with guided tour and exclusive exhibits.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label="Premium"
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip label="Guided Tour" size="small" color="primary" />
                </Box>
                {/* <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() =>
                    updatePurchaseData({
                      ticketType: TicketType.VIP,
                      isVIP: true,
                    })
                  }
                >
                  Select
                </Button> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketTypeSelection;
