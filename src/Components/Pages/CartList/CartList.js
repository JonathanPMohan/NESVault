import React from 'react';
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

  componentWillUnmount() {
    this.partnerMounted = false;
  }

  render() {
    // const { userObject } = this.props;
    const { carts } = this.state;

    const printCart = carts.map((cart, index) => (
      <CartListTable key={cart.id} index={index} cart={cart} onSelect={this.onSelect} />
    ));

    return (
      <div className="cart-list mx-auto animated fadeIn w-100">
        <div className="table-responsive">
          <table className="cart-list-table table table-striped">
            <thead>
              <tr className="cart-list-header-table">
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">NAME</th>
                <th scope="col">GENRE</th>
                <th scope="col">RELEASE DATE</th>
                <th scope="col">LOOSE</th>
                <th scope="col">CIB</th>
                <th scope="col">NEW</th>
                <th scope="col">ADD</th>
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
