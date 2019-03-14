import React, { Component } from "react";
import { Link } from "react-router-dom";
import {MessageStore} from "../MessageStore/MessageStore";
import Books from "../Books/Books";

const Home = (props) => {
  const user = localStorage.getItem("username");

  console.log(props)
  const isLoading = props.isLoading;
  let topRatedBooks= [];
  if(!isLoading){
    topRatedBooks = props.books
      .sort((a, b) => b.likes.length - a.likes.length)
  }
  
  

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
        {isLoading && <h3>Loading...</h3>}
          <Books {...props} books={topRatedBooks}/>
        </div>
      </div>
    </main>
  );
}

export default Home;
