import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext'; // Assuming you have the AuthContext to get the current user

const ViewTeam = () => {
  const { teamId } = useParams();
  const { user } = useContext(AuthContext); // Get the current user from context
  console.log('TeamId from URL:', teamId);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch team details from the server using the teamId
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/viewTeam/${teamId}`);
        setTeam(response.data.team);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team:', error);
        setError('Failed to fetch team details');
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  // Handle member confirmation
  const handleConfirmMember = async (memberEmail) => {
    if (!user?.email || user.email !== team.teamLeader) {
      alert('Only the team leader can confirm members.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/confirmMember', {
        teamId,
        memberEmail,
        teamLeaderEmail: user.email,
      });

      alert(response.data.message); // Show success message

      // Update the team members list with the confirmed status
      setTeam((prevTeam) => ({
        ...prevTeam,
        teamMembers: prevTeam.teamMembers.map((member) =>
          member.email === memberEmail ? { ...member, status: 'confirmed' } : member
        ),
      }));
    } catch (error) {
      console.error('Error confirming member:', error);
      alert(error.response?.data?.message || 'Failed to confirm member');
    }
  };

  if (loading) {
    return <div>Loading team details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{team.teamName}</h2>

      <div className="mb-4">
        <p className="font-semibold">Team Leader:</p>
        <p>{team.teamLeader}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Team Members:</p>
        {team.teamMembers.length === 0 ? (
          <p>No members yet</p>
        ) : (
          <ul>
            {team.teamMembers.map((member, index) => (
              <li key={index}>
                {member.email} - {member.status}
                {/* Show "Confirm" button only if the user is the team leader and member is unconfirmed */}
                {user?.email === team.teamLeader && member.status !== 'confirmed' && (
                  <button
                    onClick={() => handleConfirmMember(member.email)}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Confirm
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <p className="font-semibold">Team Size:</p>
        <p>{team.teamSize}</p>
      </div>
    </div>
  );
};

export default ViewTeam;
