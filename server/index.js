const express = require("express");
const connectDB = require("./config/db");
const playerRoutes = require("./routes/players");
const teamRoutes = require("./routes/teams");
const userRoutes = require("./routes/users");
const cors = require("cors");
const app = express();
app.use(cors());

require("dotenv").config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
