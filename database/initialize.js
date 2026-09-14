const mysql = require("mysql2/promise");

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root"
  });

  await connection.query("CREATE DATABASE IF NOT EXISTS retail");

  await connection.end();

  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "retail"
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
      SupplierID INT PRIMARY KEY AUTO_INCREMENT,
      SupplierName VARCHAR(255),
      ContactNumber VARCHAR(20)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Products (
      ProductID INT PRIMARY KEY AUTO_INCREMENT,
      ProductName VARCHAR(255),
      Price DECIMAL(10,2),
      StockQuantity INT,
      SupplierID INT,
      FOREIGN KEY (SupplierID)
      REFERENCES Suppliers(SupplierID)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Sales (
      SaleID INT PRIMARY KEY AUTO_INCREMENT,
      ProductID INT,
      QuantitySold INT,
      SaleDate DATE,
      FOREIGN KEY (ProductID)
      REFERENCES Products(ProductID)
    )
  `);

  console.log("Database initialized successfully");
}

module.exports = initializeDatabase;
