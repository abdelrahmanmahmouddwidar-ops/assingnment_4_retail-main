const express = require("express");

const {
  createSale,
  getSales,
  getSalesByProduct
} = require("../controllers/salesController");

const router = express.Router();

router.post("/", createSale);

router.get("/", getSales);

router.get("/product/:productId", getSalesByProduct);

module.exports = router;