import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AddHackathon = () => {
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      startDate: "",
      startTime: "",
      duration: "",
      teamMembers: "",
      maxTeams: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // You can add API call here to store data in the backend
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
            <Label htmlFor="teamMembers">Team Members Per Team</Label>
            <Input
              type="number"
              id="teamMembers"
              name="teamMembers"
              placeholder="Enter number of members per team"
              value={formData.teamMembers}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="maxTeams">Max Teams</Label>
            <Input
              type="number"
              id="maxTeams"
              name="maxTeams"
              placeholder="Enter max number of teams"
              value={formData.maxTeams}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500">
            Go Back to Dashboard
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default AddHackathon;
