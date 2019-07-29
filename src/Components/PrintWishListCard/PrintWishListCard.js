import React from 'react';
import PropTypes from 'prop-types';

import './PrintWishListCard.scss';

class PrintWishListCard extends React.Component {
  static propTypes = {
    deleteSingleWishListItem: PropTypes.func,
    // userObject: PropTypes.object,
  };

  myWishListClick = () => {
    const { wishList, onSelect } = this.props;
    onSelect(wishList.id);
  };

  render() {
    const { myCart, wishList } = this.props;

    return (
      <div className="myCartCard col-2">
        <img className="myCartImage" src={myCart.imageUrl} alt={myCart.id} />
        <h4 className="myCart-card-header">{wishList.id}</h4>
        <h4 className="myCart-card-header">{wishList.cartId.name}</h4>
        <div className="cart-card-body" onClick={this.myWishListClick}>
          <h5 className="card-text">
            <button className="myCart-details" onClick={this.myWishListClick}>
              INFO
              <span className="lnr lnr-list cart-info-icon" />
            </button>
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintWishListCard;
