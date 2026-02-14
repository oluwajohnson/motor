const express = require("express")
const router = express.Router()

const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const updateValidate = require("../utilities/account-validation")

// router.get("/login", accountController.buildLogin)

router.get(
  "/update/:account_id",
  utilities.handleErrors(accountController.buildUpdateView)
)

router.post(
  "/update",
  updateValidate.updateRules(),
  updateValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)


router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)

// Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// router.get(
//   "/",
//   utilities.checkLogin,
//   utilities.handleErrors(accountController.buildManagement)
// )

router.get("/", 
    utilities.checkLogin,
    accountController.buildManagement
)

router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})






module.exports = router