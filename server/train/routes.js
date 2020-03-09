const express = require("express");
const router = express.Router();
const controller = require("./controllers");

//get list
router.get("/", controller.get_Models_List);
router.get("/:id", controller.get_Model_By_Id);
router.post("/", controller.add_Model);
router.put("/bymovie/:id", controller.update_Model);
module.exports = router;
