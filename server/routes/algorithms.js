const express = require("express");
const router = express.Router();
const algorithms_controller = require("../controllers/algorithms");

//get list
router.post("/", algorithms_controller.get_Recommendation_List);
module.exports = router;
