import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
} from 'reactstrap';
import './AppNavbar.scss';

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
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/home">
                <i className="lnr lnr-home lnr-1x" />
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/profile">
                <i className="lnr lnr-user lnr-1x" />
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/wishlist">
                <i className="lnr lnr-magic-wand lnr-1x" />
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/tradelist">
                <i className="lnr lnr-gift lnr-1x" />
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} onClick={logoutClickEvent} to="/home">
                <i className="lnr lnr-cross lnr-1x" />
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="AppNavbar">
        <Navbar color="dark" dark expand="md" fixed={'top'}>
          <NavbarBrand tag={RRNavLink} to="/home">
            NESVault Home
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
