const express = require("express");

const {
  getTotalQuantitySold,
  getHighestStockProduct,
  getSuppliersStartingWithF,
  getNeverSoldProducts,
  getAllSalesWithProductName
} = require("../controllers/reportsController");

const router = express.Router();

router.get("/total-sold", getTotalQuantitySold);

router.get("/highest-stock", getHighestStockProduct);

router.get("/suppliers-f", getSuppliersStartingWithF);

router.get("/never-sold", getNeverSoldProducts);

router.get("/sales-details", getAllSalesWithProductName);

module.exports = router;