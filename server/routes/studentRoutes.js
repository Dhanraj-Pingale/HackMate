import express from "express";
import Hackathon from "../models/Hackathon.js";

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
  const { techStack, bio, linkedIn, gitHub, portfolio } = req.body;

  if (!techStack || !bio || !linkedIn || !gitHub || !portfolio) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const student = new Student({
      techStack,
      bio,
      linkedIn,
      gitHub,
      portfolio,
    });

    await student.save();
    res.status(201).json({
      message: "Student updated successfully",
      studentId: student._id,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;