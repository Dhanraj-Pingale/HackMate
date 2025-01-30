import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},
    teamSize: {type: Number, required: true},
    whichHackathon: {type: String, required: true},
    teamMembers: {type: Array, required: true},
    teamLeader: {type: String, required: true},