import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <main>
        <div className="form-wrapper">
          <h1>Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter e-mail"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
      </main>
    );
  }
}

export default Login;
