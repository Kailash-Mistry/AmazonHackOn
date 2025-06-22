import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistDropdown = ({ isOpen, playlists, onClose, dropdownRef }) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-60 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-50 p-2"
      style={{ top: '100%' }}
    >
      <div className="flex flex-col">
        {playlists.map(playlist => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            onClick={onClose}
            className="p-2 text-white rounded-lg hover:bg-orange-500 transition-colors"
          >
            {playlist.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDropdown; 