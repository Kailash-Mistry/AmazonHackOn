import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ClubCard({ club, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Image source={{ uri: club.image }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{club.name}</Text>
        <Text style={styles.members}>{club.members} members</Text>
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
  image: {
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
  members: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
}); 