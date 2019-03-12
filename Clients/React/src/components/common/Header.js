import React from "react";
import { NavLink, Link } from "react-router-dom";
import logoImage from "../../images/logo.png"

import {logout} from "../../api/remote";

const Header = () => {
  const isAdmin = localStorage.getItem('role');
  const isUser = localStorage.getItem('authToken');
  return (
       <header>
      <nav className="navbar-menu">
        <Link to="/" exact="true" className="logo"><img src={logoImage} alt="Logo" /></Link>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        {isUser && !isAdmin && <NavLink to='/orders'>My Orders</NavLink>}
        {isAdmin && <NavLink to='/admin/create'>Create New Book</NavLink>}
        {isAdmin && <NavLink to='/admin/orders/pending'>Pending Orders</NavLink>}
        {isUser && !isAdmin && <NavLink to='/cart'>Cart</NavLink>}
        {isUser && <Link to='/signin' onClick={logout}>Logout</Link>}
        {!isUser && <NavLink to='/signin'>Login</NavLink>}
        {!isUser && <NavLink to='/register'>Register</NavLink>}
        
       
      </nav>
      <div className="banner"><p>BUY YOUR FAVORITE BOOK HERE</p></div>
    </header>
  );
};

export default Header;


