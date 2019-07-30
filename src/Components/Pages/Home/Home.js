import React from 'react';
import RegisterForm from '../../RegistrationForm/RegistrationForm';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';

import NESLogo from '../../../images/nes_vault_logo.png';

import './Home.scss';

class Home extends React.Component {
  state = {
    showModal: false,
    firebaseId: -1,
    userToEdit: {},
  };

  componentWillMount() {
    const currentUid = authRequests.getCurrentUid();
    this.setState({
      firebaseId: currentUid,
    });
    userRequests
      .getUserByFbId(currentUid)
      .then((result) => {
        if (result.isDeleted) {
          this.showModal();
        }
      })
      .catch((error) => {
        // User not found so redirect to Register Modal
        if (error.response.status === 404) {
          this.showModal();
        } else {
          console.error('Problem retrieving user from database', error);
        }
      });
  }

  showModal = (e) => {
    this.setState({
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    const currentUid = authRequests.getCurrentUid();
    this.setState({
      showModal: false,
    });
    userRequests.getUserByFbId(currentUid).then((result) => {
      if (result.isDeleted) {
        authRequests.logoutUser();
      }
    });
  };

  userFormSubmitEvent = (newUser) => {
    // const { updateUser } = this.props;
    newUser.isDeleted = false;
    userRequests
      .createUser(newUser)
      .then((result) => {
        // updateUser();
        this.setState({
          showModal: false,
        });
      })
      .catch(error => console.error('There was an error creating new user', error));
  };

  editUserItem = (userId) => {
    const fbUserId = this.props.userObject.firebaseId;
    userRequests
      .getUserByFbId(fbUserId)
      .then((currentUser) => {
        this.setState({
          isEditing: true,
          userToEdit: currentUser,
        });
        this.showModal();
      })
      .catch(error => console.error(error));
  };

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  };

  render() {
    const { firebaseId, isEditing } = this.state;
    return (
      <div className="admin-home animated bounceInLeft">
        <h2>Welcome To The NESVault. Choose A Destination Below. </h2>
        <div className="card-deck mt-5">
          <div className="card admin-card" id="profile" onClick={this.changeView}>
            <div className="text-center">
              <h4 className="card-title">
                <img src={NESLogo} className="admin-icon" alt="profile" />
              </h4>
              <h3 className="card-subtitle mb-2">PROFILE</h3>
            </div>
          </div>

          <div className="card admin-card" id="collection" onClick={this.changeView}>
            <div className="text-center">
              <h4 className="card-title">
                <img src={NESLogo} className="admin-icon" alt="collection" />
              </h4>
              <h3 className="card-subtitle mb-2">COLLECTION</h3>
            </div>
          </div>

          <div className="card admin-card" id="cartlist" onClick={this.changeView}>
            <div className="text-center">
              <h4 className="card-title">
                <img src={NESLogo} className="admin-icon" alt="carts" />
              </h4>
              <h3 className="card-subtitle mb-2 ">NES DATABASE</h3>
            </div>
          </div>

          <div className="card admin-card" id="wishlist" onClick={this.changeView}>
            <div className="text-center">
              <h4 className="card-title">
                <img src={NESLogo} className="admin-icon" alt="wishlist" />
              </h4>
              <h3 className="card-subtitle mb-2">WISH LIST</h3>
            </div>
          </div>

          <div className="card admin-card" id="tradelist" onClick={this.changeView}>
            <div className="text-center">
              <h4 className="card-title">
                <img src={NESLogo} className="admin-icon" alt="tradelist" />
              </h4>
              <h3 className="card-subtitle mb-2">TRADE LIST</h3>
            </div>
          </div>
        </div>

        <RegisterForm
          showModal={this.state.showModal}
          onSubmit={this.userFormSubmitEvent}
          isEditing={isEditing}
          modalCloseEvent={this.modalCloseEvent}
          editForm={this.editUserItem}
          fireBaseId={firebaseId}
        />
      </div>
    );
  }
}

export default Home;
