import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  // Get the JWT token from localStorage
  const token = localStorage.getItem('authToken');

  // Fetch the user profile data
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          // Set user data if the request is successful
          const { username, email, bio } = response.data;
          setUsername(username);
          setEmail(email);
          setBio(bio || ''); // Set default bio if empty
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          alert('Error fetching profile data.');
        });
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false); // Disable editing after save

    const updatedProfile = { username, email, bio };

    // Update profile data
    axios
      .put(
        'http://localhost:5000/auth/profile',
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ProfileBg flex-column">
      <div>
        <p className='fw-bold h1 profile-gradient'>Profile</p>
      </div>
      <div className='mt-4 position-relative'>
        <FaPencilAlt className="edit-icon" onClick={() => setIsEditing(!isEditing)} />
        <form onSubmit={handleSubmit} className='d-flex flex-column ProfileFormBgColor p-4 rounded-3'>
          <div className='d-flex justify-content-center'>
            <FaUserCircle size={50} className='text-white' />
          </div>
          <div className="form-group mb-3 d-flex flex-column justify-content-center mt-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly={!isEditing}
              required
            />
          </div>
          <div className="form-group mb-3 d-flex flex-column justify-content-center mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="bio">Bio</label>
            <textarea
              className="form-control bg-dark text-white text-center"
              id="bio"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              readOnly={!isEditing}
              required
            />
          </div>
          {isEditing && <button type="submit" className="btn btn-primary">Save Changes</button>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
