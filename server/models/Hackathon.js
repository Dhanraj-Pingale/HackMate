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
        teamCount:{
            type:Number,
            required:true,
        },
        registeredTeams: [
          {
            teamName: String,
            teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
            registrationDate: {
              type: Date,
              default: Date.now,
            },
          },
        ],
    })

export default mongoose.model("Hackathon", HackathonSchema);
