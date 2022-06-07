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
  if (Validator.isEmpty(dataCop.location)) {
    errors.location = "Location field is required";
  }
  if (Validator.isEmpty(dataCop.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(dataCop.tableType)) {
    errors.tableType = "Table Type field is required";
  }
  if (Validator.isEmpty(dataCop.description)) {
    errors.description = "Description field is required";
  }
  if (Validator.isEmpty(dataCop.restroomType)) {
    errors.restroomType = "Restroom Type field is required";
  }
  if (Validator.isEmpty(dataCop.publiclyAccessible)) {
    errors.publiclyAccessible = "Public Accessibility field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};