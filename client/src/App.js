import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WTWrapper from "./components/WTWrapper";
import Wrapper from "./components/Wrapper";

class App extends Component {
state={
  allNotes:[],
	measureNumber:1
}

componentDidMount(){
  this.addMeasure();
  return false;
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
          value: "",
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
extractId = (id) => {
  let idArray = id.thisid.split("-");
  let note = {
    measure: idArray[0].substring(1),
    beat: idArray[1].substring(1),
    line: idArray[2].substring(1),
    sNote: idArray[3].substring(1)
  };
  return note;
}

noteClick=(event,id)=>{
  event.preventDefault();
  let note = this.extractId(id);
  let allNotesCopy = this.state.allNotes;
  allNotesCopy[note.measure][note.beat][note.line][note.sNote].clicked = true;
  this.setState({allNotes: allNotesCopy});
}

noteSubmit = (event,id)=>{
  event.preventDefault();
  let note = this.extractId(id);
  let measure = note.measure;
  let beat = note.beat;
  let line = note.line;
  let sNote = note.sNote;
  let allNotesCopy = this.state.allNotes;
  allNotesCopy[measure][beat][line][sNote].clicked = false;
  let noteEntered2 = allNotesCopy[measure][beat][line][sNote].noteEntered;
  let parseNote=parseFloat(noteEntered2);
  if(noteEntered2 === "")
    allNotesCopy[measure][beat][line][sNote].value = "";
  else if(isNaN(noteEntered2) || parseNote % 1 !== 0 || parseNote<1||parseNote>24){
    allNotesCopy[measure][beat][line][sNote].value = "";
    allNotesCopy[measure][beat][line][sNote].noteEntered = "";
  }

  else {
    allNotesCopy[measure][beat][line][sNote].value = parseNote;
    allNotesCopy[measure][beat][line][sNote].noteEntered = "";
  }
  this.setState({allNotes: allNotesCopy});
}

noteChange = (event,id) => {
  event.preventDefault();
  let note = this.extractId(id);
  let allNotesCopy = this.state.allNotes;
  allNotesCopy[note.measure][note.beat][note.line][note.sNote].noteEntered = event.target.value;
  this.setState({allNotes: allNotesCopy});
}


  render() {
    return (
      <Wrapper>
        <h1>Enter any fret from 1 to 24</h1>
      	<button onClick={this.addMeasure}>Test</button>
      	<WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick}
        noteSubmit={this.noteSubmit} noteChange = {this.noteChange}/>
      </Wrapper>
    );
  }
};

export default App;
