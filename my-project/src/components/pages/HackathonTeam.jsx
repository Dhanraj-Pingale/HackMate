import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext'; // Import AuthContext properly

const HackathonTeam = () => {
  const { id } = useParams(); // Get the hackathon ID from the URL
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hackathonDetails, setHackathonDetails] = useState(null); // State for hackathon details
  const { user } = useContext(AuthContext); // Use useContext instead of useUser

  // Fetch hackathon details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/getAllDetailsHackthon/${id}`)
      .then((response) => {
        // Remove the `registeredTeams` from the response data
        const { registeredTeams, ...hackathonData } = response.data;
        setHackathonDetails(hackathonData); // Set hackathon details excluding `registeredTeams`
      })
      .catch((error) => {
        console.error('Error fetching hackathon details:', error);
      });
  }, [id]);

  // Fetch teams associated with the hackathon
  useEffect(() => {
    axios
      .get(`http://localhost:3000/student/getTeams/${id}`)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
  }, [id]);

  // Open modal for confirmation
  const openModal = (teamId) => {
    setSelectedTeam(teamId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  // Handle joining team
  const handleJoinTeam = async () => {
    if (!user?.email) {
      alert('User email not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/joinTeam', {
        teamId: selectedTeam,
        memberEmail: user.email, // Use email from context
      });

      alert(response.data.message || 'Successfully joined the team!');

      // Update the teams state dynamically
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === selectedTeam
            ? { ...team, teamMembers: [...team.teamMembers, { email: user.email }] }
            : team
        )
      );

      closeModal();
    } catch (error) {
      console.error('Error joining team:', error);
      alert(error.response?.data?.message || 'Failed to join team.');
    }
  };

  // Filter teams into two categories: the user's created teams (teamLeader) and others
  const userTeams = teams.filter((team) => team.teamLeader === user?.email);
  const otherTeams = teams.filter((team) => team.teamLeader !== user?.email);

  return (
    <div className="container mx-auto p-4">
      {/* Display Hackathon Details */}
      {hackathonDetails && (
        <div className="mb-6 p-6 bg-gray-800 text-white rounded-lg">
          <h2 className="text-2xl font-bold">{hackathonDetails.name}</h2>
          <p>{hackathonDetails.description}</p>
          <p>Start Date: {new Date(hackathonDetails.startDate).toLocaleDateString()}</p>
          <p>Start Time: {hackathonDetails.startTime}</p>
          <p>Duration: {hackathonDetails.duration} hours</p>
          <p>Total Team Members: {hackathonDetails.TotalTeamMember}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Teams for Hackathon</h2>
        {userTeams.length === 0 && (
          <Button onClick={() => navigate(`/create-team/${id}`)}>Create New Team</Button>
        )}
      </div>

      {/* Display user's created teams on top */}
      {userTeams.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Created Teams</h3>
          <ul>
            {userTeams.map((team) => (
              <li key={team._id} className="mb-4 p-4 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{team.teamName}</h3>
                <p>Members: {team.teamMembers.length > 0 ? team.teamMembers.map(member => member.email).join(', ') : 'No members yet'}</p>
                <Button
                  className="mt-2"
                  onClick={() => navigate(`/view-team/${team._id}`)} // Navigate to the view team page
                >
                  View Team
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display other teams (that the user is not the leader of) */}
      {otherTeams.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Other Teams</h3>
          <ul>
            {otherTeams.map((team) => (
              <li key={team._id} className="mb-4 p-4 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{team.teamName}</h3>
                <p>Members: {team.teamMembers.length > 0 ? team.teamMembers.map(member => member.email).join(', ') : 'No members yet'}</p>
                <Button
                  className="mt-2"
                  onClick={() => openModal(team._id)} // Open modal to join
                >
                  Join Team
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">Confirm Team Joining</h2>
            <p className="mb-4 text-black">Are you sure you want to join this team?</p>
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleJoinTeam}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonTeam;
