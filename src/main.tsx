// src/main.tsx

import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./index.css"; // Tailwind/global styles

const theme = createTheme(); // Customize as needed

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
