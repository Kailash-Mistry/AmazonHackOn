import React, { useEffect, useState } from 'react';

const Notification = ({ message, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Animate out and close after a delay
    const timer = setTimeout(() => {
      setVisible(false);
      // Allow time for animation before calling onClose
      setTimeout(onClose, 300); 
    }, duration); // Display for 4 seconds

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`max-w-sm w-full bg-gray-800 rounded-xl shadow-lg p-4 mb-4 transition-all duration-300 ease-in-out transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification; 