// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TroopList from './components/TroopList';
import LayoutList from './components/LayoutList';
import StrategyList from './components/StrategyList';
import MainDashboard from './components/MainDashboard';
import Login from './pages/Login';
import LayoutDetailPage from './pages/LayoutDetailspage';
import Homepage from './pages/HomePage';

function App() {
  const [mode, setMode] = useState('builder'); // default mode
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    localStorage.setItem('mode', selectedMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
      <Route
  path="/"
  element={
    isLoggedIn ? (
      <MainDashboard
        onLogout={() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }}
      />
    ) : (
      <Homepage
  mode={mode}
  setMode={handleModeChange}
  onLogin={() => setIsLoggedIn(true)}
  onLogout={handleLogout}
  isAdmin={isLoggedIn} // ✅ pass explicitly
/>

    )
  }
/>


        <Route path="/layouts/:id" element={<LayoutDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
