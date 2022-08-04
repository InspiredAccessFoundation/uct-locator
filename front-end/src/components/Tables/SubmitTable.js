import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "../../actions/authActions";
// import setAuthToken from "../../actions/authActions";
// import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";



 const SubmitTable = () => {

  const [locationName, setLocationName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [locationWithinBuilding, setLocationWithinBuilding] = useState("")
  const [hours, setHours] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [additionalInformation, setAdditionalInformation] = useState("")
  const [restroomType, setRestroomType] = useState("")
  const [tableStyle, setTableStyle] = useState("")
  const [publiclyAccessible, setPubliclyAccessible] = useState("")
  
  

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(locationName);
    const newTable = {
      locationName: locationName,
      latitude: latitude,
      longitude:longitude,
      streetAddress:streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      locationWithinBuilding: locationWithinBuilding,
      hours: hours,
      contactPhone: contactPhone,
      contactEmail: contactEmail,
      additionalInformation: additionalInformation,
      restroomType: restroomType,
      tableStyle: tableStyle,
      publiclyAccessible:publiclyAccessible
    };
    axios
    .post("/api/tables/submit", newTable)
    .then((res) => {
      console.log(res.data)
  }).catch((error) => {
    alert("something went wrong");

      console.log(error)
  });
   
}


 return (
   <Container maxWidth="sm">
       <div style={{ marginTop: "4rem" }} className="row">
             
             <h2>
              <b>Submit Table</b>
             </h2>
           <form className='form' onSubmit={handleSubmit}>
             <Stack spacing = {1}>
               <TextField id="locationName" label="Location Name" variant="outlined"
                onChange={(e) => setLocationName(e.target.value)}
               value={locationName}
               />

                <TextField id="latitude" label="Latitude" variant="outlined"
                onChange={(e) => setLatitude(e.target.value)}
               value={latitude}
               />

                <TextField id="longitude" label="Longitude" variant="outlined"
                onChange={(e) => setLongitude(e.target.value)}
               value={longitude}
               />




 
               <TextField id="streetAddress" label="Street Address" variant="outlined"
               onChange={(e) => setStreetAddress(e.target.value)}
               value={streetAddress}
                 />

               <TextField id="city" label="City" variant="outlined"
               onChange={(e) => setCity(e.target.value)}
               value={city}
               />
 
               <TextField id="state" label="State" variant="outlined"
               onChange={(e) => setState(e.target.value)}
               value={state}
                 />
                 <TextField id="zipcode" label="Zipcode" variant="outlined"
                 onChange={(e) => setZipcode(e.target.value)}
                 value={zipcode}
                 />
                 <TextField id="locationWithinBuilding" label="Location Within Building" variant="outlined"
                 onChange={(e) => setLocationWithinBuilding(e.target.value)}
                 value={locationWithinBuilding}
                 />
                <TextField id="hours" label="Operating Hours" variant="outlined"
                onChange={(e) => setHours(e.target.value)}
                value={hours}
               />
               <TextField id="contactPhone" label="Contact Phone " variant="outlined"
               onChange={(e) => setContactEmail(e.target.value)}
               value={contactPhone}
               />
               <TextField id="contactEmail" label="Contact Email " variant="outlined"
               onChange={(e) => setContactPhone(e.target.value)}
               value={contactEmail}
               />
                <TextField id="additionalInformation" label="Additional Information" variant="outlined"
                onChange={(e) => setAdditionalInformation(e.target.value)}
                value={additionalInformation}
               />


              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="restroomType">Restroom Type</InputLabel>
        <Select
          labelId="restroomType"
          id="restroomType"
          label="Restroom Type"
          onChange={(e) => setRestroomType(e.target.value)}
                value={restroomType}
          
       
        >
          <MenuItem value={"men"}>Men</MenuItem>
          <MenuItem value={"women"}>Women</MenuItem>
          <MenuItem value={"family"}>Family</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>


    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="tableStyle">Table Style</InputLabel>
        <Select
          labelId="tableStyle"
          id="tableStyle"
          label="Table Style"
          onChange={(e) => setTableStyle(e.target.value)}
                value={tableStyle}
       
        >
          <MenuItem value={"adjustable"}>Adjustable</MenuItem>
          <MenuItem value={"fixed-height"}> Fixed-Height</MenuItem>
          <MenuItem value={"portable"}>Portable</MenuItem>

        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="publiclyAccessible">Public Accessibility</InputLabel>
        <Select
          labelId="publiclyAccessible"
          id="publiclyAccessible"
          label="Public Accessibility"
          onChange={(e) => setPubliclyAccessible(e.target.value)}
              value={publiclyAccessible}
        >
          <MenuItem value={"Accessible to the Public"}>Accessible to the Public</MenuItem>
          <MenuItem value={"Patrons/Patients Only"}>Patrons/Patients Only</MenuItem>
         

        </Select>
      </FormControl>
    </Box>

               <Button
                 variant="contained"
                 type="submit"
               >
                
                 Submit
                
               </Button>
               </Stack>
            </form>
         </div>
     </Container>
 
 
 )
 }

 export default SubmitTable;