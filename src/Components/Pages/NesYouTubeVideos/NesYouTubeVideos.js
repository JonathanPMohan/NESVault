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
        <VideoSearch handleFormSubmit={this.handleSubmit} />
        <div className="w-100 mx-auto">
          <div className="mt-3 mx-auto">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="animated fadeIn">
            <VideoList handleVideoSelect={this.handleVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    );
  }
}

export default NesYouTubeVideos;
