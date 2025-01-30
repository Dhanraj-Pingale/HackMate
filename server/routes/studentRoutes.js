import express from "express";
import Hackathon from "../models/Hackathon.js";
import User from "../models/User.js";
import Team from "../models/Team.js";

const router = express.Router();

router.post("/addHackathon", async (req, res) => {
  const { name, description, location, date, time } = req.body;

  if (!name || !description || !location || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hackathon = new Hackathon({
      name,
      description,
      location,
      date,
      time,
    });

    await hackathon.save();
    res.status(201).json({
      message: "Hackathon added successfully",
      hackathonId: hackathon._id,
    });
  } catch (error) {
    console.error("Error adding hackathon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getHackathons", async (req, res) => {
  const hackathons = await Hackathon.find();
  res.json(hackathons);
});

router.post("/updateStudent", async (req, res) => {
    const { email, techStack, bio, linkedIn, github, portfolio } = req.body;
  
    if (!email || !Array.isArray(techStack) || techStack.length === 0 || !bio || !linkedIn || !github || !portfolio) {
      return res.status(400).json({ error: "All fields are required, and techStack must be a non-empty array" });
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


router.post("/createTeam" , async (req, res) => {
    const { teamName, teamSize, HackathonId, teamMembers, teamLeader } = req.body;

    if (!teamName || !teamSize || !HackathonId || !teamLeader || !teamMembers.length === 0) {
        return res.status(400).json({ error: "All fields are required, and memberIds must be a non-empty array" });
    }

    try {
        // const hackathon = await Hackathon.findById(hackathonId);
        // if(!hackathon) {
        //     return res.status(404).json({ error: "Hackathon not found" });
        // }

        const team = new Team({
            teamName,
            teamSize,
            HackathonId,
            teamMembers,
            teamLeader
        });

        await team.save();
        res.status(201).json({
            message: "Team created successfully",
            teamId: team._id
        });
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
