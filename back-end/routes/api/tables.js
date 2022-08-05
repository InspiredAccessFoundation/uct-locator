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

  let coordLat = req.body.latitude;
  let coordLng = req.body.longitude;

  const newPoint = {
    type: "Point",
    coordinates: [coordLng, coordLat]
  };

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
    coordinateLocation: newPoint,
    userId: loggedInUser.id,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    locationWithinBuilding: req.body.locationWithinBuilding,
    tableNotes: req.body.tableNotes,
    hours: req.body.hours,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    additionalInfo: req.body.additionalInfo,
    status: 'submitted'
  });

  if (req.body.restroomType) {
    newTable.restroomType = req.body.restroomType;
  }

  if (req.body.tableStyle) {
    newTable.tableStyle = req.body.tableStyle
  }

  if (req.body.publiclyAccessible) {
    newTable.publiclyAccessible = req.body.publiclyAccessible
  }

  try {
    const table = await newTable.save();
    res.json({
      "success": true,
      "tableId": table._id
    });
  } catch(err) {
    res.status(400).json({error: err});
  }
});
 
// @route GET api/tables/all
// @desc Get all tables (just coordinates and ids)
// @access Public
router.get("/all", async (req, res) => {
  let allTables = await Table.find({}, '_id coordinateLocation');
  res.json(allTables);
});

// @route GET api/tables/within-bounds
// @desc Get tables (just coordinates and ids) within a bounding box
// @access Public
router.get("/within-bounds", async (req, res) => {
  let where = {
    coordinateLocation: {
      $geoWithin: {
        $box: [
          [req.query.west, req.query.south],
          [req.query.east, req.query.north]
        ]
      }
    } 
  };

  let select = '_id coordinateLocation';
  let boundedTables = await Table.find(where, select);
  res.json(boundedTables);
});

// @route GET api/tables/:id
// @desc Get data for a table by id
// @access Public
router.get("/:id", async (req, res) => {
  let tableId = req.params.id;
  let currentTable = await Table.findOne({ _id: tableId });
  res.json(currentTable);
});
 
// Export routes
module.exports = router;