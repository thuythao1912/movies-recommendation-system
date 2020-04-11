const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users");

//get list
router.get("/", users_controller.get_Users_List);
router.post("/", users_controller.add_User);
router.post("/login", users_controller.checkLogin);
router.get("/:id", users_controller.get_User);
router.delete("/:id", users_controller.delete_User_By_Id);
module.exports = router;
