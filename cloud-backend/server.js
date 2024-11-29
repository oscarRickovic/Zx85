const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // MySQL connection
const authRoutes = require('./routes/auth');

require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Sync database
sequelize.sync().then(() => console.log('Database synced'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
