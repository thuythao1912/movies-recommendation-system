const express = require("express");
const router = express.Router();
const movies_controller = require("../controllers/movies");

//get list
router.get("/", movies_controller.get_Movies_List);
router.get("/byid/:id", movies_controller.get_Movie_By_Id);
router.post("/", movies_controller.add_Movie);
router.post("/byfields", movies_controller.get_Movie_By_Fields);
module.exports = router;
