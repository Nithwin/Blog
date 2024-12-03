const Blog = require('../models/Blog');

// Create Blog Post
const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()), // Convert tags to an array
      user: req.user.userId, // Attach the userId from JWT
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Blogs - Public Access
const getAllBlogs = async (req, res) => {
  try {
    const posts = await Blog.find()
      .populate('user', 'username') // Populate only the username field
      .exec();
    res.json(posts);  // Send posts as response
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User's Blogs
const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.userId }).populate("user", "username");

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found.' });
    }

    res.json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Blog Post
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog post by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the logged-in user is the owner of the post
    if (blog.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Use deleteOne() to remove the blog post from the database
    await Blog.deleteOne({ _id: id });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBlog, getUserBlogs, deleteBlog, getAllBlogs };
