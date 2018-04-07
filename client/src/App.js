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
          value: 0,
          clicked: false,
          noteEntered: ""
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

//i click on id and it changes from short black div to text box


// handleInputChange = event => {
    
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//     if (event.keyCode === 10 || event.keyCode === 13) {
//       handleFormSubmit();
//     }
//   };
noteClick=(id)=>{
  let justid=id.thisid;
  let idArray = justid.split("-");
  let measure = idArray[0].substring(1);
  let beat = idArray[1].substring(1);
  let line = idArray[2].substring(1);
  let sNote = idArray[3].substring(1);
  let allNotesCopy = this.state.allNotes;
  allNotesCopy[measure][beat][line][sNote].clicked = true;
  this.setState({allNotes: allNotesCopy});
}

noteSubmit = (id, noteEntered)=>{
  let justid = id.thisid;
  let idArray=justid.split("-");
  let measure = idArray[0].substring(1);
  let beat = idArray[1].substring(1);
  let line = idArray[2].substring(1);
  let sNote = idArray[3].substring(1);
  let allNotesCopy = this.state.allNotes;
  allNotesCopy[measure][beat][line][sNote].clicked = false;
  let noteEntered2 = allNotesCopy[measure][beat][line][sNote].noteEntered;
  allNotesCopy[measure][beat][line][sNote].value = parseInt(noteEntered2);
  allNotesCopy[measure][beat][line][sNote].noteEntered = "";
  this.setState({allNotes: allNotesCopy});
}

noteChange = event => {

}


  render() {
    return (
      <Wrapper>
      	<button onClick={this.addMeasure}>Test</button>
      	<WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick}
        noteSubmit={this.noteSubmit} noteChange = {this.noteChange}/>
      </Wrapper>
    );
  }
};

export default App;
