import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import MyNavBar from '../Components/MyNavBar/MyNavBar';
import Auth from '../Components/Auth/Auth';
import Home from '../Components/Pages/Home/Home';
import Profile from '../Components/Pages/Profile/Profile';
import Collection from '../Components/Pages/Collection/Collection';
import WishList from '../Components/Pages/WishList/WishList';
import TradeList from '../Components/Pages/TradeList/TradeList';
import NesDetail from '../Components/Pages/NesDetail/NesDetail';
import WishListDetail from '../Components/Pages/WishListDetail/WishListDetail';
import CartList from '../Components/Pages/CartList/CartList';
import authRequests from '../helpers/Data/authRequests';
import userRequests from '../helpers/Data/userRequests';
import connection from '../helpers/Data/connection';

import Notifications, { notify } from '../Components/Notifications/Notifications';

import nesLogo from '../images/nes_vault_logo.png';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false ? (
      <Component {...props} />
  ) : (
      <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
  ));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true ? (
      <Component {...props} />
  ) : (
      <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
  ));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
    userObject: {},
  };

  getCurrentUser = () => {
    const userId = authRequests.getCurrentUid();
    userRequests.getUserByFbId(userId).then((currentUser) => {
      this.setState({
        userObject: currentUser,
      });
    });
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
        this.getCurrentUser();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser, userObject } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({
        authed: false,
      });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <button className="test-button" onClick={() => notify('this is a notification')}>
          on Click
        </button>
        <Notifications />
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent} userObject={userObject} />
            <img src={nesLogo} className="nesHomeLogo" alt="nes_logo" />
            <div className="app-content container-fluid">
              <div className="justify-content-center">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />

                  <PrivateRoute
                    path="/profile"
                    component={props => <Profile userObject={userObject} updateUser={this.getCurrentUser} {...props} />}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/mycarts/:id"
                    component={props => (
                      <NesDetail userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/collection"
                    component={props => (
                      <Collection userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/cartlist"
                    component={props => (
                      <CartList userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/wishlist/:id"
                    component={props => (
                      <WishListDetail userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/wishlist"
                    component={props => (
                      <WishList userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute
                    path="/tradelist"
                    component={props => (
                      <TradeList userObject={userObject} updateUser={this.getCurrentUser} {...props} />
                    )}
                    authed={authed}
                  />

                  <PrivateRoute path="/" component={Home} authed={authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
