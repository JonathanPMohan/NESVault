import PropTypes from 'prop-types';
import React from 'react';
import collectionRequests from '../../helpers/Data/collectionRequests';
import Utility from '../../helpers/utils/Utility';
import './CartListTable.scss';

class CartListTable extends React.Component {
  state = {};

  static propTypes = {
    // product: productShape,
    index: PropTypes.number,
  };

  addToMyCollection = (e) => {
    e.preventDefault();
    const { cart, userObject } = this.props;
    // const newMyCart = {};
    // newMyCart.userId = userObject.id;
    cart.userId = userObject.id;
    cart.cartsId = cart.id;

    collectionRequests.createMyCart(cart);
  };

  addToMyWishList = (e) => {
    e.preventDefault();
    const { addToMyWishList, cart } = this.props;
    addToMyWishList(cart.id);
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
          <img className="cart-img" src={cart.imageUrl} alt="cart" />
        </td>
        <td className="name">{cart.name}</td>
        <td className="genre">{cart.genre}</td>
        <td className="release-date">{Utility.dateFormat(cart.releaseDate)}</td>
        <td className="loose">${cart.loose}</td>
        <td className="cib">${cart.cib}</td>
        <td className="nes">${cart.new}</td>
        <td className="icons">
          <i className="add-cart-button lnr lnr-plus-circle" id={cart.id} onClick={this.addToMyCollection} />
        </td>
        <td className="icons">
          <i className="magic-wand-button lnr lnr-magic-wand" id={cart.id} onClick={this.addToMyWishList} />
        </td>
      </tr>
    );
  }
}

export default CartListTable;
