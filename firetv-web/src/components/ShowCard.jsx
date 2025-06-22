import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowCard = ({ show }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-64 h-96 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-800 hover:border-orange-500/50 flex flex-col"
      onClick={() => navigate(`/show/${show.id}`)}
    >
      <div className="w-full flex-1 relative overflow-hidden">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-shrink-0">
        <h3 className="text-white text-lg font-bold text-center truncate">{show.title}</h3>
      </div>
    </div>
  );
};

export default ShowCard; 