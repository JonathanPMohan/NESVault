import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

// Get All Carts For CartList Table //
const getAllCarts = () => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/carts/`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Get Single MyCart By ID //
const getSingleCart = id => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/carts/${id}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Get Single MyCart By Click //
const getSingleCartClick = id => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/carts/${id}`)
    .then((result) => {
      const singleCart = result.data;
      singleCart.id = id;
      resolve(singleCart);
    })
    .catch(error => reject(error));
});

export default {
  getAllCarts,
  getSingleCart,
  getCurrentUid,
  getSingleCartClick,
};
