import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
