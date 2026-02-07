const express = require("express")
const router = express.Router()

const invController = require("../controllers/inventoryController")
const utilities = require("../utilities")
const classificationValidate = require("../utilities/classification-validation")

router.get(
  "/type/:classification_id",
  utilities.handleErrors(invController.buildByClassificationId)
)

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryDetail)
)

router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

router.post(
  "/add-classification",
  classificationValidate.classificationRules(),
  classificationValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)



module.exports = router
