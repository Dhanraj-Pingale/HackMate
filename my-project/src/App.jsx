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
import AllHackathons from "./components/pages/AllHackathons";
import CreateHackathon from "./components/admin/CreateHackathon";
import HackathonTeam from "./components/pages/HackathonTeam";
import CreateTeam from "./components/pages/CreateTeam";
import AdminLogin from "./components/authentications/AdminLogin";
import AdminHome from "./components/admin/AdminHome";
import LandingPage from "./components/authentications/LandingPage";
import SeeAllhackathon from "./components/admin/SeeAllhackathon";

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background text-foreground">
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/alogin" element={<AdminLogin />} />

                            {/* Protected Student Routes */}
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
                                        <About />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/studentDetail" element={<StudentDetail />} />
                            <Route path="/allHackathons" element={<AllHackathons />} />
                            <Route path="/getTeams/:id" element={<HackathonTeam />} />
                            <Route path="/create-team/:id" element={<CreateTeam />} />

                            {/* Protected Admin Routes */}
                            <Route path="/ahome" element={<AdminHome />} />
                            <Route path="/createhackathon" element={<CreateHackathon />} />
                            <Route path="/see-allhackthon" element={<SeeAllhackathon />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        </ThemeProvider>
    );
};

export default App;
