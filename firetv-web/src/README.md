# Fire TV App - Code Structure

## Overview
This is a React-based streaming platform with intelligent mood-based recommendations and context-aware playlists.

## Project Structure

### `/src/components/`
Reusable UI components:
- **Logo.jsx** - App logo component
- **Navigation.jsx** - Navigation menu component
- **MoodDropdown.jsx** - Mood selection dropdown
- **SearchDropdown.jsx** - Search functionality dropdown
- **SearchResults.jsx** - Search results display
- **LoadingSpinner.jsx** - Reusable loading spinner
- **ShowCard.jsx** - Individual show/movie card
- **ShowCarousel.jsx** - Horizontal scrolling show carousel
- **PlaylistCarousel.jsx** - Playlist-specific carousel
- **Navbar.jsx** - Main navigation bar (orchestrates other components)
- **Footer.jsx** - App footer
- **MoodRecommendations.jsx** - Mood-based recommendations display

### `/src/utils/`
Utility functions and constants:
- **constants.js** - App-wide constants (mood options, navigation links)
- **recommendations.js** - Mood detection logic (BERT + fallback)
- **search.js** - Search functionality utilities

### `/src/context/`
React context hooks:
- **useTimeContext.js** - Time-based context (day, season, etc.)
- **useWeatherContext.js** - Weather-based context

### `/src/sections/`
Page sections and layouts:
- **HeroBanner.jsx** - Main hero section
- **TrendingSection.jsx** - Trending shows section
- **RecommendedSection.jsx** - Recommended shows section
- **ContinueWatchingSection.jsx** - Continue watching section
- **WatchHistorySection.jsx** - Watch history section
- **ContextualPlaylistsSection.jsx** - Context-aware playlists

### `/src/pages/`
Main page components:
- **Home.jsx** - Homepage with all sections
- **ShowDetails.jsx** - Individual show details page

### `/src/playlists/`
Playlist-related logic:
- **getPlaylists.js** - Playlist generation logic
- **playlistData.js** - Static playlist definitions

### `/src/data/`
Static data files:
- **shows.json** - Shows and movies data
- **trending.json** - Trending shows IDs
- **recommended.json** - Recommended shows IDs
- **continue.json** - Continue watching IDs
- **history.json** - Watch history IDs

## Key Features

### 1. Mood-Based Recommendations
- AI-powered mood detection using BERT model
- Keyword-based fallback system
- Pre-defined mood buttons for quick selection

### 2. Context-Aware Playlists
- Time-based playlists (morning, evening, weekend)
- Weather-based recommendations
- Dynamic playlist generation

### 3. Search Functionality
- Real-time search across shows and genres
- Full-page search results display

### 4. Responsive Design
- Mobile-first approach
- Consistent card sizing and spacing
- Clean, modern UI

## Code Organization Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Separation of Concerns** - UI, logic, and data are separated
3. **Reusability** - Common components are extracted and reused
4. **Maintainability** - Clear file structure and naming conventions
5. **Scalability** - Easy to add new features and components

## Component Hierarchy

```
App.jsx
├── Navbar.jsx
│   ├── Logo.jsx
│   ├── Navigation.jsx
│   ├── MoodDropdown.jsx
│   └── SearchDropdown.jsx
├── Home.jsx
│   ├── HeroBanner.jsx
│   ├── TrendingSection.jsx
│   ├── RecommendedSection.jsx
│   ├── ContinueWatchingSection.jsx
│   └── ContextualPlaylistsSection.jsx
│       └── PlaylistCarousel.jsx
│           └── ShowCard.jsx
├── SearchResults.jsx
│   └── ShowCard.jsx
└── Footer.jsx
``` 