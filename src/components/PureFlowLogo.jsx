import React from 'react';
import { motion } from 'framer-motion';

const PureFlowLogo = ({ size = 60, interactive = false, className = "" }) => {
  const logoVariants = {
    idle: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const flowVariants = {
    animate: {
      pathLength: [0, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const centerVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <motion.div
      className={`pureflow-logo ${className}`}
      variants={interactive ? logoVariants : {}}
      initial="idle"
      whileHover={interactive ? "hover" : "idle"}
      whileTap={interactive ? "tap" : "idle"}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        className="logo-svg"
      >
        <defs>
          <linearGradient id={`logoGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(120, 119, 198, 0.9)">
              <animate attributeName="stop-color" 
                values="rgba(120, 119, 198, 0.9);rgba(255, 119, 198, 0.9);rgba(120, 119, 198, 0.9)" 
                dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" stopColor="rgba(255, 119, 198, 0.8)">
              <animate attributeName="stop-color" 
                values="rgba(255, 119, 198, 0.8);rgba(119, 198, 255, 0.8);rgba(255, 119, 198, 0.8)" 
                dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="rgba(119, 198, 255, 0.7)">
              <animate attributeName="stop-color" 
                values="rgba(119, 198, 255, 0.7);rgba(120, 119, 198, 0.7);rgba(119, 198, 255, 0.7)" 
                dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>

          <filter id={`logoGlow-${size}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id={`logoShadow-${size}`}>
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(120, 119, 198, 0.3)"/>
          </filter>
        </defs>
        
        {/* Outer pulse ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="1"
          opacity="0.3"
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Main circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="2"
          filter={`url(#logoGlow-${size})`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Flow wave */}
        <motion.path
          d="M60 100 Q80 80 100 100 Q120 120 140 100"
          fill="none"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
          pathLength="0"
          variants={flowVariants}
          animate="animate"
        />
        
        {/* Secondary wave */}
        <motion.path
          d="M65 110 Q85 90 105 110 Q125 130 145 110"
          fill="none"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
          pathLength="0"
          variants={flowVariants}
          animate="animate"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Center droplet */}
        <motion.circle
          cx="100"
          cy="100"
          r="12"
          fill={`url(#logoGradient-${size})`}
          opacity="0.7"
          filter={`url(#logoShadow-${size})`}
          variants={centerVariants}
          animate="animate"
        />
        
        {/* Inner sparkle */}
        <motion.circle
          cx="100"
          cy="100"
          r="4"
          fill="rgba(255, 255, 255, 0.9)"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Micro particles */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          const radius = 45;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill={`url(#logoGradient-${size})`}
              opacity="0.6"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>

      <style jsx>{`
        .pureflow-logo {
          display: inline-block;
          cursor: ${interactive ? 'pointer' : 'default'};
        }
        
        .logo-svg {
          filter: drop-shadow(0 0 20px rgba(120, 119, 198, 0.2));
          transition: filter 0.3s ease;
        }
        
        .pureflow-logo:hover .logo-svg {
          filter: drop-shadow(0 0 30px rgba(120, 119, 198, 0.4));
        }
      `}</style>
    </motion.div>
  );
};

export default PureFlowLogo;