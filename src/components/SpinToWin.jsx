import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import PureFlowLogo from './PureFlowLogo';
import audioService from '../services/audioService';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiRotateCw, FiGift, FiStar } = FiIcons;

const SpinToWin = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [winResult, setWinResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const rewards = [
    { name: "🎙️ Podcast Feature", rarity: "common", color: "rgba(74, 222, 128, 0.6)" },
    { name: "🎯 Fun Challenge", rarity: "common", color: "rgba(34, 211, 238, 0.6)" },
    { name: "❤️ 5 Insta Likes", rarity: "uncommon", color: "rgba(168, 85, 247, 0.6)" },
    { name: "👥 5 Follows", rarity: "uncommon", color: "rgba(245, 158, 11, 0.6)" },
    { name: "💬 5+ Comments", rarity: "rare", color: "rgba(239, 68, 68, 0.6)" },
    { name: "👍 20+ Likes", rarity: "rare", color: "rgba(236, 72, 153, 0.6)" },
    { name: "📚 Flow Fact", rarity: "legendary", color: "rgba(139, 92, 246, 0.6)" },
    { name: "📢 Story Mention", rarity: "ultra-rare", color: "rgba(6, 182, 212, 0.6)" }
  ];

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    audioService.click();
    setIsSpinning(true);
    
    const spinAmount = 1800 + Math.random() * 1800;
    const finalRotation = rotation + spinAmount;
    setRotation(finalRotation);

    const normalizedRotation = finalRotation % 360;
    const segmentSize = 360 / rewards.length;
    const winningIndex = Math.floor(normalizedRotation / segmentSize);
    const winningReward = rewards[winningIndex];

    // Play spinning sound
    audioService.flow();

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWinResult(winningReward);
      audioService.success();
      
      // Show reward with smooth transition
      setTimeout(() => {
        setShowReward(true);
      }, 500);
    }, 4000);
  };

  const resetSpin = () => {
    audioService.transition();
    setHasSpun(false);
    setWinResult(null);
    setShowReward(false);
  };

  const handleBack = () => {
    audioService.transition();
    setTimeout(() => navigate('/'), 100);
  };

  const WheelSegment = ({ reward, index, total }) => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    
    return (
      <g>
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={reward.color} />
            <stop offset="100%" stopColor={reward.color.replace('0.6', '0.3')} />
          </linearGradient>
        </defs>
        <path
          d={`M 200,200 L ${200 + 170 * Math.cos((angle * Math.PI) / 180)},${200 + 170 * Math.sin((angle * Math.PI) / 180)} A 170,170 0 0,1 ${200 + 170 * Math.cos((nextAngle * Math.PI) / 180)},${200 + 170 * Math.sin((nextAngle * Math.PI) / 180)} z`}
          fill={`url(#gradient-${index})`}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <text
          x={200 + 120 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180)}
          y={200 + 120 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="11"
          fontWeight="600"
          transform={`rotate(${(angle + nextAngle) / 2}, ${200 + 120 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180)}, ${200 + 120 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180)})`}
        >
          {reward.name.split(' ')[0]}
        </text>
      </g>
    );
  };

  return (
    <div className="spin-container">
      <div className="floating-particles">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [100, -100],
              opacity: [0, 0.5, 0],
              x: [0, Math.sin(i * 1.5) * 40]
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: 'rgba(119, 198, 255, 0.4)',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>

      <motion.div
        className="spin-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="spin-header">
          <motion.button
            className="back-button"
            onClick={handleBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
          </motion.button>

          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PureFlowLogo size={50} />
            <h1 className="section-title">Spin to Win</h1>
          </motion.div>
        </div>

        <motion.div
          className="wheel-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="wheel-frame">
            <motion.svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="fortune-wheel"
              animate={{ rotate: rotation }}
              transition={{
                duration: isSpinning ? 4 : 0,
                ease: isSpinning ? [0.25, 0.46, 0.45, 0.94] : "linear"
              }}
            >
              <defs>
                <filter id="wheel-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <radialGradient id="centerGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(120, 119, 198, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 119, 198, 0.6)" />
                </radialGradient>
              </defs>

              {rewards.map((reward, index) => (
                <WheelSegment
                  key={index}
                  reward={reward}
                  index={index}
                  total={rewards.length}
                />
              ))}

              <circle
                cx="200"
                cy="200"
                r="175"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="3"
                filter="url(#wheel-glow)"
              />

              <circle
                cx="200"
                cy="200"
                r="30"
                fill="url(#centerGradient)"
                filter="url(#wheel-glow)"
              />

              <text
                x="200"
                y="207"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.95)"
                fontSize="12"
                fontWeight="700"
                fontFamily="Space Grotesk"
              >
                FLOW
              </text>
            </motion.svg>

            <motion.div 
              className="wheel-pointer"
              animate={isSpinning ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2, repeat: isSpinning ? Infinity : 0 }}
            >
              <div className="pointer-triangle" />
            </motion.div>
          </div>

          <motion.button
            className="spin-button"
            onClick={handleSpin}
            disabled={isSpinning || hasSpun}
            whileHover={!isSpinning && !hasSpun ? { scale: 1.05, y: -2 } : {}}
            whileTap={!isSpinning && !hasSpun ? { scale: 0.95 } : {}}
            animate={isSpinning ? { 
              boxShadow: [
                "0 4px 20px rgba(120, 119, 198, 0.3)",
                "0 8px 30px rgba(255, 119, 198, 0.4)",
                "0 4px 20px rgba(120, 119, 198, 0.3)"
              ]
            } : {}}
            transition={{ duration: 1, repeat: isSpinning ? Infinity : 0 }}
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
            >
              <SafeIcon icon={isSpinning ? FiRotateCw : FiGift} />
            </motion.div>
            <span>
              {isSpinning ? 'Spinning...' : hasSpun ? 'Spun Today' : 'SPIN NOW'}
            </span>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {winResult && (
            <motion.div
              className="win-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="win-result"
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{ 
                  opacity: showReward ? 1 : 0, 
                  scale: showReward ? 1 : 0.5, 
                  y: showReward ? 0 : 100 
                }}
                exit={{ opacity: 0, scale: 0.5, y: -100 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
              >
                {/* Confetti Animation */}
                <div className="confetti-container">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="confetti"
                      initial={{ 
                        opacity: 0, 
                        y: 0, 
                        x: 0,
                        rotate: 0,
                        scale: 0
                      }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        y: [-20, -100, -180],
                        x: [0, (Math.random() - 0.5) * 200],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                        scale: [0, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                      }}
                    />
                  ))}
                </div>

                <div className="win-content">
                  <motion.div
                    className="win-icon-container"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <SafeIcon icon={FiStar} className="win-icon" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Congratulations!
                  </motion.h2>
                  
                  <motion.div 
                    className="win-reward"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  >
                    <motion.span 
                      className="reward-emoji"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {winResult.name.split(' ')[0]}
                    </motion.span>
                    <span className="reward-name">{winResult.name.substring(2)}</span>
                  </motion.div>
                  
                  <motion.p 
                    className="win-instructions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Follow @pureflow48.official and email pureflow48@gmail.com with this screenshot to claim!
                  </motion.p>
                  
                  <motion.button
                    className="reset-button"
                    onClick={resetSpin}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again Tomorrow
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="spin-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="info-card">
            <h3>How it Works</h3>
            <div className="info-list">
              <motion.div 
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                🎯 One spin per week
              </motion.div>
              <motion.div 
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                🎁 Win amazing rewards
              </motion.div>
              <motion.div 
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                📱 Follow @pureflow48.official
              </motion.div>
              <motion.div 
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                📧 Email screenshot to claim
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .spin-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          background: 
            radial-gradient(circle at 30% 30%, rgba(119, 198, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(120, 119, 198, 0.04) 0%, transparent 50%);
        }

        .spin-wrapper {
          max-width: 700px;
          width: 100%;
          text-align: center;
        }

        .spin-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          position: relative;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.3rem;
          cursor: pointer;
          backdrop-filter: blur(25px);
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .header-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.8), rgba(119, 198, 255, 0.7));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .wheel-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .wheel-frame {
          position: relative;
          display: inline-block;
        }

        .fortune-wheel {
          filter: drop-shadow(0 0 30px rgba(120, 119, 198, 0.2));
          max-width: 100%;
          height: auto;
        }

        .wheel-pointer {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .pointer-triangle {
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 20px solid rgba(255, 119, 198, 0.9);
          filter: drop-shadow(0 0 10px rgba(255, 119, 198, 0.5));
        }

        .spin-button {
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.15));
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.2rem 2.5rem;
          color: rgba(255, 255, 255, 0.95);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(25px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          letter-spacing: 0.05em;
        }

        .spin-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spin-button:not(:disabled):hover {
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.25));
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }

        .win-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .win-result {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 3rem;
          margin: 2rem;
          backdrop-filter: blur(30px);
          overflow: hidden;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .win-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .win-icon-container {
          margin-bottom: 1.5rem;
        }

        .win-icon {
          font-size: 4rem;
          color: rgba(255, 187, 36, 0.9);
          filter: drop-shadow(0 0 15px rgba(255, 187, 36, 0.5));
        }

        .win-content h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.8));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .win-reward {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reward-emoji {
          font-size: 2.5rem;
        }

        .reward-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
        }

        .win-instructions {
          font-size: 1rem;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .reset-button {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          padding: 1rem 2rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(25px);
        }

        .reset-button:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .spin-info {
          display: grid;
          grid-template-columns: 1fr;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(25px);
        }

        .info-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: rgba(255, 119, 198, 0.9);
        }

        .info-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .info-item {
          padding: 0.8rem 0;
          font-size: 0.95rem;
          opacity: 0.8;
          transition: all 0.3s ease;
          cursor: default;
        }

        .info-item:hover {
          opacity: 1;
          color: rgba(255, 255, 255, 0.95);
        }

        @media (max-width: 768px) {
          .spin-container {
            padding: 1.5rem;
          }

          .fortune-wheel {
            max-width: 320px;
          }

          .spin-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          .win-result {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .win-content h2 {
            font-size: 2rem;
          }

          .reward-name {
            font-size: 1.1rem;
          }

          .info-list {
            grid-template-columns: 1fr;
          }

          .header-content {
            flex-direction: column;
            gap: 0.5rem;
          }

          .back-button {
            position: absolute;
            top: -60px;
            left: 0;
          }
        }

        @media (max-width: 480px) {
          .win-reward {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .reward-emoji {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SpinToWin;