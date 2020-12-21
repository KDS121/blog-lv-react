import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  loginAdmin = (e) => {
    e.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post("/api/admin?key=surya", body).then((res) => {
      if (res.data.success === true) {
        const { token } = res.data;
        localStorage.setItem("atkn", token);
        this.props.checkLogin();
      } else {
        alert("Invalid Credentials");
      }
    });
  };

  render() {
    return (
      <>
        <div className="admin-login-container">
          <h3 className="admin-login-header">Admin Login</h3>
          <form className="admin-login-form">
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
            ></input>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.onChange}
            ></input>
            <button onClick={this.loginAdmin}>Login</button>
          </form>
        </div>
      </>
    );
  }
}
