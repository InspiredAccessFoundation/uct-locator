import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { CircularProgress } from "@mui/material";
import TableMap from "./TableMap";

const render = () => {
  return (
    <CircularProgress size="100px" />
  );
};

const LocationSelectMap = (props) => {
  const { onCenterChanged, tableMapStyle } = props;
  tableMapStyle.width = "100%";
  tableMapStyle.height = tableMapStyle.height || "500px";

  const mapOptions = {
    styles: [],
    streetViewControl: false,
    fullscreenControl: false
  }

  return (
    <>
      <div style={{ height: "100%" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
          <TableMap
            onCenterChanged={onCenterChanged}
            style={tableMapStyle}
            mapOptions={mapOptions}
            selectingLocation
          >
          </TableMap>
        </Wrapper>
      </div>
    </>
  );
}

export default LocationSelectMap;