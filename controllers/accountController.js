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


// async function accountLogin(req, res) {
//   const { account_email, account_password } = req.body

//   const result = await accountModel.getAccountByEmail(account_email)
// const accountData = result.rows[0]


//   if (!accountData) {
//     return res.render("account/login", {
//       title: "Login",
//       errors: [{ msg: "Invalid credentials." }]
//     })
//   }

//   const passwordMatch = await bcrypt.compare(
//     account_password,
//     accountData.account_password
//   )

//   if (!passwordMatch) {
//     return res.render("account/login", {
//       title: "Login",
//       errors: [{ msg: "Invalid credentials." }]
//     })
//   }

//   // Remove password before token
//   delete accountData.account_password

//   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "1h"
//   })

//   res.cookie("jwt", accessToken, {
//     httpOnly: true
//   })

//   return res.redirect("/account/")
// }

async function accountManagement(req, res) {
  res.render("account/account-management", {
    title: "Account Management"
  })
}


async function accountLogin(req, res) {
  const { account_email, account_password } = req.body

  console.log("Login attempt:", account_email)

  // 1️⃣ Check database for email
  const result = await accountModel.getAccountByEmail(account_email)

  if (!result || result.rows.length === 0) {
    console.log("❌ No account found with that email")
    return res.send("Login failed: Email not found in database")
  }

  const accountData = result.rows[0]
  console.log("✅ Account found in database:", accountData.account_email)

  // 2️⃣ Check password
  const passwordMatch = await bcrypt.compare(
    account_password,
    accountData.account_password
  )


  if (passwordMatch) {
     console.log("✅ Password correct — LOGIN SUCCESS")

  // 3️⃣ Store session
  req.session.loggedin = true
  req.session.accountData = accountData

  const accessToken = jwt.sign({
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_privilege: accountData.account_privilege
  },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "1h" })

  res.cookie("jwt", accessToken, { httpOnly: true })

  return res.redirect("/account")
}


  if (!passwordMatch) {
    console.log("❌ Password does NOT match")
    return res.send("Login failed: Incorrect password")
  }

 

  // // 4️⃣ Redirect
  // return res.redirect("/account")
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
    account_password,
    account_privilege
  } = req.body

  try {
    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(account_password, 10)

    // 💾 SAVE TO DATABASE
    await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword,
      account_privilege
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



async function logout(req, res) {

  // clear JWT cookie
  res.clearCookie("jwt")

  // destroy session if using express-session
  if (req.session) {
    req.session.destroy(() => {
      return res.redirect("/")
    })
  } else {
    return res.redirect("/")
  }
}



async function buildUpdateAccount(req, res) {
  const account_id = req.params.account_id

  const accountData = await accountModel.getAccountById(account_id)

  res.render("account/update", {
    title: "Update Account Information",
    accountData,
    messages: req.flash()
  })
}

async function updateAccount(req, res) {
  const {
    account_id,
    account_firstname,
    account_lastname,
    account_email,
    account_privilege
  } = req.body

  try {
    // update record in database
    const result = await accountModel.updateAccount(
      account_id,
      account_firstname,
      account_lastname,
      account_email,
      account_privilege
    )

console.log("LOGIN SUCCESS:", account_firstname)

    if (result.rowCount > 0) {
    
      req.flash("notice", "Account updated successfully.")
      return res.redirect("/account/")
    } else {
      req.flash("notice", "Update failed.")
      return res.redirect(`/account/update/${account_id}`)
    }

  } catch (error) {
    console.error("Update error:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Account update failed."
    })
  }
}

async function updatePassword(req, res) {
  const { account_id, account_password } = req.body

  try {
    // 🔐 hash new password
    const hashedPassword = await bcrypt.hash(account_password, 10)

    // 💾 update in database
    const result = await accountModel.updatePassword(
      account_id,
      hashedPassword
    )

    if (result.rowCount > 0) {
      req.flash("notice", "Password updated successfully.")
      return res.redirect("/account/login")
    } else {
      req.flash("notice", "Password update failed.")
      return res.redirect(`/account/update/${account_id}`)
    }

  } catch (error) {
    console.error("Password update error:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Password update failed."
    })
  }
}




module.exports = {
  buildRegister,
  registerAccount,
  buildLogin,
  accountLogin,
  buildManagement,
  logout,
  accountManagement,
  buildUpdateView:buildUpdateAccount,
  updateAccount,
  updatePassword

}
