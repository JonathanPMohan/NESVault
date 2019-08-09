import React from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';

import './Notifications.scss';

const Container = styled.div`
  background-color: black;
  color: red;
  padding: 16px;
  position: absolute;
  border-radius: 15px;
  border: 2px solid white;
  top: ${props => props.top}px;
  right: 16px;
  z-index: 666;
  transition: top 0.5s ease;
`;

const emitter = new ee();

export const notify = (msg) => {
  emitter.emit('notification', msg);
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: -200,
      msg: '',
    };

    this.timeout = null;

    emitter.on('notification', (msg) => {
      this.onShow(msg);
    });
  }

  onShow = (msg) => {
    if (this.timout) {
      clearTimeout(this.timeout);
      this.setState({ right: -100 }, () => {
        this.timeout = setTimeout(() => {
          this.showNotification();
        }, 1000);
      });
    } else {
      this.showNotification(msg);
    }
  };

  showNotification = () => {
    this.setState(
      {
        top: 435,
        msg: '',
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({
            top: -100,
          });
        }, 5000);
      },
    );
  };

  render() {
    return (
      <Container className="test-container" top={this.state.top}>
        <i className="game-added fas fa-thumbs-up fa-2x" />
      </Container>
    );
  }
}

export default Notifications;
