const express = require("express");
const router = express.Router();
const movies_controller = require("../controllers/movies");

//get list
router.get("/", movies_controller.get_Movies_List);
router.get("/byid/:id", movies_controller.get_Movie_By_Id);
router.post("/", movies_controller.add_Movie);
router.post("/byfields", movies_controller.get_Movie_By_Fields);
router.delete("/:id", movies_controller.delete_Movie_By_Id);
router.put("/:id", movies_controller.update_Movie_By_Id);
router.post("/bytitle", movies_controller.get_Movies_By_Title);
router.post("/byfieldname", movies_controller.get_List_By_Field);
module.exports = router;
