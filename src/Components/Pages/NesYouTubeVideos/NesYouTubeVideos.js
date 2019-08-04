import React from 'react';
import VideoSearch from '../../VideoSearch/VideoSearch';
import VideoList from '../../VideoList/VideoList';
import VideoDetail from '../../VideoDetail/VideoDetail';
import youtubeRequests from '../../../helpers/Data/youtubeRequests';

import './NesYouTubeVideos.scss';

class NesYouTubeVideos extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  handleSubmit = async (searchValue) => {
    const response = await youtubeRequests.getVideos(searchValue);
    this.setState({ videos: response.data.items, selectedVideo: null });
  };

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const { selectedVideo } = this.state;

    const videos = [...this.state.videos];

    return (
      <div className="nes-youtube-container animated fadeIn">
        <div className="w-100 mx-auto">
          <div className="mx-auto" />
          <div className="video-list animated fadeIn">
            <h1>Search Videos On Your Favorite Games!</h1>
            <VideoSearch handleFormSubmit={this.handleSubmit} />
            <VideoDetail video={selectedVideo} />
            <div className="video-list-wrapper">
              <VideoList handleVideoSelect={this.handleVideoSelect} videos={videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NesYouTubeVideos;
