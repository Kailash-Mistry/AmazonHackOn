import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

const AddToStoriesModal = ({ isOpen, onClose, timestamp, onSubmit }) => {
  const [duration, setDuration] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ timestamp, duration });
    onClose();
  };
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-center">Add to Story</h2>
      
      <div className="mb-4">
        <label htmlFor="timestamp" className="block text-sm font-medium text-gray-400 mb-1">
          Timestamp
        </label>
        <input
          type="text"
          id="timestamp"
          value={formatTime(timestamp)}
          readOnly
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Duration
        </label>
        <div className="flex justify-around">
          {[5, 15, 30].map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                duration === d 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-all"
      >
        Done
      </button>
    </Modal>
  );
};

const VideoPlayer = ({ src, onClose }) => {
  const videoRef = useRef(null);
  const [isStoriesModalOpen, setStoriesModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pausedTimestamp, setPausedTimestamp] = useState(0);

  // Effect for handling keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isStoriesModalOpen && !showConfirmation) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isStoriesModalOpen, showConfirmation]);
  
  // Effect to auto-play on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.warn("Autoplay prevented:", error));
    }
  }, []);

  const handleAddToStoriesClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPausedTimestamp(videoRef.current.currentTime);
      setStoriesModalOpen(true);
    }
  };

  const handleStorySubmit = (storyData) => {
    console.log("Story data:", storyData);
    setStoriesModalOpen(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50 p-4">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-4xl hover:text-orange-400 transition-colors z-[60]"
        aria-label="Close Player"
      >
        &times;
      </button>
      
      <div className="w-full h-full max-w-4xl max-h-[80vh] flex justify-center items-center relative">
        <video 
          ref={videoRef} 
          src={src} 
          controls 
          controlsList="nodownload" 
          className="w-full h-full rounded-lg" 
        />
      </div>

      <div className="mt-4">
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all text-base"
          onClick={handleAddToStoriesClick}
        >
          Add to Stories
        </button>
      </div>

      <AddToStoriesModal 
        isOpen={isStoriesModalOpen}
        onClose={() => setStoriesModalOpen(false)}
        timestamp={pausedTimestamp}
        onSubmit={handleStorySubmit}
      />
      
      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-white">Added to Stories!</h2>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPlayer; 