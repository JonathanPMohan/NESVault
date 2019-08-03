import React from 'react';
import SearchField from 'react-search-field';
import PrintWishListCard from '../../PrintWishListCard/PrintWishListCard';
import wishListRequests from '../../../helpers/Data/wishListRequests';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';
import './WishList.scss';

class WishList extends React.Component {
  state = {
    wishList: [],
    filteredWishList: [],
    currentUserObj: {},
  };

  getWishList = () => {
    const userDbId = this.props.userObject.id;
    wishListRequests
      .getMyWishList(userDbId)
      .then((wishList) => {
        this.setState({ wishList });
        this.setState({ filteredWishList: wishList });
      })
      .catch((err) => {
        console.error('error with NESVault WishList GET', err);
      });
  };

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    this.getWishList();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
    });
  }

  onChange = (value, event) => {
    const { wishList } = this.state;
    const filteredWishList = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredWishList: wishList });
    } else {
      wishList.forEach((myCart) => {
        if (
          myCart.name.toLowerCase().includes(value.toLowerCase())
          || myCart.genre.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredWishList.push(myCart);
        }
        this.setState({ filteredWishList });
      });
    }
  };

  onSelect = (id) => {
    this.props.history.push(`/wishlist/${id}`);
  };

  render() {
    const { filteredWishList } = this.state;

    const printWishList = filteredWishList.map(wishList => (
      <PrintWishListCard key={wishList.id} wishList={wishList} onSelect={this.onSelect} />
    ));
    return (
      <div className="myCarts mx-auto animated fadeIn w-100">
        <div className="myCartsWrap">
          <SearchField
            placeholder="Search WishList By Name or Genre"
            onChange={this.onChange}
            searchText=""
            classNames="wishlistSearch"
          />
        </div>
        <h1>ISO Stadium Events, Little Samson & Panic Restaurant... LOL</h1>
        <div className="wish-list-window">
          <div className="row justify-content-center">{printWishList}</div>
        </div>
      </div>
    );
  }
}

export default WishList;
