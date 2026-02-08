const { body, validationResult } = require("express-validator")
const utilities = require(".")

const invValidate = {}

/* Rules */
invValidate.inventoryRules = () => {
  return [
    body("classification_id")
      .notEmpty()
      .withMessage("Classification is required."),

    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Make is required."),

    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Model is required."),

    body("inv_year")
      .isInt({ min: 1900 })
      .withMessage("Provide a valid year."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),

    body("inv_image").notEmpty(),
    body("inv_thumbnail").notEmpty(),

    body("inv_price")
      .isFloat()
      .withMessage("Provide a valid price."),

    body("inv_miles")
      .isInt()
      .withMessage("Provide valid mileage."),

    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Color is required.")
  ]
}

/* Check results */
invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classificationSelect =
      await utilities.buildClassificationList(req.body.classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

module.exports = invValidate
