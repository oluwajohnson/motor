const express = require("express")
const router = express.Router()

const invController = require("../controllers/inventoryController")
const utilities = require("../utilities")
const classificationValidate = require("../utilities/classification-validation")
const invValidate = require("../utilities/inventory-validation")
const authUtil = require("../utilities/auth")


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

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)




router.get(
  "/",
  authUtil.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildManagement)
)

router.get(
  "/add-inventory",
  authUtil.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddInventory)
)


module.exports = router
