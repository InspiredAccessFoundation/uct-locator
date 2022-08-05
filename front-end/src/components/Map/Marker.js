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
    let positionSetLiteral = !!position.lat && !!position.lng;
    let positionSetLatLng = position instanceof window.google.maps.LatLng;
    
    if (marker && map && (positionSetLiteral || positionSetLatLng)) {
      marker.setOptions({
        position: position,
        map: map
      });
    }
  }, [marker, position, map]);

  return null;
};

export default Marker;