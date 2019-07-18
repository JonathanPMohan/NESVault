import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import MyNavBar from '../Components/MyNavBar/MyNavBar';
import Auth from '../Components/Auth/Auth';
import Home from '../Components/Pages/Home/Home';
import authRequests from '../helpers/Data/authRequests';
import connection from '../helpers/Data/connection';

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
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
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
    const { authed, pendingUser } = this.state;
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
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <img src={nesLogo} className="nesHomeLogo" alt="nes_logo" />
            <div className="app-content container-fluid">
              <div className="justify-content-center">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
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
