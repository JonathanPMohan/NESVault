import React from 'react';
import Utility from '../../helpers/utils/Utility';

import './PrintCollectionCard.scss';

class PrintCollectionCard extends React.Component {
  myCartClick = () => {
    const { myCart, onSelect } = this.props;
    onSelect(myCart.id);
  };

  deleteCart = (e) => {
    e.preventDefault();
    const { deleteMyCart, myCart } = this.props;
    deleteMyCart(myCart.id);
  };

  render() {
    const { myCart } = this.props;

    return (
      <div className="myCartCard col-2">
        <img className="myCartImage" src={myCart.imageUrl} alt={myCart.id} />
        <div className="cart-card-body">
          <h5 className="card-text">
            <h4 className="collection-name">{myCart.name}</h4>
            <h6 className="collection-genre">{myCart.genre}</h6>
            <h6 className="collection-release-date">{Utility.dateFormat(myCart.releaseDate)}</h6>
            <h6 className="collection-loose-price">${myCart.loose}</h6>
            <button className="myCart-details" onClick={this.myCartClick}>
              INFO
              <span className="lnr lnr-list cart-info-icon" />
            </button>
            <button className="delete-cart-button" id={myCart.id} onClick={this.deleteCart}>
              <span className="lnr lnr-cross-circle delete-cart-icon" />
            </button>
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintCollectionCard;
