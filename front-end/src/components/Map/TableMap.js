import React from "react";
import { Button } from "@mui/material";

const TableMap = (props) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  const zoom = props.zoom;
  const center = props.center;
  
  React.useEffect(() => {
    if (ref.current && !map) {
      let map = new window.google.maps.Map(ref.current, {});
      map.setOptions({
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          }
        ]
      });

      map.setZoom(zoom);
      map.setCenter(center);

      setMap(map);

    }
  }, [ref, map, zoom, center]);

  const onClick = props.onClick;
  const onIdle = props.onIdle;
  const style = props.style;
  const children = props.children;
  const onBoundsChanged = props.onBoundsChanged;
  const onCenterChanged = props.onCenterChanged;
  const onZoomChanged = props.onZoomChanged;

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }

      if (onBoundsChanged) {
        map.addListener("bounds_changed", () => onBoundsChanged(map.getBounds()));
      }

      if (onCenterChanged) {
        map.addListener("center_changed", () => onCenterChanged(map.getCenter()));
      }

      if (onZoomChanged) {
        map.addListener("zoom_changed", () => onZoomChanged(map.getZoom()));
      }
    }
  }, [map, onClick, onIdle, onBoundsChanged, onCenterChanged, onZoomChanged]);

  const centerCurrentLocation = e => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        map.setZoom(14);
        map.setCenter({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <>
    <Button onClick={centerCurrentLocation}>Use My Location</Button>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default TableMap;