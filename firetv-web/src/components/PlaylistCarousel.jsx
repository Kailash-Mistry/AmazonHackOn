import React from 'react';
import ShowCard from './ShowCard';

const PlaylistCarousel = ({ title, shows }) => (
  <section className="mb-6">
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
    </div>
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
      {shows.map(show => (
        <div key={show.id} className="min-w-[16rem] h-full flex">
          <ShowCard show={show} />
        </div>
      ))}
    </div>
  </section>
);

export default PlaylistCarousel; 