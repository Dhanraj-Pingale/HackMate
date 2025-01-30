import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Path to your input component
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook properly

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-8 max-w-md w-full border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center text-black">Admin Login</h2>

                <div className="mb-6">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
