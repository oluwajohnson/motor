const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.get("/type/:classification_id", invController.buildByClassificationId)
router.get("/detail/:inv_id", invController.buildInventoryDetail)

module.exports = router
