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
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import AddBook from "./components/Books/AddBook";
import EditBook from "./components/Books/EditBook";
import Details from "./components/Books/DetailsBook/Details";
import Cart from "./components/Cart/Cart";
import Order from "./components/Orders/Order";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: true,
      updated: false,
      cart: []
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.storeHasChanged = this.storeHasChanged.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    fetchBooks().then(books => this.setState({ books, isLoading: false }));
  }

  storeHasChanged(bookInfo) {
    
    if (typeof bookInfo === "string") {
      this.setState(prevState => ({
        books: prevState.books.filter(book => book._id !== bookInfo)
      }));
    } else {
      this.componentDidMount();
    }

    //window.location.reload()
  }

  addToCart(id) {
    const addBookToCart = this.state.books.filter(book => book._id === id)
    let booksToCart = [...this.state.cart];
    booksToCart.push(...addBookToCart)
    this.setState({
      cart: booksToCart
    });
  }

  removeFromCart(id) {
    let booksToCart = [...this.state.cart];
    booksToCart = booksToCart.filter(book => book._id !== id)
    this.setState({
      cart: booksToCart
    });
    
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
              path="/cart"
              component={props => (
                <Cart addToCart={this.addToCart} removeFromCart={this.removeFromCart}  {...props} {...this.state} />
              )}
            />
            <Route path="/orders" exact component={Order} />

            <AdminRoute
              path="/admin/create"
              component={props => (
                <AddBook {...props} storeHasChanged={this.storeHasChanged} />
              )}
            />
            <AdminRoute
              path="/admin/edit/:id"
              component={props => (
                <EditBook
                  storeHasChanged={this.storeHasChanged}
                  {...props}
                  {...this.state}
                />
              )}
            />
            <Route
              path="/store"
              exact
              render={props => (
                <Store
                  {...props}
                  {...this.state}
                  addToCart={this.addToCart}
                  storeHasChanged={this.storeHasChanged}
                />
              )}
            />
            <Route
              path="/details/:id"
              render={props => (
                <Details
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
