import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    userObject: {},
    fbUserObject: {},
  };

  componentDidMount() {
    const fbUser = authRequests.getCurrentUser();
    userRequests.getUserByFbId(fbUser.uid).then((currentUser) => {
      this.setState({
        userObject: currentUser,
        fbUserObject: fbUser.providerData[0],
      });
    });
  }

  render() {
    const { userObject, fbUserObject } = this.state;
    return (
      <div className="Profile">
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
                </CardHeader>
                <CardBody>
                  {/* <CardSubtitle>Address:</CardSubtitle> */}
                  <CardText>
                    <h5>
                      <b>CART COUNT:</b> 365
                    </h5>
                    <p />
                    <p>
                      <b>FAVORITE GAME:</b> {`${userObject.favoriteGame}`}
                    </p>
                  </CardText>
                  <Button color="black" className="edit-profile-button">
                    EDIT
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
