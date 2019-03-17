import React from "react";
import { Link } from "react-router-dom";
import { MessageStore } from "../MessageStore/MessageStore";
import Books from "../Books/Books";
import AcclaimedBooksNews from "../api/remote";
import Auth from "../../utils/auth";

const Home = props => {
  const user = Auth.getUsername();
  const isAdmin = Auth.isUserAdmin();

  const isLoading = props.isLoading;
  let topRatedBooks = [];
  if (!isLoading) {
    topRatedBooks = props.books.sort((a, b) => b.likes.length - a.likes.length);
  }

  var textToOrders = "";
  textToOrders = isAdmin ? "View pendind orders" : "View your orders";

  return (
    <main>
      <div className="welcome-wrapper">
        {user && (
          <MessageStore
            message={{ text: `Welcome to our book store, ${user} !` }}
          >
            <Link to="/store">Go To Store</Link>
            <Link to="/orders">{textToOrders}</Link>
          </MessageStore>
        )}

        <h2>Top Rated Books</h2>

        <div className="row">
          {isLoading && <h3>Loading...</h3>}
          <Books {...props} books={topRatedBooks} />
        </div>
        <AcclaimedBooksNews />
      </div>
    </main>
  );
};

export default Home;
