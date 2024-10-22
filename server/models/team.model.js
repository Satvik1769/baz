const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Reference by ObjectId
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user
});

module.exports = mongoose.model("Team", teamSchema);
