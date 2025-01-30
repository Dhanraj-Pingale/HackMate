import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const CreateTeam = () => {
  const { id } = useParams(); // Hackathon ID from URL
  const navigate = useNavigate(); // For navigation
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [teamLeader, setTeamLeader] = useState('');

  // Handle team creation
  const handleCreateTeam = async () => {
    if (!teamName || !teamSize || !teamLeader) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/createTeam', {
        teamName,
        teamSize: parseInt(teamSize, 10) || 1, // Ensure it's a valid number
        HackathonId: id,
        teamMembers: [],
        teamLeader,
      });

      alert(response.data.message || 'Team created successfully!');
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error creating team:', error);
      alert(error.response?.data?.message || 'Failed to create team.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create a New Team</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Name</label>
            <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter team name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Size</label>
            <Input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} placeholder="Enter team size" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Leader Email</label>
            <Input type="email" value={teamLeader} onChange={(e) => setTeamLeader(e.target.value)} placeholder="Enter leader email" />
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeam;
