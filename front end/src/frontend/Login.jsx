import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CSS/Login.css'
const Login = () => {
    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post("http://localhost:5000/api/login", {
                userName,
                password,
            });

           
            if (response.status === 200) {
                const data = response.data;
                console.log("Login successful:", data);
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred. Please try again.");
        }
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value); 
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); 
    };

    return (
        <div className="container" >
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Enter Username</label>
                <input
                    type="text"
                    id="username"
                    className="username"
                    value={userName}
                    onChange={handleNameChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <div>
                    <button type="submit" className="login-button">Login</button>
                </div>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
