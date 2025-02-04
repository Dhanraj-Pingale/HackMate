import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/registerdb", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed. Please try again.");
      });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center relative px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="First name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Option to go to login page */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already registered?</p>
          <button
            onClick={handleLoginRedirect}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

