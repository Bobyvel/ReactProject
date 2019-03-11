import React, { Component } from "react";
import { Link } from "react-router-dom";
import MessageStore from "../MessageStore";
import TopRated from "../TopRated";

class Home extends Component {
 
  render() {
    const user = localStorage.getItem('username')
    return (
      <main>
        <div className="welcome-wrapper">
        {user && <MessageStore message = {{ text : `Welcome to our book store, ${user} !`}}>
            <Link to="/store">Go To Store</Link>
            <Link to="/orders">View your orders</Link>
            <Link to="/orders">Test</Link>
          </MessageStore>}
          
          <h2>Top Rated</h2>
          <div className="row">
            <div className="card-deck space-top">
              <TopRated/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
