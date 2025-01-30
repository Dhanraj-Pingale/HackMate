import express from "express";
import Hackathon from "../models/Hackathon.js";
import User from "../models/User.js";
import Team from "../models/Team.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const router = express.Router();

router.post("/updateStudent", async (req, res) => {
  const { email, techStack, bio, linkedIn, github, portfolio } = req.body;

  if (
    !email ||
    !Array.isArray(techStack) ||
    techStack.length === 0 ||
    !bio ||
    !linkedIn ||
    !github ||
    !portfolio
  ) {
    return res.status(400).json({
      error: "All fields are required, and techStack must be a non-empty array",
    });
  }

  try {
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.techStack = techStack;
    student.bio = bio;
    student.linkedIn = linkedIn;
    student.github = github;
    student.portfolio = portfolio;

    await student.save();
    res.status(200).json({
      message: "Student updated successfully",
      studentId: student._id,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createTeam", async (req, res) => {
    const { teamName, teamSize, HackathonId, teamMembers, teamLeader } = req.body;
  
    if (!teamName || !teamSize || !HackathonId || !teamLeader) {
      return res.status(400).json({
        error: "All fields are required, and teamMembers must be a non-empty array",
      });
    }
  
    try {
      // Ensure HackathonId is valid ObjectId
      if (!ObjectId.isValid(HackathonId)) {
        return res.status(400).json({ error: "Invalid Hackathon ID" });
      }
  
      // Check if hackathon exists
      const hackathon = await Hackathon.findById(new ObjectId(HackathonId));
      if (!hackathon) {
        return res.status(404).json({ error: "Hackathon not found" });
      }
  
      // Ensure the number of members is within the team size
      const totalTeamMembers = teamMembers.length + 1; // Adding 1 for the team leader
      if (totalTeamMembers !== teamSize) {
        return res.status(400).json({
          error: `Team size mismatch. Expected ${teamSize} members, but found ${totalTeamMembers} members.`,
        });
      }
  
      // Ensure the team leader is included in the team members array
      const updatedTeamMembers = [...teamMembers, { email: teamLeader, status: "confirmed" }];
  
      // Create the new team with the specified teamSize
      const team = new Team({
        teamName,
        teamSize, // Set the teamSize
        HackathonId,
        teamMembers: updatedTeamMembers, // Add team leader as a team member
        teamLeader, // Set the team leader
      });
  
      await team.save();
  
      const teamId = team._id;
  
      // Add the team to the hackathon's registeredTeams
      hackathon.registeredTeams.push({
        teamName,
        teamId,
        registrationDate: Date.now(),
      });
  
      await hackathon.save(); // Save the updated hackathon
  
      res.status(201).json({
        message: "Team created successfully",
        teamId,
      });
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

router.post("/joinTeam", async (req, res) => {
  const { teamId, memberEmail } = req.body;

  if (!teamId || !memberEmail) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Ensure teamId is valid ObjectId
    if (!ObjectId.isValid(teamId)) {
      return res.status(400).json({ error: "Invalid Team ID" });
    }

    const team = await Team.findById(new ObjectId(teamId));
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Ensure the team is not full by checking teamMembers length
    if (team.teamMembers.length >= team.teamSize) {
      return res.status(400).json({ error: "Team is full" });
    }

    // Add the new member's email with a status of 'unconfirmed'
    team.teamMembers.push({ email: memberEmail, status: "unconfirmed" });
    await team.save();

    res.status(200).json({
      message: "Joined team successfully, waiting for confirmation",
      teamId,
    });
  } catch (error) {
    console.error("Error joining team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/confirmMember", async (req, res) => {
  const { teamId, memberEmail, teamLeaderEmail } = req.body;

  if (!teamId || !memberEmail || !teamLeaderEmail) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Ensure teamId is valid ObjectId
    if (!ObjectId.isValid(teamId)) {
      return res.status(400).json({ error: "Invalid Team ID" });
    }

    const team = await Team.findById(new ObjectId(teamId));
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check if the user is the team leader
    if (team.teamLeader !== teamLeaderEmail) {
      return res
        .status(403)
        .json({ error: "Only the team leader can confirm members" });
    }

    // Find the member in the team and change their status to 'confirmed'
    const member = team.teamMembers.find(
      (member) => member.email === memberEmail
    );
    if (!member) {
      return res.status(404).json({ error: "Member not found in the team" });
    }

    member.status = "confirmed"; // Update the member's status to 'confirmed'
    await team.save();

    res.status(200).json({
      message: "Member confirmed successfully",
      memberEmail,
      status: member.status,
    });
  } catch (error) {
    console.error("Error confirming member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTeams/:hackathonId", async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const teams = await Team.find({ HackathonId: hackathonId });

    if (!teams.length) {
      return res
        .status(404)
        .json({ message: "No teams found for this hackathon." });
    }

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
