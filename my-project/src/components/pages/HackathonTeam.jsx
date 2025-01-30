import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HackathonTeam = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching teams for hackathon:', id);
    axios
      .get(`http://localhost:3000/student/getTeams/${id}`)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teams for Hackathon</h2>
      {teams.length === 0 ? (
        <p>No teams found for this hackathon.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{team.teamName}</h3>
              {/* Fix: Access teamMembers and extract emails */}
              <p>Members: {team.teamMembers.length > 0 ? team.teamMembers.map(member => member.email).join(', ') : "No members yet"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackathonTeam;
