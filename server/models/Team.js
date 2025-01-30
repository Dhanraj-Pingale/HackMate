import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    teamName: String,
    teamMembers: [
        {
            memberName: String,
            email: String,  
            status: { type: String, default: 'unconfirmed' },
        },
    ],
    techStack: {type: Array, required: false},
    teamSize: { type: Number, required: true },
    teamLeader: String,
    HackathonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
});

export default mongoose.model("Team", TeamSchema);
