import React from 'react';
import ShowCarousel from '../components/ShowCarousel';

const WatchlistSection = ({ playlists }) => {
  const watchlist = playlists.find(p => p.id === 'watchlist');

  if (!watchlist || !watchlist.shows || watchlist.shows.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 px-4">{watchlist.name}</h2>
      <ShowCarousel shows={watchlist.shows} />
    </div>
  );
};

export default WatchlistSection; 