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
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
 
const SubmitPicture = () => {
 
   const [name, setName] = useState("")
   const [url, setUrl] = useState("")
   const { tableId } = useParams();
 
   const handleSubmit = (e) => {
       e.preventDefault();
       const newPicture = {
         name: name,
         url: url,
         tableId: tableId
 
       };
       axios
       .post("/api/pictures/submit", newPicture)
       .then((res) => {
         console.log(res.data)
         alert("success!")
     }).catch((error) => {
       alert("something went wrong");
  
         console.log(error)
     });
     
   }
 
   return (
       <>
         <Container maxWidth="md">
           <div style={{ marginTop: "1rem" }} className="row">
             <h2>Submit Picture</h2>
             <p>Enter information for your picture here.</p>
             <form className='form' onSubmit={handleSubmit}>
               <Stack spacing={1}>
                 <TextField id="name" label="Name" variant="outlined"
                   onChange={(e) => setName(e.target.value)}
                   value={name} required
                 />
                 <TextField id="url" label="URL" variant="outlined"
                   onChange={(e) => setUrl(e.target.value)}
                   value={url}
                 />
               <Stack direction="row" alignItems="center" spacing={2}>
                 <Button variant="contained" component="label">
                   Upload
                   <input hidden accept="image/*" multiple type="file" />
                 </Button>
                 <IconButton color="primary" aria-label="upload picture" component="label">
                   <input hidden accept="image/*" type="file" />
                   <PhotoCamera />
                 </IconButton>
               </Stack>
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
         >
           <DialogTitle>Success!</DialogTitle>
           <DialogContent>
             <DialogContentText sx={{ paddingBottom: "1em" }}>
               Your picture has been submitted.
             </DialogContentText>
             <DialogContentText sx={{ paddingBottom: ".5em" }}>
               <Link href={`/view-table/${tableId}`}>View the table</Link>
             </DialogContentText>
           </DialogContent>
         </Dialog>
       </>
     )
}
export default SubmitPicture;
 
