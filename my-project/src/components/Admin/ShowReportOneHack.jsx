import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ShowReportOneHack = () => {
  const navigate = useNavigate();
  const { id, hackathonId } = useParams();
  const [hackathon, setHackathon] = useState({});
  const [teams, setTeams] = useState([]);
  const [timer, setTimer] = useState("");
  useEffect(() => {
    const fetchOneHackthon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/getAllDetailsHackthon/${hackathonId}`
        );
        setHackathon(response.data);
        console.log(response.data);
        setTeams(response.data.registeredTeams || []);
      } catch (error) {
        console.log("error fetching hackathon details", error);
      }
    };
    fetchOneHackthon();
  }, [hackathonId]);
  useEffect(() => {
    if (!hackathon.startDate) return;
    const hackathonStartTime = new Date(hackathon.startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = hackathonStartTime - now;
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimer("Hackathon Started!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hackathon.startDate]);


    const showTeamsDetaails=(id)=>{
      navigate(`/teamDetails/${id}`);
    }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 p-8 text-white">
      <Card className="bg-white text-black rounded-xl shadow-lg">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="flex items-center text-black hover:text-blue-600"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2" /> Back
            </Button>
            <h2 className="text-2xl font-bold text-center text-black flex-grow">
              {hackathon.name || "Hackathon Title"}
            </h2>
            <div className="text-lg font-bold text-red-500">{timer}</div>
          </div>

          {/* Hackathon Details */}
          <div className="mb-8 text-black">
            <p>
              <strong>Start Date:</strong>{" "}
              {hackathon.startDate
                ? new Date(hackathon.startDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Start Time:</strong> {hackathon.startTime || "N/A"}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {hackathon.duration ? `${hackathon.duration} Hours` : "N/A"}
            </p>
            <p>
              <strong>Team member Required:</strong>{" "}
              {hackathon.TeamMembers || "N/A"}
            </p>
            <p>
              <strong>Total Registered Teams:</strong>{" "}
              {hackathon.registeredTeams?.length || 0}
            </p>
          </div>

          {/* Team Table */}
          <Table className="w-full table-auto border-collapse">
            <TableRow className="bg-gray-200">
              <TableCell className="font-bold text-black">Team Name</TableCell>
              <TableCell className="font-bold text-black">Team ID</TableCell>
              <TableCell className="font-bold text-black">
                Team Leader
              </TableCell>
              
              <TableCell className="font-bold text-black">Action</TableCell>
            </TableRow>

            <TableBody>
              {teams.map((team, index) => (
                <TableRow key={index}>
                  <TableCell className="text-black">
                    {team.teamName || "N/A"}
                  </TableCell>
                  <TableCell className="text-black">
                    {team.teamId || "N/A"}
                  </TableCell>
                  <TableCell className="text-black">
                    {team.registrationDate || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => showTeamsDetaails(team.teamId)}
                       className="text-white"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowReportOneHack;
