const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateBreadPrice,
  deleteEggs
} = require("../controllers/productsController");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/bread-price", updateBreadPrice);

router.delete("/eggs", deleteEggs);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;