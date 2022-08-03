const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateSubmitTableInput = require("../../validation/submitTable");

// Load Table model
const Table = require("../../models/Table");

// @route POST api/tables/submit
// @desc Submit a table
// @access Private
router.post("/submit", async (req, res) => {
  // Form validation
  const validationResult = validateSubmitTableInput(req.body);
  const isValid = validationResult.isValid;
  const errors = validationResult.errors;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get user
  let loggedInUser;

  try {
    loggedInUser = jwt.verify(req.headers.authorization, keys.secretOrKey);
  } catch (error) {
    return res.status(401).json(error);
  }

  // Create a new table
  const newTable = new Table({
    locationName: req.body.locationName,
    userId: loggedInUser.id,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    locationWithinBuilding: req.body.locationWithinBuilding,
    restroomType: req.body.restroomType,
    coordinateLocation: req.body.coordinateLocation,
    tableStyle: req.body.tableStyle,
    tableNotes: req.body.tableNotes,
    publiclyAccessible: req.body.publiclyAccessible,
    hours: req.body.hours,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    additionalInfo: req.body.additionalInfo,
    status: 'submitted'
  });

  newTable.save()
    .then(table => res.json({
      "success": true,
      "data": table
    }))
    .catch(err => res.status(500).json({error: err}));
});

// Export routes
module.exports = router;