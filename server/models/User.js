import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  teckStack: {type: String, required: false},
  bio: {type: String, required: false},
  linkedIn: {type: String, required: false},
  github: {type: String, required: false},
  portfolio: {type: String, required: false}

})

export default mongoose.model("User", UserSchema);