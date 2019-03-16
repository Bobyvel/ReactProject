import React, { Component, Fragment } from "react";
import { Link } from "react-dom";

class AcclaimedBooksNews extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      news: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch(
      "http://idreambooks.com/api/publications/recent_recos.json?key=6b379f34906301a79521efab27db56efd359020b&slug=all-books"
    )
      .then(res => res.json())
      .then(news => {
        if (this._isMounted) {
          this.setState({ news });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.news.length < 1) {
      return <h1>No rewies</h1>;
    }
    console.log(this.state.news);
    const reviews = this.state.news
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);
    return (
      <Fragment>
        <h2>Reviews by Critics</h2>
        <div class="row">
          {reviews.map(review => (
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{review.title}</h5>
                  <p class="card-text">{review.author}</p>
                  <p class="card-text">{review.review_snippet}</p>
                  <a
                    href={`${review.review_link}`}
                    type=""
                    class="btn btn-primary"
                  >
                    Read the review
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default AcclaimedBooksNews;
