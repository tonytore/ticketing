import { jsx as _jsx } from "react/jsx-runtime";
// src/main.tsx
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./index.css"; // Tailwind/global styles
const theme = createTheme(); // Customize as needed
createRoot(document.getElementById("root")).render(_jsx(ThemeProvider, { theme: theme, children: _jsx(App, {}) }));
