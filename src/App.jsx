import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import MainInterface from './components/MainInterface';
import ChatAndVibe from './components/ChatAndVibe';
import MoodMatcher from './components/MoodMatcher';
import SpinToWin from './components/SpinToWin';
import FeedbackTracker from './components/FeedbackTracker';
import MeetTheCreator from './components/MeetTheCreator';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" />
          ) : (
            <Routes>
              <Route path="/" element={<MainInterface />} />
              <Route path="/chat" element={<ChatAndVibe />} />
              <Route path="/mood" element={<MoodMatcher />} />
              <Route path="/spin" element={<SpinToWin />} />
              <Route path="/feedback" element={<FeedbackTracker />} />
              <Route path="/creator" element={<MeetTheCreator />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;