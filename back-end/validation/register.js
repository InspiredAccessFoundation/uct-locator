const Validator = require("validator");
const isEmpty = require("is-empty");

<<<<<<< Updated upstream
=======
const userRegex = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/);

>>>>>>> Stashed changes
module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

<<<<<<< Updated upstream
=======
  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (!userRegex.test(data.username)) {
    errors.username = "Username cannot contain spaces or special characters other than . and _ (cannot occur at the beginning or end of username)";
  }

>>>>>>> Stashed changes
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};