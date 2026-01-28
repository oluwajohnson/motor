/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")

const static = require("./routes/static")
const app = express();
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layouts/layout")

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});


/* ***********************
 * Routes
 *************************/
app.use(static)
app.use(errorRoute)
app.use("/inventory", inventoryRoute)



app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).render("errors/error", {
    title: err.status === 404 ? "Page Not Found" : "Server Error",
    message: err.message
  })
})

app.use((req, res, next) => {
  const err = new Error("Sorry, page not found")
  err.status = 404
  next(err)
})








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
