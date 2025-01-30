import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({  
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    })

export default mongoose.model("Hackathon", HackathonSchema);