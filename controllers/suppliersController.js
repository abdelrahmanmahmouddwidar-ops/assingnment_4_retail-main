const pool = require("../db");

const createSupplier = async (req, res) => {
  try {
    const { SupplierName, ContactNumber } = req.body;

    const [result] = await pool.query(
      `INSERT INTO Suppliers
            (SupplierName, ContactNumber)
            VALUES (?, ?)`,
      [SupplierName, ContactNumber]
    );

    res.status(201).json({
      message: "Supplier created successfully",
      SupplierID: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Suppliers`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { SupplierName, ContactNumber } = req.body;

    const [result] = await pool.query(
      `UPDATE Suppliers
            SET SupplierName = ?,
                ContactNumber = ?
            WHERE SupplierID = ?`,
      [
        SupplierName,
        ContactNumber,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.json({
      message: "Supplier updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM Suppliers
            WHERE SupplierID = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.json({
      message: "Supplier deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier
};