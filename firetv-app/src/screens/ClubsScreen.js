import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { users } from '../../database/staticData';
import UserCard from '../components/UserCard';

export default function ClubsScreen() {
  const [tab, setTab] = useState('Following');

  // For demo, split users into following/followers
  const following = users.slice(3); // Alice, Bob, Carol, David
  const followers = users.slice(0, 3); // Emma, Mike, Jordan

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends & Followers</Text>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Following' && styles.activeTab]}
          onPress={() => setTab('Following')}
        >
          <Text style={[styles.tabText, tab === 'Following' && styles.activeTabText]}>Following ({following.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Followers' && styles.activeTab]}
          onPress={() => setTab('Followers')}
        >
          <Text style={[styles.tabText, tab === 'Followers' && styles.activeTabText]}>Followers ({followers.length})</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tab === 'Following' ? following : followers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#2D1457',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6F00',
  },
  tabText: {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  list: {
    paddingBottom: 32,
  },
}); 