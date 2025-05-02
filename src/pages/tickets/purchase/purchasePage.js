import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import TicketPurchaseFlow from "@/components/tickets/TicketPurchaseFlow"; // Adjust path as needed
import Footer from "@/components/layout/Footer"; // Adjust path as needed
import Header from "@/components/layout/Header"; // Adjust path as needed
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
