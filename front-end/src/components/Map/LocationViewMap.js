import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import TableMap from "./TableMap";
import Marker from "./Marker";
import TablePopup from "./TablePopup";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const render = (status) => {
  return (
    <CircularProgress size="100px" />
  );
};

const getTablePosition = tbl => {
  const coords = tbl.coordinateLocation.coordinates;

  return {
    lat: coords[1],
    lng: coords[0]
  }
};

const LocationViewMap = () => {
  const [zoom, setZoom] = React.useState(Number(localStorage.getItem('zoom')) || 3);
  const [center, setCenter] = React.useState({
    lat: Number(localStorage.getItem('center-lat')) || 40,
    lng: Number(localStorage.getItem('center-lng')) || -97,
  });

  const [currentTableId, setCurrentTableId] = React.useState('');
  const [tableLocations, setTableLocations] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem('zoom', zoom);
  }, [zoom]);

  React.useEffect(() => {
    localStorage.setItem('center-lat', center.lat);
    localStorage.setItem('center-lng', center.lng);
  }, [center]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get("api/tables/all");
        setTableLocations(response.data);
      } catch (e) {
        console.log(e);
        return [];
      }
    }
    
    fetchData();
  }, []);

  const centerCurrentLocation = e => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        setZoom(14);
        setCenter({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const onIdle = (m) => {
    let zoom = m.getZoom();
    if (zoom) {
      setZoom(zoom);
    }

    let center = m.getCenter();
    if (center) {
      setCenter(center.toJSON());
    }
  };

  return (
    <>
      <p><Button onClick={centerCurrentLocation}>Use My Location</Button></p>
      <div style={{ height: "100%" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
          <TableMap
            center={center}
            onIdle={onIdle}
            zoom={zoom}
            style={{ width: "100%", height: "500px" }}
          >
            {tableLocations.map((tbl, i) => (
              <Marker key={i} position={getTablePosition(tbl)} onClick={() => setCurrentTableId(tbl._id)} />
            ))}
          </TableMap>
          <TablePopup tableId={currentTableId} onClose={() => setCurrentTableId('')} />
        </Wrapper>
      </div>
    </>
  );
}

export default LocationViewMap;