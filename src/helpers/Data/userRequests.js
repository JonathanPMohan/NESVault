import axios from 'axios';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getUserByFbId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/Users/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
});

const createUser = newUser => new Promise((resolve, reject) => {
  axios
    .post(`${nesVaultApiBaseUrl}/api/Users/`, newUser)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => console.error('Error creating user', error));
});

const updateUser = newUser => new Promise((resolve, reject) => {
  console.log(newUser);
  axios
    .put(`${nesVaultApiBaseUrl}/api/Users/${newUser.id}`, newUser)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => console.error('Error updating user', error));
});

const deleteUser = userId => new Promise((resolve, reject) => {
  axios
    .delete(`${nesVaultApiBaseUrl}/api/Users/${userId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => console.error('Error deleting user'));
});

export default {
  getUserByFbId,
  createUser,
  updateUser,
  deleteUser,
};
