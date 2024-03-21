import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-flex align-items-center" style={{marginLeft: '5%'}}>
          <h2>
            <Link className="link" to={"/"}>
              Inicio
            </Link>
          </h2>
          
        </div> 
        <button  className="custom-button"><Link to={"/login"} className="custom-button-link">Login</Link></button>
      </div>
    
    </nav>
  );
};

export default Navbar;
