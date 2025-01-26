// routers/index.js
const express = require('express');
const router = express.Router();

const crawlerRoutes = require('./crawlerRoutes');
const rssRoutes = require('./rssRoutes');

router.use('/crawler', crawlerRoutes);
router.use('/rss', rssRoutes);
// Add other route prefixes

module.exports = router;