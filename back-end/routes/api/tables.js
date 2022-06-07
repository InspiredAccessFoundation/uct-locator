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

  // Create a new table
  const newTable = new Table({
    location: req.body.location,
    name: req.body.name,
    description: req.body.description,
    status: 'submitted',
    tableType: req.body.tableType,
    restroomType: req.body.restroomType,
    hours: req.body.hours,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    publiclyAccessible: req.body.publiclyAccessible
  });

  newTable.save()
    .then(table => res.json(table))
    .catch(err => console.log(err));
});

// Export routes
module.exports = router;