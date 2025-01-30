import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SeeHackathon = () => {
    const navigate = useNavigate();
  
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        {/* Navbar */}
        <header className="absolute top-4 right-4">
          <Button variant="outline" className="text-white border-white">
            Login
          </Button>
        </header>
  
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <h1 className="text-3xl font-bold">Hikr<span className="text-gray-500">d</span></h1>
        </div>
  
        {/* Main Content */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            Hack <span className="text-gray-300">Innovation</span> Win
          </h2>
          <p className="text-lg text-gray-400">
            Explore thousands of job listings or find the perfect candidate.
          </p>
  
          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <Button
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg"
              onClick={() => navigate("/student-login")}
            >
              Student Login
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 px-6 py-3 text-lg"
              onClick={() => navigate("/admin-login")}
            >
              Admin Login
            </Button>
          </div>
        </div>
  
        {/* Sponsors */}
        <div className="absolute bottom-10 flex space-x-8 text-lg text-gray-500">
          <span className="text-white font-bold">Amazon</span>
          <span>Atlassian</span>
          <span className="text-white font-bold">Google</span>
          <span>IBM</span>
          <span>Meta</span>
        </div>
        <Link to="/about" className="text-blue-500">Go Back to Dashboard</Link>
      </div>
    );
  };

export default SeeHackathon;
