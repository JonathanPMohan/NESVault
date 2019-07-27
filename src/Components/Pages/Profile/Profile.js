import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Button, CardHeader,
} from 'reactstrap';
import userRequests from '../../../helpers/Data/userRequests';
import authRequests from '../../../helpers/Data/authRequests';

// REACT CHART //
import '../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, RadialChart } from 'react-vis';

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

    const data = [{ x: 9, y: 3 }];

    const myData = [
      { angle: 1, label: 'Super Custom label' },
      { angle: 5 },
      { angle: 2 },
      { angle: 2 },
      { angle: 2 },
      { angle: 1 },
    ];

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
            <RadialChart className="chart-b" data={myData} width={500} height={500} />
            <XYPlot
              height={500}
              width={500}
              className="chart-a"
              color="red"
              colorType="category"
              colorDomain={[0, 1, 2]}
            >
              <VerticalBarSeries data={data} className="chart-one" color="red" />
              <VerticalBarSeries data={data} className="chart-two" color="grey" />
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
