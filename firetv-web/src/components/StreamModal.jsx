import React, { useState, useCallback } from 'react';

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const StreamModal = ({ onClose, onCreateRoom }) => {
  const [roomCode, setRoomCode] = useState(generateRoomCode());

  const handleCreateRoom = useCallback(() => {
    onCreateRoom(roomCode);
    onClose();
  }, [roomCode, onClose, onCreateRoom]);

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Create a Watch Party</h2>
        <p className="text-gray-400 mb-6">Read out or message this code to friends so they can join your room.</p>
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-gray-800 border border-dashed border-gray-600 rounded-lg px-6 py-4 text-3xl font-mono tracking-widest text-orange-400">
            {roomCode}
          </div>
          
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleCreateRoom}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all text-lg"
          >
            Create & Join Room
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamModal; 