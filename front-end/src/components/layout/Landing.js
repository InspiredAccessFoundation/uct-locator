import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';

import { testAuth } from "../../actions/authActions";

class Landing extends Component {
  testAuth = e => {
    e.preventDefault();
    this.props.testAuth();
  }

  render() {
    let loggedIn = this.props.auth.isAuthenticated;

    return (
      <div>
        <p>Welcome to the UCT Locator app!</p>
        {loggedIn ?
          <Link to="/Dashboard">Go to Dashbard</Link> :
          <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
        }
        <p><Button onClick={this.testAuth}>Test Auth</Button></p>
      </div>
    );
  }
}

Landing.propTypes = {
  testAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { testAuth })(Landing);
