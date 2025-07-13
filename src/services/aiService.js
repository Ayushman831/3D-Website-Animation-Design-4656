const API_KEY = '96431dc4150727172b052fd68445ff01a4fe2f20df15ae77d62e526e1acd8324';
const API_BASE_URL = 'https://api.openai.com/v1/chat/completions';

class AIService {
  constructor() {
    this.apiKey = API_KEY;
  }

  async generateResponse(prompt, context = {}) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are PureFlow AI, a sophisticated hydration companion with a vibrant, Gen-Z personality. You're playful yet insightful, trendy but genuine. Always incorporate water/flow metaphors naturally. Keep responses engaging, brief (2-3 sentences max), and include relevant emojis. Match the language: ${context.language || 'English'}.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 150,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback responses
      const fallbacks = {
        'en': "Your vibe is flowing perfectly! 💧 Keep riding those good waves! ✨",
        'hi': "आपकी एनर्जी बहुत बेहतरीन है! 💧 इसी तरह बहते रहिए! ✨",
        'bn': "আপনার ভাইব একদম পারফেক্ট! 💧 এমনই ভালো তরঙ্গে থাকুন! ✨"
      };
      return fallbacks[context.language] || fallbacks['en'];
    }
  }

  async generateMoodResponse(mood, language = 'en') {
    const prompt = `Respond to someone feeling ${mood} today. Give them an uplifting, water-themed message about their energy state.`;
    return await this.generateResponse(prompt, { language });
  }

  async generateChatResponse(message, language = 'en') {
    const prompt = `Respond to: "${message}" - be conversational, fun, and hydration-themed.`;
    return await this.generateResponse(prompt, { language });
  }
}

export default new AIService();