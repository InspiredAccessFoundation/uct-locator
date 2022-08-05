import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Link } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import LocationSelectMap from "../Map/LocationSelectMap";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";

const SubmitTable = () => {
  const theme = useTheme();
  const smallWidth = useMediaQuery(theme.breakpoints.down('sm'));
  let tableMapStyle = {};

  if (smallWidth) {
    tableMapStyle.height = "350px";
  }

  const [locationName, setLocationName] = useState("")
  const [latitude, setLatitude] = React.useState("")
  const [longitude, setLongitude] = React.useState("")
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

  const [submittedTableId, setSubmittedTableId] = useState("");

  const setCoordinates = (coords) => {
    setLatitude(coords.lat());
    setLongitude(coords.lng());
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const newTable = {
      locationName: locationName,
      latitude: latitude,
      longitude: longitude,
      streetAddress: streetAddress,
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
      publiclyAccessible: publiclyAccessible
    };

    try {
      const res = await axios.post("/api/tables/submit", newTable);
      setSubmittedTableId(res.data.tableId);
    } catch (error) {
      alert("Something went wrong...");
      console.log(error);
    }
  }

  const handleSuccessClose = () => {
    setSubmittedTableId("");
    setLocationName("");
    setLatitude("");
    setLongitude("");
    setStreetAddress("");
    setCity("");
    setState("");
    setZipcode("");
    setLocationWithinBuilding("");
    setHours("");
    setContactPhone("");
    setContactEmail("");
    setAdditionalInformation("");
    setRestroomType("");
    setTableStyle("");
    setPubliclyAccessible("");
  }

  return (
    <>
      <Container maxWidth="md">
        <div style={{ marginTop: "1rem" }} className="row">
          <h2>Submit Table</h2>
          <p>Enter information for your table here.</p>
          <form className='form' onSubmit={handleSubmit}>
            <Stack spacing={1}>
              <TextField id="locationName" label="Location Name" variant="outlined"
                onChange={(e) => setLocationName(e.target.value)}
                value={locationName} required
              />
              <Accordion id="submit-select-location">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography>Select Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <LocationSelectMap
                    onCenterChanged={setCoordinates}
                    tableMapStyle={tableMapStyle}
                  />
                </AccordionDetails>
              </Accordion>
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
                onChange={(e) => setContactPhone(e.target.value)}
                value={contactPhone} type="tel"
              />
              <TextField id="contactEmail" label="Contact Email " variant="outlined"
                onChange={(e) => setContactEmail(e.target.value)}
                value={contactEmail} type="email"
              />
              <TextField id="additionalInformation" label="Additional Information" variant="outlined"
                onChange={(e) => setAdditionalInformation(e.target.value)}
                value={additionalInformation} multiline minRows={2}
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
      <Dialog
        open={!!submittedTableId}
        onClose={handleSuccessClose}
        align="center"
      >
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: "1em" }}>
            Your table has been submitted.
          </DialogContentText>
          <DialogContentText sx={{ paddingBottom: ".5em" }}>
            <Link href={`/view-table/${submittedTableId}`}>View the Table</Link>
          </DialogContentText>
          <DialogContentText>
            <Link href="#" onClick={handleSuccessClose}>Submit Another</Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SubmitTable;
