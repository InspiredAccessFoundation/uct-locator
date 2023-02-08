import React, { Component } from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "@mui/system";
import { pageSpacing } from "../../utils/constants";

class About extends Component {
  render() {
    return (
      <Container maxWidth={false} sx={{ ...pageSpacing }} >
        <h1>Welcome to the UCT Locator</h1>
        <p>This is a web application that allows caregivers to locate accessible
          universal changing stations.</p>
        <p>This project is part of the <a href="http://www.changingspacescampaign.org/"
          target="_blank" rel="noopener noreferrer">Changing Spaces Campaign</a></p>
      </Container>
    )
  }
}

export default About;

