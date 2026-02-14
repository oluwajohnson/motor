const authUtil = {}
const jwt = require("jsonwebtoken")

// Check token on every request
authUtil.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = jwt.verify(
        req.cookies.jwt,
        process.env.ACCESS_TOKEN_SECRET
      )

      res.locals.loggedin = true
      res.locals.accountData = decoded
    } catch (error) {
      res.locals.loggedin = false
    }
  } else {
    res.locals.loggedin = false
  }
  next()
}


authUtil.checkEmployeeOrAdmin = (req, res, next) => {
  if (!res.locals.accountData) {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }

  const type = res.locals.accountData.account_type

  if (type === "Employee" || type === "Admin") {
    return next()
  }

  req.flash("notice", "You are not authorized.")
  return res.redirect("/account/login")
}



module.exports = authUtil
