import exprees from 'express';
import Hackathon from '../models/Hackathon.js';
const router=exprees.Router();

router.post("/createHackthon",async(req,res)=>{
    try {
        const { name, description, startDate, startTime, duration, TeamMembers, maxTeams } = req.body;
        if (!name || !description || !startDate || !startTime || !duration || !TeamMembers || !maxTeams) {
            return res.status(400).json({ message: "All fields are required", error: true });
          }

          const hackathon = new Hackathon({
            name,
            description,
            startDate,
            startTime,
            duration,
            TeamMembers,
            maxTeams,
          });

          await hackathon.save();
          return res.status(201).json({
            message:"HackThon created succesfuly",
            hackathon:hackathon,
          })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
})
// route for get all hackthon 
router.get("/getAllHackthon",async(req,res)=>{
    try {
        const allhackthon=await Hackathon.find();
        return res.json(allhackthon);
    } catch (error) {
        console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: "Failed to retrieve hackathons",
        error:true,
     });
    }
})
export default router;
