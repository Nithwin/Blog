import React, { useState } from 'react';
import {Link} from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" style={{
      height:'12vh'
    }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="javascript:void(0)">
          <span className='babylonica text-gradient'>Nexus</span>
        </a>
        <div className={`collapse navbar-collapse show`} id="mynavbar">
          <form className="d-flex ms-auto">
            <Link className="btn btn-primary" to={'/signup'}>SignUp</Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
