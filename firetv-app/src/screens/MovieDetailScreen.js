import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    // In a real app, you would also update this in your backend or local storage
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.thumbnail }} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.channel}>{movie.channel}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Genre: {movie.genre}</Text>
          <Text style={styles.metaText}>Rating: {movie.rating}/5</Text>
        </View>
        <TouchableOpacity style={styles.watchlistButton} onPress={toggleWatchlist}>
          <Text style={styles.watchlistButtonText}>
            {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plot</Text>
          <Text style={styles.sectionContent}>{movie.plot}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actors</Text>
          <Text style={styles.sectionContent}>{movie.actors.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.sectionContent}>{movie.director}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
  },
  thumbnail: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  channel: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metaText: {
    fontSize: 14,
    color: '#ccc',
  },
  watchlistButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  watchlistButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
  },
});

export default MovieDetailScreen; 