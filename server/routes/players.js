const express = require("express");
const Player = require("../models/player.model.js");
const router = express.Router();
const { verifyUserToken } = require("../middleware/auth.js");

// GET /players - Retrieve all available players
router.get("/", verifyUserToken, async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
