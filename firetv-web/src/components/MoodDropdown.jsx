import React from 'react';
import { MOOD_OPTIONS, MOOD_PHRASES } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';

const MoodDropdown = ({ 
  isOpen, 
  moodInput, 
  loading, 
  onInputChange, 
  onSubmit, 
  onMoodBtn, 
  onClose,
  dropdownRef 
}) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-[440px] max-w-[95vw] bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-50 p-6 flex flex-col gap-4"
      style={{ top: '110%' }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-white">How are you feeling today?</h2>
        <button
          className="text-gray-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Close mood selector"
        >
          &times;
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {MOOD_OPTIONS.map((m) => (
          <button
            key={m.value}
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${m.color} ${moodInput === MOOD_PHRASES[m.value] ? 'ring-2 ring-orange-400' : ''}`}
            onClick={() => onMoodBtn(m.value)}
            type="button"
            disabled={loading}
          >
            {m.label}
          </button>
        ))}
      </div>
      
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-400 min-w-0"
          placeholder="Tell me what you're in the mood for... (e.g., 'something light and funny')"
          value={moodInput}
          onChange={onInputChange}
          autoFocus
          disabled={loading}
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center disabled:opacity-60"
          aria-label="Send mood input"
          disabled={loading || !moodInput.trim()}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-6-6 18-2-8-8-2z" />
            </svg>
          )}
        </button>
      </form>
      
      <div className="text-xs text-gray-400 text-center mt-2">
        AI-powered mood detection using natural language processing
      </div>
    </div>
  );
};

export default MoodDropdown; 