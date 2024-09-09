// components/YouTubeEmbed.tsx
import React from 'react';
import YouTube from 'react-youtube';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '315px' }}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubeEmbed;
