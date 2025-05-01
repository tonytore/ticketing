// RootLayout.js (without "use client" if it's a layout component)

import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme"; // Adjust path as needed

// If 'inter' font is crucial and comes from Next.js, you might need a different approach
// For a standard React app, you might import the font differently or use a CSS import
// Example using Google Fonts via CSS:
// import '@fontsource/inter'; // Install @fontsource/inter

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="inter-font">
            {" "}
            {/* Apply the font class to the body or a wrapper */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
