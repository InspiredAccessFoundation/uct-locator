import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { CircularProgress } from "@mui/material";
import TableMapNew from "./TableMap";
import { GoogleApiKey } from "../../utils/constants";

const render = () => {
  return (
    <CircularProgress size="100px" />
  );
};

const LocationSelectMap = (props) => {
  const { onCenterChanged, tableMapStyle } = props;
  const mapOptions = {
    styles: [],
    streetViewControl: false,
    fullscreenControl: false
  }

  return (
    <>
      <div style={{ height: "100%" }}>
        <Wrapper apiKey={GoogleApiKey()} render={render} libraries={["places"]}>
          {/* <TableMapNew
            onCenterChanged={onCenterChanged}
            mapOptions={mapOptions}
            selectingLocation
          >
          </TableMapNew> */}
        </Wrapper>
      </div>
    </>
  );
}

export default LocationSelectMap;