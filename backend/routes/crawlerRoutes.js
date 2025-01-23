const express = require('express');
const { crawlWebsite } = require('../controllers/crawlerController');

const router = express.Router();

router.post('/crawl', crawlWebsite);

module.exports = router;
