import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../App.css"

const Homepage = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [showHackathons, setShowHackathons] = useState(false);

  const fetchHackathons = () => {
    axios.get('http://localhost:3000/student/getHackathons')
      .then((response) => {
        setHackathons(response.data);
        setShowHackathons(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleButtonClick = () => {
    navigate('/about');
  };

  const logoutPressed = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen grid-background">
      <h1 className="text-3xl font-bold mb-4 text-black">Start working here...</h1>
      
      <h2 className="text-2xl font-bold mb-4 text-black">Hackathons</h2>
      <button 
        onClick={fetchHackathons} 
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 mb-4"
      >
        See Available Hackathons
      </button>
      
      {showHackathons && (
        <ul className="text-black">
          {hackathons.map((hackathon) => (
            <li key={hackathon._id} className="mb-2 p-4 border border-gray-300 rounded-md">
              <h3 className="font-bold">{hackathon.name}</h3>
              <p>{hackathon.description}</p>
              <p><strong>Location:</strong> {hackathon.location}</p>
              <p><strong>Date:</strong> {hackathon.date}</p>
              <p><strong>Time:</strong> {hackathon.time}</p>
            </li>
          ))}
        </ul>
      )}

      <button 
        onClick={handleButtonClick} 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mt-4"
      >
        Go to About Page
      </button>
      <button 
        onClick={logoutPressed} 
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
