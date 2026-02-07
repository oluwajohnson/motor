const { body, validationResult } = require("express-validator")

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Classification name must not contain spaces or special characters."),
  ]
}

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    req.flash("error", errors.array().map(e => e.msg))
    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      errors,
      classification_name: req.body.classification_name
    })
  }
  next()
}

module.exports = { classificationRules, checkClassificationData }
