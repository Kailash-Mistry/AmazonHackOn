import React, { useEffect, useState } from 'react';
import ShowCarousel from '../components/ShowCarousel';

const TrendingSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/trending.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([trendingIds, allShows]) => {
      setShows(allShows.filter(s => trendingIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {/* <span className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-2xl">🔥</span> */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now</h2>
      </div>
      <ShowCarousel shows={shows} hideScrollbar={true} />
    </section>
  );
};

export default TrendingSection; 