import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { Textarea } from "@headlessui/react";

const HackathonTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hackathonDetails, setHackathonDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);

  const [chatbotResponse, setChatbotResponse] = useState(null); // For storing chatbot response
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // To control the visibility of the chatbot

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/getAllDetailsHackthon/${id}`)
      .then((response) => {
        const { registeredTeams, ...hackathonData } = response.data;
        setHackathonDetails(hackathonData);
      })
      .catch((error) =>
        console.error("Error fetching hackathon details:", error)
      );
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/student/getTeams/${id}`)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, [id]);

  useEffect(() => {
    const isUserInTeam = teams.some((team) =>
      team.teamMembers.some((member) => member.email === user?.email)
    );
    setHasJoinedTeam(isUserInTeam);
  }, [teams, user]);

  const openModal = (teamId) => {
    setSelectedTeam(teamId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  const handleJoinTeam = async () => {
    if (!user?.email) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/student/joinTeam",
        {
          teamId: selectedTeam,
          memberEmail: user.email,
          name: user.name,
          status: "pending",  // Set status as pending
        }
      );

      alert(response.data.message || "Successfully joined the team!");
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === selectedTeam
            ? {
                ...team,
                teamMembers: [
                  ...team.teamMembers,
                  { email: user.email, status: "pending" },  // Add as pending member
                ],
              }
            : team
        )
      );

      closeModal();
      setHasJoinedTeam(true);
    } catch (error) {
      console.error("Error joining team:", error);
      alert(error.response?.data?.message || "Failed to join team.");
    }
  };

  const handleConfirmMember = async (teamId, memberEmail) => {
    try {
      const response = await axios.post("http://localhost:3000/student/confirmMember", {
        teamId,
        memberEmail,
      });

      alert(response.data.message || "Member confirmed!");
      // Update the team's member status to confirmed
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === teamId
            ? {
                ...team,
                teamMembers: team.teamMembers.map((member) =>
                  member.email === memberEmail
                    ? { ...member, status: "confirmed" }
                    : member
                ),
              }
            : team
        )
      );
    } catch (error) {
      console.error("Error confirming member:", error);
      alert("Failed to confirm member.");
    }
  };

  const userTeams = teams.filter((team) => team.teamLeader === user?.email);
  const otherTeams = teams.filter((team) => team.teamLeader !== user?.email);
  const joinedTeam = teams.find((team) =>
    team.teamMembers.some((member) => member.email === user?.email)
  );

  const handleAskQuestion = async (question) => {
    try {
      const response = await axios.post("http://localhost:3000/gemini/ask", {
        hackathonDetails,
        question,
      });
      setChatbotResponse(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
      setChatbotResponse("Sorry, there was an error getting the answer.");
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Left Section: Hackathon Details */}
        <motion.div
          className="w-full md:w-2/5 p-6 bg-gray-900 text-white rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hackathonDetails && (
            <div>
              <h2 className="text-3xl font-bold text-blue-400">
                {hackathonDetails.name}
              </h2>
              <p className="mt-2 text-gray-300">
                {hackathonDetails.description}
              </p>
              <p className="mt-3">
                📅 Start Date:{" "}
                {new Date(hackathonDetails.startDate).toLocaleDateString()}
              </p>
              <p>⏰ Start Time: {hackathonDetails.startTime}</p>
              <p>⏳ Duration: {hackathonDetails.duration} hours</p>
              <p>👥 Team Size: {hackathonDetails.TotalTeamMember}</p>
            </div>
          )}

         {/* Chatbot Button */}
<Button className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors" onClick={toggleChatbot}>
  🗣️ Ask a Question
</Button>

{/* Chatbot Interface */}
{isChatbotOpen && (
  <div className="mt-4 bg-black p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto">
    <h3 className="text-2xl font-semibold text-white mb-4">Chat with our Hackathon Bot</h3>
    
    <div className="flex flex-col space-y-4 h-96 overflow-y-auto">
      {/* Chatbot Conversation */}
      <div className="flex flex-col space-y-4 overflow-y-auto p-2 bg-gray-800 rounded-lg h-full">
        <div className="overflow-y-auto max-h-72">
          {/* Chatbot Messages */}
          {chatbotResponse && (
            <div className="bg-gray-700 p-3 rounded-lg max-w-xs mx-auto">
              <p className="text-white">{chatbotResponse}</p>
            </div>
          )}
        </div>
      </div>

      {/* User Input */}
      <div className="flex items-center space-x-2">
        <textarea
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black text-white placeholder-gray-400"
          placeholder="Ask me anything about the hackathon..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAskQuestion(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={() => handleAskQuestion(document.querySelector("textarea").value)}
          className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


        </motion.div>

        {/* Right Section: Hackathon Teams */}
        <motion.div
          className="w-full md:w-3/5 p-6 bg-gray-800 text-white rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Teams</h2>
            {!hasJoinedTeam && !userTeams.length && (
              <Button
                onClick={() =>
                  navigate(
                    `/create-team/${id}?totalTeamMember=${hackathonDetails.TotalTeamMember}`
                  )
                }
                disabled={hasJoinedTeam || userTeams.length > 0}
              >
                ➕ Create New Team
              </Button>
            )}
          </div>

          {/* User's Created Teams */}
          {userTeams.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Your Teams</h3>
              {userTeams.map((team) => (
                <Card key={team._id} className="mb-4 bg-gray-900">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{team.teamName}</h3>
                    <p>
                      Members:{" "}
                      {team.teamMembers
                        .map((member) => member.email)
                        .join(", ")}
                    </p>
                    <Button
                      className="mt-2"
                      onClick={() => navigate(`/view-team/${team._id}`)}
                    >
                      View Team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Other Teams */}
          {otherTeams.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Other Teams</h3>
              {otherTeams.map((team) => (
                <Card key={team._id} className="mb-4 bg-gray-900">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{team.teamName}</h3>
                    <p>
                      Members:{" "}
                      {team.teamMembers
                        .map((member) => member.email)
                        .join(", ")}
                    </p>
                    {/* Show Pending Status if not Confirmed */}
                    {team.teamMembers.some(
                      (member) => member.email === user?.email
                    ) && !team.teamMembers.some(
                      (member) => member.email === user?.email && member.status === "confirmed"
                    ) && (
                      <p className="mt-2 text-yellow-500">Pending</p>
                    )}
                    {/* If the user is not pending, show View Team button */}
                    {!hasJoinedTeam && (
                      <Button
                        className="mt-2"
                        onClick={() => openModal(team._id)}
                      >
                        Join Team
                      </Button>
                    )}
                    {/* If the user has joined this team, show View Team button */}
                    {joinedTeam && joinedTeam._id === team._id && (
                      <Button
                        className="mt-2"
                        onClick={() => navigate(`/view-team/${team._id}`)}
                      >
                        View Team Details
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Confirm Team Joining
            </h2>
            <p className="mb-4 text-black">
              Are you sure you want to join this team?
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleJoinTeam}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonTeam;
