const express = require("express");
const router = express.Router();
const genres_controller = require("../controllers/genres");

//get list
router.get("/", genres_controller.get_Genres_List);
router.get("/:id", genres_controller.get_Genre_By_Id);
router.post("/", genres_controller.add_Genre);
module.exports = router;
