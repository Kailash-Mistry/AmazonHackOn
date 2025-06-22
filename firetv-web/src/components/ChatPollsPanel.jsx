import React, { useState } from 'react';


const TABS = ['Chat', 'Polls', 'Participants'];

const ChatPollsPanel = ({ onCollapse, participants, chatMessages, notificationsOn, onToggleNotifications }) => {
  const [activeTab, setActiveTab] = useState('Chat');

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-full relative">
      {/* Header Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <button
          onClick={onToggleNotifications}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-colors"
          title={notificationsOn ? "Mute Notifications" : "Unmute Notifications"}
        >
          {notificationsOn ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341" />
            </svg>
          )}
        </button>
        <button 
          onClick={onCollapse}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg"
          title="Collapse Panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 p-2 border-b border-gray-800">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'Chat' && (
          <div className="space-y-4">
            {chatMessages.length === 0 ? (
              <p className="text-gray-400">Live chat coming soon!</p>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                    {msg.user.charAt(0)}
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="font-bold text-white text-sm">{msg.user}</p>
                    <p className="text-gray-300">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'Polls' && (
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">What do you wanna do?</h3>
            <div className="space-y-3">
              {/* Option 1: Continue */}
              <div className="border border-purple-300 rounded-lg p-3 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-purple-200 rounded-lg"
                  style={{ width: '50%' }}
                ></div>
                <div className="relative flex justify-between items-center">
                  <span className="font-semibold text-purple-800">50%</span>
                  <span className="text-gray-700">Continue</span>
                </div>
              </div>
              {/* Option 2: Replay */}
              <div className="border border-purple-300 rounded-lg p-3 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-purple-200 rounded-lg"
                  style={{ width: '50%' }}
                ></div>
                <div className="relative flex justify-between items-center">
                  <span className="font-semibold text-purple-800">50%</span>
                  <span className="text-gray-700">Replay ✓</span>
                </div>
              </div>
              {/* Option 3: Skip */}
              <div className="border border-purple-300 rounded-lg p-3 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-purple-200 rounded-lg"
                  style={{ width: '0%' }}
                ></div>
                <div className="relative flex justify-between items-center">
                  <span className="font-semibold text-purple-800">0%</span>
                  <span className="text-gray-700">Skip</span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">Voted by Malti and John</p>
          </div>
        )}
        {activeTab === 'Participants' && (
          <div>
            {participants.length === 0 ? (
              <p className="text-gray-400">No one else has joined yet.</p>
            ) : (
              <ul className="space-y-3">
                {participants.map((participant, index) => (
                  <li key={index} className="flex items-center gap-3 bg-gray-800 p-2 rounded-lg">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-white">{participant}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPollsPanel; 