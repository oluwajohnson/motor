const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


async function buildLogin(req, res) {
  res.render("account/login", {
    title: "Login",
    errors: null
  })
}


async function accountLogin(req, res) {
  const { account_email, account_password } = req.body

  const result = await accountModel.getAccountByEmail(account_email)
const accountData = result.rows[0]


  if (!accountData) {
    return res.render("account/login", {
      title: "Login",
      errors: [{ msg: "Invalid credentials." }]
    })
  }

  const passwordMatch = await bcrypt.compare(
    account_password,
    accountData.account_password
  )

  if (!passwordMatch) {
    return res.render("account/login", {
      title: "Login",
      errors: [{ msg: "Invalid credentials." }]
    })
  }

  // Remove password before token
  delete accountData.account_password

  const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h"
  })

  res.cookie("jwt", accessToken, {
    httpOnly: true
  })

  return res.redirect("/account/")
}

async function buildManagement(req, res) {
  res.render("account/management", {
    title: "Account Management",
    accountData: res.locals.accountData
  })
}


module.exports = {
  buildLogin,
  accountLogin,
  buildManagement

}
