const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, getMyJobs, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', protect, restrictTo('employer'), createJob);
router.get('/', getJobs);
router.get('/my-jobs', protect, restrictTo('employer'), getMyJobs);
router.get('/:id', getJobById);
router.patch('/:id', protect, restrictTo('employer'), updateJob);
router.delete('/:id', protect, restrictTo('employer'), deleteJob);

module.exports = router;