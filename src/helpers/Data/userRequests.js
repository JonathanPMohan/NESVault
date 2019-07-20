import axios from 'axios';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getUserByFbId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/Users/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default {
  getUserByFbId,
};
