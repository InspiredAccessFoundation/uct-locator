import * as React from "react";

const Marker = (props) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions({
        position: props.position,
        map: props.map
      });
    }
  }, [marker, props]);

  return null;
};

export default Marker;