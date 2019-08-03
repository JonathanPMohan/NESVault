import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

// Get All MyCarts For Collection Page //
const getAllMyCarts = userDbId => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/mycarts/mycollection/${userDbId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Get Single MyCart By ID //
const getSingleMyCart = id => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/mycarts/${id}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getSingleNesCartClick = id => axios.get(`${nesVaultApiBaseUrl}/api/mycarts/${id}`);

// Create MyCart Call //
const createMyCart = newMyCart => new Promise((resolve, reject) => axios
  .post(`${nesVaultApiBaseUrl}/api/mycarts/`, newMyCart)
  .then((result) => {
    resolve(result.data);
  })
  .catch(error => reject(error)));

// Edit MyCart Call //
const editMyCart = (id, myCart) => new Promise((resolve, reject) => {
  axios
    .put(`${nesVaultApiBaseUrl}/api/mycarts/update/${id}`, myCart)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const deleteMyCartFromCollection = myCartId => axios.delete(`${nesVaultApiBaseUrl}/api/mycarts/delete/${myCartId}`);

export default {
  getAllMyCarts,
  getSingleMyCart,
  createMyCart,
  editMyCart,
  deleteMyCartFromCollection,
  getCurrentUid,
  getSingleNesCartClick,
};
