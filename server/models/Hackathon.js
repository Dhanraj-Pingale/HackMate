import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({  
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        startTime:{
            type:String,
            required:true
        },
        duration: {
          type: Number, 
          required:true,
        },
        TeamMembers:{
            type:Number,
            required:true,
        },
        maxTeams: {
          type: Number,
          required: true,
        },
        registeredTeams: [
          {
            teamId: String,
          },
        ],
    })

export default mongoose.model("Hackathon", HackathonSchema);