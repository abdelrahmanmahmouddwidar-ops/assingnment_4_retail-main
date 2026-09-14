const pool = require("../db");

const getTotalQuantitySold = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT 
                p.ProductID,
                p.ProductName,
                COALESCE(SUM(s.QuantitySold), 0) AS TotalQuantitySold
            FROM Products p
            LEFT JOIN Sales s ON p.ProductID = s.ProductID
            GROUP BY p.ProductID, p.ProductName
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getHighestStockProduct = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT *
            FROM Products
            ORDER BY StockQuantity DESC
            LIMIT 1
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getSuppliersStartingWithF = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT *
            FROM Suppliers
            WHERE SupplierName LIKE 'F%'
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getNeverSoldProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT p.*
            FROM Products p
            LEFT JOIN Sales s ON p.ProductID = s.ProductID
            WHERE s.ProductID IS NULL
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getAllSalesWithProductName = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT 
                p.ProductName,
                s.QuantitySold,
                s.SaleDate
            FROM Sales s
            INNER JOIN Products p ON s.ProductID = p.ProductID
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getTotalQuantitySold,
  getHighestStockProduct,
  getSuppliersStartingWithF,
  getNeverSoldProducts,
  getAllSalesWithProductName
};