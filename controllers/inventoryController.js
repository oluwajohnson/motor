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



// invCont.buildByClassificationId = async (req, res, next) => {
//   try {
//     const classification_id = parseInt(req.params.classificationId)

//     // 🔒 guard clause
//     if (isNaN(classification_id)) {
//       const err = new Error("Invalid classification id")
//       err.status = 400
//       throw err
//     }

//     const data = await invModel.getInventoryByClassificationId(classification_id)

//     const nav = await utilities.getNav()

//     res.render("inventory/classification", {
//       title: data[0]?.classification_name || "Vehicles",
//       nav,
//       inventory: data
//     })
//   } catch (err) {
//     next(err)
//   }
// }





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
  req.flash("notice", "Inventory saved successfully.")
  res.redirect("/inv")
} else {
  req.flash("notice", "Sorry, inventory was not saved.")
  res.redirect("/inv/add-inventory")
}
}

invCont.buildAddClassification = async function (req, res, next) {
  res.render("inventory/add-classification", {
    title: "Add New Classification"
  })
}


invCont.buildAddInventory = async function (req, res) {
  const classificationSelect = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationSelect,
    errors: null,

    // 👇 sticky defaults
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
    inv_description: "",
    classification_id: null,
  })
}

invCont.buildInventory = async function (req, res, next) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav
  })
}



invCont.addInventory = async function (req, res) {
  const nav = await utilities.getNav()

  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body

  const result = await invModel.addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  )

  if (result) {
  req.flash("success", "Inventory successfully saved.")
  return res.redirect("/inv")
}
 else {
    req.flash("error", "Inventory item could not be added.")
    res.redirect("/inv/add-inventory")
  }
}






// invCont.buildAddInventory = async function (req, res) {
//   res.render("inventory/add-inventory", {
//     title: "Add Inventory"
//   })
// }



module.exports = invCont
