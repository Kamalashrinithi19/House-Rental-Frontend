import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllHousesPage from './pages/AllHousesPage';
import HouseDetailsPage from './pages/HouseDetailsPage';
import DashboardPage from './pages/DashboardPage';
import AddHousePage from './pages/AddHousePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#EFF8FF] text-slate-800 font-sans">
        <Navbar />
        <main> {/* Removed padding here to let BG flow full screen */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/houses" element={<AllHousesPage />} />
            <Route path="/houses/:id" element={<HouseDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-house" element={<AddHousePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> {/* <--- ADD THIS */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;