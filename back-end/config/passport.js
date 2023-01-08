// Tools to use
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

// Other constants
const User = mongoose.model("users");
const keys = require("./keys");
const opts = {};

// Get token and key
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// export
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Find current
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
      .catch(err => console.log(err));
    })
  );
};