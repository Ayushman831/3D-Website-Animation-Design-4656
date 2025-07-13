import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import PureFlowLogo from './PureFlowLogo';
import audioService from '../services/audioService';
import aiService from '../services/aiService';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft } = FiIcons;

const ChatAndVibe = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇺🇸', 
      greeting: 'Hey there! Ready to vibe? 💧',
      options: [
        "Roast Battle", "5-Min Recipe", "Mood Booster", "Hydration Check",
        "Tell a Secret", "Outfit Vibe", "Rate My Energy", "Quick Challenge"
      ]
    },
    { 
      code: 'hi', 
      name: 'हिंदी', 
      flag: '🇮🇳', 
      greeting: 'नमस्ते! वाइब करने के लिए तैयार हैं? 💧',
      options: [
        "रोस्ट बैटल", "5 मिनट रेसिपी", "मूड बूस्टर", "पानी चेक",
        "राज बताओ", "आउटफिट वाइब", "एनर्जी रेट", "क्विक चैलेंज"
      ]
    },
    { 
      code: 'bn', 
      name: 'বাংলা', 
      flag: '🇧🇩', 
      greeting: 'হ্যালো! ভাইব করতে প্রস্তুত? 💧',
      options: [
        "রোস্ট ব্যাটেল", "৫ মিনিট রেসিপি", "মুড বুস্টার", "পানি চেক",
        "গোপন কথা", "আউটফিট ভাইব", "এনার্জি রেট", "কুইক চ্যালেঞ্জ"
      ]
    }
  ];

  const handleLanguageSelect = (language) => {
    audioService.bubble();
    setSelectedLanguage(language);
    
    setTimeout(() => {
      audioService.flow();
      setMessages([{
        type: 'bot',
        content: language.greeting,
        timestamp: new Date()
      }]);
    }, 800);
  };

  const handleOptionSelect = async (option) => {
    audioService.click();
    
    const userMessage = {
      type: 'user',
      content: option,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await aiService.generateChatResponse(option, selectedLanguage.code);
      
      setTimeout(() => {
        audioService.bubble();
        const botResponse = {
          type: 'bot',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1200);
    } catch (error) {
      setTimeout(() => {
        const fallbackResponse = {
          type: 'bot',
          content: "That's interesting! Let me think about this... 🤔",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackResponse]);
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleBack = () => {
    audioService.transition();
    setTimeout(() => navigate('/'), 100);
  };

  if (!selectedLanguage) {
    return (
      <div className="chat-container">
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: [100, -100],
                x: [0, Math.sin(i) * 50]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                background: 'rgba(120, 119, 198, 0.4)',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        <motion.div
          className="language-selection"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            className="back-button"
            onClick={handleBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
          </motion.button>

          <motion.div
            className="logo-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PureFlowLogo size={60} />
          </motion.div>

          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Chat & Vibe
          </motion.h1>

          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Choose your language to start vibing
          </motion.p>

          <motion.div 
            className="language-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                className="language-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 1 + index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect(language)}
              >
                <motion.div
                  className="language-flag"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {language.flag}
                </motion.div>
                <div className="language-name">{language.name}</div>
                
                <motion.div
                  className="card-ripple"
                  initial={{ scale: 0, opacity: 0.3 }}
                  whileHover={{ 
                    scale: 1,
                    opacity: 0,
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <style jsx>{`
          .chat-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            position: relative;
            background: 
              radial-gradient(circle at 30% 30%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 119, 198, 0.03) 0%, transparent 50%);
          }

          .language-selection {
            max-width: 600px;
            width: 100%;
            text-align: center;
            position: relative;
          }

          .back-button {
            position: absolute;
            top: -80px;
            left: 0;
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
            border-color: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .logo-section {
            margin-bottom: 2rem;
          }

          .section-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(2rem, 5vw, 2.8rem);
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.8), rgba(119, 198, 255, 0.7));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.02em;
          }

          .section-subtitle {
            font-size: 1.1rem;
            opacity: 0.7;
            margin-bottom: 4rem;
            letter-spacing: 0.02em;
            color: rgba(255, 255, 255, 0.8);
          }

          .language-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1.5rem;
          }

          .language-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2rem 1.5rem;
            cursor: pointer;
            backdrop-filter: blur(25px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            min-height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .language-card:hover {
            border-color: rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .language-flag {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .language-name {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.01em;
          }

          .card-ripple {
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
            .language-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
            }

            .language-card {
              padding: 1.5rem;
              min-height: 120px;
            }

            .language-flag {
              font-size: 2.5rem;
            }

            .back-button {
              width: 45px;
              height: 45px;
              font-size: 1.1rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [100, -100],
              opacity: [0, 0.4, 0],
              x: [0, Math.sin(i * 2) * 30]
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              width: '1px',
              height: '1px',
              background: 'rgba(255, 119, 198, 0.4)',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>

      <motion.div
        className="chat-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="chat-header">
          <motion.button
            className="back-button"
            onClick={handleBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
          </motion.button>

          <div className="chat-title">
            <PureFlowLogo size={32} />
            <h2>{selectedLanguage.name} Chat</h2>
          </div>
        </div>

        <div className="messages-container">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`message ${message.type}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="message-content"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.content}
                </motion.div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                className="typing-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="typing-dots">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  >•</motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  >•</motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  >•</motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="options-container">
          <div className="options-grid">
            {selectedLanguage.options.map((option, index) => (
              <motion.button
                key={option}
                className="option-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option)}
                disabled={isTyping}
              >
                {option}
                <motion.div
                  className="button-ripple"
                  initial={{ scale: 0, opacity: 0.3 }}
                  whileHover={{ 
                    scale: 1,
                    opacity: 0,
                    transition: { duration: 0.4 }
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .chat-interface {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: 
            radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.03) 0%, transparent 50%);
        }

        .chat-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 700px;
          margin: 0 auto;
          padding: 1.5rem;
          width: 100%;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 2rem;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          cursor: pointer;
          backdrop-filter: blur(25px);
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chat-title h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.8));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 350px;
          max-height: 450px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }

        .messages-container::-webkit-scrollbar {
          width: 4px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 85%;
        }

        .message.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message.bot {
          align-self: flex-start;
          align-items: flex-start;
        }

        .message-content {
          padding: 1rem 1.5rem;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.5;
          backdrop-filter: blur(25px);
          position: relative;
          overflow: hidden;
        }

        .message.user .message-content {
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.25), rgba(255, 119, 198, 0.15));
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.95);
          border-bottom-right-radius: 8px;
        }

        .message.bot .message-content {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.9);
          border-bottom-left-radius: 8px;
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.5;
          margin-top: 0.5rem;
          padding: 0 0.8rem;
        }

        .typing-indicator {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1rem 1.5rem;
          backdrop-filter: blur(25px);
        }

        .typing-dots {
          display: flex;
          gap: 0.3rem;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .options-container {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
        }

        .option-button {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 1rem;
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(25px);
          text-align: center;
          position: relative;
          overflow: hidden;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .option-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .option-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
          border-radius: 15px;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .chat-wrapper {
            padding: 1rem;
          }

          .options-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.8rem;
          }

          .option-button {
            padding: 0.8rem;
            font-size: 0.85rem;
            min-height: 55px;
          }

          .message {
            max-width: 90%;
          }

          .message-content {
            padding: 0.8rem 1.2rem;
            font-size: 0.9rem;
          }

          .chat-header {
            padding: 1rem 0;
          }

          .back-button {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatAndVibe;