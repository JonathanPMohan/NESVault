import React from 'react';
import collectionRequests from '../../../helpers/Data/collectionRequests';
import Utility from '../../../helpers/utils/Utility';
import './Nesdetail.scss';

class NesDetail extends React.Component {
  state = {
    singleNesCart: {},
  };

  backToCollectionView = (e) => {
    this.props.history.push('/collection');
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    collectionRequests.getSingleNesCartClick(id).then((singleNesCart) => {
      this.setState({ singleNesCart: singleNesCart.data });
    });
  }

  render() {
    const { singleNesCart } = this.state;

    return (
      <div className="nes-detail mx-auto w-100 animated fadeIn">
        <div className="nes-cart-detail-wrapper mx-auto">
          <img className="singleNesCart-image" src={singleNesCart.imageUrl} alt={singleNesCart.name} />
          <div className="nes-cart-detail-single">
            <h1 className="singleNesCart-name">{singleNesCart.name}</h1>

            <h2 className="singleNesCart-genre">{singleNesCart.genre}</h2>
            <h2 className="singleNesCart-releaseDate">{Utility.dateFormat(singleNesCart.releaseDate)}</h2>
            <h2 className="singleNesCart-loose-price">${singleNesCart.loose}</h2>

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
