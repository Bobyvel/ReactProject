import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { deleteBook } from "../../services/book-service";

import toastr from "toastr";

class Books extends Component {
  constructor(props) {
    super(props);

    this.onOrderButtonClick = this.onOrderButtonClick.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
  }

  onOrderButtonClick(e) {
    const bookID = e.target.value;

    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(bookID);
      this.props.history.push("/cart");
    } else {
      this.props.history.push("/signin");
    }
  }

  async onDeleteButtonClick(e) {
    const bookID = e.target.value;
    const res = await deleteBook(bookID);
    if (res.success) {
      toastr.success("Book is deleted");
      this.props.storeHasChanged(bookID);
      this.props.history.push("/store");
    } else {
      toastr.error(res.message);
    }
  }

  render() {
    const books = this.props.books;

    if (books.length === 0) {
      return <h1>Sorry! No books to show.</h1>;
    }

    return (
      <Fragment>
        {books.map(book => (
          <div key={book._id} className="card col-4">
            
            <img
              className="card-img-top card-image"
              src={book.image}
              alt={book.title}
            />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">{book.description}</p>
            </div>

            <div className="card-footer">
              <small className="text-muted">{book.author}</small>
              <Link
                type="button"
                className="btn btn-primary float-right btn-sm"
                to={`/details/${book._id}`}
              >
                Details
              </Link>
              <button
                onClick={this.onOrderButtonClick}
                type="button"
                value={book._id}
                className="btn btn-warning float-right btn-sm"
              >
                Order
              </button>
            </div>
            {Auth.isUserAdmin() ? (
              <div className="card-footer">
                <Link
                  type="button"
                  className="btn btn-primary float-right btn-sm"
                  to={`/admin/edit/${book._id}`}
                >
                  Edit
                </Link>
                <button
                  value={book._id}
                  onClick={this.onDeleteButtonClick}
                  type="button"
                  className="btn btn-warning float-right btn-sm"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </Fragment>
    );
  }
}

export default Books;
