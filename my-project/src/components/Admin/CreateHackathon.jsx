import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom"; // Import NavLink
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast"; // Import toast hook for notifications

const CreateHackathon = () => {
  const { toast } = useToast(); // Hook for showing toast notifications
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: "",
    TotalTeamMember: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // To redirect after successful creation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (!formData.name || !formData.description || !formData.startDate || !formData.startTime || !formData.duration || !formData.TotalTeamMember) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Send form data to the backend
      const response = await axios.post("http://localhost:3000/admin/createHackathon", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        // Successfully created, show success message and redirect
        toast({
          title: "Success",
          description: "Hackathon created successfully!",
        });
        navigate("/ahome"); // Redirect to another page
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response ? error.response.data.message : "Something went wrong",
        variant: "destructive",
      });
      console.error("Error creating hackathon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Add Hackathon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Hackathon Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter hackathon name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="startDate" className="text-white">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="startTime" className="text-white">Start Time</Label>
              <Input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-white">Duration (hours)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                placeholder="Enter duration in hours"
                value={formData.duration}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="TotalTeamMember" className="text-white">Members per Team</Label>
              <Input
                type="number"
                id="TotalTeamMember"
                name="TotalTeamMember"
                placeholder="Enter max members per team"
                value={formData.TotalTeamMember}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Hackathon"}
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

