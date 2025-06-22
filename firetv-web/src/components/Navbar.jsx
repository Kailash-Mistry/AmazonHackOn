import React, { useRef, useState, useEffect } from 'react';
import { detectMoodBERT } from '../utils/recommendations';
import { searchShows } from '../utils/search';
import { MOOD_PHRASES } from '../utils/constants';
import Logo from './Logo';
import Navigation from './Navigation';
import MoodDropdown from './MoodDropdown';
import JoinRoomModal from './JoinRoomModal';

const Navbar = ({ onMoodSubmit, onSearchResults, playlists, onDeletePlaylist }) => {
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [moodInput, setMoodInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isJoinRoomOpen, setJoinRoomOpen] = useState(false);
  const [showJoiningMessage, setShowJoiningMessage] = useState(false);
  
  const moodDropdownRef = useRef(null);
  const heartBtnRef = useRef(null);
  const searchBtnRef = useRef(null);
  const searchBarRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moodDropdownRef.current &&
        !moodDropdownRef.current.contains(event.target) &&
        !heartBtnRef.current.contains(event.target)
      ) {
        setShowMoodDropdown(false);
        setMoodInput('');
        setLoading(false);
      }
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        !searchBtnRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
        setSearchInput('');
      }
    }
    
    if (showMoodDropdown || showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMoodDropdown, showSearchBar]);

  // Mood handling
  const handleHeartClick = () => setShowMoodDropdown((v) => !v);
  const handleInputChange = (e) => setMoodInput(e.target.value);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moodInput.trim()) {
      setLoading(true);
      const detectedMood = await detectMoodBERT(moodInput);
      setLoading(false);
      onMoodSubmit(moodInput, detectedMood);
      setShowMoodDropdown(false);
      setMoodInput('');
    }
  };
  
  const handleMoodBtn = async (mood) => {
    setMoodInput(MOOD_PHRASES[mood]);
    setLoading(true);
    const detectedMood = await detectMoodBERT(MOOD_PHRASES[mood]);
    setLoading(false);
    onMoodSubmit(MOOD_PHRASES[mood], detectedMood);
    setShowMoodDropdown(false);
    setMoodInput('');
  };

  // Search handling
  const handleSearchClick = () => {
    setShowSearchBar((v) => !v);
    setShowMoodDropdown(false);
    setSearchInput('');
  };
  
  const handleSearchInputChange = (e) => setSearchInput(e.target.value);
  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    onSearchResults(null, searchInput, true); // Signal loading
    
    const { results, error } = await searchShows(searchInput);
    
    if (error) {
      onSearchResults([], searchInput, false, error);
    } else {
      onSearchResults(results, searchInput, false);
    }
  };

  const handleJoinRoom = (roomId) => {
    console.log(`Joining room ${roomId}`);
    setJoinRoomOpen(false);
    setShowJoiningMessage(true);
    setTimeout(() => {
      setShowJoiningMessage(false);
    }, 3000); // Hide message after 3 seconds
  };

  return (
  <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        <Logo />
        <Navigation playlists={playlists} onDeletePlaylist={onDeletePlaylist} />
        
        <div className="flex items-center gap-4 relative">
          <button
            ref={heartBtnRef}
            className={`p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg relative ${showMoodDropdown ? 'bg-gray-800 text-orange-400' : ''}`}
            title="Favorites"
            onClick={handleHeartClick}
            aria-haspopup="true"
            aria-expanded={showMoodDropdown}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <MoodDropdown
            isOpen={showMoodDropdown}
            moodInput={moodInput}
            loading={loading}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onMoodBtn={handleMoodBtn}
            onClose={() => { setShowMoodDropdown(false); setMoodInput(''); setLoading(false); }}
            dropdownRef={moodDropdownRef}
          />
          
          <button
            onClick={() => setJoinRoomOpen(!isJoinRoomOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
            title="Join Room"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          {isJoinRoomOpen && (
            <JoinRoomModal
              onClose={() => setJoinRoomOpen(false)}
              onJoin={handleJoinRoom}
            />
          )}
          {showJoiningMessage && (
            <div className="absolute top-full right-0 mt-2 bg-green-500 text-white p-2 rounded">
              Joining the room...
            </div>
          )}
          
          <button
            ref={searchBtnRef}
            className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
            title="Search"
            onClick={handleSearchClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {showSearchBar && (
            <div ref={searchBarRef} className="absolute right-14 top-full mt-2 w-full max-w-xs">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-400 min-w-0"
                  placeholder="Search for a show..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center disabled:opacity-60"
                  aria-label="Search"
                  disabled={!searchInput.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-6-6 18-2-8-8-2z" />
                  </svg>
                </button>
              </form>
        </div>
          )}
          
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Profile">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </button>
      </div>
    </div>
  </header>
);
};

export default Navbar; 