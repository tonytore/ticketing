import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPage from "./pages/admin/AdminPage";
import RootLayout from "./pages/RootLayout";
import TicketPurchasePage from "./pages/tickets/purchase/purchasePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <HomePage />
            </RootLayout>
          }
        />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>
        <Route path="/tickets/purchase" element={<TicketPurchasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
