import React, { Component } from "react";
import addBookValidator from "../../utils/addBookValidator";
import { fetchAddBook } from "../../services/book-service";

import toastr from "toastr";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genres: "",
      description: "",
      author: "",
      price: "",
      image: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmitHandler(e) {
    const isValid = addBookValidator(
      this.state.title,
      this.state.genres.split(", "),
      this.state.description,
      this.state.image,
      this.state.author,
      this.state.price
    );
    if (isValid) {
      const res = await fetchAddBook(
        this.state.title,
        this.state.genres.split(", "),
        this.state.description,
        this.state.image,
        this.state.author,
        this.state.price
      );

      if (res.success) {
        toastr.success("Book is added");
        this.props.history.push("/store");
      }
    }
  }

  render() {
    return (
      <div className="form-wrapper">
        <h1>Create New Book</h1>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter book title"
              value={this.state.title}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genres">Genres</label>
            <input
              type="text"
              name="genres"
              id="genres"
              placeholder="Enter genres for the book. Put a comma between them"
              value={this.state.genres}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter book description"
              value={this.state.description}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Enter book image URL"
              value={this.state.image}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Enter book author"
              value={this.state.author}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter book price"
              value={this.state.price}
              onChange={this.onChangeHandler}
            />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default AddBook;
