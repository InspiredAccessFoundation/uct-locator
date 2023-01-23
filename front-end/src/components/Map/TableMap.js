import React from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import constants from "../../constants";
import { Button, Container, Box } from "@mui/material";
import GpsFixedTwoTone from "@mui/icons-material/GpsFixedTwoTone";
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import Chip from '@mui/material/Chip'
import Icon from '@mui/material/Icon';
import CircularProgress from "@mui/material/CircularProgress";
import { SET_MAP_SHOWING } from "../../actions/types";
import store from "../../store";

import "./TableMap.css";

const TableMapNew = (props) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  const [markerClusterer, setMarkerClusterer] = React.useState();
  const [autocomplete, setAutocomplete] = React.useState();
  const { style, children, onBoundsChanged, onCenterChanged, onZoomChanged, selectingLocation } = props;

  let zoom = props.zoom || constants.MAP_ZOOM_START;
  let center = props.center;
  if (!center) {
    center = {
      lat: constants.MAP_CENTER_LAT_START,
      lng: constants.MAP_CENTER_LNG_START
    };
  }

  let mapOptions = props.mapOptions;
  if (!mapOptions) {
    mapOptions = constants.DEFAULT_MAP_OPTIONS;
  }

  React.useEffect(() => {
    store.dispatch({
      type: SET_MAP_SHOWING,
      payload: true
    });
    return function cleanup() {
      store.dispatch({
        type: SET_MAP_SHOWING,
        payload: false
      });
    };
  }, [])

  React.useEffect(() => {
    if (ref.current && !map) {
      let map = new window.google.maps.Map(ref.current, {
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      });
      map.setOptions(mapOptions);
      map.setZoom(zoom);
      map.setCenter(center);

      setMap(map);
      setMarkerClusterer(new MarkerClusterer({ map }));
      const input = document.getElementById("searchbar");
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      setAutocomplete(autocomplete);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        map.fitBounds(place.geometry.viewport);
      });
    }
  }, [ref, map, mapOptions, zoom, center]);

  React.useEffect(() => {
    if (map) {
      window.google.maps.event.clearListeners(map, "click");

      map.addListener("click", e => {
        if (selectingLocation && e.placeId) {
          e.stop();
          map.setCenter(e.latLng);
        }
      })

      if (onBoundsChanged) {
        map.addListener("bounds_changed", () => onBoundsChanged(map.getBounds()));
      }

      if (onCenterChanged) {
        map.addListener("center_changed", () => onCenterChanged(map.getCenter()));
      }

      if (onZoomChanged) {
        map.addListener("zoom_changed", () => {
          onZoomChanged(map.getZoom());
          markerClusterer.render();
        });
      }
    }
  }, [map, onBoundsChanged, onCenterChanged, onZoomChanged, selectingLocation, markerClusterer]);

  const filterClick = e => {
    e.preventDefault();
  }

  const centerCurrentLocation = e => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        // Zoom in if the map isn't already zoomed past the default
        if (map.getZoom() < constants.CENTER_CURRENT_LOCATION_ZOOM_DEFAULT) {
          map.setZoom(constants.CENTER_CURRENT_LOCATION_ZOOM_DEFAULT);
        }

        map.setCenter({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const centerMarkerImg = (
    <img
      src="https://maps.gstatic.com/mapfiles/markers/marker.png"
      alt="marker"
      style={{ position: "absolute", top: "calc(50% - 35px)", left: "calc(50% - 10px)", zIndex: "1" }}
    />
  );

  return (
    <Container maxWidth={false} disableGutters>
      <input id="searchbar" style={{ display: "none" }}></input>
      <Box>
        {selectingLocation && centerMarkerImg}
        <div ref={ref} style={style} />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            return React.cloneElement(child, { markerClusterer });
          }
        })}
      </Box>
    </Container>
  );
};

export default TableMapNew;
