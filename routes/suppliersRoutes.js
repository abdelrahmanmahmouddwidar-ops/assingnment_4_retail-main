const express = require("express");

const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier
} = require("../controllers/suppliersController");

const router = express.Router();

router.post("/", createSupplier);

router.get("/", getSuppliers);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;