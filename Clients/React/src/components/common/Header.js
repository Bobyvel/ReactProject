import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const isAdmin = localStorage.getItem('role');
  const isUser = localStorage.getItem('authToken');

  return (
       <header>
      <nav className="navbar-menu">
        <Link to="/" exact="true" >Book Store</Link>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        {isUser && !isAdmin && <NavLink to='/orders'>My Orders</NavLink>}
        {isAdmin && <NavLink to='/admin/create'>Create New Book</NavLink>}
        {isAdmin && <NavLink to='/admin/orders/pending'>Pending Orders</NavLink>}
        {isUser && !isAdmin && <NavLink to='/cart'>Cart</NavLink>}
        {isUser && <a href='/signin' onClick={logout}>Logout</a>}
        {!isUser && <NavLink to='/signin'>Login</NavLink>}
        {!isUser && <NavLink to='/register'>Register</NavLink>}
        
       
      </nav>
    </header>
  );
};

export default Header;

function logout () {
  localStorage.clear();
 // toastr.success('Logout successful')
  //this.props.history.push('/signin')
}