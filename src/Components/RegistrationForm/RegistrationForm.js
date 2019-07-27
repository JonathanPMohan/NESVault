import React from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import './RegistrationForm.scss';

import nes from '../../images/nes_vault_font.png';

const defaultUser = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  favoriteGame: '',
};

class RegistrationForm extends React.Component {
  state = {
    modal: false,
    firebaseId: -1,
    newUser: defaultUser,
    backdrop: 'static',
    isLoading: false,
    isEditing: false,
  };

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  modalClosed() {
    const { modalCloseEvent } = this.props;
    modalCloseEvent();
    this.setState({
      newUser: defaultUser,
    });
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setState({
        isEditing: true,
        newUser: props.userToEdit,
      });
    }
    this.setState({
      modal: props.showModal,
    });
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = event.target.value;
    this.setState({
      newUser: tempUser,
    });
  };

  formFieldNumberState = (name, event) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = event.target.value * 1;
    this.setState({
      newUser: tempUser,
    });
  };

  formFieldBoolState = (name, event) => {
    const tempUser = { ...this.state.newUser };
    const boolValue = event.target.selectedOptions[0].dataset.selection === 'true';
    tempUser[name] = boolValue;
    this.setState({
      newUser: tempUser,
    });
  };

  firstNameChange = event => this.formFieldStringState('firstName', event);

  lastNameChange = event => this.formFieldStringState('lastName', event);

  userNameChange = event => this.formFieldStringState('userName', event);

  emailChange = event => this.formFieldStringState('email', event);

  favoriteGameChange = event => this.formFieldStringState('favoriteGame', event);

  formSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const myNewUser = { ...this.state.newUser };
    onSubmit(myNewUser);
    this.setState({
      showModal: false,
      newUser: defaultUser,
    });
  };

  render() {
    const { newUser, isLoading, isEditing } = this.state;
    return (
      <div className="Registration-Form">
        <Modal
          className="form-modal"
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          onClosed={e => this.modalClosed(e)}
          centered
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader toggle={e => this.toggle(e)}>
            <img src={nes} className="nes-modal-logo" alt="nes_logo" />
            <h1>
              <b>{isEditing ? 'Edit NESVault User' : 'NESVault User Registration'}</b>
            </h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      onChange={this.firstNameChange}
                      value={newUser.firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={this.lastNameChange}
                      value={newUser.lastName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      className="form-input"
                      type="email"
                      name="email"
                      id="userEmail"
                      placeholder="whatsYourEmail@NESCollector.com"
                      onChange={this.emailChange}
                      value={newUser.email}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="userName">User Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="This Better Be Cool"
                      onChange={this.userNameChange}
                      value={newUser.userName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="favoriteGame">Favorite Game</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="favoriteGame"
                      id="favoriteGame"
                      placeholder="Name Your Favorite Game"
                      onChange={this.favoriteGameChange}
                      value={newUser.favoriteGame}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="submit-button" onClick={this.formSubmit}>
              SUBMIT
            </Button>{' '}
            <Button color="secondary" className="cancel-button" onClick={e => this.toggle(e)}>
              CANCEL
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegistrationForm;
