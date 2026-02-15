
const messages = require("./messages")
const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")

const Util = {}


Util.buildClassificationGrid = function (data) {
  let grid = '<section class="vehicle-grid">'

  data.forEach(vehicle => {
    grid += `
      <div class="vehicle-card">
        <a href="/inventory/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
               alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <hr>
        <h2>
          <a href="/inventory/detail/${vehicle.inv_id}">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h2>
        <span class="price">
          ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(vehicle.inv_price)}
        </span>
      </div>
    `
  })

  grid += "</section>"
  return grid
}




Util.buildVehicleDetail = function (vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}"
           alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong>
          ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(vehicle.inv_price)}
        </p>
        <p><strong>Mileage:</strong>
          ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles
        </p>
        <p>${vehicle.inv_description}</p>
      </div>
    </section>
  `
}


Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected"
    }
    classificationList += `>${row.classification_name}</option>`
  })
  classificationList += "</select>"
  return classificationList
}




Util.getNav = async function () {
  const data = await invModel.getClassifications()

  let nav = '<ul>'
  nav += '<li><a href="/" title="Home">Home</a></li>'

  data.rows.forEach((row) => {
    nav += `<li>
      <a href="/inv/type/${row.classification_id}" 
         title="View ${row.classification_name} vehicles">
         ${row.classification_name}
      </a>
    </li>`
  })

  nav += '</ul>'
  return nav
}





Util.handleErrors = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}




Util.handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}


// Util.checkLogin = async (req, res, next) => {
//   console.log("Loggedin value:", res.locals.loggedin)
//   next()
// }

Util.checkLogin = async (req, res, next) => {
  if (res.locals.accountData) {
    return next()
  }
  return res.redirect("/account/login")
}


Util.messages = messages




module.exports = Util