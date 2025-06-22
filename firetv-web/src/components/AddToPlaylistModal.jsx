import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const AddToPlaylistModal = ({ isOpen, onClose, playlists, show, onDone }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [showNewPlaylistInput, setShowNewPlaylistInput] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Pre-select playlists that the show is already in
      const alreadyIn = playlists.filter(p => p.shows.some(s => s.id === show.id)).map(p => p.id);
      setSelectedPlaylists(alreadyIn);
      setShowNewPlaylistInput(false);
      setNewPlaylistName('');
    }
  }, [isOpen, playlists, show]);

  const handlePlaylistToggle = (playlistId) => {
    setSelectedPlaylists(prev => 
      prev.includes(playlistId) 
        ? prev.filter(id => id !== playlistId) 
        : [...prev, playlistId]
    );
  };
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onDone(show, selectedPlaylists, newPlaylistName.trim());
    }
  };
  
  const handleDone = () => {
    if (newPlaylistName.trim()) {
      handleCreatePlaylist();
    } else {
      onDone(show, selectedPlaylists);
    }
  };

  const filteredPlaylists = playlists.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">Add to Playlist</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Find a playlist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-orange-500"
        />
      </div>

      <div 
        onClick={() => setShowNewPlaylistInput(!showNewPlaylistInput)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer mb-4"
      >
        <span className="text-2xl text-orange-400">+</span>
        <span className="font-semibold">New playlist</span>
      </div>
      
      {showNewPlaylistInput && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-orange-500"
            autoFocus
          />
          <button 
            onClick={handleCreatePlaylist}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Create
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-6">
        {filteredPlaylists.map(playlist => (
          <div 
            key={playlist.id}
            onClick={() => handlePlaylistToggle(playlist.id)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedPlaylists.includes(playlist.id)}
              onChange={() => {}}
              className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-orange-500 focus:ring-orange-500"
            />
            <span>{playlist.name}</span>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleDone}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600"
      >
        Done
      </button>
    </Modal>
  );
};

export default AddToPlaylistModal; 