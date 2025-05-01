import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Paper, useTheme, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import theme from "@/lib/theme";
// Animation keyframes
const fadeIn = keyframes `
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;
const slideIn = keyframes `
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;
const AnimatedBox = styled(Box)(({ delay = "0s" }) => ({
    animation: `${fadeIn} 1s ease-out ${delay}`,
}));
const AnimatedCard = styled(Card)(({ delay = "0s" }) => ({
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
    return (_jsx(Box, { sx: {
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
        }, children: _jsxs(Box, { sx: {
                maxWidth: "1200px",
                mx: "auto",
                px: 3,
            }, children: [_jsx(AnimatedBox, { children: _jsx(Typography, { variant: "h1", component: "h1", gutterBottom: true, children: "The Palace Museum" }) }), _jsx(AnimatedBox, { delay: "0.2s", children: _jsx(Typography, { variant: "h5", component: "h2", gutterBottom: true, sx: { maxWidth: "600px", mb: 4 }, children: "Ethiopia's rich history, culture, and heritage unfold through timeless exhibitions and immersive experiences." }) }), _jsxs(AnimatedBox, { delay: "0.4s", children: [_jsx(Button, { variant: "contained", size: "large", color: "secondary", sx: { mr: 2 }, children: "Buy Tickets" }), _jsx(Button, { variant: "outlined", size: "large", sx: { color: "white", borderColor: "white" }, children: "View Events" })] })] }) }));
};
const OpeningHoursBar = () => {
    return (_jsx(Box, { sx: {
            height: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        }, children: _jsx(Box, { sx: {
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
            }, children: _jsx(Typography, { variant: "h6", component: "div", children: "\uD83D\uDD52 Opening Hours: Monday \u2013 Sunday, 9:00 AM \u2013 6:00 PM" }) }) }));
};
const FeaturedExhibitions = () => {
    const exhibitions = [
        {
            id: 1,
            title: "Modern Art Masterpieces",
            description: "Explore the revolutionary works that defined the 20th century art movements.",
            image: "/images/exhibition1.jpg",
        },
        {
            id: 2,
            title: "Ancient Civilizations",
            description: "Journey through the artifacts and stories of the world's greatest ancient cultures.",
            image: "/images/exhibition2.jpg",
        },
        {
            id: 3,
            title: "Natural Wonders",
            description: "Discover the beauty and complexity of our natural world through interactive exhibits.",
            image: "/images/exhibition3.jpg",
        },
    ];
    return (_jsx(Box, { sx: { py: 8 }, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(AnimatedBox, { children: _jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, align: "center", sx: { mb: 6 }, children: "Featured Exhibitions" }) }), _jsx(Grid, { container: true, spacing: 4, children: exhibitions.map((exhibition, index) => (_jsx(Grid, { item: true, xs: 12, md: 5.5, children: _jsxs(AnimatedCard, { delay: `${0.2 * (index + 1)}s`, sx: { maxWidth: 500, margin: "0 auto" }, children: [_jsx(CardMedia, { component: "img", height: "180", image: exhibition.image, alt: exhibition.title }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h5", component: "h3", gutterBottom: true, children: exhibition.title }), _jsx(Typography, { variant: "body1", color: "text.secondary", paragraph: true, children: exhibition.description }), _jsx(Button, { variant: "outlined", color: "primary", children: "Learn More" })] })] }) }, exhibition.id))) })] }) }));
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
    return (_jsx(Box, { sx: { py: 8, bgcolor: "grey.100" }, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(AnimatedBox, { children: _jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, align: "center", sx: { mb: 6 }, children: "Virtual Tour" }) }), _jsxs(AnimatedBox, { delay: "0.2s", children: [_jsx(Paper, { elevation: 3, sx: {
                                height: "500px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.200",
                                mb: 4,
                                position: "relative",
                            }, children: _jsx("iframe", { width: "100%", height: "100%", src: "https://www.youtube.com/embed/uDvootlTA00", title: "Virtual Museum Tour", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { borderRadius: "8px" } }) }), _jsx(Typography, { variant: "body1", align: "center", children: "Come and visit this historical place where you can explore the origins of our culture and heritage." })] }), _jsx("br", {}), _jsx("br", {}), _jsx(Grid, { container: true, spacing: 3, justifyContent: "center", alignItems: "center", children: _jsx(Grid, { item: true, xs: 12, md: 7, children: _jsx(Paper, { elevation: 3, sx: { borderRadius: 2 }, children: _jsx("iframe", { width: "800", height: "400", src: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15761.60250531321!2d38.7647866952863!3d9.02716939423783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sethiopian%20national%20palace%20address!5e0!3m2!1sen!2set!4v1743856871600!5m2!1sen!2set", allowFullScreen: true, style: { border: "0", borderRadius: "8px" } }) }) }) })] }) }));
};
// Define a styled component for a responsive layout
const AnnouncementsSection = () => {
    const announcements = [
        {
            id: 1,
            title: "Special Discount for Local Visitors",
            content: "Local visitors can enjoy a 10% discount on all regular tickets during the month of May.",
            date: "April 1, 2025",
        },
        {
            id: 2,
            title: "New Exhibition Opening",
            content: 'Join us for the opening of our new exhibition "Modern Art Masterpieces" on May 15, 2025.',
            date: "March 15, 2025",
        },
        {
            id: 3,
            title: "Museum Closure Notice",
            content: "The museum will be closed for renovations on April 10-12, 2025. We apologize for any inconvenience.",
            date: "March 1, 2025",
        },
        {
            id: 4,
            title: "Exclusive Event for Members",
            content: "Join us for a special evening event exclusively for museum members on April 18, 2025.",
            date: "March 20, 2025",
        },
        {
            id: 5,
            title: "Free Admission Day",
            content: "We are offering free admission to all visitors on May 1, 2025, in celebration of International Museum Day.",
            date: "April 5, 2025",
        },
        {
            id: 6,
            title: "New Artwork Acquisition",
            content: "The museum has acquired a new piece of artwork by renowned artist Jane Doe, now on display.",
            date: "April 3, 2025",
        },
    ];
    return (_jsx(Box, { sx: { py: 8 }, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(AnimatedBox, { children: _jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, align: "center", sx: { mb: 6 }, children: "Announcements" }) }), _jsx(Grid, { container: true, spacing: 3, children: announcements.map((announcement, index) => (_jsx(Grid, { item: true, xs: 12, md: 6, sx: { maxWidth: 500, margin: "0 auto" }, children: _jsx(AnimatedBox, { delay: `${0.2 * (index + 1)}s`, children: _jsxs(Paper, { elevation: 1, sx: {
                                    p: 3,
                                    borderLeft: 6,
                                    borderColor: theme.palette.primary.main,
                                    height: "150px",
                                }, children: [_jsx(Typography, { variant: "h5", component: "h3", gutterBottom: true, children: announcement.title }), _jsx(Typography, { variant: "body1", paragraph: true, children: announcement.content }), _jsxs(Typography, { variant: "caption", color: "text.secondary", children: ["Posted on ", announcement.date] })] }) }) }, announcement.id))) })] }) }));
};
const TicketPackagesSection = () => {
    const theme = useTheme();
    const packages = [
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
    return (_jsx(Box, { sx: { py: 8, bgcolor: "grey.100" }, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(AnimatedBox, { children: _jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, align: "center", sx: { mb: 6 }, children: "Ticket Packages" }) }), _jsx(Grid, { container: true, spacing: 4, justifyContent: "center", children: packages.map((pkg, index) => (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(AnimatedCard, { delay: `${0.2 * (index + 1)}s`, sx: {
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                ...(pkg.recommended && {
                                    borderTop: 5,
                                    borderColor: theme.palette.primary.main,
                                }),
                            }, children: [pkg.recommended && (_jsx(Box, { sx: {
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bgcolor: theme.palette.primary.main,
                                        color: "white",
                                        px: 2,
                                        py: 0.5,
                                        borderBottomLeftRadius: 8,
                                    }, children: _jsx(Typography, { variant: "subtitle2", children: "Recommended" }) })), _jsxs(CardContent, { sx: { flexGrow: 1 }, children: [_jsx(Typography, { variant: "h4", component: "h3", gutterBottom: true, align: "center", children: pkg.title }), _jsx(Typography, { variant: "h3", component: "div", gutterBottom: true, align: "center", sx: { my: 3, color: theme.palette.primary.main }, children: pkg.price }), _jsx(Box, { component: "ul", sx: { pl: 2, mb: 4 }, children: pkg.features.map((feature, i) => (_jsx(Box, { component: "li", sx: { mb: 1 }, children: _jsx(Typography, { variant: "body1", children: feature }) }, i))) })] }), _jsx(Box, { sx: { p: 2, pt: 0 }, children: _jsx(Button, { variant: "outlined", fullWidth: true, size: "large", children: "Select Package" }) })] }) }, pkg.id))) })] }) }));
};
const HomePage = () => {
    return (_jsxs(Box, { children: [_jsx(HeroSection, {}), _jsx(OpeningHoursBar, {}), _jsx(FeaturedExhibitions, {}), _jsx(VideoSection, {}), _jsx(AnnouncementsSection, {}), _jsx(TicketPackagesSection, {})] }));
};
export default HomePage;
