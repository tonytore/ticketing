import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, useMediaQuery, useTheme, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link, useLocation, useNavigate } from "react-router-dom";
const UserRole = {
    ADMIN: "ADMIN",
};
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [scrolledPast90vh, setScrolledPast90vh] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
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
        navigate("/admin/login");
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
    const handleLanguageMenuClose = () => {
        setLanguageMenuAnchor(null);
    };
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
    return (_jsxs(_Fragment, { children: [_jsx(AppBar, { position: "fixed", elevation: 0, sx: {
                    backgroundColor: scrolledPast90vh
                        ? "rgba(0, 0, 0, 0.85)"
                        : "transparent",
                    backdropFilter: "blur(8px)",
                    color: "#f8f8f8",
                }, children: _jsx(Container, { maxWidth: "xl", children: adminUser && location.pathname.startsWith("/admin") ? (_jsxs(Toolbar, { disableGutters: true, sx: { justifyContent: "space-between" }, children: [_jsxs(Box, { sx: { display: "flex", alignItems: "center", flexGrow: 1 }, children: [_jsx("img", { src: "/base/logo.png", alt: "Logo", width: 50, height: 50, style: { marginRight: 12 } }), _jsx(Typography, { variant: "h6", sx: {
                                            fontWeight: 700,
                                            fontSize: "1.8rem",
                                            letterSpacing: "2px",
                                            color: "#D4AF37",
                                        }, children: "Admin Dashboard" })] }), _jsxs(Box, { sx: { display: "flex", gap: 2 }, children: [_jsxs(Typography, { variant: "body1", marginTop: "10px", sx: {
                                            color: "black",
                                            "&:hover": { color: "#D4AF37" },
                                        }, children: ["Welcome, ", adminUser.name] }), _jsx(IconButton, { sx: {
                                            color: "black",
                                            "&:hover": { color: "#D4AF37" },
                                        }, onClick: handleLogout, "aria-label": "Logout", children: _jsx(LogoutIcon, {}) })] })] })) : (_jsxs(Toolbar, { disableGutters: true, sx: { justifyContent: "space-between" }, children: [_jsxs(Box, { sx: { display: "flex", alignItems: "center", flexGrow: 1 }, children: [_jsx("img", { src: "/base/logo.png", alt: "Logo", width: 50, height: 50, style: { marginRight: 12 } }), _jsx(Typography, { variant: "h6", noWrap: true, sx: {
                                            fontWeight: 700,
                                            fontSize: "1.8rem",
                                            letterSpacing: "2px",
                                            color: "#D4AF37",
                                        }, children: "PALACE MUSEUM" })] }), !isMobile && (_jsx(Box, { sx: { display: "flex", gap: 2 }, children: menuItems.map((item) => (_jsx(Button, { component: Link, to: item.href, startIcon: item.icon, sx: {
                                        color: "#f0f0f0",
                                        "&:hover": { color: "#D4AF37" },
                                    }, children: item.text }, item.text))) })), _jsx(IconButton, { size: "large", onClick: handleLanguageMenuOpen, color: "inherit", "aria-label": "Change language", sx: { ml: 2 }, children: _jsx(LanguageIcon, {}) }), isMobile && (_jsx(IconButton, { size: "large", edge: "start", onClick: toggleMobileMenu, color: "inherit", "aria-label": "Toggle menu", children: _jsx(MenuIcon, {}) }))] })) }) }), _jsxs(Menu, { anchorEl: languageMenuAnchor, open: Boolean(languageMenuAnchor), onClose: handleLanguageMenuClose, children: [_jsx(MenuItem, { onClick: handleLanguageMenuClose, children: "English" }), _jsx(MenuItem, { onClick: handleLanguageMenuClose, children: "Amharic" })] }), _jsx(Drawer, { anchor: "right", open: mobileMenuOpen, onClose: toggleMobileMenu, children: _jsx(List, { sx: { width: 250 }, children: menuItems.map((item) => (_jsxs(ListItem, { button: true, component: Link, to: item.href, onClick: toggleMobileMenu, children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.text })] }, item.text))) }) })] }));
};
export default Header;
