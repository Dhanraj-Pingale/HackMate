import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AllHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getAllHackthon")
      .then((response) => {
        setHackathons(response.data);
        setFilteredHackathons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hackathons:", error);
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
    <div className="container mx-auto p-6 text-white">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search hackathons by name"
          className="w-full max-w-md bg-gray-800 text-white border border-gray-700"
        />
      </div>

      {/* Display Hackathons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHackathons.length === 0 ? (
          <p className="text-gray-400">No hackathons found</p>
        ) : (
          filteredHackathons.map((hackathon) => (
            <Card
              key={hackathon._id}
              onClick={() => handleClick(hackathon._id)}
              className="bg-gray-900 text-white border border-gray-800 shadow-lg cursor-pointer hover:bg-gray-800 transition"
            >
              <CardHeader>
                <CardTitle>{hackathon.name}</CardTitle>
                <CardDescription>{hackathon.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AllHackathons;

