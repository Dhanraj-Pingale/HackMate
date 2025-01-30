import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const ShowTeamDetails = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [team, setTeam] = useState({});

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/getTeamDetails/${teamId}`
        );
        setTeam(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching team details", error);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 p-8 text-white">
      <Card className="bg-white text-black rounded-xl shadow-lg">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              className="flex items-center text-black hover:text-blue-600"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2" /> Back
            </Button>
            <h2 className="text-3xl font-extrabold text-center text-black flex-grow">
              {team.teamName || "Team Name"}
            </h2>
          </div>

          {/* Team Details Section */}
          <div className="flex justify-between mb-6 text-black space-y-4">
            {/* Left Side: Team Leader and Registration Date */}
            <div className="flex flex-col space-y-4 w-1/2">
              <p className="text-lg">
                <strong className="font-bold text-xl">Team Leader:</strong> {team.teamLeader || "N/A"}
              </p>
              <p className="text-lg">
                <strong className="font-bold text-xl">Team Size:</strong> {team.teamSize || "N/A"}
              </p>
            </div>

            {/* Right Side: Team Members */}
            <div className="flex flex-col space-y-4 w-1/2">
              <h3 className="text-2xl font-bold text-center mb-4">Team Members</h3>
              {team.teamMembers && team.teamMembers.length > 0 ? (
                team.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-700 text-white p-4 rounded-lg"
                  >
                    <span className="truncate">{member.email}</span>
                    <span className={`text-xs ${member.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                      {member.status}
                    </span>
                  </div>
                ))
              ) : (
                <p>No members available</p>
              )}
            </div>
          </div>

          {/* Accordion Section for Additional Details */}
          <div className="space-y-4 mt-6">
            <Accordion>
              <AccordionItem>
                <AccordionTrigger className="bg-black text-white p-4 rounded-md hover:bg-gray-700">
                  Team History
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                  <p>{team.history || "No history available"}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger className="bg-black text-white p-4 rounded-md hover:bg-gray-700">
                  Achievements
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                  <p>{team.achievements || "No achievements available"}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger className="bg-black text-white p-4 rounded-md hover:bg-gray-700">
                  Project Details
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                  <p>{team.projectDetails || "No project details available"}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowTeamDetails;
