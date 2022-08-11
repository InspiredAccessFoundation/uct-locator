const Validator = require("validator");
const isEmpty = require("is-empty");

const userRegex = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/);
const passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
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

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (!userRegex.test(data.username)) {
    errors.username = "Username cannot contain spaces or special characters other than . and _ between alphanumerical characters";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!passRegex.test(data.password)) {
    errors.password = "Password must be at least 6 characters, and contain at least one uppercase and one lowercase letter, one number, and one special character";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};