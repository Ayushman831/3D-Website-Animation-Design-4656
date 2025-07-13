import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiRefreshCw } = FiIcons;

const MoodMatcher = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodResult, setMoodResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    { emoji: '😎', name: 'Chill', color: 'rgba(34, 211, 238, 0.3)', description: 'Relaxed and laid-back' },
    { emoji: '🔥', name: 'Energetic', color: 'rgba(245, 158, 11, 0.3)', description: 'Full of energy' },
    { emoji: '💭', name: 'Thoughtful', color: 'rgba(168, 85, 247, 0.3)', description: 'Reflective mood' },
    { emoji: '🌧️', name: 'Mellow', color: 'rgba(107, 114, 128, 0.3)', description: 'Calm and peaceful' },
    { emoji: '🎯', name: 'Focused', color: 'rgba(239, 68, 68, 0.3)', description: 'Determined energy' },
    { emoji: '✨', name: 'Curious', color: 'rgba(236, 72, 153, 0.3)', description: 'Wondering and exploring' }
  ];

  const handleMoodSubmit = (mood) => {
    setIsAnalyzing(true);
    setSelectedMood(mood);

    setTimeout(() => {
      const responses = {
        'Chill': {
          message: "Your energy flows like calm water 🌊 Perfect for deep thoughts and gentle moments.",
          suggestion: "Try some ambient music or a quiet walk",
          theme: "rgba(34, 211, 238, 0.1)"
        },
        'Energetic': {
          message: "You're radiating pure energy! ⚡ That spark could light up the world.",
          suggestion: "Channel that energy into something creative",
          theme: "rgba(245, 158, 11, 0.1)"
        },
        'Thoughtful': {
          message: "Deep currents run through your mind 🌊 Beautiful territories await exploration.",
          suggestion: "Journal your thoughts or have meaningful conversations",
          theme: "rgba(168, 85, 247, 0.1)"
        },
        'Mellow': {
          message: "Like still waters, you hold quiet strength 💧 This peace is powerful.",
          suggestion: "Embrace this calm and let it restore you",
          theme: "rgba(107, 114, 128, 0.1)"
        },
        'Focused': {
          message: "Sharp as flowing water cutting through stone 🎯 Nothing can break this concentration.",
          suggestion: "Dive deep into your most important work",
          theme: "rgba(239, 68, 68, 0.1)"
        },
        'Curious': {
          message: "Your mind sparkles with wonder! ✨ The universe is your playground.",
          suggestion: "Explore something new and let curiosity guide you",
          theme: "rgba(236, 72, 153, 0.1)"
        }
      };

      setMoodResult(responses[mood.name] || {
        message: "Your unique energy flows through the cosmos 🌌",
        suggestion: "Trust your instincts and follow your flow",
        theme: "rgba(120, 119, 198, 0.1)"
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const resetMood = () => {
    setSelectedMood(null);
    setMoodResult(null);
  };

  return (
    <div className="mood-container">
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <motion.div
        className="mood-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mood-header">
          <motion.button
            className="back-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
          </motion.button>

          <motion.h1 
            className="section-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mood Matcher
          </motion.h1>
        </div>

        <AnimatePresence mode="wait">
          {!moodResult ? (
            <motion.div
              key="mood-input"
              className="mood-input-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="mood-sync-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="sync-circle">
                  <motion.div
                    className="sync-pulse"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="sync-inner"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    💧
                  </motion.div>
                </div>
                <p className="sync-text">Syncing to your energy...</p>
              </motion.div>

              <motion.div
                className="mood-question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <h2>What's your vibe today?</h2>
                <p>Select what resonates with you</p>
              </motion.div>

              <motion.div
                className="mood-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                {moods.map((mood, index) => (
                  <motion.div
                    key={mood.name}
                    className="mood-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMoodSubmit(mood)}
                    style={{
                      background: mood.color
                    }}
                  >
                    <div className="mood-emoji">{mood.emoji}</div>
                    <div className="mood-name">{mood.name}</div>
                    <div className="mood-description">{mood.description}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="mood-result"
              className="mood-result-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="result-card" style={{ background: moodResult.theme }}>
                <motion.div
                  className="result-header"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="selected-mood-display">
                    <span className="mood-emoji-large">{selectedMood?.emoji}</span>
                    <span className="mood-name-large">{selectedMood?.name}</span>
                  </div>
                </motion.div>

                <motion.div
                  className="result-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3>Flow's Reading</h3>
                  <p className="mood-message">{moodResult.message}</p>
                  
                  <div className="suggestion-box">
                    <h4>Suggested Flow Action</h4>
                    <p>{moodResult.suggestion}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="result-actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.button
                    className="remix-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetMood}
                  >
                    <SafeIcon icon={FiRefreshCw} />
                    <span>Try Again</span>
                  </motion.button>
                </motion.div>

                <div className="mood-ambient-animation">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="ambient-particle"
                      animate={{
                        x: [0, Math.random() * 60 - 30, 0],
                        y: [0, Math.random() * 60 - 30, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.8
                      }}
                      style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: '3px',
                        height: '3px',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '50%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isAnalyzing && (
          <motion.div
            className="analyzing-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="analyzing-content">
              <motion.div
                className="analyzing-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                💧
              </motion.div>
              <h3>Reading your energy...</h3>
              <p>Flow is analyzing your vibe patterns</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style jsx>{`
        .mood-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .mood-wrapper {
          max-width: 700px;
          width: 100%;
          text-align: center;
        }

        .mood-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          position: relative;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: absolute;
          left: 0;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          font-weight: 600;
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.7));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          width: 100%;
          letter-spacing: -0.02em;
        }

        .mood-sync-animation {
          margin-bottom: 3rem;
        }

        .sync-circle {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sync-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(120, 119, 198, 0.3);
          border-radius: 50%;
        }

        .sync-inner {
          font-size: 2rem;
          z-index: 2;
        }

        .sync-text {
          font-size: 0.95rem;
          opacity: 0.6;
          font-style: italic;
        }

        .mood-question {
          margin-bottom: 3rem;
        }

        .mood-question h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .mood-question p {
          font-size: 1rem;
          opacity: 0.6;
        }

        .mood-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .mood-card {
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .mood-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .mood-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.8rem;
        }

        .mood-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .mood-description {
          font-size: 0.85rem;
          opacity: 0.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .mood-result-section {
          max-width: 500px;
          margin: 0 auto;
        }

        .result-card {
          padding: 2.5rem;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .selected-mood-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .mood-emoji-large {
          font-size: 3rem;
        }

        .mood-name-large {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .result-content h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .mood-message {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .suggestion-box h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .suggestion-box p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .remix-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.8rem 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0 auto;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
        }

        .remix-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .mood-ambient-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .analyzing-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .analyzing-content {
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
        }

        .analyzing-spinner {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .analyzing-content h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .analyzing-content p {
          opacity: 0.7;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .mood-container {
            padding: 1rem;
          }

          .mood-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.8rem;
          }

          .mood-card {
            padding: 1.2rem;
          }

          .result-card {
            padding: 2rem 1.5rem;
          }

          .mood-emoji-large {
            font-size: 2.5rem;
          }

          .mood-name-large {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MoodMatcher;