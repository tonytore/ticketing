import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPage from "./pages/admin/AdminPage";
import RootLayout from "./pages/RootLayout";
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(RootLayout, { children: _jsx(HomePage, {}) }) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminPage, {}), children: [_jsx(Route, { path: "admin/dashboard", element: _jsx(AdminDashboardPage, {}) }), _jsx(Route, { path: "admin/login", element: _jsx(AdminLoginPage, {}) })] })] }) }));
}
export default App;
