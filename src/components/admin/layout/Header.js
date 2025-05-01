"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, useMediaQuery, useTheme, } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
    console.log(languageMenuAnchor);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [scrolledPast90vh, setScrolledPast90vh] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
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
    const handleLanguageMenuOpen = (event) => {
        setLanguageMenuAnchor(event.currentTarget);
    };
    // const handleLanguageMenuClose = () => {
    //   setLanguageMenuAnchor(null);
    // };
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    const menuItems = [
        { text: "Home", icon: _jsx(HomeIcon, {}), href: "/" },
        { text: "Events", icon: _jsx(EventIcon, {}), href: "/events" },
        { text: "About", icon: _jsx(InfoIcon, {}), href: "/about" },
        {
            text: "Buy Tickets",
            icon: _jsx(ConfirmationNumberIcon, {}),
            href: "/tickets/purchase",
        },
    ];
    return (_jsx(AppBar, { position: "fixed", elevation: 0, sx: {
            backgroundColor: scrolledPast90vh
                ? "rgba(0, 0, 0, 0.85)"
                : "transparent",
            backdropFilter: "blur(8px)",
            color: "#f8f8f8",
        }, children: _jsx(Container, { maxWidth: "xl", children: adminUser && pathname.startsWith("/admin") ? (_jsxs(Toolbar, { disableGutters: true, sx: { justifyContent: "space-between" }, children: [_jsxs(Box, { sx: { display: "flex", alignItems: "center", flexGrow: 1 }, children: [_jsx(Image, { src: "/base/logo.png", alt: "Logo", width: 50, height: 50, style: { marginRight: 12 } }), _jsx(Typography, { variant: "h6", component: "div", sx: {
                                    fontWeight: 700,
                                    fontSize: "1.8rem",
                                    letterSpacing: "2px",
                                    color: "#D4AF37",
                                }, children: "Admin Dashboard" })] }), _jsxs(Box, { sx: { display: "flex", gap: 2 }, children: [_jsxs(Typography, { variant: "body1", marginTop: "10px", sx: {
                                    color: "black",
                                    "&:hover": { color: "#D4AF37" },
                                }, children: ["Welcome, ", adminUser.name] }), _jsx(IconButton, { sx: {
                                    size: "large",
                                    edge: "start",
                                    color: "black",
                                    "&:hover": { color: "#D4AF37" },
                                }, onClick: handleLogout, children: _jsx(LogoutIcon, {}) })] })] })) : (_jsxs(Toolbar, { disableGutters: true, sx: { justifyContent: "space-between" }, children: [_jsxs(Box, { sx: { display: "flex", alignItems: "center", flexGrow: 1 }, children: [_jsx(Image, { src: "/base/logo.png", alt: "Logo", width: 50, height: 50, style: { marginRight: 12 } }), _jsx(Typography, { variant: "h6", noWrap: true, sx: {
                                    fontWeight: 700,
                                    fontSize: "1.8rem",
                                    letterSpacing: "2px",
                                    color: "#D4AF37",
                                }, children: "PALACE MUSEUM" })] }), !isMobile && (_jsx(Box, { sx: { display: "flex", gap: 2 }, children: menuItems.map((item) => (_jsx(Button, { component: Link, href: item.href, startIcon: item.icon, sx: {
                                color: "#f0f0f0",
                                "&:hover": { color: "#D4AF37" },
                            }, children: item.text }, item.text))) })), _jsx(IconButton, { size: "large", onClick: handleLanguageMenuOpen, color: "inherit", sx: { ml: 2 }, children: _jsx(LanguageIcon, {}) }), isMobile && (_jsx(IconButton, { size: "large", edge: "start", onClick: toggleMobileMenu, color: "inherit", children: _jsx(MenuIcon, {}) }))] })) }) }));
};
export default Header;
