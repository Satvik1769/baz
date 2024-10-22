const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true }, // Store your UUID here
  name: { type: String, required: true },
  team: { type: String, required: true },
  role: { type: String },
  points: { type: Number, required: true },
  credits: { type: Number, required: true },
  selectedBy: { type: Number, required: true },
});

module.exports = mongoose.model("Player", playerSchema);
