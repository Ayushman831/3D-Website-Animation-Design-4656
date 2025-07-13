import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiMail, FiInstagram, FiStar, FiHeart, FiZap } = FiIcons;

const MeetTheCreator = () => {
  const navigate = useNavigate();
  const [showCreatorCard, setShowCreatorCard] = useState(false);

  const CreatorBadge = ({ icon, text, color }) => (
    <motion.div
      className="creator-badge"
      whileHover={{ scale: 1.05, y: -2 }}
      style={{ background: `linear-gradient(135deg, ${color}33, ${color}22)` }}
    >
      <SafeIcon icon={icon} style={{ color }} />
      <span>{text}</span>
    </motion.div>
  );

  return (
    <div className="creator-container">
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <motion.div
        className="creator-wrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="creator-header">
          <motion.button
            className="back-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiArrowLeft} />
          </motion.button>

          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Meet the Creator
          </motion.h1>
        </div>

        <motion.div
          className="creator-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* You Are the Creator Section */}
          <motion.div
            className="user-creator-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="user-creator-card">
              <motion.div
                className="creator-avatar-large"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👤
              </motion.div>
              
              <h2>You Are the Creator</h2>
              <p className="creator-description">
                Every ripple you create—every post, every spin, every vibe—powers PureFlow. 
                This isn't just hydration. It's a movement. And you're shaping it. 
                You're the creator. The story starts with you.
              </p>

              <div className="creator-badges">
                <CreatorBadge icon={FiStar} text="Vibe Shaper" color="#fbbf24" />
                <CreatorBadge icon={FiHeart} text="Flow Builder" color="#f472b6" />
                <CreatorBadge icon={FiZap} text="Ripple Maker" color="#06b6d4" />
              </div>

              <motion.button
                className="become-creator-button"
                onClick={() => setShowCreatorCard(!showCreatorCard)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💧 Become a Creator
              </motion.button>
            </div>
          </motion.div>

          {/* Ripple Divider */}
          <motion.div
            className="ripple-divider"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="ripple-animation">
              <motion.div
                className="ripple-ring"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="ripple-ring"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="ripple-ring"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>

          {/* Original Creator Section */}
          <motion.div
            className="original-creator-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="original-creator-card">
              <motion.div
                className="creator-avatar"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="avatar-image">
                  <span className="avatar-emoji">👨‍💻</span>
                  <div className="avatar-glow" />
                </div>
              </motion.div>

              <div className="creator-info">
                <h2>Meet the Original Creator</h2>
                <h3>Ayushman (Age 16)</h3>
                
                <p className="creator-bio">
                  At just 16, Ayushman turned a late-night idea into a cinematic brand. 
                  PureFlow was born from curiosity, passion, and a drive to make water feel legendary. 
                  While most teens were scrolling, Ayushman was sketching, coding, building. 
                  He wasn't waiting for permission—he was creating impact.
                </p>

                <div className="creator-stats">
                  <div className="stat-item">
                    <span className="stat-label">Name</span>
                    <span className="stat-value">Ayushman</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Age</span>
                    <span className="stat-value">16</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Role</span>
                    <span className="stat-value">Founder & Creative Director</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Vision</span>
                    <span className="stat-value">Make hydration feel cinematic, smart & Gen-Z</span>
                  </div>
                </div>

                <div className="creator-quote">
                  <blockquote>
                    "I started PureFlow not because I had everything figured out—but because I couldn't wait to build what I believed in. You don't need age to make waves. You need purpose."
                  </blockquote>
                </div>

                <div className="contact-buttons">
                  <motion.a
                    href="mailto:ayushmans627@hotmail.com"
                    className="contact-button personal"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiMail} />
                    <span>Personal Email</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:pureflow48@gmail.com"
                    className="contact-button brand"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiMail} />
                    <span>Brand Contact</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://instagram.com/pureflow48.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button instagram"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiInstagram} />
                    <span>@pureflow48.official</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Creator Card Modal */}
          {showCreatorCard && (
            <motion.div
              className="creator-card-modal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <div className="modal-overlay" onClick={() => setShowCreatorCard(false)} />
              <div className="creator-card-content">
                <h3>Your Creator Card</h3>
                <div className="creator-card-visual">
                  <div className="card-badge">CREATOR</div>
                  <div className="card-avatar">👤</div>
                  <div className="card-title">Flow Creator</div>
                  <div className="card-subtitle">Shaping the Future of Hydration</div>
                  <div className="card-stats">
                    <div className="card-stat">
                      <span className="stat-number">∞</span>
                      <span className="stat-label">Ripples Created</span>
                    </div>
                    <div className="card-stat">
                      <span className="stat-number">💧</span>
                      <span className="stat-label">Flow Level</span>
                    </div>
                  </div>
                </div>
                <p>Share your story and tag @pureflow48.official for a chance to be featured!</p>
                <motion.button
                  className="close-modal-button"
                  onClick={() => setShowCreatorCard(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <style jsx>{`
        .creator-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .creator-wrapper {
          max-width: 1000px;
          width: 100%;
          text-align: center;
        }

        .creator-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          position: relative;
        }

        .back-button {
          background: rgba(120, 119, 198, 0.2);
          border: 1px solid rgba(120, 119, 198, 0.3);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: absolute;
          left: 0;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          background: linear-gradient(135deg, #7c77c6, #ff77c6, #77c6ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          width: 100%;
        }

        .creator-content {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .user-creator-section, .original-creator-section {
          width: 100%;
        }

        .user-creator-card, .original-creator-card {
          background: rgba(120, 119, 198, 0.1);
          border: 1px solid rgba(120, 119, 198, 0.3);
          border-radius: 30px;
          padding: 3rem;
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
        }

        .creator-avatar-large {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 20px rgba(120, 119, 198, 0.6));
        }

        .user-creator-card h2, .original-creator-card h2 {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #7c77c6, #ff77c6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .creator-description, .creator-bio {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .creator-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .creator-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .become-creator-button {
          background: linear-gradient(135deg, #7c77c6, #ff77c6);
          border: none;
          border-radius: 25px;
          padding: 1.2rem 2.5rem;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .become-creator-button:hover {
          box-shadow: 0 15px 40px rgba(120, 119, 198, 0.4);
        }

        .ripple-divider {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150px;
          position: relative;
        }

        .ripple-animation {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .ripple-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border: 2px solid rgba(120, 119, 198, 0.4);
          border-radius: 50%;
        }

        .creator-avatar {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .avatar-image {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c77c6, #ff77c6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .avatar-emoji {
          font-size: 4rem;
          z-index: 2;
        }

        .avatar-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c77c6, #ff77c6);
          opacity: 0.3;
          filter: blur(10px);
        }

        .creator-info h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #ff77c6;
        }

        .creator-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          opacity: 0.7;
          margin-bottom: 0.3rem;
        }

        .stat-value {
          display: block;
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }

        .creator-quote {
          margin-bottom: 2rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border-left: 4px solid #ff77c6;
        }

        .creator-quote blockquote {
          font-style: italic;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.9;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          text-decoration: none;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-button.personal {
          background: linear-gradient(135deg, #7c77c6, #a855f7);
        }

        .contact-button.brand {
          background: linear-gradient(135deg, #ff77c6, #ec4899);
        }

        .contact-button.instagram {
          background: linear-gradient(135deg, #77c6ff, #06b6d4);
        }

        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .creator-card-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
        }

        .creator-card-content {
          background: rgba(120, 119, 198, 0.1);
          border: 1px solid rgba(120, 119, 198, 0.3);
          border-radius: 30px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          backdrop-filter: blur(15px);
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .creator-card-content h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #ff77c6;
        }

        .creator-card-visual {
          background: linear-gradient(135deg, #7c77c6, #ff77c6);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .card-avatar {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .card-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1.5rem;
        }

        .card-stats {
          display: flex;
          justify-content: space-around;
        }

        .card-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .card-stat .stat-label {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .close-modal-button {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 0.8rem 2rem;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          margin-top: 1rem;
        }

        .close-modal-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .creator-container {
            padding: 1rem;
          }

          .user-creator-card, .original-creator-card {
            padding: 2rem 1.5rem;
          }

          .creator-stats {
            grid-template-columns: 1fr;
          }

          .contact-buttons {
            flex-direction: column;
            align-items: center;
          }

          .creator-badges {
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetTheCreator;