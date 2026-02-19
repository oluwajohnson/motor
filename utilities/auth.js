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




// authUtil.checkJWT = (req, res, next) => {

//   const token = req.cookies.jwt

//   if (!token) return next()

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     res.locals.accountData = decoded
//     res.locals.loggedin = true
//   } catch (err) {
//     res.locals.loggedin = false
//   }

//   next()
// }





authUtil.checkEmployeeOrAdmin = (req, res, next) => {

  // user must be logged in
  if (!res.locals.loggedin) {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }

  if (!res.locals.accountData) {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
console.log("Check account privilege in Auth: ",res.locals.accountData.account_privilege)
  const type = res.locals.accountData.account_privilege

  if (type === "Employee" || type === "Admin") {
    return next()
  }

  req.flash("notice", "You are not authorized.")
  return res.redirect("/account/login")
}



module.exports = authUtil
