import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NoteSelector from "./components/NoteSelector";
import WTWrapper from "./components/WTWrapper";
import Wrapper from "./components/Wrapper";
import Tone from 'tone';

const notes = ["sixtyfourth", "thirtysecond", "sixteenth", "eighth", "quarter", "half", "whole"];
const spaces = [1, 2, 4, 8, 16, 32, 64];

class App extends Component {
  state={
    allNotes:[],
  	measureNumber:1,
    noteSelected: "",
    noteType: "",
    editMode:true,
    btnMessage:"Play"
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
            value: "",
            clicked: false,
            noteEntered: "",
            duration: -1,
            disabled: false
          };
          lArray.push(noteObject);
        }
        bArray.push(lArray);
      }
      mArray.push(bArray);
    }
    tempArr.push(mArray);
    let counter = this.state.measureNumber;
    counter++;
    this.setState({allNotes:tempArr, measureNumber:counter});
  }

  extractId = (id) => {
    let idArray = id.thisId.split("-");
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
      let duration=allNotesCopy[measure][beat][line][sNote].duration;
      allNotesCopy[measure][beat][line][sNote].duration = -1;
      let currentLocation = { measure, beat, line, sNote };
      if(duration > 0) {
        duration--;
        let notesToModify = this.getIds(duration, currentLocation);
        console.log(notesToModify);
        for(let i = 0; i < notesToModify.length; i++)
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = false;
      }
    else if(noteEntered2==="X"||noteEntered2==="x"){
      allNotesCopy[measure][beat][line][sNote].value = "X";
      let duration = spaces[notes.indexOf(this.state.noteType)];
      allNotesCopy[measure][beat][line][sNote].duration = duration;
      let currentLocation = { measure, beat, line, sNote };
      duration--;
      if(duration > 0) {
        let notesToModify = this.getIds(duration, currentLocation);
        for(let i = 0; i < notesToModify.length; i++) {
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = true;
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].value = "";
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].noteEntered = "";
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].duration = -1;
        }
      }

    }
    else if(isNaN(noteEntered2) || parseNote % 1 !== 0 || parseNote<1||parseNote>24){
      allNotesCopy[measure][beat][line][sNote].value = "";
      allNotesCopy[measure][beat][line][sNote].noteEntered = ""; 
    }

    else {
      allNotesCopy[measure][beat][line][sNote].value = parseNote;
      let duration = spaces[notes.indexOf(this.state.noteType)];
      allNotesCopy[measure][beat][line][sNote].duration = duration;
      let currentLocation = { measure, beat, line, sNote };
      duration--;
      if(duration > 0) {
        let notesToModify = this.getIds(duration, currentLocation);
        for(let i = 0; i < notesToModify.length; i++) {
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = true;
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].value = "";
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].noteEntered = "";
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].duration = -1;
        }
      }
    }
    this.setState({allNotes: allNotesCopy});
  }

  getIds(duration, location) {
    let notesToModify = [];
    let currentBeat = parseInt(location.beat, 10);
    let currentSnote = parseInt(location.sNote, 10);
    while(duration > 0 && currentBeat < 4) {
      if(currentSnote < 15) {
        let address = {
          measure: parseInt(location.measure, 10),
          beat: currentBeat,
          line: parseInt(location.line, 10),
          sNote: currentSnote += 1
        }
        notesToModify.push(address);
      }
      else if(currentBeat < 3) {
        currentBeat++;
        currentSnote = 0;
        let address = {
          measure: parseInt(location.measure, 10),
          beat: currentBeat,
          line: parseInt(location.line, 10),
          sNote: currentSnote
        }
        notesToModify.push(address);
      }
      else {
        currentBeat++;
      }
      duration--;
    }
    return notesToModify;
  }

  noteChange = (event,id) => {
    event.preventDefault();
    let note = this.extractId(id);
    let allNotesCopy = this.state.allNotes;
    allNotesCopy[note.measure][note.beat][note.line][note.sNote].noteEntered = event.target.value;
    this.setState({allNotes: allNotesCopy});
  }

  setNoteType = (noteType) => {
    this.setState({noteType: noteType});
  }

  changeMode =(event)=>{
    event.preventDefault();
    let tempMode=!this.state.editMode;
    let tempMsg="Play";
    const synth=new Tone.PolySynth().toMaster();

    var loop = new Tone.Loop(function(time){
      synth.triggerAttackRelease("C1", "8n", time)
    }, "4n")


    loop.start(0);
    console.log(loop);


    if (tempMode===false){
      Tone.Transport.start('+0.1');
      tempMsg="Stop";
    }
    else{
       Tone.Transport.stop();
    }
    this.setState({editMode:tempMode, btnMessage:tempMsg});
  }



  render() {
    return (
      <Wrapper>
        <h1>Select a note and then enter any fret from 1 to 24</h1>
        <NoteSelector notes = {notes} selectedNoteType = {this.state.noteType} setNoteType = {this.setNoteType}/>
      	<button onClick={this.addMeasure}>Add Measure</button>
        <button onClick={this.changeMode}>{this.state.btnMessage}</button>
          {(this.state.editMode===true)?(
        	   <WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick} noteSubmit={this.noteSubmit} noteChange = {this.noteChange}/>
           ):(
            <WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick} noteSubmit={this.noteSubmit} noteChange = {this.noteChange}/>
            )
        }
        </Wrapper>
    );
  }
};

export default App;
