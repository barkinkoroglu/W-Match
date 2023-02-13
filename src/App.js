import React from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Notfound from "./pages/notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import Jobs from "./pages/jobs";
import Test from "./pages/test";
import UserRegister from "./pages/userRegister";
import CompanyRegister from "./pages/companyRegister";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/company" element={<CompanyRegister />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
