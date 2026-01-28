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

module.exports = invCont
