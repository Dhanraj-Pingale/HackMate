import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

// Import Lottie animation files (You'll need to have these files in your project)
import createHackathonAnimation from "../../assets/createHackathonAnimation.json";
import seeAllHackathonsAnimation from "../../assets/seeAllHackathonsAnimation.json";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCreateHackathon = () => {
    navigate("/createhackathon");
  };

  const handleSeeAllHackathons = () => {
    navigate("/see-allhackthon");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl w-full">
        {/* Create Hackathon Card */}
        <motion.div
          className="relative p-12 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl group transform transition-transform hover:scale-105"
          onClick={handleCreateHackathon}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-32 h-32">
              <Lottie animationData={createHackathonAnimation} loop={true} />
            </div>
            <h3 className="text-3xl font-bold text-white group-hover:opacity-0 group-hover:invisible transition-opacity">
              Create Hackathon
            </h3>
            <p className="text-lg text-gray-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-center mt-4">
              Organize a new Hackathon event.
            </p>
          </div>
        </motion.div>

        {/* See All Hackathons Card */}
        <motion.div
          className="relative p-12 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl group transform transition-transform hover:scale-105"
          onClick={handleSeeAllHackathons}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-32 h-32">
              <Lottie animationData={seeAllHackathonsAnimation} loop={true} />
            </div>
            <h3 className="text-3xl font-bold text-white group-hover:opacity-0 group-hover:invisible transition-opacity">
              See All Hackathons
            </h3>
            <p className="text-lg text-gray-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-center mt-4">
              View and explore all upcoming Hackathons.
            </p>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default AdminHome;

