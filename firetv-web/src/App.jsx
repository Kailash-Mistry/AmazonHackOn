import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';
import PlaylistPage from './pages/PlaylistPage';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import WatchParty from './pages/WatchParty';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [moodInput, setMoodInput] = useState('');
  const [detectedMood, setDetectedMood] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [playlists, setPlaylists] = useState([
    { id: 'watchlist', name: 'Watchlist', shows: [] }
  ]);

  // Now receives both input and detectedMood from Navbar
  const handleMoodSubmit = (input, detectedMood) => {
    setMoodInput(input);
    setDetectedMood(detectedMood);
    setSearchResults(null);
    setSearchQuery('');
    setSearchError('');
  };

  const handleSearchResults = (results, query, loading, error) => {
    setSearchResults(results);
    setSearchQuery(query);
    setSearchLoading(loading);
    setSearchError(error || '');
    setMoodInput('');
    setDetectedMood('');
  };

  const handlePlaylistManagement = (show, selectedPlaylistIds, newPlaylistName) => {
    let newPlaylists = [...playlists];
    
    // Create new playlist if a name is provided
    if (newPlaylistName) {
      const newPlaylist = { id: uuidv4(), name: newPlaylistName, shows: [show] };
      newPlaylists.push(newPlaylist);
      // Add the new playlist's ID to the list of selected ones
      selectedPlaylistIds.push(newPlaylist.id);
    }
    
    // Add or remove the show from playlists
    newPlaylists = newPlaylists.map(playlist => {
      const isSelected = selectedPlaylistIds.includes(playlist.id);
      const isShowInPlaylist = playlist.shows.some(s => s.id === show.id);

      // Add show to selected playlist
      if (isSelected && !isShowInPlaylist) {
        return { ...playlist, shows: [...playlist.shows, show] };
      }
      
      // Remove show from unselected playlist
      if (!isSelected && isShowInPlaylist) {
        return { ...playlist, shows: playlist.shows.filter(s => s.id !== show.id) };
      }
      
      return playlist;
    });
    
    setPlaylists(newPlaylists);
  };

  const handleRemoveFromPlaylist = (playlistId, showId) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            shows: playlist.shows.filter(show => show.id !== showId),
          };
        }
        return playlist;
      })
    );
  };

  const handleDeletePlaylist = (playlistIdToDelete) => {
    if (playlistIdToDelete === 'watchlist') {
      // Maybe show a notification that the default watchlist cannot be deleted
      return;
    }
    setPlaylists(prev => prev.filter(p => p.id !== playlistIdToDelete));
  };

  const handleCloseMood = () => {
    setMoodInput('');
    setDetectedMood('');
    setSearchLoading(false);
    setSearchError('');
  };

  const handleCloseSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
    setSearchLoading(false);
    setSearchError('');
  };

  return (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-black">
        <Navbar 
          onMoodSubmit={handleMoodSubmit} 
          onSearchResults={handleSearchResults}
          playlists={playlists} 
          onDeletePlaylist={handleDeletePlaylist}
        />
      <main className="flex-1">
        <Routes>
            <Route path="/" element={
              <Home 
                moodInput={moodInput} 
                detectedMood={detectedMood} 
                onCloseMood={handleCloseMood}
                searchResults={searchResults}
                searchQuery={searchQuery}
                onCloseSearch={handleCloseSearch}
                searchLoading={searchLoading}
                searchError={searchError}
                playlists={playlists}
              />
            } />
            <Route path="/show/:id" element={
              <ShowDetails 
                playlists={playlists} 
                onPlaylistManagement={handlePlaylistManagement} 
              />} 
            />
            <Route 
              path="/playlist/:playlistId" 
              element={<PlaylistPage playlists={playlists} onRemoveFromPlaylist={handleRemoveFromPlaylist} />} 
            />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/watch-party/:roomId" element={<WatchParty />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);
};

export default App;
