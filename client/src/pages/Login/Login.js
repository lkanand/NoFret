import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";
// import { Link } from 'react-router-dom';

class Login extends Component {
	state = {
    username: null,
    password: null
  }
  handleInputChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
 //  handleLogin = (event) => {
 //    event.preventDefault();

 //    const { username, password } = this.state;
 //    const { history } = this.props;

 //    axios.post('/api/auth', {
 //      username,
 //      password
 //    })
 //    .then(user => {
 //      update(user.data);
 //      history.push('/');
 //    })
 //    .catch(err => {

 //      this.setState({
 //        error: err.response.status === 401 ? 'Invalid username or password.' : err.message
 //      });
 //    });
 //  }
  render() {
    // const { error } = this.state;

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
                	// onClick={this.handleSubmit}
                	>
                  Log In
                </button></div>
            </form>
    	</div>
    );
  }
};


export default Login;