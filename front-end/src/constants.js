module.exports = {
  GEOJSON_LATITUDE_INDEX: 1,
  GEOJSON_LONGITUDE_INDEX: 0,
  MAP_ZOOM_START: 3,
  MAP_CENTER_LAT_START: 40,
  MAP_CENTER_LNG_START: -97,
  DEFAULT_MAP_OPTIONS: {
    styles: [
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ]
  },
  CENTER_CURRENT_LOCATION_ZOOM_DEFAULT: 14
};