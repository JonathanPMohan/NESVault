import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';
import collectionRequests from '../../../helpers/Data/collectionRequests';
import GenrePieChart from '../../GenrePieChart/GenrePieChart';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    userObject: {},
    fbUserObject: {},
    myCartsCount: 0,
    myCarts: [],
    greatestValue: {},
    greatestPrice: 0,
  };

  getCollection = () => {
    const userDbId = this.state.userObject.id;
    collectionRequests
      .getAllMyCarts(userDbId)
      .then((myCarts) => {
        const greatestValue = myCarts.reduce((a, b) => (b.loose > a.loose ? b : a));
        const greatestPrice = greatestValue.loose.toFixed(2);
        // greatestPrice.toFixed(2);
        this.setState({
          myCartsCount: myCarts.length,
          myCarts,
          greatestValue,
          greatestPrice,
        });
      })
      .catch((err) => {
        console.error('error with NESVault Collection GET', err);
      });
  };

  componentDidMount() {
    const fbUser = authRequests.getCurrentUser();
    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      this.setState({
        userObject: currentUser,
        fbUserObject: fbUser.providerData[0],
      });
      this.getCollection();
    });
  }

  render() {
    const {
      userObject, fbUserObject, myCartsCount, greatestValue, greatestPrice,
    } = this.state;

    const myCarts = [...this.state.myCarts];

    const getCollectionValue = () => {
      let collectionValue = 0;

      myCarts.forEach((cart) => {
        collectionValue += cart.loose;
      });
      return collectionValue;
    };

    return (
      <div className="Profile animated fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 profile-container">
              <Card>
                <CardImg
                  className="profile-card-img"
                  top
                  width="100%"
                  src={fbUserObject.photoURL}
                  alt="Card image cap"
                />
                <CardHeader>
                  <h2>
                    <b>
                      {`${userObject.userName}`}
                      <Button color="black" className="edit-profile-button-top">
                        EDIT
                      </Button>
                    </b>
                  </h2>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <h5>
                      <b>CART COUNT:</b> {myCartsCount} of 716
                    </h5>
                    <p />
                    <p>
                      <b>TOTAL WORTH:</b> ${getCollectionValue()}
                    </p>
                    {/* <p>
                      <b>MOST VALUABLE:</b> {`${userObject.favoriteGame}`}
                    </p> */}
                    <p>
                      <b>MOST VALUABLE:</b> {greatestValue.name} ${greatestPrice}
                    </p>
                    <p>
                      <b>FAVORITE GAME:</b> {`${userObject.favoriteGame}`}
                    </p>
                  </CardText>
                  {/* <Button color="black" className="edit-profile-button">
                    EDIT
                  </Button> */}
                </CardBody>
              </Card>
              <div className="pie-chart animated fadeIn">
                <GenrePieChart className="genre-pie-chart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
