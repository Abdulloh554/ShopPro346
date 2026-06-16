import { Router } from "express";
import Like from "../models/Like.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const items = await Like.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Like.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Like.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Like not found" });
    res.json({ message: "Like removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
