import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';
import Post from './Post';

const Hero = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorMessage('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hero-container">
      <div className="container mt-5">
        <div className="row mb-4 d-flex justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control bg-dark rounded-5 text-white place"
              placeholder="Search by username, title, or content"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading && <p className="text-center">Loading posts...</p>}
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        <div className="row">
          {!loading && filteredPosts.length === 0 && <p className="text-center">No posts found.</p>}
          {filteredPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
