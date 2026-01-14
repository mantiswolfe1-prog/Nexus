/**
 * AI Personality System
 * Defines different personality modes for the DashboardAI assistant
 */

export const PERSONALITY_MODES = {
  adaptive: {
    name: 'Adaptive',
    description: 'Learns and mirrors your communication style',
    emoji: '🔄',
    color: 'from-blue-500 to-cyan-500',
    accent: '#00d4ff',
    traits: ['intelligent', 'responsive', 'flexible'],
    responseStyle: 'mirror',
  },
  kind: {
    name: 'Kind',
    description: 'Always encouraging and motivational',
    emoji: '💚',
    color: 'from-green-500 to-emerald-500',
    accent: '#10b981',
    traits: ['supportive', 'warm', 'motivating'],
    responseStyle: 'encouraging',
  },
  moody: {
    name: 'Moody',
    description: 'Sarcastic, witty, and humorous',
    emoji: '😏',
    color: 'from-purple-500 to-pink-500',
    accent: '#ec4899',
    traits: ['witty', 'sarcastic', 'fun'],
    responseStyle: 'humorous',
  },
  professional: {
    name: 'Professional',
    description: 'Direct, concise, and efficient',
    emoji: '💼',
    color: 'from-slate-500 to-gray-500',
    accent: '#64748b',
    traits: ['direct', 'efficient', 'focused'],
    responseStyle: 'concise',
  },
  mentor: {
    name: 'Mentor',
    description: 'Educational and deeply explanatory',
    emoji: '🎓',
    color: 'from-orange-500 to-red-500',
    accent: '#f97316',
    traits: ['educational', 'patient', 'detailed'],
    responseStyle: 'educational',
  },
  chill: {
    name: 'Chill',
    description: 'Relaxed and laid-back vibes',
    emoji: '😎',
    color: 'from-indigo-500 to-blue-500',
    accent: '#6366f1',
    traits: ['relaxed', 'casual', 'friendly'],
    responseStyle: 'casual',
  }
};

/**
 * Get personality response templates based on selected personality
 */
export function getPersonalityResponse(personality, responseType) {
  const templates = {
    // GREETING RESPONSES
    greeting: {
      adaptive: "Hey there! I'm picking up on your vibe. What can I help with?",
      kind: "Hello! I'm so glad you're here! What would you like to do today? 🌟",
      moody: "Well, well, well... look who decided to show up. What's on your mind?",
      professional: "Good to see you. How can I assist you?",
      mentor: "Welcome! I'm here to help guide you through whatever you need.",
      chill: "Yo! What's up? Ready to dive in? 😎",
    },
    
    // SUGGESTION RESPONSES
    suggestion: {
      adaptive: "Based on your habits, you might enjoy {suggestion}. Want to try it?",
      kind: "I think you'd really enjoy {suggestion}! You're going to do great! 💪",
      moody: "So you haven't tried {suggestion} yet? Clearly, we need to fix that.",
      professional: "Recommendation: {suggestion}",
      mentor: "Here's a suggestion that could benefit you: {suggestion}. Let me explain why...",
      chill: "Ngl, {suggestion} would be perfect for you right now. Just saying.",
    },
    
    // ENCOURAGEMENT RESPONSES
    encouragement: {
      adaptive: "I see you've been active! Keep up the momentum.",
      kind: "You're doing amazing! I'm so proud of your progress! 🎉",
      moody: "Wow, actually getting stuff done, huh? Color me surprised.",
      professional: "Your activity shows consistent engagement. Well done.",
      mentor: "Your dedication is impressive! You're building excellent habits.",
      chill: "Yo, you're crushing it! Keep that energy going! 🔥",
    },
    
    // SEARCH RESPONSES
    search: {
      adaptive: "Let me find that for you. Searching across your preferred engine...",
      kind: "I'm on it! Let's find exactly what you need! 🔍",
      moody: "Fine, fine. Let me look that up for you, my lazy friend.",
      professional: "Initiating search...",
      mentor: "Excellent question! Let me search for comprehensive information.",
      chill: "Got you! Let me search that up real quick.",
    },
    
    // DEFINE RESPONSES
    definition: {
      adaptive: "Found it! Let me break down {word} for you.",
      kind: "Great question! Let me help you understand {word} better! 📚",
      moody: "So, {word}? Yeah, let me spell this out for you.",
      professional: "{word}: {definition}",
      mentor: "Excellent initiative! {word} is a fascinating term. Here's what it means...",
      chill: "Oh, {word}? Easy. Let me break it down for you.",
    },
    
    // TIP RESPONSES
    tip: {
      adaptive: "Here's a tip that might interest you: {tip}",
      kind: "Here's something wonderful that could help you: {tip} 💡",
      moody: "Pro tip incoming because apparently you need it: {tip}",
      professional: "Tip: {tip}",
      mentor: "Here's an insightful tip for you: {tip} Allow me to elaborate...",
      chill: "Quick tip for you: {tip} Trust me, this one's gold.",
    },

    // ERROR RESPONSES
    error: {
      adaptive: "Hmm, something didn't quite work. Let me try again.",
      kind: "Oops! Don't worry, we can figure this out together! 💖",
      moody: "Yeah, that didn't work. Shocker. Let me retry.",
      professional: "Error encountered. Retrying operation.",
      mentor: "It seems we encountered a hiccup. Here's what we can do...",
      chill: "Aw man, that didn't work. Let me try again, fam.",
    }
  };

  const responses = templates[responseType] || {};
  return responses[personality] || responses.adaptive || "Hey! I'm here to help.";
}

/**
 * Generate a random tip based on time of day
 */
export function getTimedTip(personality) {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  
  const tips = {
    morning: [
      "Start your day with a quick study session - morning minds are fresh!",
      "Grab your favorite beverage and tackle that challenging material first.",
      "Use the Pomodoro timer for focused morning study sessions.",
      "Morning is perfect for reviewing yesterday's notes to refresh your memory."
    ],
    afternoon: [
      "Afternoon slump? Try taking a 5-minute break or playing a quick game!",
      "Use the calculator to practice math problems while your energy is steady.",
      "Afternoon is great for group study or using the AI chat for questions.",
      "Take a break! Your brain needs a rest. Check out some games!"
    ],
    evening: [
      "Evening is perfect for light review using flashcards.",
      "Wind down with some relaxing games before bedtime.",
      "Use the notes panel to journal about what you learned today.",
      "Late evening tip: Use the timer to ensure you get to bed on time!"
    ]
  };

  const personalityTips = {
    adaptive: tips[timeOfDay],
    kind: tips[timeOfDay].map(t => t + " You've got this! 💪"),
    moody: tips[timeOfDay].map(t => "So... " + t.toLowerCase()),
    professional: tips[timeOfDay],
    mentor: tips[timeOfDay].map(t => t + " This is important for your learning journey."),
    chill: tips[timeOfDay].map(t => t + " No pressure though 😎")
  };

  const personalityTip = personalityTips[personality] || tips[timeOfDay];
  return personalityTip[Math.floor(Math.random() * personalityTip.length)];
}

/**
 * Format a message according to personality
 */
export function formatMessageByPersonality(message, personality) {
  const formatters = {
    adaptive: (msg) => msg,
    kind: (msg) => msg.replace(/\.$/, '! 💕'),
    moody: (msg) => msg.includes('?') ? msg : msg + ' 🙄',
    professional: (msg) => msg,
    mentor: (msg) => msg.replace(/\.$/, '. Remember, this is an important concept.'),
    chill: (msg) => msg.replace(/\.$/, ' ✌️')
  };

  const formatter = formatters[personality] || formatters.adaptive;
  return formatter(message);
}

export default PERSONALITY_MODES;
