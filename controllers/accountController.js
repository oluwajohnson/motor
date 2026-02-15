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


async function registerAccount(req, res) {
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password
  } = req.body

  try {
    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(account_password, 10)

    // 💾 SAVE TO DATABASE
    await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )

    req.flash("notice", "Registration successful. Please log in.")
    res.redirect("/account/login")

  } catch (error) {
    res.status(500).render("account/register", {
      title: "Register",
      errors: [{ msg: "Registration failed." }]
    })
  }
}

async function buildRegister(req, res) {
  res.render("account/register", {
    title: "Register"
  })
}

// const bcrypt = require("bcryptjs")

// const hashedPassword = await bcrypt.hash(account_password, 10)

// await accountModel.registerAccount(
//   account_firstname,
//   account_lastname,
//   account_email,
//   hashedPassword
// )


module.exports = {
  buildRegister,
  registerAccount,
  buildLogin,
  accountLogin,
  buildManagement

}
