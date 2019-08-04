import React from 'react';

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div />;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div className="video-display">
      <div className="text-center">
        <iframe
          src={videoSrc}
          width="900"
          height="500"
          className="youtube-video"
          allowFullScreen
          title="Video player"
        />
      </div>
      <div className="segment">
        <b>
          <h1 className="header text-center">{video.snippet.title}</h1>
        </b>
        <h6 className="video-description text-center">{video.snippet.description}</h6>
      </div>
    </div>
  );
};

export default VideoDetail;
