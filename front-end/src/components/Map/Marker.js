import * as React from "react";

const Marker = (props) => {
  const [marker, setMarker] = React.useState();
  const onClick = props.onClick;

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
    if (marker && onClick) {
      marker.addListener("click", onClick);
    }
  }, [marker, onClick]);

  const position = props.position;
  const map = props.map;

  React.useEffect(() => {
    if (marker && map && position instanceof window.google.maps.LatLng) {
      marker.setOptions({
        position: position,
        map: map
      });
    }
  }, [marker, position, map]);

  return null;
};

export default Marker;