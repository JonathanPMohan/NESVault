import axios from 'axios';
import apiKeys from '../apiKeys';

const { apiKey } = apiKeys.youTubeConfig.apiKey;

const getVideos = searchValue => axios.get('https://www.googleapis.com/youtube/v3/search', {
  params: {
    part: 'snippet',
    maxResults: 5,
    key: apiKey,
    q: searchValue,
  },
});

export default { getVideos };
