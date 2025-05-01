import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme"; // Adjust path as needed
// If 'inter' font is crucial and comes from Next.js, you might need a different approach
// For a standard React app, you might import the font differently or use a CSS import
// Example using Google Fonts via CSS:
// import '@fontsource/inter'; // Install @fontsource/inter
const RootLayout = ({ children }) => {
    return (_jsx("html", { lang: "en", children: _jsx("body", { children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsxs("div", { className: "inter-font", children: [" ", children] })] }) }) }));
};
export default RootLayout;
