import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { currentUser, trendingVideos, popularTomCruise } from '../../database/staticData';

const allMovies = [...trendingVideos, ...popularTomCruise];

const WatchlistCard = ({ movie, onToggleWatchlist, isWatchlisted }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: movie.thumbnail }} style={styles.cardThumbnail} />
    <View style={styles.cardDetails}>
      <Text style={styles.cardTitle}>{movie.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{movie.plot}</Text>
    </View>
    <TouchableOpacity onPress={() => onToggleWatchlist(movie.id)} style={styles.watchlistButton}>
      <Text style={styles.watchlistButtonText}>{isWatchlisted ? 'Remove' : 'Add'}</Text>
    </TouchableOpacity>
  </View>
);

const ProfileScreen = () => {
  const { name, avatar, bio, followers, following } = currentUser;
  const [watchlist, setWatchlist] = useState(
    allMovies.filter(movie => currentUser.watchlist.includes(movie.id))
  );

  const handleToggleWatchlist = (movieId) => {
    setWatchlist(prevWatchlist => {
      const isWatchlisted = prevWatchlist.some(movie => movie.id === movieId);
      if (isWatchlisted) {
        return prevWatchlist.filter(movie => movie.id !== movieId);
      } else {
        const movieToAdd = allMovies.find(movie => movie.id === movieId);
        return movieToAdd ? [...prevWatchlist, movieToAdd] : prevWatchlist;
      }
    });
  };

  const renderStat = (value, label) => (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.statsContainer}>
          {renderStat(watchlist.length, 'Watchlist')}
          {renderStat(followers, 'Followers')}
          {renderStat(following, 'Following')}
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.watchlistTitle}>Watchlist</Text>
      <FlatList
        data={watchlist}
        renderItem={({ item }) => (
          <WatchlistCard
            movie={item}
            onToggleWatchlist={handleToggleWatchlist}
            isWatchlisted={true}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bio: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  divider: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  watchlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#2D1457',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  cardThumbnail: {
    width: 80,
    height: 120,
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
  watchlistButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 