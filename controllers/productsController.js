const pool = require("../db");

const createProduct = async (req, res) => {
  try {
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;

    if (!ProductName || Price === undefined || StockQuantity === undefined || !SupplierID) {
      return res.status(400).json({
        message: "All product fields are required"
      });
    }

    if (Price <= 0 || StockQuantity < 0) {
      return res.status(400).json({
        message: "Price must be greater than 0 and stock cannot be negative"
      });
    }

    const [result] = await pool.query(
      "INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)",
      [ProductName, Price, StockQuantity, SupplierID]
    );

    res.status(201).json({
      message: "Product created successfully",
      ProductID: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Products ORDER BY ProductID"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;

    if (!ProductName || Price === undefined || StockQuantity === undefined || !SupplierID) {
      return res.status(400).json({
        message: "All product fields are required"
      });
    }

    if (Price <= 0 || StockQuantity < 0) {
      return res.status(400).json({
        message: "Price must be greater than 0 and stock cannot be negative"
      });
    }

    const [result] = await pool.query(
      "UPDATE Products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?",
      [ProductName, Price, StockQuantity, SupplierID, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM Products WHERE ProductID = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message
    });
  }
};

const updateBreadPrice = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread'"
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Bread not found"
      });
    }

    res.json({
      message: "Bread price updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Bread price",
      error: error.message
    });
  }
};

const deleteEggs = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM Products WHERE ProductName = 'Eggs'"
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Eggs not found"
      });
    }

    res.json({
      message: "Eggs deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Eggs",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateBreadPrice,
  deleteEggs
};
