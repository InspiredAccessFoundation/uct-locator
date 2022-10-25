import React from "react";
import Link from "./Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "@mui/system";

const Home = (props) => {
  const loggedIn = props.auth.isAuthenticated;

  const loggedInContent = (
    <>
      <p>You are logged into the application 😉</p>
      <p>
        <Link to="/submit-table">Submit a Table</Link>
      </p>
    </>
  );

  const loggedOutContent = (
    <p>
      <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
    </p>
  );

  return (
    <Container maxWidth="md">
      <p>Welcome to the UCT Locator app!</p>
      {loggedIn ? loggedInContent : loggedOutContent}
      <Link to="/find">Find a Table</Link>
      <p><Link to="/about">About Us</Link></p>
    </Container>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
