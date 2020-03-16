const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users");

//get list
router.get("/", users_controller.get_Users_List);
router.post("/", users_controller.add_User);
router.post("/login", users_controller.checkLogin);
router.get("/:id", users_controller.get_User);
module.exports = router;
