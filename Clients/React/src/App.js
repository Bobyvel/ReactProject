import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";



class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route component={NotFound} />
            </Switch>
            <Footer/>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
