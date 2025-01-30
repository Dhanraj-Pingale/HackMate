import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <label className="block mb-2 text-gray-400">Email</label>
        <Input type="email" placeholder="Enter your email" className="mb-4" />

        <label className="block mb-2 text-gray-400">Password</label>
        <Input type="password" placeholder="Enter your password" className="mb-6" />

        <Button className="w-full bg-red-500 hover:bg-red-600">Login</Button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Forgot password? <a href="#" className="text-red-400">Reset</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
