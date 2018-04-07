import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WTWrapper from "./components/WTWrapper";
import Wrapper from "./components/Wrapper";

class App extends Component {
state={
  allNotes:[],
	measureNumber:1,
	noteEntered:0
}

componentDidMount(){
  this.addMeasure();
}

addMeasure=()=>{

  let tempArr=this.state.allNotes;
  

  let mArray=[];
  for(let j=1;j<5;j++){
    let bArray=[];
    for(let k=1;k<7;k++){
      let lArray=[];
      for(let l=1;l<17;l++){
        const noteObject = {
          snoteID: "m"+this.state.measureNumber+"-b"+j+"-l"+k+"-s"+l,
          value: 0
        };
        lArray.push(noteObject);
      }
      bArray.push(lArray);
    }
    mArray.push(bArray);
  }
  tempArr.push(mArray);
  let counter=this.state.measureNumber++;
  this.setState({allNotes:tempArr,measureNumber:counter});
}

// handleInputChange = event => {
    
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//     if (event.keyCode === 10 || event.keyCode === 13) {
//       handleFormSubmit();
//     }
//   };

  render() {
    return (
      <Wrapper>
      	<button onClick={this.addMeasure}>Test</button>
      	<WTWrapper allNotes={this.state.allNotes} />
      </Wrapper>
    );
  }
};

export default App;
