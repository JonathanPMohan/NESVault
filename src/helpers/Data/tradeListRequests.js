import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const nesVaultApiBaseUrl = apiKeys.nesVaultApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

// GET MY TRADE LIST FOR TRADE LIST PAGE //
const getMyTradeList = userDbId => new Promise((resolve, reject) => {
  axios
    .get(`${nesVaultApiBaseUrl}/api/tradelist/${userDbId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Create Tradelist Cart Call //
const createMyTradeListCart = newMyTradeListCart => new Promise((resolve, reject) => {
  axios
    .post(`${nesVaultApiBaseUrl}/api/tradelist/`, newMyTradeListCart)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getSingleTradeListCartClick = id => axios.get(`${nesVaultApiBaseUrl}/api/tradelist/${id}`);

const deleteMyCartFromTradelist = myTradeListid => axios.delete(`${nesVaultApiBaseUrl}/api/tradelist/delete/${myTradeListid}`);

export default {
  getMyTradeList,
  createMyTradeListCart,
  getSingleTradeListCartClick,
  deleteMyCartFromTradelist,
  getCurrentUid,
};
