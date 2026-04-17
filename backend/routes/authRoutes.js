const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // save user
    const user = new User({ name, email, password: hash });
    await user.save();

    res.send({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).send("Wrong password");
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ send only once
    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;