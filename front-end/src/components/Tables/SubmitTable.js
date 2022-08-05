import React from "react";
import LocationSelectMap from "../Map/LocationSelectMap";

const SubmitTable = () => {
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();

  const setCoordinates = (coords) => {
    setLatitude(coords.lat());
    setLongitude(coords.lng());
  }

  return (
    <div>
      <p>This is where you can submit a table...</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <LocationSelectMap onCenterChanged={setCoordinates} />
    </div>
  )
}

export default SubmitTable;