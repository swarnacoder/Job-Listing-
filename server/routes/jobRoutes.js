const express = require('express');
const router = express.Router();
const  { requireAuth, validateObjectId } = require('../utils/auth');
const { createJobPost, editJobPost, getJobPosts } = require('../controllers/jobController');

// Create Job Post API
router.post('/job-posts', requireAuth, createJobPost);

// Edit Job Post API
router.put('/job-posts/:id', requireAuth, validateObjectId, editJobPost);

// Get Job Posts API with filters
router.get('/job-posts', getJobPosts);


module.exports = router;


