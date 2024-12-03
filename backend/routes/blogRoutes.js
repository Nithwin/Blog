const express = require('express');
const { createBlog, getUserBlogs, deleteBlog, getAllBlogs } = require('../controllers/blogController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Public route: Get all blog posts
router.get('/', getAllBlogs);

// Private route: Create a new blog post (requires authentication)
router.post('/', authenticateUser, createBlog);

// Private route: Get user's own blog posts
router.get('/my-posts', authenticateUser, getUserBlogs);

// Private route: Delete a blog post (requires authentication)
router.delete('/:id', authenticateUser, deleteBlog);

module.exports = router;
