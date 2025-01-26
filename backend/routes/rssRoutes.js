const express = require('express');
const { fetchRSSFeed,getRssFeeds } = require('../controllers/rssController');

const router = express.Router();

router.post('/', fetchRSSFeed);
router.get('/getRss', getRssFeeds);

module.exports = router;
