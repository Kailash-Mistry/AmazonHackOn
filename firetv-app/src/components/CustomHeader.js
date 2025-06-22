import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const EnterIdModal = ({ visible, onClose, onSubmit }) => {
  const [id, setId] = useState('');

  const handleSubmit = () => {
    if (id.trim().length > 0) {
      onSubmit(id);
    } else {
      Alert.alert('Invalid ID', 'Please enter a valid ID.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Your ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ID"
            placeholderTextColor="#888"
            onChangeText={setId}
            value={id}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButtonModal} onPress={onClose}>
            <Text style={styles.closeButtonTextModal}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function CustomHeader() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const handleTvIconPress = () => {
    setModalVisible(true);
  };

  const handleIdSubmit = (id) => {
    setModalVisible(false);
    navigation.navigate('Chat');
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Fire TV</Text>
        <View style={styles.rightButtons}>
          {route.name !== 'Chat' && (
            <TouchableOpacity onPress={handleTvIconPress} style={styles.button}>
              <Ionicons name="tv-outline" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <EnterIdModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleIdSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A093E',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    padding: 5,
  },
  rightButtons: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonModal: {
    marginTop: 10,
  },
  closeButtonTextModal: {
    color: '#FF6F00',
  },
}); 