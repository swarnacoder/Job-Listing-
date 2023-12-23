const express = require('express');
const router = express.Router();
const  { requireAuth } = require('../utils/auth');
const { createJobPost } = require('../controllers/jobController');

// Create Job Post API
router.post('/job-posts', requireAuth, createJobPost);

module.exports = router;


