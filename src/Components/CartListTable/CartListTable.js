import PropTypes from 'prop-types';
import React from 'react';
import collectionRequests from '../../helpers/Data/collectionRequests';
import wishListRequests from '../../helpers/Data/wishListRequests';
import tradeListRequests from '../../helpers/Data/tradeListRequests';
import Utility from '../../helpers/utils/Utility';
import Notifications from '../Notifications/Notifications';

import './CartListTable.scss';
import { notify } from '../Notifications/Notifications';

class CartListTable extends React.Component {
  state = {
    showAlert: false,
  };

  static propTypes = {
    index: PropTypes.number,
  };

  addToMyCollection = (e) => {
    e.preventDefault();
    const { cart, userObject } = this.props;
    cart.userId = userObject.id;
    cart.cartsId = cart.id;

    collectionRequests.createMyCart(cart);
    notify('did the thing');
  };

  addToMyWishList = (e) => {
    e.preventDefault();
    const { cart, userObject } = this.props;
    cart.userId = userObject.id;
    cart.cartId = cart.id;

    wishListRequests.createMyWishListCart(cart);
    notify('did the thing');
  };

  addToTradeList = (e) => {
    e.preventDefault();
    const { cart, userObject } = this.props;
    cart.userId = userObject.id;
    cart.cartId = cart.id;

    tradeListRequests.createMyTradeListCart(cart);
    notify('did the thing');
  };

  render() {
    const { cart, index } = this.props;
    const rowNumber = (index + 1).toString();
    return (
      <tr className="cart-item ml-auto">
        <th className="header" scope="row">
          {rowNumber}
        </th>
        <td className="cart-image">
          {/* <img className="cart-img" src={cart.imageUrl} alt="cart" /> */}
          <img className="cart-img" src={require(`../../images/carts/${cart.productId}.jpg`)} />
        </td>
        <td className="name">{cart.name}</td>
        <td className="genre">{cart.genre}</td>
        <td className="release-date">{Utility.dateFormat(cart.releaseDate)}</td>
        <td className="loose">${cart.loose}</td>
        <td className="cib">${cart.cib}</td>
        <td className="nes">${cart.new}</td>
        <td className="icons">
          <Notifications />
          <i className="add-cart-button lnr lnr-plus-circle" id={cart.id} onClick={this.addToMyCollection} />
        </td>
        <td className="icons">
          <i className="magic-wand-button lnr lnr-magic-wand" id={cart.id} onClick={this.addToMyWishList} />
        </td>
        <td className="icons">
          <i className="wish-list-button lnr lnr-gift" id={cart.id} onClick={this.addToTradeList} />
        </td>
      </tr>
    );
  }
}

export default CartListTable;
