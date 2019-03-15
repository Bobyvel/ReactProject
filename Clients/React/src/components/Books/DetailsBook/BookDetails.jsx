import React, { Component } from "react";
import Auth from '../../../utils/auth'
import { likeBook, unlikeBook } from "../../../services/book-service";
import toastr from "toastr";

class Details extends Component {
  constructor(props) {
    super(props);
     this.state = {
      likes: []
    };
  }
  componentDidMount(){
    this.setState({
      likes: this.props.bookDetails.likes
    })
  }
  async onLikeButtonClick(e) {
    e.preventDefault();
   
    console.log(this.state.likes);
    const hasLike = this.state.likes.indexOf(this.props.username);
    console.log(hasLike);
    if (hasLike !== -1) {
     await unlikeBook(this.props.bookDetails._id);
      const newLikes = [...this.state.likes];
      newLikes.splice(hasLike, 1);
      this.setState({ likes: newLikes });
    } else {
     await likeBook(this.props.bookDetails._id);
      const newLikes = [...this.state.likes];
      newLikes.push(this.props.username);
      this.setState({ likes: newLikes });
    }
  }

  onOrderButtonClick(e) {
    e.preventDefault();
    this.props.addToCart(this.props.bookDetails._id);
    toastr.success('Added to cart');
    this.props.history.push("/cart");
  }

  render() {
   
    const { bookDetails, username } = this.props;
   
    let buttonText = "Like";
    if (this.state.likes.includes(username) || (bookDetails.likes.includes(username))) {
      buttonText = "Unlike";
    }

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
            {buttonText} 
          </button>) : null}
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
