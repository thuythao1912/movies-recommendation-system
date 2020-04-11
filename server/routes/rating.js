const express = require("express");
const router = express.Router();
const rating_controller = require("../controllers/rating");
//get list
router.get("/", rating_controller.get_Rating_List);
router.post("/", rating_controller.add_Rating);
router.get("/bymovie/:movie", rating_controller.get_List_By_Movie);
router.delete("/byobject", rating_controller.delete_List_By_Movie);
module.exports = router;
