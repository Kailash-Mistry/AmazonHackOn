import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { chatMessages as initialMessages, currentUser, users } from '../../database/staticData';

const allUsers = [...users, currentUser];
const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉', '💯'];

const getSenderInfo = (senderId) => {
  return allUsers.find(u => u.id === senderId) || { name: 'Unknown User' };
};

const PollMessage = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = (optionId) => {
    if (selectedOption === optionId) {
      // User is changing their vote back
      setSelectedOption(null);
      onVote(poll.id, optionId, -1);
    } else {
      let voteChange = 1;
      if (selectedOption) {
        // User is changing from another vote
        onVote(poll.id, selectedOption, -1);
      }
      setSelectedOption(optionId);
      onVote(poll.id, optionId, voteChange);
    }
  };

  const isMyPoll = poll.sender === currentUser.id;
  const senderInfo = getSenderInfo(poll.sender);

  return (
    <View style={[styles.messageWrapper, isMyPoll ? styles.myMessageWrapper : styles.theirMessageWrapper]}>
      {!isMyPoll && <Text style={styles.senderName}>{senderInfo.name}</Text>}
      <View style={[styles.pollContainer, isMyPoll ? styles.myPoll : styles.theirPoll]}>
        <Text style={styles.pollQuestion}>{poll.question}</Text>
        {poll.options.map(option => (
          <TouchableOpacity key={option.id} onPress={() => handleVote(option.id)} style={styles.pollOption}>
            <Text style={styles.pollOptionText}>{option.text}</Text>
            <View style={styles.voteBarContainer}>
              <View style={[styles.voteBar, { width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%` }]} />
              <Text style={styles.voteCount}>{option.votes}</Text>
            </View>
            {selectedOption === option.id && <Ionicons name="checkmark-circle" size={24} color={isMyPoll ? '#fff' : '#FF6F00'} style={styles.checkmark} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const Message = ({ item, onVote }) => {
  if (item.type === 'poll') {
    return <PollMessage poll={item} onVote={onVote} />;
  }
  const isEmoji = item.type === 'emoji';
  const isMyMessage = item.sender === currentUser.id;
  const senderInfo = getSenderInfo(item.sender);
  
  return (
    <View style={[styles.messageWrapper, isMyMessage ? styles.myMessageWrapper : styles.theirMessageWrapper]}>
       {!isMyMessage && <Text style={styles.senderName}>{senderInfo.name}</Text>}
      <View style={[
        styles.messageBubble,
        isMyMessage ? styles.myMessage : styles.theirMessage,
        isEmoji && styles.emojiMessage
      ]}>
        <Text style={[styles.messageText, isEmoji && styles.emojiText]}>{item.text}</Text>
      </View>
    </View>
  );
};

const PollCreationModal = ({ visible, onClose, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (question.trim() === '' || options.some(opt => opt.trim() === '')) {
      Alert.alert('Incomplete Poll', 'Please fill out the question and all options.');
      return;
    }
    onSubmit(question, options);
    setQuestion('');
    setOptions(['', '']);
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
          <Text style={styles.modalTitle}>Create a Poll</Text>
          <TextInput
            style={styles.pollInput}
            placeholder="Poll Question"
            value={question}
            onChangeText={setQuestion}
          />
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={styles.pollInput}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
          ))}
          <TouchableOpacity style={styles.addOptionButton} onPress={handleAddOption}>
            <Text style={styles.addOptionText}>Add Option</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Poll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function ChatScreen() {
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [pollModalVisible, setPollModalVisible] = useState(false);

  const handleVote = (pollId, optionId, voteChange) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === pollId && msg.type === 'poll') {
          return {
            ...msg,
            options: msg.options.map(opt =>
              opt.id === optionId ? { ...opt, votes: opt.votes + voteChange } : opt
            ),
          };
        }
        return msg;
      })
    );
  };

  const handleSend = (content, type = 'text') => {
    if (typeof content === 'string' && content.trim() === '') {
      return;
    }

    let messageToSend;
    if (type === 'poll') {
      messageToSend = {
        id: `poll${Date.now()}`,
        type: 'poll',
        sender: currentUser.id,
        question: content.question,
        options: content.options.map((opt, index) => ({ id: `opt${index}`, text: opt, votes: 0 })),
      };
    } else {
      messageToSend = {
        id: (messages.length + 1).toString(),
        text: content,
        sender: currentUser.id,
        type,
      };
    }

    setMessages([...messages, messageToSend]);

    if (type === 'text') {
      setNewMessage('');
    }
  };

  const onEmojiSelect = (emoji) => {
    handleSend(emoji, 'emoji');
    setShowEmojis(false);
  };

  const handleCreatePoll = (question, options) => {
    handleSend({ question, options }, 'poll');
    setPollModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Message item={item} onVote={handleVote} />}
        contentContainerStyle={styles.messageList}
      />
      <PollCreationModal
        visible={pollModalVisible}
        onClose={() => setPollModalVisible(false)}
        onSubmit={handleCreatePoll}
      />
      <View style={styles.inputArea}>
        {showEmojis && (
          <View style={styles.emojiBar}>
            {EMOJIS.map(emoji => (
              <TouchableOpacity key={emoji} onPress={() => onEmojiSelect(emoji)}>
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiButton} onPress={() => setShowEmojis(!showEmojis)}>
            <Ionicons name="happy-outline" size={24} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pollButton} onPress={() => setPollModalVisible(true)}>
            <Ionicons name="stats-chart" size={24} color="#888" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend(newMessage, 'text')}>
            <Ionicons name="send" size={24} color="#FF6F00" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A093E',
  },
  messageList: {
    padding: 10,
  },
  messageWrapper: {
    marginBottom: 10,
  },
  myMessageWrapper: {
    alignItems: 'flex-end',
  },
  theirMessageWrapper: {
    alignItems: 'flex-start',
  },
  senderName: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 2,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#FF6F00',
  },
  theirMessage: {
    backgroundColor: '#2D1457',
  },
  messageText: {
    color: '#fff',
  },
  emojiMessage: {
    backgroundColor: 'transparent',
  },
  emojiText: {
    fontSize: 40,
  },
  inputArea: {
    borderTopWidth: 1,
    borderColor: '#2D1457',
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#2D1457',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    marginLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  emojiBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#2D1457',
  },
  emoji: {
    fontSize: 28,
  },
  pollContainer: {
    borderRadius: 15,
    padding: 15,
    maxWidth: '80%',
  },
  myPoll: {
    backgroundColor: '#FF6F00',
  },
  theirPoll: {
    backgroundColor: '#2D1457',
  },
  pollQuestion: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pollOption: {
    backgroundColor: '#1A093E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pollOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  voteBarContainer: {
    height: 20,
    width: '40%',
    backgroundColor: '#444',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  voteBar: {
    height: '100%',
    backgroundColor: '#FF6F00',
  },
  voteCount: {
    position: 'absolute',
    right: 5,
    color: '#fff',
    fontSize: 12,
  },
  checkmark: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1A093E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  pollInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#2D1457',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 10,
  },
  addOptionButton: {
    padding: 10,
  },
  addOptionText: {
    color: '#FF6F00',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: '#888',
  },
}); 