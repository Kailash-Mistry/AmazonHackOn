import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { currentUser } from '../../database/staticData';
import { trendingVideos, popularTomCruise } from '../../database/staticData';

const allMovies = [...trendingVideos, ...popularTomCruise];

export default function PlaylistDetailScreen({ route }) {
  const { title, movieIds } = route.params;
  // Only keep movies that match the ids
  const movies = allMovies.filter(m => movieIds.includes(m.id));
  // Default: only those already in currentUser.watchlist are toggled on
  const [watchlist, setWatchlist] = useState(currentUser.watchlist);

  const handleToggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.cardThumbnail} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>{item.plot}</Text>
            </View>
            <TouchableOpacity
              style={[styles.watchlistButton, watchlist.includes(item.id) && styles.watchlistedButton]}
              onPress={() => handleToggleWatchlist(item.id)}
            >
              <Text style={styles.watchlistButtonText}>
                {watchlist.includes(item.id) ? 'Remove' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#2D1457',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardThumbnail: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
  watchlistButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  watchlistedButton: {
    backgroundColor: '#888',
  },
  watchlistButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 