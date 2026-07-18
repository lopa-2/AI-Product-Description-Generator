PROMPTS.md — HimShakti AI Description Generator

This document logs the prompt variations tested for the AI-powered product description feature (POST /api/generate), which uses the Hugging Face Inference API (meta-llama/Llama-3.1-8B-Instruct).

System / Base Prompt

The backend constructs a single prompt per request (no separate system role — the instruction and role are combined into one user message sent to the model):

You are a product copywriter for HimShakti, an Indian food brand. Write a compelling Amazon product description.

Product Name: {productName}
Key Ingredients: {ingredients or productName}
Weight/Size: {weight or "Not specified"}
Key Features: {features or "Natural, pure, high quality"}
Tone: {toneMap[tone]}

Write a 150-200 word product description with SEO keywords. End with a call to action. Return only the description text.

The tone field is mapped to a richer descriptive phrase before being inserted:


professional → "professional, clear, and trustworthy"
friendly → "warm, friendly, and approachable"
bold → "bold, energetic, and exciting"
premium → "luxurious, sophisticated, and high-end"
traditional → "authentic, rustic, and rooted in Indian heritage"


All three variations below used the same product (Raw Himalayan Honey) with no additional keywords, isolating the effect of the tone variable alone.


Variation 1 — Tone: Friendly

Input: productName: "Raw Himalayan Honey", tone: "friendly", keywords: none

Output:


Discover the Nectar of the Himalayas - Raw Himalayan Honey. Indulge in the purest form of nature's sweetness with our Raw Himalayan Honey. Harvested from the remote regions of the Himalayas, this unfiltered honey is a treasure trove of nutrients and antioxidants... [full text generated with sections: Nature's Gift, Nature's Medicine, Try it Today!]



The output was warm and inviting, using phrases like "nature's sweetness" and "true delight for the senses," with a soft, conversational call to action.

Variation 2 — Tone: Bold

Input: productName: "Raw Himalayan Honey", tone: "bold", keywords: none

Output:


Unlock the Power of Nature with HimShakti's Raw Himalayan Honey! Get ready to taste the nectar of the gods! Our Raw Himalayan Honey is a pure, unadulterated delight that will elevate your senses and nourish your body... [full text generated with bullet points and an energetic CTA: "this superfood will take your taste buds on a thrilling adventure!"]



The output was noticeably more energetic — exclamation points, power verbs ("Unlock," "elevate," "thrilling"), and bolded bullet-point features, matching the "bold, energetic, exciting" tone mapping well.

Variation 3 — Tone: Professional

Input: productName: "Raw Himalayan Honey", tone: "professional", keywords: none

Output:


Raw Himalayan Honey - Nature's Nectar for a Healthier You. Indulge in the purest form of nature's sweetness with HimShakti's Raw Himalayan Honey. Harvested from the majestic Himalayan region, this unfiltered, unprocessed honey is a treasure trove of health benefits... [structured with "Benefits of Raw Himalayan Honey" and "What sets our Raw Himalayan Honey apart" bullet sections]



The output was structured and informative, organizing content into clear benefit-driven bullet sections rather than narrative prose, aligning with the "clear and trustworthy" tone mapping.


Which Worked Best and Why

The Professional tone variation worked best for this product category. Ayurvedic/wellness food products benefit from a structured, benefit-led format (clear bullet points under headers like "Benefits" and "What sets us apart") because shoppers scanning an Amazon listing want to quickly verify health claims and differentiators before reading narrative copy. The Bold variation, while more engaging, leaned slightly too promotional/hype-driven ("nectar of the gods," multiple exclamation points) for a health-and-wellness audience that tends to trust calmer, evidence-oriented language. The Friendly tone sat in between — pleasant but less scannable than the Professional structure. All three respected the 150–200 word range and ended with a clear call to action, confirming the prompt template is reliable across tone variations.

Role Used

No separate system role was used in the Hugging Face chatCompletion call — the role instruction ("You are a product copywriter for HimShakti...") is embedded directly in the single user message sent to the model.