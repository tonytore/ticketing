import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PolicyIcon from "@mui/icons-material/Policy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
//import Image from "next/image";
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
  return _jsx(Box, {
    component: "footer",
    sx: {
      py: 6,
      px: 2,
      mt: "auto",
      backgroundColor: (theme) => theme.palette.grey[900],
      color: "white",
    },
    children: _jsxs(Container, {
      maxWidth: "lg",
      children: [
        _jsxs(Grid, {
          container: true,
          spacing: 4,
          justifyContent: "space-between",
          children: [
            _jsxs(Grid, {
              item: true,
              xs: 12,
              sm: 4,
              justifyItems: "center",
              children: [
                _jsx(Typography, {
                  variant: "h6",
                  gutterBottom: true,
                  children: "Palace Museum",
                }),
                _jsx("br", {}),
                _jsxs(Box, {
                  display: "grid",
                  alignItems: "center",
                  children: [
                    _jsx("img", {
                      src: "/base/logo.png",
                      alt: "Logo",
                      width: 150,
                      height: 150,
                      style: { marginRight: 16 },
                    }),

                    _jsx("br", {}),
                    _jsxs(Typography, {
                      variant: "body2",
                      children: [
                        "Filwuha",
                        _jsx("br", {}),
                        "Addis Ababa, Ethiopia",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              item: true,
              xs: 12,
              sm: 4,
              textAlign: "center",
              children: [
                _jsx(Typography, {
                  variant: "h6",
                  gutterBottom: true,
                  children: "Opening Hours",
                }),
                _jsx("hr", {}),
                _jsx("br", {}),
                _jsxs(Typography, {
                  variant: "body2",
                  children: [
                    "Monday - Friday: 9:00 AM - 6:00 PM",
                    _jsx("br", {}),
                    "Saturday: 10:00 AM - 5:00 PM",
                    _jsx("br", {}),
                    "Sunday: 11:00 AM - 4:00 PM",
                    _jsx("br", {}),
                    "Closed on public holidays",
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              item: true,
              xs: 12,
              sm: 4,
              textAlign: "center",
              children: [
                _jsx(Typography, {
                  variant: "h6",
                  gutterBottom: true,
                  children: "Contacts",
                }),
                _jsx("hr", {}),
                _jsx("br", {}),
                _jsxs(Box, {
                  children: [
                    " ",
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(PhoneIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "+251911111111",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(EmailIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "contact@palace.gov.et",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(EmailIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "info@palace.gov.et",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              item: true,
              xs: 12,
              sm: 4,
              children: [
                _jsx(Typography, {
                  variant: "h6",
                  gutterBottom: true,
                  children: "Quick Links",
                }),
                _jsx("hr", {}),
                _jsx("br", {}),
                _jsxs(Box, {
                  children: [
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(EventIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "Events",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(ConfirmationNumberIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "Buy Tickets",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(InfoIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "About",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(ContactMailIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "Contact Us",
                        }),
                      ],
                    }),
                    _jsx("br", {}),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(PolicyIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "Privacy Policy",
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(MenuBookIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "Terms of Service",
                        }),
                      ],
                    }),
                    _jsx("br", {}),
                    _jsxs(Box, {
                      display: "flex",
                      alignItems: "center",
                      sx: { mb: 1 },
                      children: [
                        _jsx(InfoIcon, { sx: { mr: 1 } }),
                        _jsx(Button, {
                          color: "inherit",
                          size: "small",
                          sx: { p: 0 },
                          children: "FAQ",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        _jsx("hr", {}),
        _jsx(Box, {
          mt: 5,
          children: _jsxs(Typography, {
            variant: "body2",
            align: "center",
            children: [
              "\u00A9 ",
              new Date().getFullYear(),
              " Ethiopian National Palace Museum Ticketing System. All rights reserved.",
            ],
          }),
        }),
      ],
    }),
  });
};
export default Footer;
