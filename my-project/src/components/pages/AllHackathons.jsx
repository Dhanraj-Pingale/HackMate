import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';

const AllHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/getAllHackthon')
      .then((response) => {
        setHackathons(response.data);
        setFilteredHackathons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hackathons:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const filtered = hackathons.filter((hackathon) =>
      hackathon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredHackathons(filtered);
  };

  const handleClick = (id) => {
    navigate(`/getTeams/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search hackathons by name"
          className="w-full max-w-md"
        />
      </div>

      {/* Display Hackathons */}
      <div>
        {filteredHackathons.length === 0 ? (
          <p>No hackathons found</p>
        ) : (
          <ul>
            {filteredHackathons.map((hackathon) => (
              <li
                key={hackathon._id}
                onClick={() => handleClick(hackathon._id)}
                className="mb-4 p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
              >
                <h3 className="text-xl font-semibold">{hackathon.name}</h3>
                <p>{hackathon.description}</p>
                <p>Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllHackathons;
