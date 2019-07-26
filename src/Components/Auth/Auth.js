import React from 'react';
import { createButton } from 'react-social-login-buttons';
import authRequests from '../../helpers/Data/authRequests';
import './Auth.scss';

// import NESLogo from '../../../images/nes_vault.png';

const btnConfig = {
  text: 'GOOGLE LOGIN',
  icon: 'gamepad',
  iconFormat: name => 'fas fa-gamepad',
  style: { background: 'red' },
  activeStyle: { background: 'grey' },
};

/** My Google login button. */
const MyGoogleLoginButton = createButton(btnConfig);

class Auth extends React.Component {
  state = {
    showModal: false,
  };

  googleAuthenticateUser = () => {
    authRequests
      .googleAuth()
      .then()
      .catch((error) => {
        console.error('There was an error loggin in', error);
      });
  };

  render() {
    return (
      <div className="Auth mt-5">
        <div className="d-flex justify-content-center" />
        <div className="login d-flex justify-content-center">
          <MyGoogleLoginButton id="googleBtn" className="google-auth" onClick={this.googleAuthenticateUser} />
        </div>
      </div>
    );
  }
}

export default Auth;
