import React, { Component, Fragment, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "././components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { NotFound } from "./components/NotFound/NotFound";
import { Header } from "./components/common/Header";
import Footer from "./components/common/Footer";
import Store from "./components/Books/Store";
import { fetchBooks } from "./services/book-service";
import AddBook from "./components/Books/AddBook";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: true
    };
  }  

  componentDidMount(){
    fetchBooks().then(books => this.setState({ books, isLoading: false }));
  }

  componentWillReceiveProps(){
    fetchBooks().then(books => this.setState({ books, isLoading: false }));
  }
  render() {
    
    return (
      <div>
        <Router>
          <Fragment>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <Home {...this.state} />}
                />
                <Route path="/signin" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/admin/create" exact component={AddBook} />

                <Route
                  path="/store"
                  exact
                  render={() => <Store {...this.state} />}
                />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
            <Footer />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
