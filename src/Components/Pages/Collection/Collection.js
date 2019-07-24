import React from 'react';
import SearchField from 'react-search-field';
import PrintCollectionCard from '../../PrintCollectionCard/PrintCollectionCard';
import collectionRequests from '../../../helpers/Data/collectionRequests';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';
import './Collection.scss';

class Collection extends React.Component {
  state = {
    myCarts: [],
    filteredMyCarts: [],
    currentUserObj: {},
  };

  getCollection = () => {
    collectionRequests
      .getAllMyCarts()
      .then((myCarts) => {
        this.setState({ myCarts });
        this.setState({ filteredMyCarts: myCarts });
      })
      .catch((err) => {
        console.error('error with NESVault Collection GET', err);
      });
  };

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    this.getCollection();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
    });
  }

  onChange = (value, event) => {
    const { myCarts } = this.state;
    const filteredMyCarts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredMyCarts: myCarts });
    } else {
      myCarts.forEach((myCart) => {
        if (
          myCart.name.toLowerCase().includes(value.toLowerCase())
          || myCart.description.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredMyCarts.push(myCart);
        }
        this.setState({ filteredMyCarts });
      });
    }
  };

  onSelect = (id) => {
    this.props.history.push(`/mycarts/${id}`);
  };

  render() {
    const { filteredMyCarts } = this.state;

    const printCollection = filteredMyCarts.map(myCart => (
      <PrintCollectionCard key={myCart.id} myCart={myCart} onSelect={this.onSelect} />
    ));

    return (
      <div className="myCarts mx-auto animated fadeIn w-100">
        <div className="myCartsWrap">
          <SearchField
            placeholder="Search Collection By Name or Genre"
            onChange={this.onChange}
            searchText=""
            classNames="collectionSearch"
          />
        </div>
        <div className="myCartWindow">
          <div className="row justify-content-center">{printCollection}</div>
        </div>
      </div>
    );
  }
}

export default Collection;
