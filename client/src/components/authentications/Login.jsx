import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext); // Use login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      // API call to authenticate user
      const response = await axios.post('http://localhost:3000/auth/logindb', {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming response contains user data
        const userData = response.data.user; // Update this based on your response structure
        login(userData); // Store user data in context and localStorage
        navigate('/shomepage'); // Redirect to homepage
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed, please try again.');
      console.error('Login error', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the /register route when button is clicked
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center relative px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Display error message if any */}
        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        {/* Display message */}
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}

        {/* Register option */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <p
            onClick={handleRegister}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register here
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

