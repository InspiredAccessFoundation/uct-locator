const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSubmitTableInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  let dataCop = {};
  for (const prop in data) {
    dataCop[prop] = !isEmpty(data[prop]) ? data[prop] : "";
  }

  // Empty checks
  if (Validator.isEmpty(dataCop.locationName)) {
    errors.locationName = "Location field is required";
  }

  if (Validator.isEmpty(dataCop.latitude)) {
    errors.latitude = "Latitude field is required";
  }

  if (Validator.isEmpty(dataCop.longitude)) {
    errors.longitude = "Longitude field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};