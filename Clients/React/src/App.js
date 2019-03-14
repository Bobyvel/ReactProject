import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "././components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { NotFound } from "./components/NotFound/NotFound";
import { Header } from "./components/common/Header";
import Footer from "./components/common/Footer";
import Store from "./components/Books/Store";
import { fetchBooks } from "./services/book-service";
import PrivateRoute from './Routes/PrivateRoute'
import AdminRoute from './Routes/AdminRoute'
import AddBook from "./components/Books/AddBook";
import EditBook from "./components/Books/EditBook";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: true,
      updated: false
    };
    this.storeHasChanged = this.storeHasChanged.bind(this);
  }

  componentDidMount() {
    fetchBooks().then(books => this.setState({ books, isLoading: false }));
  }

  storeHasChanged(bookInfo) {
    //console.log(bookInfo);
    if (typeof bookInfo === "string") {
      this.setState(prevState => ({
        books: prevState.books.filter(book => book._id !== bookInfo)
      }));
    } else {
      this.componentDidMount();
    }

    //window.location.reload()
  }

  render() {
    return (
      <div>
          <Fragment>
            <Header />
            <Switch>
              <Route
                path="/"
                exact
                component={props => (
                  <Home
                    {...props}
                    {...this.state}
                    storeHasChanged={this.storeHasChanged}
                  />
                )}
              />
              <Route path="/signin" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route
                path="/admin/create"
                exact
                render={props => (
                  <AddBook storeHasChanged={this.storeHasChanged} {...props} />
                )}
              />
              <Route
                path="/admin/edit/:id"
                render={props => (
                  <EditBook storeHasChanged={this.storeHasChanged} {...props} {...this.state}/>
                )}
              />
              <Route
                path="/store"
                exact
                render={props => (
                  <Store
                    {...props}
                    {...this.state}
                    storeHasChanged={this.storeHasChanged}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Fragment>
        
      </div>
    );
  }
}

export default App;
