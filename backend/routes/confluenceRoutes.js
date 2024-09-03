const express = require('express');
const { syncSpaces, getSpace } = require('../controllers/confluenceController');

const { protect } = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/sync-spaces', protect, syncSpaces);
router.get('/spaces',protect, getSpace);

module.exports = router;