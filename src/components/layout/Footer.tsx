import { Box, Typography, Container, Grid, Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PolicyIcon from "@mui/icons-material/Policy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// // Animation keyframes
// const fadeIn = keyframes `
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const AnimatedBox = styled(Box)(({ theme }) => ({
//   animation: `${fadeIn} 1s ease-out`,
// }));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[900],
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Left - Palace Museum Info */}
          <Grid item xs={12} sm={4} justifyItems="center">
            <Typography variant="h6" gutterBottom>
              Palace Museum
            </Typography>
            <br />
            <Box display="grid" alignItems="center">
              <img
                src="/base/logo.png"
                alt="Logo"
                width={150}
                height={150}
                style={{ marginRight: 16 }}
              />
              <br />
              <Typography variant="body2">
                Filwuha
                <br />
                Addis Ababa, Ethiopia
              </Typography>
            </Box>
          </Grid>

          {/* Center - Opening Hours */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>
            <hr />
            <br />
            <Typography variant="body2">
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 5:00 PM
              <br />
              Sunday: 11:00 AM - 4:00 PM
              <br />
              Closed on public holidays
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Contacts
            </Typography>
            <hr />
            <br />

            <Box>
              {" "}
              {/* Removed variant="body2" from Box */}
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  +251911111111
                </Button>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  contact@palace.gov.et
                </Button>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  info@palace.gov.et
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right - Quick Links with Icons */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <hr />
            <br />
            <Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <EventIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  Events
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <ConfirmationNumberIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  Buy Tickets
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <InfoIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  About
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <ContactMailIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  Contact Us
                </Button>
              </Box>

              <br />

              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <PolicyIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  Privacy Policy
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <MenuBookIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  Terms of Service
                </Button>
              </Box>

              <br />
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <InfoIcon sx={{ mr: 1 }} />
                <Button color="inherit" size="small" sx={{ p: 0 }}>
                  FAQ
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <hr />

        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Ethiopian National Palace Museum
            Ticketing System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
