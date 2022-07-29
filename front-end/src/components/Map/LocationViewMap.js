import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import TableMap from "./TableMap";
import Marker from "./Marker";
import Button from "@mui/material/Button";

const render = (status) => {
  return <h1>{status}</h1>;
};

const LocationViewMap = () => {
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 40,
    lng: -97,
  });

  const [tableLocations, setTableLocations] = React.useState([]);

  React.useEffect(() => {
    setTableLocations([{
      "pos": {
        "lat": 41.47848602493825,
        "lng": -81.77971005921842
      },
      "tableId": "1a"
    },
    {
      "pos": {
        "lat": 41.47771436351364,
        "lng": -81.78164124970914
      },
      "tableId": "1b"
    },
    {
      "pos": {
        "lat": 41.47554681429229,
        "lng": -81.77224227644933
      },
      "tableId": "1c"
    },
    {
      "pos": {
        "lat": 41.478648495430846,
        "lng": -81.80258868862971
      },
      "tableId": "1d"
    }]);
  }, [])

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
      alert("Geolocation is not supported by this browser.")
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

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
    </div>
  );

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
              <Marker key={i} position={tbl.pos} tableId={tbl.id} />
            ))}
          </TableMap>
        </Wrapper>
        {form}
      </div>
    </>
  );
}

export default LocationViewMap;