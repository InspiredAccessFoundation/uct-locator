import React, { Component } from "react";
import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    let loggedIn = this.props.auth.isAuthenticated;

    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="nav-link">UCT Locator</Link>
            </Typography>
            {loggedIn ? (
              <div>
                <Link className="nav-link">
                  <Button color="inherit" onClick={this.onLogoutClick}>Logout</Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login" className="nav-link">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/register" className="nav-link">
                  <Button color="inherit">Register</Button>
                </Link>
            </div>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);