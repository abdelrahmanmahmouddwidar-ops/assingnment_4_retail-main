const express = require("express");

const initializeDatabase = require("./database/initialize");

const productsRoutes = require("./routes/productsRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const salesRoutes = require("./routes/salesRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const reportsRoutes = require("./routes/reportsRoutes");

const app = express();

app.use(express.json());

app.use("/products", productsRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/sales", salesRoutes);
app.use("/database", databaseRoutes);
app.use("/reports", reportsRoutes);

initializeDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database initialization failed:", error);
  });
  