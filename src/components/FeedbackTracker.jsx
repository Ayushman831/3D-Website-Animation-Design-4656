import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSend, FiStar, FiHeart } = FiIcons;

const FeedbackTracker = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState({
    experience: 0,
    reward: '',
    improvements: '',
    overall: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const experiences = [
    { value: 1, emoji: '😔', label: 'Not Great', color: 'rgba(239, 68, 68, 0.3)' },
    { value: 2, emoji: '😐', label: 'Okay', color: 'rgba(245, 158, 11, 0.3)' },
    { value: 3, emoji: '🙂', label: 'Good', color: 'rgba(234, 179, 8, 0.3)' },
    { value: 4, emoji: '😊', label: 'Great', color: 'rgba(34, 197, 94, 0.3)' },
    { value: 5, emoji: '🤩', label: 'Amazing', color: 'rgba(16, 185, 129, 0.3)' }
  ];

  const rewards = [
    "🎙️ Podcast Feature", "🎯 Fun Challenge", "❤️ 5 Insta Likes",
    "👥 5 Follows", "💬 5+ Comments", "👍 20+ Likes",
    "📚 Flow Fact Feature", "📢 Story Mention", "No reward yet"
  ];

  const handleStarRating = (rating, type) => {
    setFeedback(prev => ({ ...prev, [type]: rating }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const StarRating = ({ rating, onRate, size = "1.8rem" }) => (
    <div className="star-rating" style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          className="star-button"
          onClick={() => onRate(star)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: size,
            color: star <= rating ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            filter: star <= rating ? 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))' : 'none'
          }}
        >
          <SafeIcon icon={FiStar} />
        </motion.button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="feedback-container">
        <div className="floating-particles">
          {[...Array(10)].map((_, i) => (
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
          className="success-screen"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="success-animation">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="success-particle"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0.5],
                  x: Math.cos(i * 45 * Math.PI / 180) * 60,
                  y: Math.sin(i * 45 * Math.PI / 180) * 60
                }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  background: `hsl(${i * 45}, 60%, 60%)`,
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>

          <motion.div
            className="success-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SafeIcon icon={FiHeart} className="success-icon" />
            <h2>Thank You!</h2>
            <p>Your feedback helps us flow better 💧</p>
            <p className="success-subtitle">
              Tag @pureflow48.official for bonus FlowCoins!
            </p>
            
            <motion.button
              className="return-button"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Flow Zone
            </motion.button>
          </motion.div>
        </motion.div>

        <style jsx>{`
          .success-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            position: relative;
          }

          .success-animation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .success-content {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 3rem;
            backdrop-filter: blur(20px);
            max-width: 400px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .success-icon {
            font-size: 3rem;
            color: rgba(255, 119, 198, 0.8);
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 0 10px rgba(255, 119, 198, 0.3));
          }

          .success-content h2 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.7));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .success-content p {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            opacity: 0.8;
          }

          .success-subtitle {
            font-size: 0.9rem !important;
            opacity: 0.6 !important;
            margin-bottom: 2rem !important;
          }

          .return-button {
            background: linear-gradient(135deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.15));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem 2rem;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(20px);
          }

          .return-button:hover {
            background: linear-gradient(135deg, rgba(120, 119, 198, 0.25), rgba(255, 119, 198, 0.2));
            border-color: rgba(255, 255, 255, 0.15);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
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
        className="feedback-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="feedback-header">
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
            Feedback
          </motion.h1>
        </div>

        <div className="progress-bar">
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="progress-text">Step {currentStep} of 4</span>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              className="feedback-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>How was your Flow experience?</h2>
              <p>Rate your overall experience</p>
              
              <div className="experience-grid">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.value}
                    className={`experience-card ${feedback.experience === exp.value ? 'selected' : ''}`}
                    onClick={() => setFeedback(prev => ({ ...prev, experience: exp.value }))}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: feedback.experience === exp.value ? exp.color : 'rgba(255, 255, 255, 0.02)',
                      borderColor: feedback.experience === exp.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="experience-emoji">{exp.emoji}</div>
                    <div className="experience-label">{exp.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="next-button"
                onClick={handleNext}
                disabled={!feedback.experience}
                whileHover={feedback.experience ? { scale: 1.02 } : {}}
                whileTap={feedback.experience ? { scale: 0.98 } : {}}
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              className="feedback-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>What reward did you get?</h2>
              <p>Select from available rewards</p>
              
              <div className="reward-grid">
                {rewards.map((reward) => (
                  <motion.div
                    key={reward}
                    className={`reward-card ${feedback.reward === reward ? 'selected' : ''}`}
                    onClick={() => setFeedback(prev => ({ ...prev, reward }))}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>{reward}</span>
                    {feedback.reward === reward && (
                      <motion.div
                        className="checkmark"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="next-button"
                onClick={handleNext}
                disabled={!feedback.reward}
                whileHover={feedback.reward ? { scale: 1.02 } : {}}
                whileTap={feedback.reward ? { scale: 0.98 } : {}}
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              className="feedback-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Ideas to improve?</h2>
              <p>Share your thoughts on making Flow better</p>
              
              <motion.textarea
                className="improvement-textarea"
                value={feedback.improvements}
                onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                placeholder="What would make your Flow experience better? Any features or improvements you'd love to see?"
                rows={5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />

              <motion.button
                className="next-button"
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              className="feedback-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Overall rating?</h2>
              <p>Rate the entire PureFlow experience</p>
              
              <div className="rating-section">
                <StarRating 
                  rating={feedback.overall} 
                  onRate={(rating) => handleStarRating(rating, 'overall')}
                  size="2.5rem"
                />
                <div className="rating-labels">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <motion.button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!feedback.overall || isSubmitting}
                whileHover={feedback.overall && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={feedback.overall && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      💧
                    </motion.div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} />
                    Submit Feedback
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .feedback-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .feedback-wrapper {
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .feedback-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
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

        .progress-bar {
          margin-bottom: 3rem;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(120, 119, 198, 0.6), rgba(255, 119, 198, 0.4));
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(120, 119, 198, 0.3);
        }

        .progress-text {
          font-size: 0.85rem;
          opacity: 0.6;
        }

        .feedback-step {
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .feedback-step h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .feedback-step p {
          font-size: 1rem;
          opacity: 0.6;
          margin-bottom: 2rem;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .experience-card {
          border: 1px solid;
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .experience-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .experience-label {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
        }

        .reward-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.8rem;
          margin-bottom: 3rem;
        }

        .reward-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .reward-card.selected {
          border-color: rgba(120, 119, 198, 0.4);
          background: rgba(120, 119, 198, 0.1);
        }

        .checkmark {
          color: rgba(74, 222, 128, 0.8);
          font-weight: bold;
          font-size: 1rem;
        }

        .improvement-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          line-height: 1.5;
          resize: vertical;
          margin-bottom: 3rem;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .improvement-textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 12px rgba(120, 119, 198, 0.1);
        }

        .improvement-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .rating-section {
          margin-bottom: 3rem;
        }

        .rating-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          font-size: 0.85rem;
          opacity: 0.6;
        }

        .next-button, .submit-button {
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.15));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 2rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0 auto;
          backdrop-filter: blur(20px);
        }

        .next-button:disabled, .submit-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .next-button:not(:disabled):hover, .submit-button:not(:disabled):hover {
          background: linear-gradient(135deg, rgba(120, 119, 198, 0.25), rgba(255, 119, 198, 0.2));
          border-color: rgba(255, 255, 255, 0.15);
        }

        .spinner {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .feedback-container {
            padding: 1rem;
          }

          .experience-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.8rem;
          }

          .reward-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .experience-card {
            padding: 1.2rem;
          }

          .experience-emoji {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackTracker;