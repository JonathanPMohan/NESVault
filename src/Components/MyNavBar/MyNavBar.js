import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
} from 'reactstrap';
import authRequests from '../../helpers/Data/authRequests';
import nes from '../../images/nes_vault_font.png';

import './MyNavBar.scss';

class AppNavbar extends React.Component {
  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const profileImgUrl = () => authRequests.getCurrentUser().photoURL;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/home">
                <i className="navIcon lnr lnr-home lnr-1x" />
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/profile">
                <i className="navIcon lnr lnr-user lnr-1x" />
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/collection">
                <i className="navIcon lnr lnr-layers lnr-1x" />
                Collection
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/cartlist">
                <i className="navIcon lnr lnr-list lnr-1x" />
                Cartlist
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/wishlist">
                <i className="navIcon lnr lnr-magic-wand lnr-1x" />
                Wishlist
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/tradelist">
                <i className="navIcon lnr lnr-gift lnr-1x" />
                Tradelist
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} onClick={logoutClickEvent} to="/home">
                <i className="navIcon lnr lnr-exit-up lnr-1x" />
                Logout
              </NavLink>
            </NavItem>
            <img className="navIcon profIcon" src={profileImgUrl()} alt="ProfilePic" />
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="AppNavbar">
        <Navbar color="black" dark expand="md" fixed={'top'}>
          <NavbarBrand tag={RRNavLink} to="/home">
            <img src={nes} className="nesNavLogo" alt="nes_logo" />
          </NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} className="navbar-dark" />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
