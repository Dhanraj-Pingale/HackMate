// server.js

import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";

import initializePassport from "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import connectToDb from "./config/dbConfig.js";
import adminRoutes from "./routes/adminRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expires in 1 day
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initializePassport();

// Use authentication routes
app.use("/auth", authRoutes);
// Use student routes
app.use("/student", studentRoutes);

app.use("/admin",adminRoutes);

app.use("/gemini", geminiRoutes);

// Connect to MongoDB and start the server
async function startServer() {
  try {
    await connectToDb(); // Connect to the DB
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
