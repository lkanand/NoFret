import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
  // componentDidMount() {
  //   // this is going to double check that the user is still actually logged in
  //   // if the app is reloaded. it's possible that we still have a user in sessionStorage
  //   // but the user's session cookie expired.
  //   axios.get('/api/auth')
  //     .then(res => {
  //       // if we get here, the user's session is still good. we'll update the user
  //       // to make sure we're using the most recent values just in case
  //       update(res.data);
  //     })
  //     .catch(err => {
  //       // if we get a 401 response, that means the user is no longer logged in
  //       if (err.response.status === 401) {
  //         update(null);
  //       }
  //     });
  // }
  render() {
     return (
      <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
      </Router>
    );
  }
}

export default App;