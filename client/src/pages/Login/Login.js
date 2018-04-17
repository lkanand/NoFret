import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";
// import { Link } from 'react-router-dom';

class Login extends Component {
	state = {
    username: null,
    password: null,
    error:null
  }
  handleInputChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    console.log(this.state);

    this.setState({
      error: null
    });

    // check to make sure they've entered a username and password.
    // this is very poor validation, and there are better ways
    // to do this in react, but this will suffice for the example
    if (!username || !password) {
      this.setState({
        error: 'A username and password is required.'
      });
      return;
    }

    axios.post('/api/auth', {
      username,
      password
    })
      .then(user => {
        // if the response is successful, make them log in
        // history.push('/login');
        console.log("loggedin");
      })
      .catch(err => {

        this.setState({
          error: err.response.data.message || err.message
        });
      });
  }

  createLogin = (event) => {
    event.preventDefault();
    console.log("got to function");

    const { username, password } = this.state;
    

    // clear any previous errors so we don't confuse the user
    this.setState({
      error: null
    });

    // check to make sure they've entered a username and password.
    // this is very poor validation, and there are better ways
    // to do this in react, but this will suffice for the example
    if (!username || !password) {
      this.setState({
        error: 'A username and password is required.'
      });
      return;
    }

    // post an auth request
    axios.post('/api/users', {
      username,
      password
    })
      .then(user => {
        // if the response is successful, make them log in
        console.log(" axios response");
        console.log(user);
        this.setState({username:"",password:""});
      })
      .catch(err => {
        console.log("an error");
        this.setState({
          error: err.response.data.message || err.message
        });
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
            <form>
                <div><label className="loginLabel">Username</label></div>
                	<input
                		className="inputField"
                		type="text"
		                value={this.state.username}
		                onChange={this.handleInputChanged}
		                name="username"
		              />
              	<div><label className="loginLabel">Password</label></div>
                	<input
                		className="inputField"
                		type="password"
		                value={this.state.password}
		                onChange={this.handleInputChanged}
		                name="password"
		              />
                <div><button 
                	disabled={!(this.state.username && this.state.password)}
                	onClick={this.handleLogin}
                	>
                  Log In
                </button></div>
                <div><button 
                  disabled={!(this.state.username && this.state.password)}
                  onClick={this.createLogin}
                  >
                  Create Account
                </button></div>
            </form>
    	</div>
    );
  }
};


export default Login;