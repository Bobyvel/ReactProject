import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar-menu">
        <NavLink to="/"  exact activeClassName="never">Book Store</NavLink>
        <NavLink to="/" exact activeClassName="active" aria-current="page">
          Home
        </NavLink>
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="javascript:void(0)">Logout</NavLink>
      </nav>
    </header>
  );
};

export default Header;
