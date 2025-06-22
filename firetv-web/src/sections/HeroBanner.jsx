import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const VIDEO_SRC = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const HeroBanner = () => {
  const [showPlayer, setShowPlayer] = useState(false);


  const featured = {
    id: 'stranger-things', // Added for navigation
    title: 'Stranger Things',
    description: 'A group of young friends witness supernatural forces and secret government exploits in their small town.',
    year: 2016,
    duration: '50m',
    rating: 8.7,
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    image: '/assets/stranger-things.jpg',
  };

  return (
    <>
      <section className="relative w-full h-[60vh] flex items-end bg-black overflow-hidden mb-8">
        {/* Background image */}
        <img
          src={featured.image}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-40"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        {/* Content */}
        <div className="relative z-20 p-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{featured.title}</h1>
          <div className="flex items-center gap-4 mb-2 text-lg">
            <span className="text-yellow-400 font-bold">★ {featured.rating}</span>
            <span>{featured.duration}</span>
            <span>{featured.year}</span>
          </div>
          <p className="text-lg text-gray-200 mb-4 line-clamp-2">{featured.description}</p>
          <div className="flex gap-2 mb-6">
            {featured.genres.map((g) => (
              <span key={g} className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white/80">{g}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowPlayer(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-lg shadow-lg transition-all"
            >
              Play Now
            </button>
            <Link 
              to={`/show/${featured.id}`}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all"
            >
              More Info
            </Link>
          </div>
        </div>
      </section>
      
      {showPlayer && <VideoPlayer src={VIDEO_SRC} onClose={() => setShowPlayer(false)} />}
    </>
  );
};

export default HeroBanner; 