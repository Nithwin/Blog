import React, { useState } from 'react';
import axios from 'axios';
import './New.css';

const New = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogData = { title, content, tags };

    try {
      const token = localStorage.getItem('authToken'); // Retrieve JWT token from localStorage

      if (!token) {
        setErrorMessage('Please log in first');
        return;
      }

      await axios.post('https://nithwin-blog-api.vercel.app/blogs', blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Blog post created successfully!');
      setTitle('');
      setContent('');
      setTags('');
    } catch (error) {
      console.error('Error creating blog post:', error);
      setErrorMessage('Error creating blog post. Please try again.');
    }
  };

  return (
    <div className="new-post-container Mainbackground">
      <div className="container d-flex justify-content-center flex-column align-content-center">
        <div className="d-flex justify-content-center rounded-4">
          <form onSubmit={handleSubmit} className="bg-dark p-3 rounded-4 text-white">
            <div>
              <h2 className="text-center NEwBlogtext-gradient">Create New Blog Post</h2>
            </div>
            <div className="mt-3">
              <label htmlFor="title" className="h6">Title</label>
              <input
                type="text"
                id="title"
                className="form-control bg-dark rounded-5 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="content" className="h6">Content</label>
              <textarea
                id="content"
                className="form-control bg-dark rounded-4 text-white"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="tags" className="h6">Hashtags</label>
              <input
                type="text"
                id="tags"
                className="form-control bg-dark rounded-5 text-white"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma separated"
                required
              />
            </div>
            <div className="mt-3">
              <button type="submit" className="btn BtnColor w-100 rounded-5 fw-bold">Post</button>
            </div>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
