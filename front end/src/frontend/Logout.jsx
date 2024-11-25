
import { useNavigate } from "react-router-dom";
import './CSS/Logout.css'
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        navigate("/login");
    };

    return (
        <div>
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout} style={{ marginRight: "10px" }}>
                Yes Log Out
            </button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default Logout;
