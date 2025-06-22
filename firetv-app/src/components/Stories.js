import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';

const StoryItem = ({ story, onStoryPress }) => (
  <TouchableOpacity style={styles.storyContainer} onPress={() => onStoryPress(story)}>
    <View style={[styles.avatarContainer, story.isCurrentUser && styles.currentUserRing]}>
      <Image source={{ uri: story.avatar }} style={styles.avatar} />
    </View>
    <Text style={styles.username}>{story.username}</Text>
  </TouchableOpacity>
);

const FullScreenStory = ({ story, onClose }) => {
  const stockVideoURI = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const player = useVideoPlayer(stockVideoURI, (player) => {
    player.loop = true;
    player.play();
  });
  const progress = useRef(new Animated.Value(0)).current;

  const [isLiked, setIsLiked] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });

    return () => {
      progress.stopAnimation();
    };
  }, [player, progress, onClose]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleWatchlistToggle = () => {
    setIsWatchlisted(!isWatchlisted);
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
      <View style={styles.storyHeader}>
        <View>
          <Text style={styles.storyUsername}>{story.username}</Text>
          <Text style={styles.movieTitle}>{story.movieTitle}</Text>
        </View>
        <TouchableOpacity style={[styles.watchlistButton, isWatchlisted && styles.watchlistedButton]} onPress={handleWatchlistToggle}>
          <Text style={styles.watchlistText}>{isWatchlisted ? '✓ Added' : '+ Watchlist'}</Text>
        </TouchableOpacity>
      </View>
      <VideoView
        player={player}
        style={styles.fullScreenVideo}
        nativeControls={false}
        contentFit="cover"
      />
      <View style={styles.bottomControls}>
        {story.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>{story.caption}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={30} color={isLiked ? "#E84178" : "#fff"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default function Stories({ stories }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleStoryPress = (story) => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <StoryItem story={item} onStoryPress={handleStoryPress} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
      />
      {selectedStory && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={handleClose}
        >
          <FullScreenStory story={selectedStory} onClose={handleClose} />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  storiesList: {
    paddingLeft: 4,
    paddingVertical: 8,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E84178',
  },
  currentUserRing: {
    borderColor: '#4A4A4A', 
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1A093E', 
  },
  username: {
    color: '#fff',
    marginTop: 6,
    fontSize: 12,
    maxWidth: 70,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 90,
    right: 20,
    padding: 10,
    zIndex: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 3,
    width: '95%',
    backgroundColor: 'grey',
    borderRadius: 5,
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
    zIndex: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E84178',
    borderRadius: 5,
  },
  storyHeader: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  storyUsername: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
  },
  watchlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  watchlistedButton: {
    backgroundColor: '#FF6F00',
  },
  watchlistText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  captionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeButton: {
    padding: 10,
  },
}); 