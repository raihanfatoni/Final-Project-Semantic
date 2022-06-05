import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Logo from "./../assets/image/logo.png"

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className="navbar">
      <div className="img-wrapper">
        <img src={Logo} alt="" className='logo'/>
      </div>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
      </ul>
    </nav>
  )
}

export default Navbar