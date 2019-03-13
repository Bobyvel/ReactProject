import React from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../services/authService";
import logoImage from "../../images/logo.png";

export const Navigation = () => {
  const isAdmin = localStorage.getItem("role");
  const isUser = localStorage.getItem("authToken");
  return (
    <nav className="navbar-menu">
      <Link to="/" exact="true" className="logo">
        <img src={logoImage} alt="Logo" />
      </Link>
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/store" exact activeClassName="active">
        Store
      </NavLink>
      {isUser && !isAdmin && <NavLink to="/orders">My Orders</NavLink>}
      {isAdmin && <NavLink to="/admin/create">Add Book</NavLink>}
      {isAdmin && <NavLink to="/admin/orders/pending">Pending Orders</NavLink>}
      {isUser && !isAdmin && <NavLink to="/cart">Cart</NavLink>}
      {isUser && (
        <Link to="/signin" onClick={logout}>
          Logout
        </Link>
      )}
      {!isUser && <NavLink to="/signin">Login</NavLink>}
      {!isUser && <NavLink to="/register">Register</NavLink>}
    </nav>
  );
};
