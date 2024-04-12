const { check } = require("express-validator");
const { handleValidationErrors } = require("./validation");

const validateProject = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your project."),
  check("inHandsDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an in-hands date for your project."),
  check("eventDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an event date for your project."),
  handleValidationErrors,
];
module.exports = {
  validateProject,
};
