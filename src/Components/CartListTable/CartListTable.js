import PropTypes from 'prop-types';
import React from 'react';
import './CartListTable.scss';

class CartListTable extends React.Component {
  state = {};

  static propTypes = {
    // product: productShape,
    index: PropTypes.number,
  };

  addToMyCarts = (e) => {
    e.preventDefault();
    const { addToMyCarts, cart } = this.props;
    addToMyCarts(cart.id);
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
        <td className="release-date">{cart.releaseDate}</td>
        <td className="loose">{cart.loose}</td>
        <td className="icons">
          <i className="lnr lnr-plus-circle pencil" id={cart.id} onClick={this.addToMyCarts} />
        </td>
      </tr>
    );
  }
}

export default CartListTable;
