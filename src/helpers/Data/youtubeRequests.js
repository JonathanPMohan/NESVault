import axios from 'axios';
import apiKeys from '../apiKeys';

const youtubeKey = apiKeys.youTubeConfig.apiKey;

const getVideos = searchValue => axios.get('https://www.googleapis.com/youtube/v3/search', {
  params: {
    part: 'snippet',
    maxResults: 5,
    key: youtubeKey,
    q: searchValue,
  },
});

export default { getVideos };
