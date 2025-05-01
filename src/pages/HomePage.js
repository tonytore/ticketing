import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/home/HomePage";
export default function Home() {
    return (_jsxs(Box, { children: [_jsx(Header, {}), _jsx(HomePage, {}), _jsx(Footer, {})] }));
}
