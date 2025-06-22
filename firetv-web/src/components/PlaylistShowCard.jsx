import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistShowCard = ({ show, onRemove }) => {
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="relative group">
      <Link to={`/show/${show.id}`} className="block">
        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
          <div className="aspect-video w-full">
            <img src={show.thumbnail} alt={show.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 left-2 z-10 bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span>★</span>
            <span>{show.rating}</span>
          </div>
          <div className="p-3">
            <h3 className="text-white font-bold text-md truncate mb-1">{show.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-2">{show.description}</p>
            <div className="flex flex-wrap gap-1">
              {show.genres.slice(0, 3).map((g) => (
                <span key={g} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      {onRemove && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 z-10 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          title="Remove from playlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PlaylistShowCard; 