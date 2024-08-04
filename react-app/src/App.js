import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import FindDoctor from './components/FindDoctor';
import AboutUs from './components/AboutUs';
import DoctorProfile from './components/DoctorProfile';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
