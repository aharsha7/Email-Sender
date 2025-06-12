const express = require('express');
const dotenv = require('dotenv');
const mailRoutes = require('./routes/mailRoutes');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
