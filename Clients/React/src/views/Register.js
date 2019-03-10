import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.register(
      this.state.username,
      this.state.email,
      this.state.password
    );
  }

  render() {
    return (
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            label="E-mail"
            placeholder="Enter e-mail"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="username"
            label="Username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password again"
            value={this.state.confirmPassword}
            onChange={this.onChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;
