"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Link from "next/link";

import Image from "next/image";
import { User, UserRole } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] =
    useState<null | HTMLElement>(null);
  console.log(languageMenuAnchor);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [scrolledPast90vh, setScrolledPast90vh] = useState(false);

  const [adminUser, setAdminUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === UserRole.ADMIN) {
        setAdminUser(user);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9;
      setScrolledPast90vh(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  // const handleLanguageMenuClose = () => {
  //   setLanguageMenuAnchor(null);
  // };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, href: "/" },
    { text: "Events", icon: <EventIcon />, href: "/events" },
    { text: "About", icon: <InfoIcon />, href: "/about" },
    {
      text: "Buy Tickets",
      icon: <ConfirmationNumberIcon />,
      href: "/tickets/purchase",
    },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolledPast90vh
          ? "rgba(0, 0, 0, 0.85)"
          : "transparent",
        backdropFilter: "blur(8px)",
        color: "#f8f8f8",
      }}
    >
      <Container maxWidth="xl">
        {/* 👇 Conditional rendering based on admin user */}
        {adminUser && pathname.startsWith("/admin") ? (
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Image
                src="/base/logo.png"
                alt="Logo"
                width={50}
                height={50}
                style={{ marginRight: 12 }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  letterSpacing: "2px",
                  color: "#D4AF37",
                }}
              >
                Admin Dashboard
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography
                variant="body1"
                marginTop="10px"
                sx={{
                  color: "black",
                  "&:hover": { color: "#D4AF37" },
                }}
              >
                Welcome, {adminUser.name}
              </Typography>
              <IconButton
                sx={{
                  size: "large",
                  edge: "start",
                  color: "black",
                  "&:hover": { color: "#D4AF37" },
                }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        ) : (
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Image
                src="/base/logo.png"
                alt="Logo"
                width={50}
                height={50}
                style={{ marginRight: 12 }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  letterSpacing: "2px",
                  color: "#D4AF37",
                }}
              >
                PALACE MUSEUM
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    href={item.href}
                    startIcon={item.icon}
                    sx={{
                      color: "#f0f0f0",
                      "&:hover": { color: "#D4AF37" },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <IconButton
              size="large"
              onClick={handleLanguageMenuOpen}
              color="inherit"
              sx={{ ml: 2 }}
            >
              <LanguageIcon />
            </IconButton>

            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                onClick={toggleMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
