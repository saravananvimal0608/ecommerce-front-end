import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const CheckToken = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; 
                if (decoded.exp < currentTime) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    toast.warning("Session expired. Please login again.");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    }, [navigate]);

    return null;
};

export default CheckToken;
