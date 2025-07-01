import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Navbar from './GlobalComponents/Navbar/Navbar';
import Footer from './GlobalComponents/Footer/Footer';

import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LeaderboardPage from './Pages/LeaderboardPage/LeaderboardPage';
import ConjugaisonPage from './Pages/ConjugaisonPage/ConjugaisonPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/it" element={<ConjugaisonPage key="it" />} />
            <Route path="/es" element={<ConjugaisonPage key="es" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
