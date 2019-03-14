import React, { Component } from "react";
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

  onOrderButtonClick () {
    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(this.props.id)
      this.props.history.push('/cart')
    } else {
      this.props.history.push('/login')
    }
  }

  async onDeleteButtonClick (e) {
    const bookID = e.target.value;
    const res = await deleteBook(bookID);
    if(res.success){
      toastr.success("Book is deleted");
      this.props.storeHasChanged(bookID);
      this.props.history.push("/store");
    }else{
      toastr.error(res.message);
    }
        
  }

  render() {
    
    const books = this.props.books;

    return (
      <div className="card-deck space-top">
        {books.map(book => (
          <div className="card col-4">
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
      </div>
    );
  }
}

export default Books;
