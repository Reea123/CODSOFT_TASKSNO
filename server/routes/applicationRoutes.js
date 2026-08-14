const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  getSelectedCandidates,
  sendInterviewEmail
} = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, restrictTo('candidate'), upload.single('resumeFile'), applyToJob);
router.get('/my-applications', protect, restrictTo('candidate'), getMyApplications);
router.get('/selected-candidates', protect, restrictTo('employer'), getSelectedCandidates);
router.get('/job/:jobId', protect, restrictTo('employer'), getApplicantsForJob);
router.patch('/:id/status', protect, restrictTo('employer'), updateApplicationStatus);
router.post('/:id/send-interview', protect, restrictTo('employer'), sendInterviewEmail);
module.exports = router;