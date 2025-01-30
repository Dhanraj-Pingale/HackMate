import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AuthContext } from '@/context/AuthContext'; // Import AuthContext

const CreateTeam = () => {
  const { id } = useParams(); // Hackathon ID from URL
  const navigate = useNavigate(); // For navigation
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  
  const location = useLocation(); // Use useLocation to access the query parameters
  const queryParams = new URLSearchParams(location.search);
  const totalTeamMember = queryParams.get('totalTeamMember'); // Access the query param
  
  // Ensure team size is automatically set to the totalTeamMember value
  useEffect(() => {
    if (totalTeamMember) {
      setTeamSize(totalTeamMember);
    }
  }, [totalTeamMember]);

  console.log("Hackathon ID:", id);
  console.log("Total Team Members Allowed:", totalTeamMember);

  // Ensure user is logged in
  if (!user) {
    alert('You must be logged in to create a team.');
    navigate('/login');
    return null;
  }

  // Handle team creation
  const handleCreateTeam = async () => {
    if (!teamName || !teamSize) {
      alert('Please fill all fields');
      return;
    }

    // Ensure team size is equal to totalTeamMember
    if (teamSize !== totalTeamMember) {
      alert(`Team size must be ${totalTeamMember} members.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/createTeam', {
        teamName,
        teamSize: parseInt(teamSize, 10) || 1, // Ensure it's a valid number
        HackathonId: id,
        teamMembers: [], // Team members will be added later
        teamLeader: user.email, // Set logged-in user as leader
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
            <Input 
              type="number" 
              value={teamSize} 
              onChange={(e) => setTeamSize(e.target.value)} 
              placeholder="Enter team size" 
              disabled
            />
            <p className="text-sm text-gray-500">Team size is fixed at {totalTeamMember} members</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Leader (You)</label>
            <Input type="email" value={user.email} disabled className="bg-gray-100 dark:bg-gray-800" />
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
