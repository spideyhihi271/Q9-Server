const express = require('express');
const router = express.Router();
const SearchController = require('../app/controllers/SearchController');

// Get Info
router.get('/:keyword', SearchController.searchByKeyword);

// Export
module.exports = router;
