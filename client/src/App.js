import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Line from "./components/Line";
import Measure from "./components/Measure";
import Snote from "./components/Snote";
import WTWrapper from "./components/WTWrapper";
import Wrapper from "./components/Wrapper";

class App extends Component {
state:{
	measureNumber:1
	noteEntered:0

}

//after the first click show measure
//measure will have number from this.state.measureNumber
//passinformation to children
//increase this.state.measureNumber

//we write a clicked function
//user types in number
//we send that number to measure

note=this.state.newNote

  render() {
    return (
      <Wrapper>
      	<button onClick{this.addMeasure}>Test</button>
      	<WTWrapper>
      	</WTWrapper>
      </Wrapper>
    );
  }
};

export default App;
