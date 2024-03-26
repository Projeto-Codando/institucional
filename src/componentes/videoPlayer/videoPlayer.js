import React, { useRef, useState } from 'react';
import './videoPlayer.css';
import videoSrc from '../../assets/video.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setOverlayVisible(false);
    }
  };

  return (
    <div className="video-player">
      <video ref={videoRef} className="video" controls>
        <source src={videoSrc} type="video/mp4" />
      </video>
      {overlayVisible && (
        <div className="overlay" onClick={handlePlay}>
          <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: "90px" }} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;

