import React, { useRef } from 'react';
import ShowCard from './ShowCard';

const ShowCarousel = ({ shows, hideScrollbar }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex gap-4 overflow-x-auto pb-4 ${hideScrollbar ? 'hide-scrollbar' : 'scrollbar-hide'}`}
        ref={scrollRef}
      >
        {shows.map((show) => (
          <div key={show.id} className="flex-shrink-0 w-64">
            <ShowCard show={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCarousel; 