import express from "express";
import Hackathon from "../models/Hackathon.js";


const router = express.Router();

router.get('/getHackathons', async (req, res) => {
  const hackathons = await Hackathon.find();
  res.json(hackathons);
});