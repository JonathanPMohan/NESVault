import React from 'react';
import wishListRequests from '../../../helpers/Data/wishListRequests';
import Utility from '../../../helpers/utils/Utility';
import './WishListDetail.scss';

class WishListDetail extends React.Component {
  state = {
    singleWishListCart: {},
  };

  backToWishListView = (e) => {
    this.props.history.push('/wishlist');
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    wishListRequests.getSingleWishListCartClick(id).then((singleWishListCart) => {
      this.setState({ singleWishListCart: singleWishListCart.data });
    });
  }

  render() {
    const { singleWishListCart } = this.state;

    return (
      <div className="nes-detail mx-auto w-100 animated fadeIn">
        <div className="nes-cart-detail-wrapper mx-auto">
          <img className="singleNesCart-image" src={singleWishListCart.imageUrl} alt={singleWishListCart.name} />
          <div className="nes-cart-detail-single">
            <h1 className="singleNesCart-name">{singleWishListCart.name}</h1>

            <h2 className="singleNesCart-genre">{singleWishListCart.genre}</h2>
            <h2 className="singleNesCart-releaseDate">{Utility.dateFormat(singleWishListCart.releaseDate)}</h2>
            <h2 className="singleNesCart-loose-price">${singleWishListCart.loose}</h2>

            <button className="backToCollection" onClick={this.backToWishListView}>
              <span className="lnr lnr-arrow-left-circle back" />
              BACK TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WishListDetail;
