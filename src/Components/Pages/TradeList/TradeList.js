import React from 'react';
import SearchField from 'react-search-field';
import PrintTradeListCard from '../../PrintTradeListCard/PrintTradeListCard';
import tradeListRequests from '../../../helpers/Data/tradeListRequests';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';
import './TradeList.scss';

class TradeList extends React.Component {
  state = {
    tradeList: [],
    filteredTradeList: [],
    currentUserObj: {},
  };

  getTradeList = () => {
    const userDbId = this.state.currentUserObj.id;
    tradeListRequests
      .getMyTradeList(userDbId)
      .then((tradeList) => {
        this.setState({ tradeList });
        this.setState({ filteredTradeList: tradeList });
      })
      .catch((err) => {
        console.error('error with NESVault TradeList GET', err);
      });
  };

  deleteMyTradeListCart = (id) => {
    tradeListRequests
      .deleteMyCartFromTradelist(id)
      .then(() => {
        this.getTradeList();
      })
      .catch(error => console.error('We Could Not Delete Your NESVault Cart.', error));
  };

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
      this.getTradeList();
    });
  }

  onChange = (value, event) => {
    const { tradeList } = this.state;
    const filteredTradeList = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredTradeList: tradeList });
    } else {
      tradeList.forEach((myCart) => {
        if (
          myCart.name.toLowerCase().includes(value.toLowerCase())
          || myCart.genre.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredTradeList.push(myCart);
        }
        this.setState({ filteredTradeList });
      });
    }
  };

  onSelect = (id) => {
    this.props.history.push(`/tradelist/${id}`);
  };

  render() {
    const { filteredTradeList } = this.state;

    const printTradeList = filteredTradeList.map(tradeList => (
      <PrintTradeListCard
        key={tradeList.id}
        deleteMyTradeListCart={this.deleteMyTradeListCart}
        tradeList={tradeList}
        onSelect={this.onSelect}
      />
    ));
    return (
      <div className="myCarts mx-auto animated fadeIn w-100">
        <div className="myCartsWrap">
          <SearchField
            placeholder="Search TradeList By Name or Genre"
            onChange={this.onChange}
            searchText=""
            classNames="tradelistSearch"
          />
        </div>
        <h1>Trading Is Fun....</h1>
        <div className="wish-list-window">
          <div className="row justify-content-center">{printTradeList}</div>
        </div>
      </div>
    );
  }
}

export default TradeList;
