# AI Product Description Generator

A web application that generates SEO-friendly product descriptions for Himalayan food products using AI.

## Features
1. Product details input
2. AI generated descriptions
3. Tone selection
4. Regenerate and edit options
5. Copy to clipboard

## Week 2 - Frontend Skeleton
- Home page with Navbar, Hero, Card grid and Footer
- About, Dashboard and Login pages
- Responsive design with Tailwind CSS
- Built with React + Vite

## Week 4 - Backend & API Development
- REST API built with Express.js
- 6+ endpoints covering full CRUD operations
- AI-powered description generation using Hugging Face (Llama 3.1)
- Frontend connected to backend with live API calls

## How to Run Backend Locally

### Prerequisites
- Node.js installed
- Hugging Face API key

### Steps
1. Clone the repository
2. Navigate to backend folder: cd backend
3. Install dependencies: npm install
4. Create .env file: PORT=5000 and HF_API_KEY=your_huggingface_token_here
5. Start the server: npm run dev
6. Server runs on http://localhost:5000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/generate | Generate AI description |
| GET | /api/descriptions | Get all saved descriptions |
| GET | /api/descriptions/:id | Get single description |
| POST | /api/descriptions | Save a description |
| PUT | /api/descriptions/:id | Update a description |
| DELETE | /api/descriptions/:id | Delete a description |
| GET | /api/descriptions/search?q= | Search descriptions |

## How to Run Frontend Locally
1. In project root: npm install
2. npm run dev
3. Open http://localhost:5173