import React, { Component } from "react";
import Books from "../Books/Books";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSearch: false,
      query: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.hasSearch) {
      this.setState({ hasSearch: false });
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.setState({ hasSearch: true });
  }

  render() {
    let { books } = this.props;
    books = books.sort((a, b) => a.title.localeCompare(b.title));
    console.log(this.state.query);
    if (this.state.hasSearch) {
      books = books.filter(t =>
        t.title.toLowerCase().includes(this.state.query.toLowerCase())
      );
    }
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>All Books</h1>
            <div className="form-search">
              <form onSubmit={this.onSubmitHandler}>
                <input
                  className="search"
                  type="text"
                  placeholder="Search for the book you are looking for..."
                  aria-label="Search"
                  name="query"
                  value={this.state.query}
                  onChange={this.onChangeHandler}
                />
                <input type="submit" value="Find" />
              </form>
            </div>
          </div>
        </div>
        <Books books={books} />
      </div>
    );
  }
}

export default Store;
