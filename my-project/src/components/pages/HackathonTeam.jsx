import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const HackathonTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Open modal for joining a team
  const openModal = (teamId) => {
    setSelectedTeam(teamId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
    setEmail('');
  };

  // Handle joining team
  const handleJoinTeam = async () => {
    if (!email) {
      alert('Please enter your email!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/joinTeam', {
        teamId: selectedTeam,
        memberEmail: email,
      });

      alert(response.data.message || 'Successfully joined the team!');
      closeModal();
    } catch (error) {
      console.error('Error joining team:', error);
      alert(error.response?.data?.message || 'Failed to join team.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Teams for Hackathon</h2>
        <Button onClick={() => navigate(`/create-team/${id}`)}>Create New Team</Button>
      </div>

      {teams.length === 0 ? (
        <p>No teams found for this hackathon.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{team.teamName}</h3>
              <p>Members: {team.teamMembers.length > 0 ? team.teamMembers.map(member => member.email).join(', ') : 'No members yet'}</p>
              <Button className="mt-2" onClick={() => openModal(team._id)}>Join Team</Button>
            </li>
          ))}
        </ul>
      )}

      {/* Join Team Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleJoinTeam}>Join Team</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonTeam;
