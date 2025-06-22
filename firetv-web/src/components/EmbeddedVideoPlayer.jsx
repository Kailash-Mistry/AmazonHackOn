import React, { useEffect, useRef } from 'react';

const EmbeddedVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay prevented:", error);
      });
    }
  }, [src]);

  return (
    <div className="w-full h-full">
      <video 
        ref={videoRef} 
        src={src} 
        controls 
        controlsList="nodownload" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default EmbeddedVideoPlayer; 