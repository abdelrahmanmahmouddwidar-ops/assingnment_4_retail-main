const pool = require("../db");

const addCategory = async (req, res) => {
  try {
    await pool.query(
      "ALTER TABLE Products ADD COLUMN Category VARCHAR(100)"
    );

    res.json({
      message: "Category column added successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    await pool.query(
      "ALTER TABLE Products DROP COLUMN Category"
    );

    res.json({
      message: "Category column removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const changeContactNumber = async (req, res) => {
  try {
    await pool.query(
      "ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)"
    );

    res.json({
      message: "ContactNumber changed to VARCHAR(15)"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const makeProductNameNotNull = async (req, res) => {
  try {
    await pool.query(
      "ALTER TABLE Products MODIFY ProductName VARCHAR(255) NOT NULL"
    );

    res.json({
      message: "ProductName is now NOT NULL"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  addCategory,
  removeCategory,
  changeContactNumber,
  makeProductNameNotNull
};  