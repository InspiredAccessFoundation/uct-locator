const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// Environment variables
require('dotenv').config();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  // Form validation
  const validationResult = validateRegisterInput(req.body);
  const isValid = validationResult.isValid;
  const errors = validationResult.errors;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Try to find an existing user
  let user = await User.findOne({ email: req.body.email, username: req.body.email });

  // If there is a user, return
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  if (user) {
    return res.status(400).json({ username: "Username already exists"});
  }

  // There was not an existing user, create a new one
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      newUser.password = hash;

      // Save user
      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const validationResult = validateLoginInput(req.body);
  const isValid = validationResult.isValid;
  const errors = validationResult.errors;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

    // Find user by email
  User.findOne({ email: email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Password matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        let signOptions = {
          expiresIn: 31556926 // 1 year in seconds
        };

        let signCallback = (err, token) => {
          res.json({
            success: true,
            token: token
          });
        }

        // Sign token
        jwt.sign(payload, keys.secretOrKey, signOptions, signCallback);
      } else {
        // Wrong password
        return res.status(400).json({
          passwordincorrect: "Password incorrect"
        });
      }
    });
  });
});

// @route GET api/users/test-auth
// @desc Get information about logged in user
// @access Private
router.get("/test-auth", (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, keys.secretOrKey);
    res.json({token:'verified', id: decoded.id, name: decoded.name});
  } catch {
    res.json({token:'unverified'});
  }
});

// Export routes
module.exports = router;