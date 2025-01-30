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

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Protected Route */}
                        <Route
                            path="/"
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
                        <Route path="/allHackathons" element={<AllHackathons />} />
                        <Route path="/createHackathon" element={<CreateHackathon />} />
                        <Route path="/getTeams/:id" element={<HackathonTeam />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
