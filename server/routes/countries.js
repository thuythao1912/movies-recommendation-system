const express = require("express");
const router = express.Router();
const countries_controller = require("../controllers/countries");

//get list
router.get("/", countries_controller.get_Countries_List);
router.get("/:id", countries_controller.get_Country_By_Id);
router.post("/", countries_controller.add_Country);
module.exports = router;
