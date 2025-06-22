import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function VideoCard({ video }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MovieDetail', { movie: video });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        {video.isLive && (
          <View style={styles.liveContainer}>
            <Text style={styles.live}>LIVE</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{video.title}</Text>
        <Text style={styles.channel}>{video.channel}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="eye" size={14} color="#FF6F00" />
          <Text style={styles.meta}>{video.views} views</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.meta}>{video.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginRight: 16,
    width: 150,
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  info: {
    marginTop: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  channel: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  meta: {
    color: '#FF6F00',
    fontSize: 12,
    marginLeft: 4,
  },
  metaDot: {
    color: '#FF6F00',
    fontSize: 12,
    marginHorizontal: 4,
  },
  liveContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  live: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
}); 