const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const oauthRoutes = require('./routes/oauthRoutes');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(passport.initialize());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many attempts, try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Auth routes (register/login + OAuth)
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes);

// Routes
app.use("/api/generate", require("./routes/generate"));
app.use("/api/descriptions", require("./routes/descriptions"));

// Health check
app.get("/", (req, res) => res.json({ message: "HimShakti API running " }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));