import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext'; // Assuming you have the AuthContext to get the current user
import { motion } from 'framer-motion';
import { FaGithub, FaUsers, FaTools } from 'react-icons/fa'; // Correct icon for technology
import { Button } from '../ui/button';

const ViewTeam = () => {
  const { teamId } = useParams();
  const { user } = useContext(AuthContext); // Get the current user from context
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/viewTeam/${teamId}`);
        console.log(response.data.team); // Debugging: Check the full team object
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

      alert(response.data.message);
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
    <div className="container mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      {/* Team Info Card */}
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Team Name */}
        <motion.h2
          className="text-5xl font-bold text-center text-indigo-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {team.teamName}
        </motion.h2>

        {/* Team Repo */}
        <div className="flex items-center mb-4">
          <FaGithub className="text-gray-300 text-3xl mr-3" />
          <div>
            <p className="font-semibold">Team Repo:</p>
            <a
              href={team.teamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              {team.teamRepo}
            </a>
          </div>
        </div>

        {/* Leader GitHub Username */}
        <div className="flex items-center mb-4">
          <FaGithub className="text-gray-300 text-3xl mr-3" />
          <div>
            <p className="font-semibold">Leader GitHub Username:</p>
            <p>{team.leaderGitUsername}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex items-center mb-4">
          <FaTools className="text-gray-300 text-2xl mr-3" />
          <div>
            <p className="font-semibold">Tech Stack:</p>
            <p>
              {Array.isArray(team.techStack) && team.techStack.length > 0
                ? team.techStack.join(', ')
                : 'No tech stack specified'}
            </p>
          </div>
        </div>

        {/* Team Size */}
        <div className="flex items-center mb-4">
          <FaUsers className="text-gray-300 text-2xl mr-3" />
          <div>
            <p className="font-semibold">Team Size:</p>
            <p>{team.teamSize}</p>
          </div>
        </div>

        {/* Team Leader */}
        <div className="flex items-center mb-4">
          <FaUsers className="text-gray-300 text-2xl mr-3" />
          <div>
            <p className="font-semibold">Team Leader:</p>
            <p>{team.teamLeader}</p>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-4">
          <p className="font-semibold flex items-center mb-2">
            <FaUsers className="text-gray-300 text-2xl mr-3" />
            Team Members:
          </p>
          {team.teamMembers.length === 0 ? (
            <p>No members yet</p>
          ) : (
            <ul>
              {team.teamMembers.map((member, index) => (
                <motion.li
                  key={index}
                  className="mb-4 flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div>
                    {member.memberName} ({member.email}) - {member.status}
                  </div>
                  {user?.email === team.teamLeader && member.status !== 'confirmed' && (
                    <Button
                      variant="solid"
                      color="indigo"
                      size="sm"
                      onClick={() => handleConfirmMember(member.email)}
                    >
                      Confirm
                    </Button>
                  )}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewTeam;

