import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/Register";
import Homepage from "./components/pages/Homepage";
import ProtectedRoute from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import About from "./components/pages/About";
import { ThemeProvider } from "./components/theme-provider";
import StudentDetail from "./components/pages/StudentDetail";
// import AllHackathons from "./components/pages/AllHackathons";
import AdminLogin from "./components/authentications/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import LandingPage from "./components/authentications/LandingPage";
// import { ToastContainer } from "@/components/ui/toast"; // Make sure the path is correct
import CreateHackathon from "./components/Admin/CreateHackathon";
import SeeAllhackathon from "./components/Admin/SeeAllhackathon";

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <BrowserRouter>
    
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/alogin" element={<AdminLogin />} />
                        <Route path="/ahome" element={<AdminHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/createhackathon" element={< CreateHackathon />} />
                        <Route path="/see-allhackthon" element={< SeeAllhackathon />} />
                        {/* Protected Route */}
                        <Route
                            path="/shomepage"
                            element={
                                <ProtectedRoute>
                                    <Homepage />
                                </ProtectedRoute>
                            }
                        />
                        
                        <Route
                            path="/about"
                            element={
                                <ProtectedRoute>
                                    <About></About>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/studentDetail" element={<StudentDetail />} />
                        {/* <Route path="/allHackathons" element={<AllHackathons />} /> */}
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;