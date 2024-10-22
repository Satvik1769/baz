const express = require("express");
const Team = require("../models/team.model.js");
const Player = require("../models/player.model.js");
const router = express.Router();
const { verifyUserToken } = require("../middleware/auth.js");

// POST /teams - Create a new team
router.post("/", verifyUserToken, async (req, res) => {
  try {
    const { players } = req.body;
    console.log("Players received in request:", players); // Check the data

    if (!players || players.length === 0) {
      return res.status(400).json({ message: "No players provided." });
    }

    const userId = req.user.id;

    const playerIds = [];
    for (const player of players) {
      if (!player.id) {
        return res
          .status(400)
          .json({ message: "Player ID is missing or null." });
      }

      // Check if the player exists
      let existingPlayer = await Player.findOne({ uuid: player.id });
      if (!existingPlayer) {
        existingPlayer = new Player({
          uuid: player.id,
          name: player.name,
          team: player.team,
          points: player.points,
          credits: player.credits,
          selectedBy: player.selectedBy,
        });
        await existingPlayer.save(); // Save the new player
      }

      playerIds.push(existingPlayer._id); // Use MongoDB ObjectId
    }

    const newTeam = new Team({ players: playerIds, user: userId });
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create team" });
  }
});

// GET /teams/:id - Retrieve a specific team by ID
router.get("/:id", verifyUserToken, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyUserToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await Team.findOne({ user: userId }).populate("players");
    console.log(teams);
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve teams" });
  }
});

module.exports = router;
