import React, { Component } from "react";
import Auth from "../../../utils/auth";
import { likeBook, unlikeBook } from "../../../services/book-service";

class Details extends Component {
  constructor(props) {
    super(props);
    console.log(1)
    this.state = {
      likes: [],
      buttonText: ""
    };
  }
 componentDidMount() {
  
  
    let buttonText = '';
    buttonText = this.props.bookDetails.likes.includes(this.props.username)
      ? (buttonText = "Unlike")
      : (buttonText = "Like");
    this.setState({
      likes: this.props.bookDetails.likes,
      buttonText: buttonText
    });
    
  }
  async onLikeButtonClick(e) {
    e.preventDefault();
       
    const hasLike = this.state.likes.indexOf(this.props.username);
   
    if (hasLike !== -1) {
      await unlikeBook(this.props.bookDetails._id);
      const newLikes = [...this.state.likes];
      newLikes.splice(hasLike, 1);
      this.setState({ likes: newLikes, buttonText: "Like" });
    } else {
      await likeBook(this.props.bookDetails._id);
      const newLikes = [...this.state.likes];
      newLikes.push(this.props.username);
      this.setState({ likes: newLikes, buttonText: "Unlike" });
    }
    this.props.storeHasChanged();
  }

  onOrderButtonClick(e) {
    const bookID = this.props.bookDetails._id;

    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(bookID);
      this.props.history.push("/cart");
    } else {
      this.props.history.push("/signin");
    }
  }

  render() {
    const { bookDetails } = this.props;
console.log(bookDetails)
    return (
      <div className="row space-top">
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body bg-light">
              <blockquote className="card-blockquote">
                <img
                  src={bookDetails.image}
                  alt={bookDetails.title}
                  className="card-image"
                />
              </blockquote>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <p>
            <span className="light-blue-text">Genres</span>:{" "}
            {bookDetails.genres.join(", ")}
          </p>
          <p>
            <span className="light-blue-text">Description</span>:{" "}
            {bookDetails.description}
          </p>
          <p>
            <span className="light-blue-text">Author</span>:{" "}
            {bookDetails.author}
          </p>
          <p>
            <span className="light-blue-text">Price</span>: $
            {bookDetails.price.toFixed(2)}
          </p>
          <p>
            <span className="light-blue-text">Likes</span>:{" "}
            {this.state.likes.length}
          </p>
          {Auth.isUserAuthenticated() ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={this.onLikeButtonClick.bind(this)}
            >
              {this.state.buttonText}
            </button>
          ) : null}
          <button
            className="btn btn-warning btn-sm"
            onClick={this.onOrderButtonClick.bind(this)}
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

export default Details;
