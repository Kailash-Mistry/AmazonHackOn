import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  clubs,
  trendingVideos,
  stories,
  recommendedForYou,
  hotHits,
  moreOfWhatYouLike,
  popularTomCruise,
  topPicksByFriends,
  yourFavouriteArtists,
} from '../../database/staticData';
import Stories from '../components/Stories';
import HorizontalSection from '../components/HorizontalSection';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Stories stories={stories} />
      <HorizontalSection title="Content Clubs" data={clubs} type="club" />
      <HorizontalSection title="Top picks by your Friends" data={topPicksByFriends} type="video" />
      <HorizontalSection title="Trending Now" data={trendingVideos} type="video" />
      <HorizontalSection title="Recommended for You" data={recommendedForYou} type="video" />
      <HorizontalSection title="Hot Hits" data={hotHits} type="video" />
      <HorizontalSection title="More of What You Like" data={moreOfWhatYouLike} type="club" />
      <HorizontalSection title="Popular on Tom Cruise" data={popularTomCruise} type="video" />
      <HorizontalSection title="Your Favourite Artists" data={yourFavouriteArtists} type="artist" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
}); 