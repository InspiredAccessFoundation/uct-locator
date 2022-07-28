import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

class Map extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <p>This page will contain a map.</p>
      </div>
    );
  }
}

Map.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Map);
