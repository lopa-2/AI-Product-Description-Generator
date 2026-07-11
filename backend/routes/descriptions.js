const express = require("express");
const router = express.Router();
const prisma = require("../prismaa");
const requireAuth = require("../middleware/requireAuth");

// GET all (protected)
router.get("/", requireAuth, async (req, res) => {
  try {
    const descriptions = await prisma.description.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(descriptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch descriptions." });
  }
});

// GET search
router.get("/search", async (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  try {
    const results = await prisma.description.findMany({
      where: { productName: { contains: q, mode: "insensitive" } },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed." });
  }
});

// GET single
router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.description.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!item) return res.status(404).json({ error: "Description not found." });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch description." });
  }
});

// POST save (protected)
router.post("/", requireAuth, async (req, res) => {
  const { productName, ingredients, weight, features, tone, description } = req.body;
  if (!productName || !description) {
    return res.status(400).json({ error: "productName and description are required." });
  }
  try {
    const newItem = await prisma.description.create({
      data: { productName, ingredients, weight, features, tone, description },
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to save description." });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const existing = await prisma.description.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Description not found." });

    const updated = await prisma.description.update({
      where: { id: existing.id },
      data: { ...req.body },
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update description." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const existing = await prisma.description.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Description not found." });

    await prisma.description.delete({ where: { id: existing.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete description." });
  }
});

module.exports = router;