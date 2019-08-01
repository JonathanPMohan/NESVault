import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

// GET MY WISH LIST FOR WISH LIST PAGE //
const getMyWishList = userDbId => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/wishlist/${userDbId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Create Wishlist Cart Call //
const createMyWishListCart = newMyWishListCart => new Promise((resolve, reject) => {
  axios
    .post(`${nesVaultApiBaseUrl}/api/wishlist/`, newMyWishListCart)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getSingleWishListCartClick = id => axios.get(`${nesVaultApiBaseUrl}/api/wishlist/${id}`);

// const deleteMyCart = myCartId => axios.delete(`${nesVaultApiBaseUrl}/api/mycarts/delete/${myCartId}`);

export default {
  getMyWishList,
  createMyWishListCart,
  getSingleWishListCartClick,
  //   getSingleMyCart,
  //   createMyCart,
  //   editMyCart,
  //   deleteMyCart,
  getCurrentUid,
  //   getSingleMyCartClick,
};
