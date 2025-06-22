import React from 'react';
import ContextualPlaylistsSection from '../sections/ContextualPlaylistsSection';
import HeroBanner from '../sections/HeroBanner';
import TrendingSection from '../sections/TrendingSection';
import RecommendedSection from '../sections/RecommendedSection';
import ContinueWatchingSection from '../sections/ContinueWatchingSection';
import MoodRecommendations from '../components/MoodRecommendations';
import SearchResults from '../components/SearchResults';
import TimeContextDisplay from '../components/TimeContextDisplay';
import WatchlistSection from '../sections/WatchlistSection';
import FriendsPicksSection from '../sections/FriendsPicksSection';

const Home = ({ moodInput, detectedMood, searchResults, searchQuery, onCloseSearch, searchLoading, searchError, playlists }) => {
  if (searchResults !== null) {
    return (
      <SearchResults 
        searchResults={searchResults} 
        searchQuery={searchQuery} 
        onCloseSearch={onCloseSearch}
        isLoading={searchLoading}
        error={searchError}
      />
    );
  }
  
  if (detectedMood) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="w-full max-w-7xl mx-auto px-4 pt-8">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
            Recommendations for detected mood - <span className="capitalize text-orange-400 ml-2">{detectedMood}</span>
          </h2>
          <MoodRecommendations mood={detectedMood} input={moodInput} fullPage={true} hideHeader />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroBanner />
      <div className="w-full max-w-7xl mx-auto px-4">
        <TimeContextDisplay />
      </div>
      <ContinueWatchingSection />
      <WatchlistSection playlists={playlists} />
      <TrendingSection />
      <RecommendedSection />
      <FriendsPicksSection />
      <ContextualPlaylistsSection />
    </div>
  );
};

export default Home; 