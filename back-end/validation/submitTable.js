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

  if (!dataCop.latitude || !dataCop.longitude) {
    errors.coordinateLocation = "A location must be provided";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};