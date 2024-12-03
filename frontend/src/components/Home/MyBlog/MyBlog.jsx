import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBlog.css';
import Post from './Post';

const MyBlog = () => {
  const [posts, setPosts] = useState([]); // To store fetched posts
  const [errorMessage, setErrorMessage] = useState(''); // For error messages
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch posts of the logged-in user from the backend when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true when fetching posts
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setErrorMessage('You need to log in first.');
          setLoading(false); // Stop loading if no token is found
          return;
        }

        // Fetch posts belonging to the logged-in user
        const response = await axios.get('http://localhost:5000/blogs/my-posts', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // If successful, set posts; otherwise, show an error message
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          setErrorMessage('Failed to load posts.');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorMessage('Failed to load posts. Please try again.');
      } finally {
        setLoading(false); // Stop loading after the fetch is complete
      }
    };

    fetchPosts();
  }, []);

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You need to be logged in to delete posts.');
        return;
      }

      const response = await axios.delete(`http://localhost:5000/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message); // 'Blog post deleted successfully'
      setPosts(posts.filter(post => post._id !== id)); // Update the UI
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post.');
    }
  };

  return (
    <div className="my-blog-container Mainbackground">
      <div className="container mt-5">
        {/* Show loading state */}
        {loading && <p className="text-center">Loading posts...</p>}

        {/* Show error message */}
        {errorMessage && !loading && <p className="text-danger">{errorMessage}</p>}

        {/* Show posts or a message if there are no posts */}
        <div className="row">
          {posts.length === 0 && !loading && !errorMessage && (
            <p>No posts found.</p>
          )}
          {posts.map((post) => (
            <Post key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
