const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Routes
app.use("/api/hello", (req, res) => {
    res.json({message : "hello"})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
