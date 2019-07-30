import React from 'react';
import PropTypes from 'prop-types';
import Utility from '../../helpers/utils/Utility';

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
        <div className="cart-card-body" onClick={this.myCartClick}>
          <h5 className="card-text">
            <h3 className="collection-name">{myCart.name}</h3>
            <h6 className="collection-genre">{myCart.genre}</h6>
            <h6 className="collection-release-date">{Utility.dateFormat(myCart.releaseDate)}</h6>
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
