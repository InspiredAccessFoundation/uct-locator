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
        if (props.markerClusterer) {
          props.markerClusterer.removeMarker(marker);
        }
      }
    };
  }, [marker, props.markerClusterer]);

  React.useEffect(() => {
    if (marker && onClick) {
      marker.addListener("click", onClick);
    }
  }, [marker, onClick]);

  const position = props.position;

  React.useEffect(() => {
    let positionSetLiteral = !!position.lat && !!position.lng;
    let positionSetLatLng = position instanceof window.google.maps.LatLng;
    
    if (marker && (positionSetLiteral || positionSetLatLng)) {
      marker.setOptions({
        position: props.position
      });

      if (props.markerClusterer) {
        props.markerClusterer.addMarker(marker);
      }
    }
  }, [marker, props.position, props.markerClusterer]);

  return null;
};

export default Marker;