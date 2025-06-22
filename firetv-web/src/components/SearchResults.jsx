import React from 'react';
import ShowCard from './ShowCard';
import LoadingSpinner from './LoadingSpinner';

const SearchResults = ({ searchResults, searchQuery, onCloseSearch, isLoading, error }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span role="img" aria-label="search">🔍</span> Search results for <span className="ml-2 text-orange-400">"{searchQuery}"</span>
          </h2>
          <button
            className="text-gray-400 hover:text-white text-2xl px-4 py-2 rounded-lg border border-gray-700 hover:border-orange-400 transition"
            onClick={onCloseSearch}
            aria-label="Back to homepage"
          >
            &times;
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-20 text-xl">
            {error}
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-2xl mb-4">No shows found for "{searchQuery}"</div>
            <div className="text-gray-600">Try searching for a different title or genre</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 