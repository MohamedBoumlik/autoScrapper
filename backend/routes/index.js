// routers/index.js
const express = require('express');
const router = express.Router();

const crawlerRoutes = require('./crawlerRoutes');
// Import other route files as needed

router.use('/crawler', crawlerRoutes);
// Add other route prefixes

module.exports = router;