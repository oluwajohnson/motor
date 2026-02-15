const { body, validationResult } = require("express-validator")

const updateRules = () => {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("First name is required."),

    body("account_lastname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Last name is required."),

    body("account_email")
      .isEmail()
      .withMessage("A valid email is required.")
  ]
}

const checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("account/update", {
      title: "Update Account",
      errors,
      accountData: req.body
    })
  }
  next()
}




const registerRules = () => {
  return [
    body("account_password")
      .isLength({ min: 12 })
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[!@#$%^&*]/)
      .withMessage(
        "Password must be at least 12 characters and include 1 capital letter, 1 number, and 1 special character."
      )
  ]
}


module.exports = {
  updateRules,
  checkUpdateData,
  registerRules
}
