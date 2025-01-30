import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@shadcn/ui'; 

const AllHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch all hackathons when the component mounts
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

  // Filter hackathons based on the search query
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const filtered = hackathons.filter((hackathon) =>
      hackathon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredHackathons(filtered);
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
              <li key={hackathon._id} className="mb-4 p-4 border rounded-lg shadow-sm">
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
