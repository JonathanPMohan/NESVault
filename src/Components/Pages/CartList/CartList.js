import React from 'react';
import SearchField from 'react-search-field';
import cartRequests from '../../../helpers/Data/cartRequests';
import authRequests from '../../../helpers/Data/authRequests';
import userRequests from '../../../helpers/Data/userRequests';
import CartListTable from '../../CartListTable/CartListTable';

import './CartList.scss';

class CartList extends React.Component {
  partnerMounted = false;

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  state = {
    carts: [],
    userObject: {},
    filteredCarts: [],
    CartListTable: [],
  };

  // Get All Carts //

  getCarts = () => {
    cartRequests
      .getAllCarts()
      .then((carts) => {
        this.setState({ carts });
      })
      .catch((err) => {
        console.error('error with products GET', err);
      });
  };

  //   componentDidMount() {
  //     this.partnerMounted = !!this.props.userObject.id;
  //     if (this.partnerMounted) {
  //       this.getAllCarts();
  //     }
  //   }

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    this.getCarts();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
    });
  }

  onChange = (value, event) => {
    const { carts } = this.state;
    const filteredCarts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredCarts: carts });
    } else {
      carts.forEach((cart) => {
        if (
          cart.name.toLowerCase().includes(value.toLowerCase())
          || cart.name.toLowerCase().includes(value.toLowerCase())
          || cart.genre.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredCarts.push(cart);
        }
        this.setState({ filteredCarts });
      });
    }
  };

  componentWillUnmount() {
    this.partnerMounted = false;
  }

  render() {
    // const { userObject } = this.props;
    // const { carts } = this.state;
    const { userObject } = this.props;
    const { filteredCarts } = this.state;

    const printCart = filteredCarts.map((cart, index) => (
      <CartListTable key={cart.id} index={index} cart={cart} onSelect={this.onSelect} userObject={userObject} />
    ));

    return (
      <div className="cart-list mx-auto animated fadeIn w-100">
        <h1>Search Database By NES Title Or Genre </h1>
        <div className="search-field">
          <SearchField
            placeholder="Search Database By Name or Genre"
            onChange={this.onChange}
            searchText=""
            classNames="collectionSearch"
          />
        </div>
        <div className="table-responsive">
          <table className="cart-list-table table table-striped">
            <thead>
              <tr className="cart-list-header-table">
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">NAME</th>
                <th scope="col">GENRE</th>
                <th scope="col">RELEASED</th>
                <th scope="col">LOOSE</th>
                <th scope="col">CIB</th>
                <th scope="col">NEW</th>
                <th scope="col">ADD</th>
                <th scope="col">WISH</th>
                <th scope="col">TRADE</th>
              </tr>
            </thead>
            <tbody>{printCart}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CartList;
