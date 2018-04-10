import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TabWriter from "./pages/TabWriter";

class App extends Component {

  render() {
    return (
      <TabWriter />
    );
  }
};

export default App;
