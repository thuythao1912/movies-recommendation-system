const express = require("express");
const router = express.Router();
let pagination = require("../controllers/pagination");

router.get("/", pagination.getTotalPage);
module.exports = router;
