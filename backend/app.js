const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => {
    console.error("Connection error ====>", err);
  });

// Middleware
app.use(cors());
app.use(express.json()); // Modern Express body parser
app.use(bodyParser.json()); // Additional body parser

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
