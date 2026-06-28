const express = require("express");
const router = express.Router();

let descriptions = [];
let nextId = 1;

// GET all
router.get("/", (req, res) => {
  res.status(200).json(descriptions);
});

// GET search
router.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const results = descriptions.filter((d) =>
    d.productName.toLowerCase().includes(q)
  );
  res.status(200).json(results);
});

// GET single
router.get("/:id", (req, res) => {
  const item = descriptions.find((d) => d.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Description not found." });
  res.status(200).json(item);
});

// POST save
router.post("/", (req, res) => {
  const { productName, tone, description } = req.body;
  if (!productName || !description) {
    return res.status(400).json({ error: "productName and description are required." });
  }
  const newItem = { id: nextId++, productName, tone, description, createdAt: new Date() };
  descriptions.push(newItem);
  res.status(201).json(newItem);
});

// PUT update
router.put("/:id", (req, res) => {
  const index = descriptions.findIndex((d) => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Description not found." });
  descriptions[index] = { ...descriptions[index], ...req.body, updatedAt: new Date() };
  res.status(200).json(descriptions[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = descriptions.findIndex((d) => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Description not found." });
  descriptions.splice(index, 1);
  res.status(204).send();
});

module.exports = router;