import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom"; // Import NavLink
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CreateHackathon = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: "",
    TotalTeamMember: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect after successful creation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await axios.post("http://localhost:3000/admin/createHackathon", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        // Successfully created, redirect to another page or show success message
        navigate("/ahome"); // or redirect to a different page after successful creation
        console.log("Hackathon created successfully:", response.data);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      console.error("Error creating hackathon:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Add Hackathon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Hackathon Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter hackathon name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                placeholder="Enter duration in hours"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="TotalTeamMember">Members per Team</Label>
              <Input
                type="number"
                id="TotalTeamMember"
                name="TotalTeamMember"
                placeholder="Enter max members per team"
                value={formData.TotalTeamMember}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="text-red-600 mt-2 text-center">{error}</div>
            )}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>

          <div className="mt-4 text-center">
            <NavLink to="/" className="text-blue-500">Go Back to Dashboard</NavLink> {/* Use NavLink instead of Link */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHackathon;