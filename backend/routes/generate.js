const express = require("express");
const router = express.Router();
const { HfInference } = require("@huggingface/inference");

router.post("/", async (req, res) => {
  const { productName, ingredients, weight, features, tone } = req.body;

  if (!productName || !tone) {
    return res.status(400).json({ error: "productName and tone are required." });
  }

  const toneMap = {
    professional: "professional, clear, and trustworthy",
    friendly: "warm, friendly, and approachable",
    bold: "bold, energetic, and exciting",
    premium: "luxurious, sophisticated, and high-end",
    traditional: "authentic, rustic, and rooted in Indian heritage",
  };

  const prompt = `You are a product copywriter for HimShakti, an Indian food brand. Write a compelling Amazon product description.

Product Name: ${productName}
Key Ingredients: ${ingredients || productName}
Weight/Size: ${weight || "Not specified"}
Key Features: ${features || "Natural, pure, high quality"}
Tone: ${toneMap[tone] || "professional"}

Write a 150-200 word product description with SEO keywords. End with a call to action. Return only the description text.`;

  try {
    const hf = new HfInference(process.env.HF_API_KEY);
    const result = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const description = result.choices[0].message.content.trim();
    res.status(200).json({ description });
  } catch (error) {
    console.error("HF error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to generate description.", details: error.message });
  }
});

module.exports = router;