import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ClubCard from './ClubCard';
import VideoCard from './VideoCard';
import UserCard from './UserCard';
import ArtistCard from './ArtistCard';
import { useNavigation } from '@react-navigation/native';
import { trendingVideos, popularTomCruise } from '../../database/staticData';

const allMovies = [...trendingVideos, ...popularTomCruise];

const HorizontalSection = ({ title, data, type }) => {
  const navigation = useNavigation();

  const handleClubPress = (club) => {
    navigation.navigate('PlaylistDetail', {
      title: club.name,
      movieIds: club.movies || [],
    });
  };

  const renderItem = ({ item }) => {
    switch (type) {
      case 'club':
        return <ClubCard club={item} onPress={() => handleClubPress(item)} />;
      case 'video':
        return <VideoCard video={item} />;
      case 'user':
        return <UserCard user={item} />;
      case 'artist':
        return <ArtistCard user={item} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    marginLeft: 4,
  },
  horizontalList: {
    paddingLeft: 4,
  },
});

export default HorizontalSection; 