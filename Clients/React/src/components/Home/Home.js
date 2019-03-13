import React, { Component } from "react";
import { Link } from "react-router-dom";
import {MessageStore} from "../MessageStore/MessageStore";
import Books from "../Books/Books";

const Home = (props) => {
  const user = localStorage.getItem("username");

  const topRatedBooks = props.books
      .sort((a, b) => b.likes.length - a.likes.length)

  return (
    <main>
      <div className="welcome-wrapper">
        {user && (
          <MessageStore
            message={{ text: `Welcome to our book store, ${user} !` }}
          >
            <Link to="/store">Go To Store</Link>
            <Link to="/orders">View your orders</Link>
            
          </MessageStore>
        )}

        <h2>Top Rated Books</h2>
        <div className="row">
          <Books books = {topRatedBooks}/>
        </div>
      </div>
    </main>
  );
}

export default Home;
