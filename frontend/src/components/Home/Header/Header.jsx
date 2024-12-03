import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Nav.css'; // Import the CSS file

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isNavOpen) setIsNavOpen(false); // Close nav if dropdown is open
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown if nav is open
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsNavOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar') && !event.target.closest('.dropdown-menu')) {
        closeAllMenus();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ height: '12vh' }}>
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to={"/home"}>
          <span className="babylonica text-gradient">Nexus</span>
        </Link>
        <div className="d-flex align-items-center order-lg-2">
          <FaUserCircle size={30} onClick={toggleDropdown} style={{ cursor: 'pointer', color: 'white', marginRight: '1rem' }} />
          {isDropdownOpen && (
            <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', top: '40px', right: 0 }}>
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="/">Logout</Link>
            </div>
          )}
          <button className="navbar-toggler" type="button" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`navbar-collapse offcanvas-collapse ${isNavOpen ? 'open' : ''} order-lg-1`} id="mynavbar">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item d-lg-none">
              <Link className="nav-link" to="/home/new-post">New Blog</Link>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link" to="/home/my-posts">My Blogs</Link>
            </li>
          </ul>
        </div>
        <div className="order-lg-1 d-none d-lg-flex align-items-end">
          <ul className="navbar-nav ms-auto align-items-end">
            <li className="nav-item">
              <Link className="nav-link" to="/home/new-post">New Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/my-posts">My Blogs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
