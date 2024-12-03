import React, { useState } from 'react';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import './Post.css';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-lg card-color">
        <div className="card-body">
          <div className="media align-items-center mb-3 d-flex">
            {post.profileImg ? (
              <img src={post.profileImg} alt="Profile" className="rounded-circle" style={{ width: '45px', height: '45px' }} />
            ) : (
              <FaUserCircle size={40} className="mr-3" />
            )}
            <div className="media-body ml-3">
              <h5 className="mt-0 mb-0">{post.username}</h5>
              <small>{post.title}</small>
            </div>
          </div>
          <p className="mb-2 content-bg p-2 rounded-2">{post.content}</p>
          <div className="hashtags mb-2">
            {post.hashtags && post.hashtags.map((tag, index) => (
              <span key={index} className="badge badge-pill badge-info mx-1">#{tag}</span>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-light no-hover d-flex justify-content-center align-items-center gap-1" onClick={handleLike}>
              <FaHeart style={{ color: likes > 0 ? 'red' : 'gray' }} className='heart' /> {likes} likes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
