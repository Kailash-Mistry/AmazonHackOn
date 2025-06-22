import React, { useEffect, useState } from 'react';
import ShowCarousel from '../components/ShowCarousel';

const FriendsPicksSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/friends-picks.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([friendsPickIds, allShows]) => {
      setShows(allShows.filter(s => friendsPickIds.includes(s.id)));
    });
  }, []);

  if (shows.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Top Picks by Your Friends</h2>
      </div>
      <ShowCarousel shows={shows} />
    </section>
  );
};

export default FriendsPicksSection; 