import exprees from "express";
import Hackathon from "../models/Hackathon.js";
const router = exprees.Router();

router.post("/createHackathon",async(req,res)=>{
    try {
        const { name, description, startDate, startTime, duration, TotalTeamMember } = req.body;
        if (!name || !description || !startDate || !startTime || !duration ) {
            return res.status(400).json({ message: "All fields are required", error: true });
          }

          const hackathon = new Hackathon({
            name,
            description,
            startDate,
            startTime,
            duration,
            TotalTeamMember,
          });

    await hackathon.save();
    return res.status(201).json({
      message: "HackThon created succesfuly",
      hackathon: hackathon,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
});
// route for get all hackthon
router.get("/getAllHackthon", async (req, res) => {
  try {
    const allhackthon = await Hackathon.find();
    return res.json(allhackthon);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve hackathons", error: true });
  }
});
router.get("/getAllDetailsHackthon/:id", async (req, res) => {
  try {
    const hackthonId = await req.params.id;
    // find hackthon by id
    const OneHackthon = await Hackathon.findById(hackthonId);
    if (!OneHackthon) {
      return res.status(400).json({
        message: "hackthon not exist ",
        error: true,
      });
    }
    res.status(200).json(OneHackthon);
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
  }
});

export default router;
