import React, { Component, Fragment } from "react";

class AcclaimedBooksNews extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      news: [],
      isLoading: true
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
          this.setState({ news, isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }
    if (this.state.news.length < 1) {
      return <h1>No reviews</h1>;
    }

    const reviews = this.state.news.slice(0, 4);
    return (
      <Fragment>
        <h2 className="review">Reviews by Critics</h2>
        <div className="row">
          {reviews.map((review, i) => (
            <div key={i} className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{review.title}</h5>
                  <p className="card-text">{review.author}</p>
                  <p className="card-text">{review.review_snippet}</p>
                  <a
                    href={`${review.review_link}`}
                    type=""
                    className="btn btn-primary"
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
