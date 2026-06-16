import { Router } from "express";
import Cart from "../models/Cart.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const items = await Cart.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Cart.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Cart item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
