import { Router } from "express";
import Carousel from "../models/Carousel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await Carousel.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Carousel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Carousel not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Carousel.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Carousel not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Carousel.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Carousel not found" });
    res.json({ message: "Carousel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
