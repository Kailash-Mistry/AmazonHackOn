import React, { useEffect, useState } from 'react';
import ShowCarousel from '../components/ShowCarousel';

const WatchHistorySection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/history.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([historyIds, allShows]) => {
      setShows(allShows.filter(s => historyIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Watch History</h2>
      </div>
      <ShowCarousel shows={shows} />
    </section>
  );
};

export default WatchHistorySection; 