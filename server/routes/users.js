const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyUserToken } = require("../middleware/auth.js");

// POST /users - Create a new user

router.post("/", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = new User({ userName, email, password });
    await newUser.save();
    const data = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userObject = newUser.toObject(); // Convert to plain JavaScript object
    userObject.token = data; // Add the data property
    return res.status(201).json(userObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users - Get all users

router.get("/", verifyUserToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id - Get a user by id

router.get("/:id", verifyUserToken, async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify the password
    if (user.password === password) {
      // Create a JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Return the token and user details
      return res.status(200).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
