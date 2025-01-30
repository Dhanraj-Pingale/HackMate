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
    return res
      .status(400)
      .json({
        error:
          "All fields are required, and techStack must be a non-empty array",
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

    if (!teamName || !teamSize || !HackathonId || !teamLeader || teamMembers.length === 0) {
        return res.status(400).json({ error: "All fields are required, and teamMembers must be a non-empty array" });
    }

    try {
        // Ensure HackathonId is valid ObjectId
        if (!ObjectId.isValid(HackathonId)) {
            return res.status(400).json({ error: "Invalid Hackathon ID" });
        }

        const hackathon = await Hackathon.findById(new ObjectId(HackathonId));
        if (!hackathon) {
            return res.status(404).json({ error: "Hackathon not found" });
        }

        // Create the new team
        const team = new Team({
            teamName,
            teamSize,
            HackathonId,
            teamMembers,
            teamLeader
        });

        await team.save();

        const teamId = team._id;
        // Add the team to the hackathon's registeredTeams
        hackathon.registeredTeams.push({
            teamName,
            teamId,
            registrationDate: Date.now(),
        });

        await hackathon.save();  // Save the updated hackathon

        res.status(201).json({
            message: "Team created successfully",
            teamId,
        });
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/joinTeam" , async (req, res) => {
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

        // Ensure team is not full
        if (team.teamMembers.length >= team.teamSize) {
            return res.status(400).json({ error: "Team is full" });
        }

        // Add the new team member
        team.teamMembers.push(teamMember);
        await team.save();

        res.status(200).json({
            message: "Joined team successfully",
            teamId,
        });
    } catch (error) {
        console.error("Error joining team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
