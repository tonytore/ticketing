import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPage from "./pages/admin/AdminPage";
import RootLayout from "./pages/RootLayout";
import TicketPurchasePage from "./pages/tickets/purchase/purchasePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, // Render RootLayout here to provide the shared layout
      children: [
        {
          index: true, // This makes HomePage the default child route for "/"
          element: <HomePage />,
        },
        {
          path: "admin",
          element: <AdminPage />,
          children: [
            {
              path: "login",
              element: <AdminLoginPage />,
            },
            {
              path: "dashboard",
              element: <AdminDashboardPage />,
            },
          ],
        },
        {
          path: "tickets/purchase",
          element: <TicketPurchasePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
