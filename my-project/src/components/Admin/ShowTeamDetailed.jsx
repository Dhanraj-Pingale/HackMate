import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ShowTeamDetails = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  const [content, setContent] = useState([]);
  const [activeBranch, setActiveBranch] = useState(null); // Track active branch

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/getTeamDetails/${teamId}`
        );
        setTeam(response.data);
      } catch (error) {
        console.log("Error fetching team details", error);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  const fetchBranches = async () => {
    const { leaderGitUsername, teamRepo } = team;
    try {
      const response = await axios.get(
        `http://localhost:3000/github/branches?username=${leaderGitUsername}&reponame=${teamRepo}`
      );
      setBranches(response.data);
    } catch (error) {
      console.log("Error fetching branches", error);
    }
  };

  const fetchCommits = async (branchName) => {
    const { leaderGitUsername, teamRepo } = team;
    try {
      const response = await axios.get(
        `http://localhost:3000/github/commits?username=${leaderGitUsername}&reponame=${teamRepo}&branch=${branchName}`
      );
      setCommits(response.data);
      console.log(response.data);
      setActiveBranch(branchName); // Set the active branch
    } catch (error) {
      console.log("Error fetching commits", error);
    }
  };

  const fetchContent = async () => {
    const { leaderGitUsername, teamRepo } = team;
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${leaderGitUsername}/${teamRepo}/contents`
      );
      setContent(response.data); // If you're fetching repository content, set content here
    } catch (error) {
      console.log("Error fetching repository content", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 p-8 text-white">
      <Card className="bg-white text-black rounded-xl shadow-lg">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              className="flex items-center text-black hover:text-blue-600"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2" /> Back
            </Button>
            <h2 className="text-3xl font-extrabold text-center text-black flex-grow">
              {team.teamName || "Team Name"}
            </h2>
          </div>

          {/* Team Details Section */}
          <div className="flex justify-between mb-6 text-black space-y-4">
            <div className="flex flex-col space-y-4 w-1/2">
              <p className="text-lg">
                <strong className="font-bold text-xl">Team Leader:</strong>{" "}
                {team.teamLeader || "N/A"}
              </p>
              <p className="text-lg">
                <strong className="font-bold text-xl">Team Size:</strong>{" "}
                {team.teamSize || "N/A"}
              </p>
            </div>

            <div className="flex flex-col space-y-4 w-1/2">
              <h3 className="text-2xl font-bold text-center mb-4">
                Team Members
              </h3>
              {team.teamMembers && team.teamMembers.length > 0 ? (
                team.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-700 text-white p-4 rounded-lg"
                  >
                    <span className="truncate">{member.memberName}</span>
                    <span
                      className={`text-xs ${
                        member.status === "confirmed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                ))
              ) : (
                <p>No members available</p>
              )}
            </div>
          </div>

          {/* Accordion Section for Repository Details */}
          <div className="space-y-4 mt-6">
            <Accordion type="single" collapsible className="w-full">
              {/* Branches Accordion Item */}
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="bg-black text-white p-4 rounded-md hover:bg-gray-700"
                  onClick={fetchBranches}
                >
                  Show all branches and their Commits
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                  <ul>
                    {branches.length > 0 ? (
                      branches.map((branch, index) => (
                        <li key={index}>
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`branch-${branch.name}`}>
                              <AccordionTrigger
                                className="bg-gray-700 text-white p-2 rounded-md"
                                onClick={() => fetchCommits(branch.name)}
                              >
                                {branch.name}
                              </AccordionTrigger>
                              {activeBranch === branch.name && (
                                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                                  <ul>
                                    {commits.length > 0 ? (
                                      commits.map((commit, index) => {
                                        const commitDate = new Date(
                                          commit.commit?.author?.date
                                        );
                                        console.log(commitDate);
                                        const formattedDate =
                                          commitDate.toLocaleString(); // You can adjust the formatting as needed
                                        return (
                                          <li
                                            key={index}
                                           
                                          >
<div className="flex justify-between items-center space-y-1 border border-transparent hover:border-red-400">
<span>
                                                <strong>
                                                  {commit.author?.login}
                                                </strong>
                                                : {commit.commit.message}
                                              </span>
                                              <div className="text-sm text-gray-400">
                                                {formattedDate}
                                              </div>
                                            </div>
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <p>No commits available</p>
                                    )}
                                  </ul>
                                </AccordionContent>
                              )}
                            </AccordionItem>
                          </Accordion>
                        </li>
                      ))
                    ) : (
                      <p>No branches available</p>
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Pull Requests Accordion Item */}
              <AccordionItem value="item-3">
                <AccordionTrigger
                  className="bg-black text-white p-4 rounded-md hover:bg-gray-700"
                  onClick={fetchContent}
                >
                  Show eniter content of repo
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 text-white p-4 rounded-md">
                  <ul>
                    {content.length > 0 ? (
                      content.map((file, index) => (
                        <li key={index}>
                          {file.type === "file" ? (
                            <a
                              href={file.download_url} // Direct download link for files
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {file.name}
                            </a>
                          ) : (
                            <span className="text-gray-400">
                              {file.name} (Folder)
                            </span>
                          )}
                        </li>
                      ))
                    ) : (
                      <p>No content available</p>
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowTeamDetails;
