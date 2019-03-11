import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "././components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";



class App extends Component {

  logout () {
    this.setState({ loggedIn: false })
    this.props.logout()
    //toastr.success('Logout successful')
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signin" exact component={Login} />
              <Route path="/signup" exact component={Register} />
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
