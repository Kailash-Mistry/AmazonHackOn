import React, { useEffect, useState } from 'react';
import ShowCarousel from '../components/ShowCarousel';

const RecommendedSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/recommended.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([recommendedIds, allShows]) => {
      setShows(allShows.filter(s => recommendedIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {/* <span className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-2xl">✨</span> */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">Recommended for You</h2>
      </div>
      <ShowCarousel shows={shows} hideScrollbar={true} />
    </section>
  );
};

export default RecommendedSection; 