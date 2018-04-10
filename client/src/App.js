import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TabWriter from "./pages/TabWriter";
import ScaleTool from "./components/ScaleTool";

class App extends Component {

  render() {
    return (
      <div>
        <ScaleTool />
        <TabWriter />
      </div>
    );
  }
};

export default App;
