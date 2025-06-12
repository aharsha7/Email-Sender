const express = require('express');
const dotenv = require('dotenv');
const mailRoutes = require('./routes/mailRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();

// Serve static files (if needed)
app.use(express.static('public'));

// ✅ CORS: allow frontend domain
app.use(cors({
  origin: 'https://frontend-mail-eta.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/mail', mailRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
