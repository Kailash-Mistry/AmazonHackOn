import React, { useState } from 'react';

const JoinRoomModal = ({ onClose, onJoin }) => {
    const [roomId, setRoomId] = useState('');

    const handleJoin = (e) => {
        e.preventDefault();
        if (roomId.trim()) {
            onJoin(roomId);
        }
    };

    return (
        <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
            <form onSubmit={handleJoin} className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">Join a Watch Party</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                <p className="text-gray-300 mb-4 text-sm">Enter the ID to join the room and watch with your friends.</p>
                <div className="flex">
                    <input
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                        className="bg-gray-700 text-white p-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        pattern="\d*"
                        title="Please enter only digits."
                    />
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded-r-md">
                        Join Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinRoomModal; 