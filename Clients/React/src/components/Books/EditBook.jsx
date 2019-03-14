import React, { Component } from "react";
import toastr from "toastr";
import addBookValidator from "../../utils/addBookValidator";
import { editBook } from "../../services/book-service";

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genres: "",
      description: "",
      author: "",
      price: "",
      image: "",
      likes: []
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.id = this.props.match.params.id;
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    const isValid = addBookValidator(
      this.state.title,
      this.state.genres.split(", "),
      this.state.description,
      this.state.image,
      this.state.author,
      this.state.price
    );
    if (isValid) {
        const res = await editBook(this.id, 
          this.state.title,
          this.state.genres.split(", "),
          this.state.description,
          this.state.image,
          this.state.author,
          this.state.price
        );
        console.log(res);
        if(res.success){
          toastr.success("Book is edited");
          this.props.storeHasChanged(this.state);
          this.props.history.push("/store");
        }else{
          toastr.error(res.message);
        }
    }
  }

  UNSAFE_componentWillMount() {
    //const id = this.props.match.params.id;
    console.log(this.props.books);
    const book = this.props.books.find(p => p._id === this.id);
    console.log(book);
    if (book) {
      this.setState({
        title: book.title,
        genres: book.genres.join(", "),
        description: book.description,
        author: book.author,
        price: book.price.toFixed(2),
        image: book.image
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="form-wrapper">
        <h1>Edit Book</h1>
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
          <input type="submit" value="Edit" />
        </form>
      </div>
    );
  }
}

export default EditBook;
