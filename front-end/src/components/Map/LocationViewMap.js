import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import TableMap from "./TableMap";
import TableData from "../Tables/TableData";
import Marker from "./Marker";
import TablePopup from "./TablePopup";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import * as constants from "../../constants";
import axios from "../../axiosRequests";

const render = () => {
  return (
    <CircularProgress size="100px" />
  );
};

const getTablePosition = tbl => {
  const coords = tbl.coordinateLocation.coordinates;

  return {
    lat: coords[constants.GEOJSON_LATITUDE_INDEX],
    lng: coords[constants.GEOJSON_LONGITUDE_INDEX]
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

  const search = async (e) => {
    e.preventDefault();
    try {
      let neCorner = bounds.getNorthEast();
      let swCorner = bounds.getSouthWest();

      let reqConfig = {
        params: {
          north: neCorner.lat(),
          east: neCorner.lng(),
          south: swCorner.lat(),
          west: swCorner.lng(),
        }
      }
      let response = await axios.get("api/tables/within-bounds", reqConfig);
      setTableLocations(response.data);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  const onCenterChanged = (center) => {
    setCenter({
      lat: center.lat(),
      lng: center.lng()
    });
  }

  const onZoomChanged = (zoom) => {
    setZoom(zoom);
  }
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("api/tables/all");
        setTableLocations(response.data);
      } catch (e) {
        alert("Something wrong with getting tables");
        console.log(e);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("api/tables/all");
        setTableLocations(response.data);
      } catch (e) {
        alert("Something wrong with getting tables");
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p>
        <Button onClick={centerCurrentLocation}>Use My Location</Button>
        <Button onClick={search}>Search</Button>
      </p>
      <div style={{ height: "100%" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
          <TableMap
            center={center}
            onCenterChanged={onCenterChanged}
            onZoomChanged={onZoomChanged}
            zoom={zoom}
            style={{ width: "100%", height: "500px" }}
          >
            {tableLocations.map((tbl, i) => (
              <Marker key={i} position={getTablePosition(tbl)} onClick={() => setCurrentTableId(tbl._id)} />
            ))}
          </TableMap>
          <TableData tableId={currentTableId}>
            <TablePopup onClose={() => setCurrentTableId('')} open={!!currentTableId} />
          </TableData>
        </Wrapper>
      </div>
    </>
  );
}

export default LocationViewMap;