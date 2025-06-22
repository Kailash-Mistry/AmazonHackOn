// BERT-based mood detection with fallback to keyword matching
const GO_EMOTIONS = [
  'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring',
  'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval',
  'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'grief',
  'joy', 'love', 'nervousness', 'optimism', 'pride', 'realization',
  'relief', 'remorse', 'sadness', 'surprise', 'neutral'
];

// Keyword mapping for fallback
const MOOD_KEYWORDS = {
  joy: ['happy', 'joy', 'excited', 'fun', 'funny', 'comedy', 'light', 'cheerful', 'upbeat'],
  excitement: ['thrilling', 'action', 'adventure', 'exciting', 'intense', 'fast-paced'],
  love: ['romantic', 'love', 'romance', 'sweet', 'heartwarming', 'feel-good'],
  relaxation: ['calm', 'relaxing', 'peaceful', 'chill', 'easy', 'comfortable', 'cozy'],
  sadness: ['sad', 'melancholy', 'emotional', 'drama', 'touching', 'heartfelt'],
  fear: ['scary', 'horror', 'thriller', 'suspense', 'dark', 'creepy'],
  anger: ['intense', 'action', 'revenge', 'violent', 'dramatic'],
  surprise: ['unexpected', 'twist', 'mystery', 'suspense', 'thrilling']
};

// Fallback keyword-based mood detection
const detectMoodKeywords = (text) => {
  const lowerText = text.toLowerCase();
  const scores = {};
  
  Object.entries(MOOD_KEYWORDS).forEach(([mood, keywords]) => {
    scores[mood] = keywords.reduce((score, keyword) => {
      return score + (lowerText.includes(keyword) ? 1 : 0);
    }, 0);
  });
  
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'neutral';
  
  return Object.keys(scores).find(mood => scores[mood] === maxScore);
};

// Main mood detection function
export const detectMoodBERT = async (text) => {
  try {
    // Try to call the BERT model API
    const response = await fetch('http://localhost:5000/detect-mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (response.ok) {
      const result = await response.json();
      return result.mood;
    }
  } catch (error) {
    console.warn(
      'Could not connect to the BERT model. This is expected if the local AI server is not running. Falling back to keyword-based recommendations.'
    );
  }
  
  // Fallback to keyword-based detection
  return detectMoodKeywords(text);
}; 