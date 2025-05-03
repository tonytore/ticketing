import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated as an admin
    const isAdminLoggedIn = localStorage.getItem("adminUser"); // Or however you store your auth status

    if (!isAdminLoggedIn) {
      navigate("/admin/login");
    }
    // If the user is logged in, they should be able to access child routes
    // like /admin/dashboard, so no redirect is needed here.
  }, [navigate]);

  return null; // AdminPage itself might not render anything visually now
}

export default AdminPage;
