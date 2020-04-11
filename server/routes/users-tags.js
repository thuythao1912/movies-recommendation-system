const express = require("express");
const router = express.Router();
const userstags_controller = require("../controllers/users-tags");
//get list
router.get("/", userstags_controller.get_UsersTags_List);
router.post("/", userstags_controller.add_UsersTags);
module.exports = router;
