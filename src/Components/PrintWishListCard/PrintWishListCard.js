import React from 'react';
import Utility from '../../helpers/utils/Utility';

import './PrintWishListCard.scss';

class PrintWishListCard extends React.Component {
  myWishListClick = () => {
    const { wishList, onSelect } = this.props;
    onSelect(wishList.id);
  };

  deleteWishListCart = (e) => {
    e.preventDefault();
    const { deleteMyWishListCart, wishList } = this.props;
    deleteMyWishListCart(wishList.id);
  };

  render() {
    const { wishList } = this.props;

    return (
      <div className="myCartCard col-2">
        <img className="myCartImage" src={wishList.imageUrl} alt={wishList.id} />
        <h4 className="myCart-card-header">{wishList.name}</h4>
        {/* <h6 className="myCart-card-header">{wishList.genre}</h6>
        <h6 className="myCart-card-header">{Utility.dateFormat(wishList.releaseDate)}</h6>
        <h6 className="collection-loose-price">${wishList.loose}</h6> */}
        <div className="cart-card-body">
          <h5 className="card-text">
            {/* <button className="myCart-details" onClick={this.myWishListClick}>
              INFO
              <span className="lnr lnr-list cart-info-icon" />
            </button> */}
            <button className="delete-cart-button" id={wishList.id} onClick={this.deleteWishListCart}>
              <span className="lnr lnr-cross-circle delete-cart-icon" />
            </button>
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintWishListCard;
