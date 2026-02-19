const express = require("express")
const router = express.Router()

const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const updateValidate = require("../utilities/account-validation")

// router.get("/login", accountController.buildLogin)

function checkLogin(req, res, next) {
  if (!req.session.loggedin) {
    return res.redirect("/account/login")
  }
  next()
}


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
  "/update-password",
  utilities.handleErrors(accountController.updatePassword)
)


router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)

// Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
)


router.get("/", checkLogin, accountController.accountManagement)

// router.get("/logout", (req, res) => {
//   res.clearCookie("jwt")
//   res.redirect("/")
// })

router.get("/logout", accountController.logout)

router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
)

router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)


// router.get("/logout", accountController.logout)





module.exports = router