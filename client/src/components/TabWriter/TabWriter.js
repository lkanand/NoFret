import React, { Component } from 'react';
import NoteSelector from "../NoteSelector";
import WTWrapper from "../WTWrapper";
import Wrapper from "../Wrapper";
import MIDISounds from 'midi-sounds-react';

const notes = ["sixtyfourth", "thirtysecond", "sixteenth", "eighth", "quarter", "half", "whole"];
const spaces = [1, 2, 4, 8, 16, 32, 64];

class TabWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      midi: props.midi,
      openStrings: props.openstrings,
      allNotes:[],
      measureNumber:1,
      noteSelected: "",
      noteType: "quarter",
      activeNoteId: "",
      pressedUporDown: false,
      editMode:true,
      btnMessage:"Play",
      tempNotes:[],
      instrument: 275,
      bpm: 120
    };
  }

  componentWillReceiveProps(props) {
    this.setState({openStrings: props.openstrings});
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

    let currentLocation = { measure, beat, line, sNote };
    
    let allNotesCopy = this.state.allNotes;
    allNotesCopy[measure][beat][line][sNote].clicked = false;
    
    let noteEntered2 = allNotesCopy[measure][beat][line][sNote].noteEntered;    
    let parseNote=parseFloat(noteEntered2);

    if(noteEntered2 === "" || (noteEntered2!=="X" && noteEntered2!=="x" && (isNaN(noteEntered2) || parseNote % 1 !== 0 || parseNote<0||parseNote>24))) {
      allNotesCopy[measure][beat][line][sNote].value = "";
      allNotesCopy[measure][beat][line][sNote].noteEntered = "";
      let duration=allNotesCopy[measure][beat][line][sNote].duration;
      allNotesCopy[measure][beat][line][sNote].duration = -1;
      if(duration > 0) {
        duration--;
        let notesToModify = this.getIds(duration, currentLocation, "remove");
        for(let i = 0; i < notesToModify.length; i++)
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = false;
      }
    }
    else {
      allNotesCopy[measure][beat][line][sNote].value = parseNote;
      let duration;
      let notesToModify;
      if(this.state.pressedUporDown === false) {
        duration = allNotesCopy[measure][beat][line][sNote].duration - 1;
        notesToModify = this.getIds(duration, currentLocation, "remove");
        for(let i = 0; i < notesToModify.length; i++)
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = false;
        duration = spaces[notes.indexOf(this.state.noteType)];
        allNotesCopy[measure][beat][line][sNote].duration = 1;
        duration--;
        if(duration > 0) {
          let notesToModify = this.getIds(duration, currentLocation, "add");
          allNotesCopy[measure][beat][line][sNote].duration = notesToModify.length + 1;
          for(let i = 0; i < notesToModify.length; i++) {
            allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = true;
            allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].value = "";
            allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].noteEntered = "";
            allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].duration = -1;
          }
        }
      }
    }
    this.setState({allNotes: allNotesCopy, activeNoteId: "", pressedUporDown: false});
  }

  getIds(duration, location, addOrRemove) {
    let notesToModify = [];
    let currentBeat = parseInt(location.beat, 10);
    let currentSnote = parseInt(location.sNote, 10);
    let noteToAdd;
    while(duration > 0 && currentBeat < 4) {
      if(currentSnote < 15) {
        let address = {
          measure: parseInt(location.measure, 10),
          beat: currentBeat,
          line: parseInt(location.line, 10),
          sNote: currentSnote += 1
        }
        noteToAdd = this.state.allNotes[address.measure][address.beat][address.line][address.sNote];
        if(addOrRemove === "remove")
          notesToModify.push(address);
        else if(noteToAdd.value === "")
          notesToModify.push(address);
        else
          return notesToModify;
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
        noteToAdd = this.state.allNotes[address.measure][address.beat][address.line][address.sNote];
        if(addOrRemove === "remove")
          notesToModify.push(address);
        else if(noteToAdd.value === "")
          notesToModify.push(address);
        else
          return notesToModify;
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

  setActiveNote = (id) => {
    this.setState({activeNoteId: id});
  }

  incOrDecDuration = (event, id) => {
    if(event.keyCode !== 38 && event.keyCode !== 40)
      return;
    let idArray = id.thisId.split("-");
    let measure = parseInt(idArray[0].substring(1), 10);
    let beat = parseInt(idArray[1].substring(1), 10);
    let line = parseInt(idArray[2].substring(1), 10);
    let sNote = parseInt(idArray[3].substring(1), 10);
    let allNotesCopy = this.state.allNotes;
    let focusedNote = allNotesCopy[measure][beat][line][sNote];
    let focusedNoteEntered = focusedNote.noteEntered;
    let parsedFocusedNoteEntered = parseFloat(focusedNoteEntered);

    if(focusedNoteEntered !== "X" && focusedNoteEntered !== "x" && (isNaN(focusedNoteEntered) || parsedFocusedNoteEntered % 1 !== 0 || parsedFocusedNoteEntered < 0 || parsedFocusedNoteEntered > 24))
      return;

    if(event.keyCode === 40) {
      if(focusedNote.duration === 1 || focusedNote.duration === -1)
        return;
      else {
        let addressOfLast = this.getEndOfNote(measure, beat, line, sNote, "remove");
        allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].disabled = false;
        allNotesCopy[measure][beat][line][sNote].duration -= 1;
        this.setState({allNotes: allNotesCopy, pressedUporDown: true});
      }
    }
    else {
      if(focusedNote.duration === -1) {
        allNotesCopy[measure][beat][line][sNote].value = focusedNoteEntered;
        allNotesCopy[measure][beat][line][sNote].duration = 1;
      }
      else {
        let addressOfLast = this.getEndOfNote(measure, beat, line, sNote, "add");
        if(addressOfLast.beat > 3 || allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].value !== "")
          return;
        allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].disabled = true;
        allNotesCopy[measure][beat][line][sNote].duration += 1;
      }
      this.setState({allNotes: allNotesCopy, pressedUporDown: true});
    }
  }

  getEndOfNote(measure, beat, line, sNote, removeOrAdd) {
    let duration = this.state.allNotes[measure][beat][line][sNote].duration;
    if(removeOrAdd === "remove")
      duration--;
    if(duration <= (15 - sNote))
      return {measure, beat, line, sNote: sNote + duration};
    else if(duration === (15 - sNote) + 16 * (3 - beat))
      return {measure, beat: 3, line, sNote: 15};
    else {
      duration -= (15 - sNote);
      let newBeat = beat + 1;
      newBeat += Math.floor(duration / 17);
      duration -= 16 * Math.floor(duration / 17);
      return {measure, beat: newBeat, line, sNote: duration - 1};
    }
  }

    noteConverter=()=>{

    let allNotesCopy=this.state.allNotes;

    let notesValues=[];

    for(let i=0;i<this.state.measureNumber-1;i++){
      let mArray=[];
    for(let j=0;j<4;j++){
      let bArray=[];
      for(let k=0;k<6;k++){
        let lArray=[];
        for(let l=0;l<16;l++){
          if (allNotesCopy[i][j][k][l].value===""){
              const nullNotes={
                id: allNotesCopy[i][j][k][l].snoteID,
                duration: 0,
                measure: i,
                beat: j,
                snote:l,
                note:""
              };
              lArray.push(nullNotes);
          }
          // if (allNotesCopy[i][j][k][l].value!==""){
          else{
           let lineValue=-1;
           //setting notes here;
           switch(k) {
                case 0:
                    lineValue=this.state.openStrings[0];
                    break;
                case 1:
                    lineValue=this.state.openStrings[1];
                    break;
                case 2:
                    lineValue=this.state.openStrings[2];
                    break;
                case 3:
                    lineValue=this.state.openStrings[3];
                    break;
                case 4:
                    lineValue=this.state.openStrings[4];
                    break; 
                case 5:
                    lineValue=this.state.openStrings[5];
                    break;    
            }
             let userVal=allNotesCopy[i][j][k][l].value;

            const notes = {
              // id: allNotesCopy[i][j][k][l].snoteID,
              duration: (allNotesCopy[i][j][k][l].duration)/64,
              // measure: i,
              // beat: j,
              // snote:l,
              note:userVal+lineValue
            };
            lArray.push(notes);
          }
        } 
        bArray.push(lArray);
      }
      mArray.push(bArray);
    }
    notesValues.push(mArray);
  }
  
  this.tonePopulater(notesValues);
  }

  tonePopulater=(notes)=>{
    this.setState({tempNotes:[]});
    let masterArray = [];
    for (let i=0; i<notes.length; i++){
      for(let j = 0; j < notes[i].length;j++){
        for(let k = 0; k < notes[i][j][0].length; k++) {
          let notesToPlay = [];
          for(let m = 0; m < 6; m++) {
            console.log(notes[i][j][m][k]);
            if(notes[i][j][m][k].note !== "") {
              let instrumentNote = [this.state.instrument, [notes[i][j][m][k].note],notes[i][j][m][k].duration, "down"];
              notesToPlay.push(instrumentNote);
            }
          }
          let sixtyFourArray = [[], notesToPlay];
          masterArray.push(sixtyFourArray);
        }
      }
    }
    this.setState({tempNotes:masterArray});
  }

  changeMode =(event)=>{
    event.preventDefault();
    let tempMode=!this.state.editMode;
    let tempMsg="Play";

    const promise1=this.noteConverter();


    if (tempMode===false){
      const promise1=this.noteConverter();
      tempMsg="Stop";
      let that=this;
      // console.log(this.state.tempNotes);

      Promise.all([promise1]).then(function(){
          that.props.midi.startPlayLoop(that.state.tempNotes,that.state.bpm,1/64,0);
      
      });

    }

    else{
           this.props.midi.stopPlayLoop();
           this.props.midi.beatIndex=0;
        }
        
      this.setState({editMode:tempMode, btnMessage:tempMsg});
    }

// test=()=>{
//   console.log("test function");
// }

  render() {
    return (
      <Wrapper>
        <h1>Select a note and then enter any fret from 0 to 24</h1>
        <NoteSelector notes = {notes} selectedNoteType = {this.state.noteType} setNoteType = {this.setNoteType}/>
      	<button onClick={this.addMeasure}>Add Measure</button>
        <button onClick={this.changeMode}>{this.state.btnMessage}</button>
        <button onClick={this.clearAll}>Clear All Measures</button>
          {(this.state.editMode===true)?(
        	   <WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick}
              noteSubmit={this.noteSubmit} noteChange = {this.noteChange} setActiveNote = {this.setActiveNote} 
              activeNoteId = {this.state.activeNoteId} incOrDecDuration = {this.incOrDecDuration}/>
          ):(
            <WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick} noteSubmit={this.noteSubmit} noteChange = {this.noteChange}/>
          )
        }
        </Wrapper>
    );
  }
};

export default TabWriter;