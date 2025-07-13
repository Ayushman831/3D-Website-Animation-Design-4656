import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  const [logoStage, setLogoStage] = useState(0);

  useEffect(() => {
    const stages = [0, 1, 2];
    let currentStage = 0;
    
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLogoStage(currentStage);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const PureFlowLogo = () => (
    <svg width="100" height="100" viewBox="0 0 200 200" className="logo-svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(120, 119, 198, 0.8)" />
          <stop offset="50%" stopColor="rgba(255, 119, 198, 0.6)" />
          <stop offset="100%" stopColor="rgba(119, 198, 255, 0.4)" />
        </linearGradient>
        <filter id="subtleGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        filter="url(#subtleGlow)"
        className="logo-circle"
        opacity={0.8}
      />
      
      <path
        d="M60 100 Q100 60 140 100 Q100 140 60 100"
        fill="url(#logoGradient)"
        className="logo-wave"
        opacity={logoStage >= 1 ? 0.6 : 0}
      />
      
      <circle
        cx="100"
        cy="100"
        r="20"
        fill="url(#logoGradient)"
        className="logo-center"
        opacity={logoStage >= 2 ? 0.4 : 0}
      />
    </svg>
  );

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f14 100%)',
        zIndex: 1000
      }}
    >
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
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
        className="splash-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <motion.div
          animate={{ 
            rotate: 360
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        >
          <PureFlowLogo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.h1
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 600,
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.7))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            FLOW ZONE
          </motion.h1>
          
          <motion.p
            style={{
              fontSize: '0.95rem',
              opacity: 0.6,
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Where innovation meets hydration
          </motion.p>
        </motion.div>

        <motion.div
          className="loading-indicator"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '120px', opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(120, 119, 198, 0.4), transparent)',
            borderRadius: '1px'
          }}
        />
      </motion.div>

      <style jsx>{`
        .logo-svg {
          filter: drop-shadow(0 0 15px rgba(120, 119, 198, 0.2));
        }
        
        .logo-circle {
          stroke-dasharray: 440;
          stroke-dashoffset: 440;
          animation: drawCircle 2.5s ease-out forwards;
        }
        
        .logo-wave {
          transition: opacity 0.8s ease;
        }
        
        .logo-center {
          transition: opacity 0.8s ease;
        }
        
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SplashScreen;