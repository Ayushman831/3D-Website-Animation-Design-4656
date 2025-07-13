import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import PureFlowLogo from './PureFlowLogo';
import audioService from '../services/audioService';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiHeart, FiRotateCw, FiMessageSquare, FiUser, FiVolume2, FiVolumeX } = FiIcons;

const MainInterface = () => {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const initializeAudio = async () => {
      await audioService.initialize();
      if (isFirstLoad) {
        audioService.playWelcome();
        setIsFirstLoad(false);
      }
    };

    initializeAudio();
  }, [isFirstLoad]);

  const handleNavigation = (path) => {
    audioService.bubble();
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const toggleAudio = () => {
    const enabled = audioService.toggle();
    setAudioEnabled(enabled);
    if (enabled) {
      audioService.click();
    }
  };

  const menuItems = [
    {
      title: "Chat & Vibe",
      subtitle: "AI conversations",
      icon: FiMessageCircle,
      path: "/chat",
      color: "rgba(120, 119, 198, 0.08)",
      hoverColor: "rgba(120, 119, 198, 0.15)"
    },
    {
      title: "Mood Matcher",
      subtitle: "Sync your energy",
      icon: FiHeart,
      path: "/mood",
      color: "rgba(255, 119, 198, 0.08)",
      hoverColor: "rgba(255, 119, 198, 0.15)"
    },
    {
      title: "Spin to Win",
      subtitle: "Fortune awaits",
      icon: FiRotateCw,
      path: "/spin",
      color: "rgba(119, 198, 255, 0.08)",
      hoverColor: "rgba(119, 198, 255, 0.15)"
    },
    {
      title: "Feedback",
      subtitle: "Share thoughts",
      icon: FiMessageSquare,
      path: "/feedback",
      color: "rgba(120, 119, 198, 0.06)",
      hoverColor: "rgba(120, 119, 198, 0.12)"
    },
    {
      title: "The Creator",
      subtitle: "Meet Ayushman",
      icon: FiUser,
      path: "/creator",
      color: "rgba(255, 119, 198, 0.06)",
      hoverColor: "rgba(255, 119, 198, 0.12)"
    }
  ];

  return (
    <div className="main-interface">
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50
            }}
            animate={{
              opacity: [0, 0.6, 0],
              x: Math.random() * window.innerWidth,
              y: -50
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            style={{
              position: 'fixed',
              width: '2px',
              height: '2px',
              background: `linear-gradient(45deg, rgba(120, 119, 198, 0.4), rgba(255, 119, 198, 0.3))`,
              borderRadius: '50%',
              zIndex: 1
            }}
          />
        ))}
      </div>

      <motion.button
        className="audio-toggle"
        onClick={toggleAudio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SafeIcon icon={audioEnabled ? FiVolume2 : FiVolumeX} />
      </motion.button>

      <motion.div
        className="interface-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div 
          className="header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <motion.div
            className="logo-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <PureFlowLogo size={80} interactive={true} />
          </motion.div>
          
          <motion.h1 
            className="main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            FLOW ZONE
          </motion.h1>
          
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Where innovation meets hydration
          </motion.p>
        </motion.div>

        <motion.div 
          className="menu-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="menu-item"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 1.4 + index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.path)}
            >
              <motion.div 
                className="menu-item-content" 
                style={{ 
                  background: `linear-gradient(135deg, ${item.color}, ${item.color.replace('0.08', '0.04')})`,
                }}
                whileHover={{
                  background: `linear-gradient(135deg, ${item.hoverColor}, ${item.hoverColor.replace('0.15', '0.08')})`,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                }}
              >
                <motion.div 
                  className="menu-icon-container"
                  whileHover={{ 
                    rotate: 5,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <SafeIcon icon={item.icon} className="menu-icon" />
                  <motion.div
                    className="icon-glow"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
                
                <div className="menu-text">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>

                <motion.div
                  className="menu-item-ripple"
                  initial={{ scale: 0, opacity: 0.3 }}
                  whileHover={{ 
                    scale: 1,
                    opacity: 0,
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        .main-interface {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          background: 
            radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(119, 198, 255, 0.03) 0%, transparent 50%);
        }

        .audio-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .audio-toggle:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .interface-container {
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        .header-section {
          margin-bottom: 4rem;
        }

        .logo-container {
          margin-bottom: 2rem;
          position: relative;
        }

        .main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.8), rgba(119, 198, 255, 0.7));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.03em;
          text-shadow: 0 0 30px rgba(120, 119, 198, 0.3);
        }

        .subtitle {
          font-size: 1.1rem;
          opacity: 0.7;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.8);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .menu-item {
          cursor: pointer;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }

        .menu-item-content {
          padding: 2rem;
          border-radius: 20px;
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .menu-item:hover .menu-item-content {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .menu-icon-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .menu-icon {
          font-size: 2.5rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 2;
        }

        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        .menu-text h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.01em;
        }

        .menu-text p {
          font-size: 0.95rem;
          opacity: 0.7;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .menu-item-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
          border-radius: 20px;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .main-interface {
            padding: 1.5rem;
          }

          .audio-toggle {
            top: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .menu-item-content {
            padding: 1.5rem;
            min-height: 120px;
          }

          .menu-icon {
            font-size: 2rem;
          }

          .header-section {
            margin-bottom: 3rem;
          }
        }

        @media (max-width: 480px) {
          .menu-item-content {
            padding: 1.2rem;
          }
          
          .menu-text h3 {
            font-size: 1.1rem;
          }
          
          .menu-text p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MainInterface;