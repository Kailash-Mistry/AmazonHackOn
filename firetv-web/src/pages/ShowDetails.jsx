import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import VideoPlayer from '../components/VideoPlayer';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import StreamModal from '../components/StreamModal';

const TABS = ['Chat', 'Polls', 'React'];
const VIDEO_SRC = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const ShowDetails = ({ playlists, onPlaylistManagement }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [tab, setTab] = useState('Chat');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
  const [isStreamModalOpen, setStreamModalOpen] = useState(false);
  const [showRoomCreatedMessage, setShowRoomCreatedMessage] = useState(false);

  useEffect(() => {
    fetch('/src/data/shows.json')
      .then(res => res.json())
      .then(data => setShow(data.find(s => s.id === id)));
  }, [id]);

  const handleCreateRoom = (roomCode) => {
    navigate(`/watch-party/${roomCode}`, { state: { show } });
  };

  const handleAgree = () => {
    setShowTermsModal(false);
    setShowConfirmationModal(true);
    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 2000); // Close after 2 seconds
  };

  if (!show) {
    return <div className="text-white p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          className="mb-8 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Image Column */}
          <div className="md:col-span-1">
            <img
              src={show.image}
              alt={show.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{show.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-lg">
              <span className="text-yellow-400 font-bold">★ {show.rating}</span>
              <span>{show.duration}</span>
              <span>{show.year}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {show.genres.map((g) => (
                <span key={g} className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white/80">{g}</span>
              ))}
            </div>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{show.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg transition-all flex-grow sm:flex-grow-0"
                onClick={() => setShowPlayer(true)}
              >
                Play Now
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all flex-grow sm:flex-grow-0"
                onClick={() => setStreamModalOpen(true)}
              >
                Stream Now
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all flex-grow sm:flex-grow-0"
                onClick={() => setPlaylistModalOpen(true)}
              >
                Add to Playlist
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all flex-grow sm:flex-grow-0"
                onClick={() => setShowTermsModal(true)}
              >
                Watch Privately
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showPlayer && <VideoPlayer src={VIDEO_SRC} onClose={() => setShowPlayer(false)} />}

      {isStreamModalOpen && (
        <StreamModal
          onClose={() => setStreamModalOpen(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}

      {showRoomCreatedMessage && (
        <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
          Room created successfully!
        </div>
      )}

      <AddToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        playlists={playlists}
        show={show}
        onDone={(...args) => {
          onPlaylistManagement(...args);
          setPlaylistModalOpen(false);
        }}
      />

      {/* Terms and Conditions Modal */}
      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Watching Privately</h2>
        <div className="text-gray-300 mb-6 space-y-4 text-left">
          <p className="text-base">When you watch privately:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
            <li>
              <span className="font-semibold text-gray-200"></span> Your activity won't appear on your profile or be shared with friends.
            </li>
            <li>
              <span className="font-semibold text-gray-200"></span> Your viewing won't affect your personalized recommendations.
            </li>
            <li>
              <span className="font-semibold text-gray-200"></span> Content you watch will be hidden from your public history.
            </li>
            <li>
              <span className="font-semibold text-gray-200"></span> Features like chat and reactions are turned off.
            </li>
          </ul>
          <p className="text-xs text-gray-500 pt-2">
            Note: This mode enhances privacy but does not make you anonymous. Activity may still be logged for internal analytics.
          </p>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-600"
          />
          <label htmlFor="terms" className="ml-2 text-gray-300">
            I have read and understood all the instructions.
          </label>
        </div>
        <button
          onClick={handleAgree}
          disabled={!termsAccepted}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
        >
          Agree
        </button>
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Watching Privately</h2>
          <p className="text-gray-300">You are now watching privately.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowDetails; 