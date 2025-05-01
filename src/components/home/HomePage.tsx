import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import theme from "@/lib/theme";

// Animation keyframes
const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

const slideIn = keyframes`
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;

const AnimatedBox = styled(Box)<{ delay?: string }>(({ delay = "0s" }) => ({
  animation: `${fadeIn} 1s ease-out ${delay}`,
}));

const AnimatedCard = styled(Card)<{ delay?: string }>(({ delay = "0s" }) => ({
  animation: `${slideIn} 1s ease-out ${delay}`,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const HeroSection = () => {
  const images = [
    "/images/exhibition1.jpg",
    "/images/exhibition2.jpg",
    "/images/exhibition4.jpg",
    "/images/exhibition5.jpg",
    "/images/exhibition6.jpg",
    "/images/exhibition7.jpg",
    "/images/exhibition8.jpg",
    "/images/exhibition9.jpg",
    "/images/exhibition10.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <Box
      sx={{
        position: "relative",
        height: "95vh",
        width: "100%", // ensure full width
        display: "flex",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // color: "white",
        transition: "background-image 1s ease-in-out",
        bgcolor: theme.palette.secondary.main, // Use a theme color
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 3,
        }}
      >
        <AnimatedBox>
          <Typography variant="h1" component="h1" gutterBottom>
            The Palace Museum
          </Typography>
        </AnimatedBox>
        <AnimatedBox delay="0.2s">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ maxWidth: "600px", mb: 4 }}
          >
            Ethiopia's rich history, culture, and heritage unfold through
            timeless exhibitions and immersive experiences.
          </Typography>
        </AnimatedBox>
        <AnimatedBox delay="0.4s">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ mr: 2 }}
          >
            Buy Tickets
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "white", borderColor: "white" }}
          >
            View Events
          </Button>
        </AnimatedBox>
      </Box>
    </Box>
  );
};

const OpeningHoursBar = () => {
  return (
    <Box
      sx={{
        height: "10vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          px: 4,
          py: 1.5,
          borderRadius: 6,
          color: "#14213d",
          maxWidth: "600px",
          mx: "auto",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          bgcolor: "#e85d04", // 🔶 New background color
        }}
      >
        <Typography variant="h6" component="div">
          🕒 Opening Hours: Monday – Sunday, 9:00 AM – 6:00 PM
        </Typography>
      </Box>
    </Box>
  );
};

const FeaturedExhibitions = () => {
  const exhibitions = [
    {
      id: 1,
      title: "Modern Art Masterpieces",
      description:
        "Explore the revolutionary works that defined the 20th century art movements.",
      image: "/images/exhibition1.jpg",
    },
    {
      id: 2,
      title: "Ancient Civilizations",
      description:
        "Journey through the artifacts and stories of the world's greatest ancient cultures.",
      image: "/images/exhibition2.jpg",
    },
    {
      id: 3,
      title: "Natural Wonders",
      description:
        "Discover the beauty and complexity of our natural world through interactive exhibits.",
      image: "/images/exhibition3.jpg",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Featured Exhibitions
          </Typography>
        </AnimatedBox>
        <Grid container spacing={4}>
          {exhibitions.map((exhibition, index) => (
            <Grid item xs={12} md={5.5} key={exhibition.id}>
              <AnimatedCard
                delay={`${0.2 * (index + 1)}s`}
                sx={{ maxWidth: 500, margin: "0 auto" }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={exhibition.image}
                  alt={exhibition.title}
                />

                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {exhibition.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {exhibition.description}
                  </Typography>
                  <Button variant="outlined" color="primary">
                    Learn More
                  </Button>
                </CardContent>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const VideoSection = () => {
  // const [coordinates, setCoordinates] = useState({
  //   lat: 9.02716939423783, // Latitude
  //   lng: 38.7647866952863, // Longitude
  // });

  // const openInGoogleMaps = () => {
  //   const { lat, lng } = coordinates;
  //   window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  // };

  return (
    <Box sx={{ py: 8, bgcolor: "grey.100" }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Virtual Tour
          </Typography>
        </AnimatedBox>
        <AnimatedBox delay="0.2s">
          <Paper
            elevation={3}
            sx={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.200",
              mb: 4,
              position: "relative",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/uDvootlTA00"
              title="Virtual Museum Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "8px" }}
            ></iframe>
          </Paper>
          <Typography variant="body1" align="center">
            Come and visit this historical place where you can explore the
            origins of our culture and heritage.
          </Typography>
        </AnimatedBox>

        <br />
        <br />
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Google Map Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ borderRadius: 2 }}>
              <iframe
                width="800"
                height="400"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15761.60250531321!2d38.7647866952863!3d9.02716939423783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sethiopian%20national%20palace%20address!5e0!3m2!1sen!2set!4v1743856871600!5m2!1sen!2set"
                allowFullScreen
                style={{ border: "0", borderRadius: "8px" }}
              ></iframe>
            </Paper>
          </Grid>
          {/* 

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Coordinates:</Typography>
              <Typography variant="body1">
                Latitude: {coordinates.lat}
                <br />
                Longitude: {coordinates.lng}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={openInGoogleMaps}
              >
                Maps
              </Button>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

// Define a styled component for a responsive layout

const AnnouncementsSection = () => {
  const announcements = [
    {
      id: 1,
      title: "Special Discount for Local Visitors",
      content:
        "Local visitors can enjoy a 10% discount on all regular tickets during the month of May.",
      date: "April 1, 2025",
    },
    {
      id: 2,
      title: "New Exhibition Opening",
      content:
        'Join us for the opening of our new exhibition "Modern Art Masterpieces" on May 15, 2025.',
      date: "March 15, 2025",
    },
    {
      id: 3,
      title: "Museum Closure Notice",
      content:
        "The museum will be closed for renovations on April 10-12, 2025. We apologize for any inconvenience.",
      date: "March 1, 2025",
    },
    {
      id: 4,
      title: "Exclusive Event for Members",
      content:
        "Join us for a special evening event exclusively for museum members on April 18, 2025.",
      date: "March 20, 2025",
    },
    {
      id: 5,
      title: "Free Admission Day",
      content:
        "We are offering free admission to all visitors on May 1, 2025, in celebration of International Museum Day.",
      date: "April 5, 2025",
    },
    {
      id: 6,
      title: "New Artwork Acquisition",
      content:
        "The museum has acquired a new piece of artwork by renowned artist Jane Doe, now on display.",
      date: "April 3, 2025",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Announcements
          </Typography>
        </AnimatedBox>
        <Grid container spacing={3}>
          {announcements.map((announcement, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={announcement.id}
              sx={{ maxWidth: 500, margin: "0 auto" }}
            >
              <AnimatedBox delay={`${0.2 * (index + 1)}s`}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    borderLeft: 6,
                    borderColor: theme.palette.primary.main,
                    height: "150px",
                  }}
                >
                  <Typography variant="h5" component="h3" gutterBottom>
                    {announcement.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {announcement.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted on {announcement.date}
                  </Typography>
                </Paper>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Define your Package type
interface Package {
  id: number;
  title: string;
  price: string;
  features: string[];
  recommended: boolean;
}

// Define your Package type
interface Package {
  id: number;
  title: string;
  price: string;
  features: string[];
  recommended: boolean;
}

const TicketPackagesSection = () => {
  const theme = useTheme();

  const packages: Package[] = [
    {
      id: 1,
      title: "Regular Admission",
      price: "$15",
      features: [
        "Access to all permanent exhibitions",
        "Audio guide available for rent",
        "Valid for one day",
      ],
      recommended: false,
    },
    {
      id: 2,
      title: "VIP Experience",
      price: "$30",
      features: [
        "Access to all exhibitions including special ones",
        "Complimentary audio guide",
        "Priority entry (skip the line)",
        "Exclusive access to VIP lounge",
      ],
      recommended: true,
    },
    {
      id: 3,
      title: "Family Package",
      price: "$45",
      features: [
        "Admission for 2 adults and up to 3 children",
        "Access to all permanent exhibitions",
        "Special family activities and workshops",
        "Discount at museum café",
      ],
      recommended: false,
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "grey.100" }}>
      <Container maxWidth="lg">
        <AnimatedBox>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Ticket Packages
          </Typography>
        </AnimatedBox>
        <Grid container spacing={4} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <AnimatedCard
                delay={`${0.2 * (index + 1)}s`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  ...(pkg.recommended && {
                    borderTop: 5,
                    borderColor: theme.palette.primary.main,
                  }),
                }}
              >
                {pkg.recommended && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <Typography variant="subtitle2">Recommended</Typography>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    align="center"
                  >
                    {pkg.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    gutterBottom
                    align="center"
                    sx={{ my: 3, color: theme.palette.primary.main }}
                  >
                    {pkg.price}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 4 }}>
                    {pkg.features.map((feature, i) => (
                      <Box component="li" key={i} sx={{ mb: 1 }}>
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button variant={"outlined"} fullWidth size="large">
                    Select Package
                  </Button>
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <OpeningHoursBar />
      <FeaturedExhibitions />
      <VideoSection />
      <AnnouncementsSection />
      <TicketPackagesSection />
    </Box>
  );
};

export default HomePage;
