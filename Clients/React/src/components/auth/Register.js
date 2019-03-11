import React from "react";
import {register, login} from "../../api/remote";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmitHandler(e) {
    e.preventDefault();
    const res = await register(
      this.state.username,
      this.state.email,
      this.state.password
    );
    console.log(res)
    if(res.success){
      const res = await login( this.state.email,
        this.state.password)
        console.log(res)
        localStorage.setItem('authToken', res.token)
        localStorage.setItem('username', res.user.username)
        
    }
    
  }

  render() {
    return (
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="email"
            label="E-mail"
            placeholder="Enter e-mail"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="username"
            label="Username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.onChangeHandler}
          />
          <input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password again"
            value={this.state.confirmPassword}
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;