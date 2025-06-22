import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { currentUser } from '../../database/staticData';

const MovieListModal = ({ visible, onClose, movies }) => {
  const [watchlist, setWatchlist] = useState(currentUser.watchlist);

  const handleToggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Movies in this Club</Text>
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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1A093E',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
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
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FF6F00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieListModal; 