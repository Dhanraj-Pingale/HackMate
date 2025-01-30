import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const StudentLogin = ({ hackathon }) => {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 font-handwritten">
          {hackathon.name}
        </h2>
        <p className="text-md text-gray-700 mb-2 font-handwritten">
          <span className="font-bold">Description -</span> {hackathon.description}
        </p>
        <p className="text-md text-gray-700 mb-2 font-handwritten">
          <span className="font-bold">Start Date -</span> {new Date(hackathon.startDate).toLocaleDateString()}
        </p>
        <p className="text-md text-gray-700 mb-2 font-handwritten">
          <span className="font-bold">Duration -</span> {hackathon.duration} Hrs
        </p>
        <p className="text-md text-gray-700 font-handwritten">
          <span className="font-bold">Team Count -</span> {hackathon.teamCount}
        </p>
      </div>
    );
  };

export default StudentLogin;
