/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()


const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const inventoryRoute = require("./routes/inventoryRoute")
const cookieParser = require("cookie-parser")

const errorRoute = require("./routes/errorRoute")

const utilities = require("./utilities")
const static = require("./routes/static")
const authUtil = require("./utilities/auth")
const accountRoute = require("./routes/accountRoute")



const app = express();




/* ---------- ADD THIS BLOCK ---------- */
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())
app.use(cookieParser())
// app.use(utilities.checkLogin)

app.use(authUtil.checkJWTToken)



app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})
/* ---------- END BLOCK ---------- */




app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layouts/layout")

app.use(express.static("public"));





// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: true
// }))

// app.use(flash())

// app.use((req, res, next) => {
//   res.locals.messages = req.flash()
//   next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(async (req, res, next) => {
  res.locals.nav = await utilities.getNav()
  next()
})

/* ***********************
 * Routes
 *************************/

app.get("/", (req, res) => {
  res.render("index");
});

app.use(static)

app.use("/inventory", inventoryRoute)
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)

// app.use(errorRoute)



app.get("/test", (req, res) => {
  res.send("Server routing works")
})


// 404 handler
app.use((req, res, next) => {
  const err = new Error("Sorry, page not found")
  err.status = 404
  next(err)
})



app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).render("errors/error", {
    title: err.status === 404 ? "Page Not Found" : "Server Error",
    message: err.message,
     error: process.env.NODE_ENV === "development" ? err : {}
  })
})











// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack)

//   const status = err.status || 500
//   const title = status === 404 ? "Page Not Found" : "Server Error"

//   res.status(status).render("errors/error", {
//     title,
//     message: err.message,
//   })
// })






/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT|| 5500;
const host = process.env.HOST || 'localhost';

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
