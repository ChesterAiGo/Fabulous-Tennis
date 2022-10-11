const express = require('express');
const router = express.Router();

// validators
// const { linkCreateValidator, linkUpdateValidator } = require('../validators/link');
// const { runValidation } = require('../validators');

// controllers
const { read } = require('../controllers/video');

// routes
router.get('/video/:slug', read);


module.exports = router;
