import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCreateHackathon = () => {
    navigate("/create-hackathon");
  };

  const handleSeeAllHackathons = () => {
    navigate("/see-allhackthon");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl w-full">
        {/* Create Hackathon Card */}
        <div
          className="relative p-12 bg-gradient-to-r from-blue-100 to-blue-300 hover:from-blue-400 hover:to-blue-600 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl group transform transition-transform hover:scale-105"
          onClick={handleCreateHackathon}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="text-3xl font-bold text-black group-hover:opacity-0 group-hover:invisible transition-opacity">
              Create Hackathon
            </h3>
            <p className="text-lg text-gray-700 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-center mt-4">
              Organize a new Hackathon event.
            </p>
          </div>
        </div>

        {/* See All Hackathons Card */}
        <div
          className="relative p-12 bg-gradient-to-r from-green-100 to-green-300 hover:from-green-400 hover:to-green-600 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl group transform transition-transform hover:scale-105"
          onClick={handleSeeAllHackathons}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="text-3xl font-bold text-black group-hover:opacity-0 group-hover:invisible transition-opacity">
              See All Hackathons
            </h3>
            <p className="text-lg text-gray-700 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-center mt-4">
              View and explore all upcoming Hackathons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
