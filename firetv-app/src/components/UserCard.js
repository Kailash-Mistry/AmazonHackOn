import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function UserCard({ user, onFollow }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.meta}>{user.meta}</Text>
      </View>
      <TouchableOpacity style={styles.followBtn} onPress={onFollow}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2D1457',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    color: '#bbb',
    fontSize: 13,
  },
  meta: {
    color: '#FF6F00',
    fontSize: 12,
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  followText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 