const express = require('express');
const sequelize = require('./database/db'); // MySQL connection
const authRoutes = require('./routes/auth');
const uploadRoute = require('./routes/upload')
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());  // Allow all origins, or configure specific origins
app.use(express.json()); // Use built-in Express JSON parser

// Routes
app.use('/api/auth', authRoutes);

app.use('/service', uploadRoute);

//Database
sequelize.sync().then(() => console.log('Database synced'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
