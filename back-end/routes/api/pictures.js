const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//load picture model
const Picture = require("../../models/Picture");
 
 
router.post("/submit", async (req, res) => {
   let loggedInUser;
    try {
     loggedInUser = jwt.verify(req.headers.authorization, keys.secretOrKey);
   } catch (error) {
     console.log("error here")
     return res.status(401).json(error);
   }
    // Create a new picture
   const newPicture = new Picture({
     tableID: req.body.tableId,
     uploaderID: loggedInUser.id,
     name: req.body.name,
     url: req.body.url
   });
 
   try {
     const picture = await newPicture.save();
 
     res.json({
       "success": true,
  
     });
   } catch(err) {
      
     res.status(400).json({error: err});
   }
   //console.log(req.data)
 });
 
 
module.exports = router;
