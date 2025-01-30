import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Path to your input component
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook properly
import { motion } from "framer-motion";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const { toast } = useToast(); // Correct usage of useToast hook

    const handleLogin = () => {
        if (password === '12345') {
            toast({
                title: "Login Successfully",
                description: "User login successful",
                variant: "success", // You can customize the variant, e.g., success, error, etc.
            });
            navigate('/ahome'); // Redirect to admin home page
        } else {
            toast({
                title: "Invalid Password",
                description: "Please try again",
                variant: "failure",  // Customize this variant for failure scenario
            });
            setPassword(""); // Clear the password input after failure
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center relative px-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-100">Admin Login</h2>

                <div className="mb-6">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none"
                >
                    Login
                </button>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

