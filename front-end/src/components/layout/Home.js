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
      <p>Many people with disablities and their caregivers find themselves planning vacations around the public resources and accomodations available in that area. In the past, adult-sized changing stations have been uncommon in museums, libraries, and other public places. However, these locations are making an effort to become just as accessible to people with special needs as they are to those who are ambulatory. With the UCT Locator, it is easier than ever for people with disablities and caregivers to find nearby adult-sized changing stations.</p>
      {loggedIn ? loggedInContent : loggedOutContent}
      <Link to="/find">Find a Table</Link>
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
