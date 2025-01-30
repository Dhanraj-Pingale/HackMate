// components/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to the Platform</h1>
            
            <div style={{ marginBottom: "20px" }}>
                <h2>Login as</h2>
                <div>
                    <Link to="/student/login">
                        <button style={{ margin: "10px" }}>Student(Login)</button>
                    </Link>
                    <Link to="/alogin">
                        <button style={{ margin: "10px" }}>Login (Admin)</button>
                    </Link>
                </div>
            </div>
            
            <div>
                <h2>Register as</h2>
                <div>
                    <Link to="/student/register">
                        <button style={{ margin: "10px" }}>Student(Registeration)</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
