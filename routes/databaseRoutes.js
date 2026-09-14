const express = require("express");

const {
  addCategory,
  removeCategory,
  changeContactNumber,
  makeProductNameNotNull
} = require("../controllers/databaseController");

const router = express.Router();

router.post("/add-category", addCategory);

router.delete("/remove-category", removeCategory);

router.put("/contact-number", changeContactNumber);

router.put("/product-name-not-null", makeProductNameNotNull);

module.exports = router;