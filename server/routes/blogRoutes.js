const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogById } = require('../controllers/blogController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', protect, restrictTo('employer'), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);

module.exports = router;