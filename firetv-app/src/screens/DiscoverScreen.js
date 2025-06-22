import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { users } from '../../database/staticData';
import UserCard from '../components/UserCard';

export default function DiscoverScreen() {
  const [suggested, setSuggested] = useState(users.slice(0, 3));

  const loadMore = () => {
    setSuggested(users);
  };

  const handleFollow = (user) => {
    // For demo, just alert
    alert(`Followed ${user.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover People</Text>
      <FlatList
        data={suggested}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserCard user={item} onFollow={() => handleFollow(item)} />
        )}
        contentContainerStyle={styles.list}
      />
      {suggested.length < users.length && (
        <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load More Suggestions</Text>
        </TouchableOpacity>
      )}
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
  list: {
    paddingBottom: 16,
  },
  loadMoreBtn: {
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 