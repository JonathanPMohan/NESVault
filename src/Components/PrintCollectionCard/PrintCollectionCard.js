import React from 'react';
import PropTypes from 'prop-types';

import './PrintCollectionCard.scss';

class PrintCollectionCard extends React.Component {
  static propTypes = {
    deleteSingleProduct: PropTypes.func,
    // userObject: PropTypes.object,
  };

  myCartClick = () => {
    const { myCart, onSelect } = this.props;
    onSelect(myCart.id);
  };

  render() {
    const { myCart } = this.props;

    return (
      <div className="myCartCard col-2">
        <img className="myCartImage" src={myCart.imageUrl} alt={myCart.id} />
        {/* <h4 className="myCart-card-header">{myCart.name}</h4> */}
        <div className="cart-card-body" onClick={this.myCartClick}>
          {/* <h6 className="card-text">{myCart.description}</h6>
          <h5 className="card-text">$ {myCart.unitPrice}</h5> */}
          <h5 className="card-text">
            <button className="myCart-details" onClick={this.myCartClick}>
              INFO
              <span className="lnr lnr-list cart-info-icon" />
            </button>
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintCollectionCard;
