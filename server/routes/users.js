const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users");

//get list
router.get("/", users_controller.get_Users_List);

module.exports = router;
