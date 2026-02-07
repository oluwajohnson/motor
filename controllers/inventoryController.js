const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Inventory by Classification
 * *************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classification_id
    const data = await invModel.getInventoryByClassificationId(classification_id)

    const grid = utilities.buildClassificationGrid(data)

    res.render("inventory/classification", {
      title: `${data[0].classification_name} Vehicles`,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Inventory Detail
 * *************************** */
invCont.buildInventoryDetail = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const vehicle = await invModel.getInventoryById(inv_id)

    const detailHTML = utilities.buildVehicleDetail(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      detailHTML,
    })
  } catch (error) {
    next(error)
  }
}


///---------BUILD MANAGEMENT VIEW---------///
invCont.buildManagement = async function (req, res) {
  res.render("inventory/management", {
    title: "Inventory Management",
    errors: null,
  })
}


invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body

  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.flash("success", "Classification added successfully.")
    res.redirect("/inv/")
  } else {
    req.flash("error", "Classification could not be added.")
    res.redirect("/inv/add-classification")
  }
}

invCont.buildAddClassification = async function (req, res, next) {
  res.render("inventory/add-classification", {
    title: "Add New Classification"
  })
}


invCont.buildAddInventory = async function (req, res) {
  let classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    errors: null,
  })
}


invCont.buildAddInventory = async function (req, res) {
  res.render("inventory/add-inventory", {
    title: "Add Inventory"
  })
}



module.exports = invCont
