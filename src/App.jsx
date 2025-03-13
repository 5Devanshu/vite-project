// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import PatientPortal from './Components/PatientPortal';
import InsurerPortal from './Components/InsurerPortal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-portal" element={<PatientPortal/>} />
        <Route path="/insurer-portal" element={<InsurerPortal/>} />
      </Routes>
    </Router>
  );
};

export default App;
