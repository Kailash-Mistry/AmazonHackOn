import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';

// Map moods to genres or keywords
const moodGenreMap = {
  happy: ['Comedy', 'Family'],
  light: ['Comedy', 'Family'],
  romantic: ['Romance'],
  excited: ['Action', 'Adventure', 'Sci-Fi'],
  tense: ['Thriller', 'Mystery', 'Crime', 'Horror'],
  motivational: ['Biography', 'History'],
  drama: ['Drama'],
  relaxing: ['ASMR', 'Relax', 'Family'],
  relaxed: ['ASMR', 'Relax', 'Family'],
  any: [],
};

// Heuristic: categorize by genres or title keywords
function categorizeShow(show) {
  const genres = show.genres.map(g => g.toLowerCase());
  const title = show.title.toLowerCase();
  if (genres.includes('movie') || title.includes('movie')) return 'Movies';
  if (genres.includes('series') || title.includes('series') || genres.includes('drama') || genres.includes('sitcom')) return 'Series';
  return 'Shows';
}

const MoodRecommendations = ({ mood, input, onClose, fullPage, hideHeader }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/src/data/shows.json')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        if (mood !== 'any') {
          // Prefer moods field if present
          filtered = data.filter(show =>
            (show.moods && show.moods.includes(mood)) ||
            (!show.moods && show.genres.some(g => moodGenreMap[mood]?.some(mg => g.toLowerCase().includes(mg.toLowerCase()))))
          );
        }
        setShows(filtered);
        setLoading(false);
      });
  }, [mood]);

  // Categorize shows
  const categories = { Movies: [], Shows: [], Series: [] };
  shows.forEach(show => {
    const cat = categorizeShow(show);
    if (categories[cat]) categories[cat].push(show);
  });

  const moodLabel = mood.charAt(0).toUpperCase() + mood.slice(1);

  return (
    <section className={fullPage ? "" : "bg-gray-900 rounded-xl p-4 shadow-2xl w-full"}>
      <div className={fullPage ? "bg-gray-900 rounded-2xl p-2 md:p-4 shadow-2xl w-full" : ""}>
        {!hideHeader && !fullPage && (
          <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
            Recommendations for your mood
          </h2>
        )}
        {!hideHeader && (
          <div className="mb-6 text-lg text-blue-300 font-semibold">Detected mood: <span className="capitalize text-orange-400">{moodLabel}</span></div>
        )}
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : shows.length === 0 ? (
          <div className="text-gray-400">No shows found for this mood. Try a different mood!</div>
        ) : (
          <div className="flex flex-col gap-2 md:gap-4">
            {Object.entries(categories).map(([cat, items]) =>
              items.length > 0 && (
                <div key={cat} className="mb-1">
                  <h3 className="text-lg font-bold mb-1 text-white pl-1">{cat}</h3>
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {items.map(show => (
                      <div key={show.id} className="min-w-[22rem] h-full flex">
                        <ShowCard show={show} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MoodRecommendations; 