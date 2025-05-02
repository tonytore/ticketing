import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import TicketPurchaseFlow from "@/components/tickets/TicketPurchaseFlow";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
/************* ✨ Windsurf Command ⭐  *************/
/**
 * Page for purchasing tickets. Displays a landing image, then
 * the TicketPurchaseFlow component for selecting tickets, and
 * finally the Footer component.
 *
 * @returns {JSX.Element} The ticket purchase page.
/******* 47e69872-5581-4baa-864c-cc10fad8c6a7  *******/
const TicketPurchasePage = () => {
    return (_jsxs(Box, { children: [_jsx(Header, {}), _jsx(Box, { sx: {
                    backgroundImage: 'url("/images/exhibition1.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "95vh",
                    width: "100%",
                    borderRadius: 1,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                } }), _jsx(TicketPurchaseFlow, {}), _jsx(Footer, {})] }));
};
export default TicketPurchasePage;
