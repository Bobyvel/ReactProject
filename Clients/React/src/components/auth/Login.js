import React, { Component } from "react";
import toastr from "toastr";
import loginValidator from "../../utils/loginValidator";
import { login } from "../../services/authService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmitHandler(e) {
    e.preventDefault();

    const isValid = loginValidator(this.state.email, this.state.password);
    if (isValid) {
      const res = await login(this.state.email, this.state.password);
      console.log(res);
      if (res.success) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("username", res.user.username);
        if (res.user.roles.indexOf("Admin") !== -1) {
          localStorage.setItem("role", res.user.roles);
        }
        toastr.success("Login successful");
        this.props.history.push("/");
      } else {
        toastr.error(res.message);
      }
    }
  }

  render() {
    return (
      <main>
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter e-mail"
                value={this.state.email}
                onChange={this.onChangeHandler}
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
                onChange={this.onChangeHandler}
              />
            </div>
            <input type="submit" value="Login" />
          </form>
          <p>No acount? Join us <a href="/register">here</a></p>
        </div>
      </main>
    );
  }
}

export default Login;
