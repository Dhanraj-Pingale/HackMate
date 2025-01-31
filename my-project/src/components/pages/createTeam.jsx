import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/context/AuthContext";
import Select from "react-select";

// Tech stack options
const techStackOptions = [
  { value: "MERN Stack", label: "MERN Stack" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "Angular", label: "Angular" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Flutter", label: "Flutter" },
  { value: "React Native", label: "React Native" },
  { value: "Django", label: "Django" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "Express.js", label: "Express.js" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "Firebase", label: "Firebase" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Redis", label: "Redis" },
  { value: "TensorFlow", label: "TensorFlow" },
  { value: "OpenAI", label: "OpenAI" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Swift", label: "Swift" },
  { value: "Rust", label: "Rust" },
  { value: "Go", label: "Go" },
  { value: "Scala", label: "Scala" },
  { value: "C#", label: "C#" },
  { value: "C++", label: "C++" },
  { value: "Julia", label: "Julia" },
  { value: "PHP", label: "PHP" },
  { value: "Next.js", label: "Next.js" },
  { value: "Svelte", label: "Svelte" },
  { value: "Laravel", label: "Laravel" },
  { value: "ASP.NET", label: "ASP.NET" },
  { value: "Apache Kafka", label: "Apache Kafka" },
  { value: "Socket.io", label: "Socket.io" },
  { value: "Elixir", label: "Elixir" },
  { value: "RabbitMQ", label: "RabbitMQ" },
  { value: "Cloud Functions", label: "Cloud Functions" },
  { value: "Nginx", label: "Nginx" },
  { value: "Jenkins", label: "Jenkins" },
  { value: "Terraform", label: "Terraform" },
];

const CreateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [teamRepo, setTeamRepo] = useState("");
  const [leaderGitUsername, setGithubUsername] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalTeamMember = queryParams.get("totalTeamMember");

  useEffect(() => {
    if (totalTeamMember) {
      setTeamSize(totalTeamMember);
    }
  }, [totalTeamMember]);

  if (!user) {
    alert("You must be logged in to create a team.");
    navigate("/login");
    return null;
  }

  const handleCreateTeam = async () => {
    if (!teamName || !teamSize || !teamRepo || !leaderGitUsername) {
      alert("Please fill all fields");
      return;
    }

    if (teamSize !== totalTeamMember) {
      alert(`Team size must be ${totalTeamMember} members.`);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/student/createTeam",
        {
          teamName,
          teamSize: parseInt(teamSize, 10) || 1,
          HackathonId: id,
          teamMembers: [],
          techStack,
          teamLeader: user.email,
          leaderName: user.name,
          teamRepo,
          leaderGitUsername,
        },
      );

      alert(response.data.message || "Team created successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error creating team:", error);
      alert(error.response?.data?.message || "Failed to create team.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg bg-gray-800 rounded-2xl min-h-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create a New Team</h2>

          {/* Tech Stack */}
          <div className="mb-4">
            <label
              htmlFor="techStack"
              className="capitalize text-gray-900 dark:text-white"
            >
              Tech Stack
            </label>
            <Select
              isMulti
              options={techStackOptions}
              value={techStack.map((tech) => ({
                value: tech,
                label: tech,
              }))}
              onChange={(selectedOptions) =>
                setTechStack(selectedOptions.map((option) => option.value))
              }
              className="mt-1"
              isSearchable
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  borderColor: "#4b5563", // Added border color
                  "&:hover": {
                    borderColor: "#6b7280", // Border color on hover
                  },
                  boxShadow: "none",
                  color: "white",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#1f2937", // Darker background
                  border: "1px solid #4b5563", // Added border
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  maxHeight: "200px", // Set maximum height
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: "200px", // Set maximum height for the scrollable area
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-track": {
                    background: "#374151",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#4b5563",
                    borderRadius: "4px",
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "#6b7280",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#1e40af"
                    : state.isFocused
                      ? "#4b5563"
                      : "#1f2937",
                  color: "#fff",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#4b5563",
                  },
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#1e40af",
                  color: "#fff",
                  borderRadius: "4px",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    color: "#fff",
                  },
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#9ca3af", // Lighter gray for placeholder
                }),
              }}
            />
          </div>

          {/* Team Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Name</label>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>

          {/* Team Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Size</label>
            <Input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="Enter team size"
              disabled
            />
            <p className="text-sm text-gray-500">
              Team size is fixed at {totalTeamMember} members
            </p>
          </div>

          {/* GitHub Repository URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              GitHub Repository URL
            </label>
            <Input
              value={teamRepo}
              onChange={(e) => setTeamRepo(e.target.value)}
              placeholder="Enter GitHub repository URL"
            />
          </div>

          {/* GitHub Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium">GitHub Username</label>
            <Input
              value={leaderGitUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Enter GitHub username"
            />
          </div>

          {/* Team Leader */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Team Leader (You)
            </label>
            <Input
              type="email"
              value={user.email}
              disabled
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeam;