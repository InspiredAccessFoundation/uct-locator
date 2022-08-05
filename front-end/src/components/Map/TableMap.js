import React from "react";
import { MAP_ZOOM_START, MAP_CENTER_LAT_START, MAP_CENTER_LNG_START, DEFAULT_MAP_STYLES } from "../../constants";
import { Button } from "@mui/material";

const TableMap = (props) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  let zoom = props.zoom || MAP_ZOOM_START;
  let center = props.center;
  if (!center) {
    center =  {
      lat: MAP_CENTER_LAT_START,
      lng: MAP_CENTER_LNG_START
    };
  }

  let mapStyles = props.mapStyles;
  if (!mapStyles) {
    mapStyles = DEFAULT_MAP_STYLES;
  }
  
  React.useEffect(() => {
    if (ref.current && !map) {
      let map = new window.google.maps.Map(ref.current, {});
      map.setOptions({
        styles: mapStyles
      });

      map.setZoom(zoom);
      map.setCenter(center);

      setMap(map);

    }
  }, [ref, map, mapStyles, zoom, center]);

  const onClick = props.onClick;
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
  }, [map, onClick, onBoundsChanged, onCenterChanged, onZoomChanged]);

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