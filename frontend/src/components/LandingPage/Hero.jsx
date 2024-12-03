import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between hero-container px-5">
      <div className="logo-container">
        <img src="/src/assets/blog.png" alt="Logo" className="img-fluid " />
      </div>
      <div className="content-container text-center text-md-right mb-5 mb-lg-0">
        <h1 className='text-purple'>Blog Posting System</h1>
        <p>Your gateway to the latest updates and stories.</p>
        <Link to="/signin">
          <button className="btn btn-primary mt-4 fw-bolder py-2 px-5">Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
