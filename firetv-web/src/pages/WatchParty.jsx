import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import EmbeddedVideoPlayer from '../components/EmbeddedVideoPlayer';
import ChatPollsPanel from '../components/ChatPollsPanel';
import Notification from '../components/Notification';

const VIDEO_SRC = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const WatchParty = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state || {};
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [joinNotifications, setJoinNotifications] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [notificationsOn, setNotificationsOn] = useState(true);

  useEffect(() => {
    const notificationTimer1 = setTimeout(() => {
      addNotification('Malti has joined the room');
    }, 10000); // 10 seconds

    const notificationTimer2 = setTimeout(() => {
      addNotification('John has joined the room');
    }, 15000); // 15 seconds

    const chatTimer1 = setTimeout(() => {
      addChatMessage({ user: 'Malti', text: 'Hey' });
    }, 30000); // 30 seconds

    const chatTimer2 = setTimeout(() => {
      addChatMessage({ user: 'John', text: 'This is my favorite show!' });
    }, 35000); // 35 seconds

    return () => {
      clearTimeout(notificationTimer1);
      clearTimeout(notificationTimer2);
      clearTimeout(chatTimer1);
      clearTimeout(chatTimer2);
    };
  }, []);

  const handleToggleNotifications = () => {
    setNotificationsOn(prev => {
      const newState = !prev;
      if (!newState) {
        addSystemNotification("Notifications turned Off");
      } else {
        addSystemNotification("Notifications turned On");
      }
      return newState;
    });
  };

  const addSystemNotification = (message) => {
    const id = Date.now();
    setSystemNotifications([{ id, message, type: 'system' }]);
  };

  const addNotification = (message) => {
    if (notificationsOn) {
      const id = Date.now();
      setJoinNotifications(prev => [...prev, { id, message, type: 'join' }]);
    }
    
    if (message.includes(' has joined the room')) {
      const name = message.split(' ')[0];
      setParticipants(prev => [...prev, name]);
    }
  };

  const addChatMessage = (message) => {
    setChatMessages(prev => [...prev, message]);
  };

  const removeJoinNotification = (id) => {
    setJoinNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const removeSystemNotification = (id) => {
    setSystemNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!show) {
    // Redirect or show an error if show data is not available
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Error: Show information is missing.</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white p-4 lg:p-8 gap-8 relative">
      {/* Notification Container */}
      <div className="fixed top-24 right-8 z-50">
        {joinNotifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => removeJoinNotification(notification.id)}
          />
        ))}
        {systemNotifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => removeSystemNotification(notification.id)}
            duration={3000}
          />
        ))}
      </div>
      {/* Left Column: Player and Room Info */}
      <div className={`flex-1 flex flex-col gap-6 transition-all duration-500 ${isPanelCollapsed ? 'w-full' : 'lg:w-[calc(100%-412px)]'}`}>
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          <EmbeddedVideoPlayer src={VIDEO_SRC} />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Room ID</h2>
            <p className="text-2xl font-mono text-orange-400 tracking-wider">{roomId}</p>
          </div>
        </div>
      </div>

      {/* Right Column: Chat and Polls */}
      <div className={`transition-all duration-500 ${isPanelCollapsed ? 'w-0' : 'w-full lg:w-[380px]'}`}>
        {!isPanelCollapsed && (
          <ChatPollsPanel 
            onCollapse={() => setIsPanelCollapsed(true)} 
            participants={participants}
            chatMessages={chatMessages}
            notificationsOn={notificationsOn}
            onToggleNotifications={handleToggleNotifications}
          />
        )}
      </div>

      {isPanelCollapsed && (
        <button
          onClick={() => setIsPanelCollapsed(false)}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 hover:bg-orange-500 text-white p-3 rounded-l-lg shadow-lg z-20"
          title="Show Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default WatchParty; 