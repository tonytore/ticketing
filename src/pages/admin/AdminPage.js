import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AdminPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/login");
    }, [navigate]);
    return null;
}
export default AdminPage;
