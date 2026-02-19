function checkEmployeeOrAdmin(req, res, next) {

  if (!res.locals.loggedin) {
    return res.redirect("/account/login")
  }

  const privilege = res.locals.accountData.account_privilege
  console.log("Check account privilege in middleware: ",res.locals.accountData.account_privilege)

  if (privilege === "Employee" || privilege === "Admin") {
    next()
  } else {
    return res.redirect("/account/login")
  }
}

module.exports = { checkEmployeeOrAdmin }
