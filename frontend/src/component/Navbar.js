import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import "./Navbar.css"; 

function Navbar() {
  const navigate = useNavigate(); 
  const handleSignOut = () => {
    
    navigate("/"); 
  };

  return (
    <div className="navbar">
      <div className="nav-links">
       
        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/tasklist" className="nav-link" activeClassName="active">
          Task list
        </NavLink>
      </div>
      
      <button className="signout-button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default Navbar;
