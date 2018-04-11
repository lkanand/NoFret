import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import TabWriter from "./components/TabWriter";
// import ScaleTool from "./components/ScaleTool";

class App extends Component {

  render() {
    return (
      	<Home />
    );
  }
};

export default App;