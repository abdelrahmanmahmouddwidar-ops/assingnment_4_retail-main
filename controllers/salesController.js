const pool = require("../db");

const createSale = async (req, res) => {
  try {
    const { ProductID, QuantitySold, SaleDate } = req.body;

    const [result] = await pool.query(
      `INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
             VALUES (?, ?, ?)`,
      [ProductID, QuantitySold, SaleDate]
    );

    res.status(201).json({
      message: "Sale recorded successfully",
      SaleID: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getSales = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Sales"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getSalesByProduct = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Sales WHERE ProductID = ?",
      [req.params.productId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createSale,
  getSales,
  getSalesByProduct
};