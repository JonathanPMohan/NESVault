import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/Data/userRequests';
import RegisterForm from '../../RegistrationForm/RegistrationForm';
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
    showModal: false,
    isEditing: false,
    userToEdit: {},
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

  getSingleUser = () => {
    const fbUser = authRequests.getCurrentUser();
    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      this.setState({
        userObject: currentUser,
        fbUserObject: fbUser.providerData[0],
      });
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
      // this.getSingleUser();
    });
  }

  showModal = (e) => {
    this.setState({
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    this.setState({
      showModal: false,
      userToEdit: {},
    });
  };

  editUserItem = (userId) => {
    const fbUserId = this.props.userObject.fireBaseUid;
    userRequests.getUserByFbId(fbUserId).then((currentUser) => {
      const tempUser = currentUser;
      this.setState({
        isEditing: true,
        userToEdit: tempUser,
      });
    });
    this.showModal();
  };

  userFormSubmitEvent = (newUser) => {
    // const { updateUser } = this.props;
    userRequests
      .updateUser(newUser)
      .then((result) => {
        // updateUser();
        this.setState({
          showModal: false,
          isEditing: false,
          userToEdit: {},
        });
        this.getSingleUser();
      })
      .catch(error => console.error('There was an error updating the user', error));
  };

  render() {
    const {
      userObject,
      fbUserObject,
      myCartsCount,
      greatestValue,
      greatestPrice,
      showModal,
      isEditing,
      userToEdit,
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
        <RegisterForm
          showModal={showModal}
          onSubmit={this.userFormSubmitEvent}
          isEditing={isEditing}
          userToEdit={userToEdit}
          modalCloseEvent={this.modalCloseEvent}
          editForm={this.editUserItem}
          fireBaseId={userObject.fireBaseUid}
        />
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
                    <b>{`${userObject.userName}`}</b>
                  </h2>
                  <Button
                    color="black"
                    className="edit-profile-button-top"
                    id={userObject.id}
                    onClick={this.editUserItem}
                  >
                    EDIT
                  </Button>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <h4>
                      <b>CART COUNT:</b> {myCartsCount} of 716
                    </h4>
                    <p />
                    <h4>
                      <b>TOTAL WORTH:</b> ${getCollectionValue()}
                    </h4>
                    <h6>
                      <b>MOST VALUABLE:</b> {greatestValue.name} | ${greatestPrice}
                    </h6>
                    <h6>
                      <b>FAVORITE GAME:</b> {`${userObject.favoriteGame}`}
                    </h6>
                  </CardText>
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
