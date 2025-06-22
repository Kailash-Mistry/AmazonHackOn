import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PlaylistShowCard from '../components/PlaylistShowCard';

const PlaylistPage = ({ playlists, onRemoveFromPlaylist }) => {
  const { playlistId } = useParams();
  const playlist = playlists.find(p => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Playlist not found</h2>
        <Link to="/" className="text-orange-400 hover:underline">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8">
        <h2 className="text-4xl font-bold mb-8">{playlist.name}</h2>
        
        {playlist.shows && playlist.shows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlist.shows.map(show => (
              <PlaylistShowCard 
                key={show.id} 
                show={show}
                onRemove={() => onRemoveFromPlaylist(playlist.id, show.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">This playlist is empty.</p>
            <p className="text-gray-600 mt-2">Add some shows to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage; 