import React from 'react';
import Utility from '../../helpers/utils/Utility';

import './PrintTradeListCard.scss';

class PrintTradeListCard extends React.Component {
  myTradeListClick = () => {
    const { tradeList, onSelect } = this.props;
    onSelect(tradeList.id);
  };

  deleteTradeListCart = (e) => {
    e.preventDefault();
    const { deleteMyTradeListCart, tradeList } = this.props;
    deleteMyTradeListCart(tradeList.id);
  };

  render() {
    const { tradeList } = this.props;

    return (
      <div className="myCartCard col-2">
        <img className="myCartImage" src={tradeList.imageUrl} alt={tradeList.id} />
        <h4 className="myCart-card-header">{tradeList.name}</h4>
        {/* <h6 className="myCart-card-header">{tradeList.genre}</h6>
        <h6 className="myCart-card-header">{Utility.dateFormat(tradeList.releaseDate)}</h6>
        <h6 className="collection-loose-price">${tradeList.loose}</h6> */}
        <div className="cart-card-body">
          <h5 className="card-text">
            {/* <button className="myCart-details" onClick={this.myTradeListClick}>
              INFO
              <span className="lnr lnr-list cart-info-icon" />
            </button> */}
            <button className="delete-cart-button" id={tradeList.id} onClick={this.deleteTradeListCart}>
              <span className="lnr lnr-cross-circle delete-cart-icon" />
            </button>
          </h5>
        </div>
      </div>
    );
  }
}

export default PrintTradeListCard;
