import React, { Component } from 'react';
import './Login.css';

class Login extends Component {


  render() {
    return (
          <div className="Login">
            <h1>Login</h1>
            <form onSubmit={(e) => this.props.handleSubmit(e, this.state, false)}>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={this.handleChange} name="username" placeholder="Ivan Ivanov"/>
            
            <label htmlFor="password">Password</label>
            <input type="password" onChange={this.handleChange} name="password" placeholder="******"/>
            <input type="submit" value="REGISTER"/>
            </form>
          </div>
    );
  }
}

export default Login;
