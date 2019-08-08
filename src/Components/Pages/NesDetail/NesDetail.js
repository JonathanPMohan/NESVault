import React from 'react';
import collectionRequests from '../../../helpers/Data/collectionRequests';
import Utility from '../../../helpers/utils/Utility';
import './Nesdetail.scss';

class NesDetail extends React.Component {
  state = {
    singleNesCart: {},
    singleNesCartValue: 0,
  };

  backToCollectionView = (e) => {
    this.props.history.push('/collection');
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    collectionRequests.getSingleNesCartClick(id).then((singleNesCart) => {
      const singleNesCartValue = singleNesCart.data.loose.toFixed(2);
      this.setState({ singleNesCart: singleNesCart.data, singleNesCartValue });
    });
  }

  render() {
    const singleNesCart = { ...this.state.singleNesCart };

    const { singleNesCartValue } = this.state;

    return (
      <div className="nes-detail mx-auto w-100 animated fadeIn">
        <div className="nes-cart-detail-wrapper mx-auto">
          {singleNesCart.productId ? (
            <img
              className="singleNesCart-image"
              src={require(`../../../images/carts/${singleNesCart.productId}.jpg`)}
            />
          ) : (
            <div />
          )}

          <div className="nes-cart-detail-single">
            <h1 className="singleNesCart-name">{singleNesCart.name}</h1>

            <h2 className="singleNesCart-genre">Genre: {singleNesCart.genre}</h2>
            <h2 className="singleNesCart-releaseDate">Released: {Utility.dateFormat(singleNesCart.releaseDate)}</h2>
            <h2 className="singleNesCart-loose-price">Loose Value: ${singleNesCartValue}</h2>

            <button className="backToCollection" onClick={this.backToCollectionView}>
              <span className="lnr lnr-arrow-left-circle back" />
              BACK TO COLLECTION
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NesDetail;
