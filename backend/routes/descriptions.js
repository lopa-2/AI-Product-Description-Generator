const express = require("express");
const router = express.Router();
const prisma = require("../prismaa");
const requireAuth = require("../middleware/requireAuth");

// GET all — scoped to the logged-in user only
router.get("/", requireAuth, async (req, res) => {
  try {
    const descriptions = await prisma.description.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(descriptions);
  } catch (err) {
    console.error("GET /descriptions error:", err);
    res.status(500).json({ error: "Failed to fetch descriptions.", details: err.message });
  }
});

// GET search — also scoped to the logged-in user
router.get("/search", requireAuth, async (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  try {
    const results = await prisma.description.findMany({
      where: {
        userId: req.user.id,
        productName: { contains: q, mode: "insensitive" },
      },
    });
    res.status(200).json(results);
  } catch (err) {
    console.error("GET /descriptions/search error:", err);
    res.status(500).json({ error: "Search failed.", details: err.message });
  }
});

// GET single — scoped to the logged-in user
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const item = await prisma.description.findFirst({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });
    if (!item) return res.status(404).json({ error: "Description not found." });
    res.status(200).json(item);
  } catch (err) {
    console.error("GET /descriptions/:id error:", err);
    res.status(500).json({ error: "Failed to fetch description.", details: err.message });
  }
});

// POST save (protected) — now saves userId, brandName, price, adImageUrl too
router.post("/", requireAuth, async (req, res) => {
  const { productName, brandName, ingredients, weight, features, price, tone, description, adImageUrl } = req.body;
  if (!productName || !description) {
    return res.status(400).json({ error: "productName and description are required." });
  }
  try {
    const newItem = await prisma.description.create({
      data: {
        productName,
        brandName,
        ingredients,
        weight,
        features,
        price,
        tone,
        description,
        adImageUrl,
        userId: req.user.id,
      },
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error("POST /descriptions error:", err);
    res.status(500).json({ error: "Failed to save description.", details: err.message });
  }
});

// PUT update — now requires auth and checks ownership before writing
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await prisma.description.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Description not found." });
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to edit this description." });
    }

    const updated = await prisma.description.update({
      where: { id: existing.id },
      data: { ...req.body },
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error("PUT /descriptions/:id error:", err);
    res.status(500).json({ error: "Failed to update description.", details: err.message });
  }
});

// DELETE — now requires auth and checks ownership before deleting
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await prisma.description.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Description not found." });
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this description." });
    }

    await prisma.description.delete({ where: { id: existing.id } });
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /descriptions/:id error:", err);
    res.status(500).json({ error: "Failed to delete description.", details: err.message });
  }
});

module.exports = router;