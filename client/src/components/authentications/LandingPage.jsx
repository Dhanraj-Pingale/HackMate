// components/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import Lottie from "lottie-react";
import Lenis from "@studio-freight/lenis";
import heroAnimation from "../../assets/hero-animation.json";
import Orb from "@/reactbits/Orb/Orb";
import SplitText from "@/reactbits/SplitText/SplitText";

const LandingPage = () => {
  // Smooth scrolling effect with Lenis
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 relative">
      <SplitText
        text="Hello!"
        className="text-6xl font-bold font-mono text-center"
        delay={100}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      />

      {/* Login Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md mt-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">User</h2>
        <div className="grid gap-4">
          <Link to="/login">
            <Button className="w-full">Student Login</Button>
          </Link>
          <Link to="/register">
            <Button className="w-full">Student Registration</Button>
          </Link>
        </div>
      </motion.div>

      {/* Register Section with Radix Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md mt-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Admin</h2>
        <div className="grid gap-4">
          {/* Updated Link for Student Registration */}
          {/* Radix Modal for Registration */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Link to="/alogin">
                <Button
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500 transition duration-300"
                >
                  Admin Login
                </Button>
              </Link>
            </Dialog.Trigger>
            <Dialog.Content className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto">
              <h2 className="text-2xl font-bold">Register Now!</h2>
              <p className="text-gray-600">
                Create your account and get started.
              </p>
              <Button className="mt-4 w-full">Sign Up</Button>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
