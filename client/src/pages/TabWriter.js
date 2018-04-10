import React, { Component } from 'react';
import NoteSelector from "../components/NoteSelector";
import WTWrapper from "../components/WTWrapper";
import Wrapper from "../components/Wrapper";
import Tone from 'tone';

const notes = ["sixtyfourth", "thirtysecond", "sixteenth", "eighth", "quarter", "half", "whole"];
const spaces = [1, 2, 4, 8, 16, 32, 64];

class TabWriter extends Component {
  state={
    allNotes:[],
  	measureNumber:1,
    noteSelected: "",
    noteType: "quarter",
    activeNoteId: "",
    pressedUporDown: false,
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

    let currentLocation = { measure, beat, line, sNote };
    
    let allNotesCopy = this.state.allNotes;
    allNotesCopy[measure][beat][line][sNote].clicked = false;
    
    let noteEntered2 = allNotesCopy[measure][beat][line][sNote].noteEntered;    
    let parseNote=parseFloat(noteEntered2);

    if(noteEntered2 === "") {
      allNotesCopy[measure][beat][line][sNote].value = "";
      let duration=allNotesCopy[measure][beat][line][sNote].duration;
      allNotesCopy[measure][beat][line][sNote].duration = -1;
      if(duration > 0) {
        duration--;
        let notesToModify = this.getIds(duration, currentLocation, "remove");
        for(let i = 0; i < notesToModify.length; i++)
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = false;
      }
    }
    else if((isNaN(noteEntered2) && noteEntered2!=="X" && noteEntered2!=="x") || parseNote % 1 !== 0 || parseNote<1||parseNote>24) {
      allNotesCopy[measure][beat][line][sNote].value = "";
      allNotesCopy[measure][beat][line][sNote].noteEntered = ""; 
    }
    else {
      allNotesCopy[measure][beat][line][sNote].value = parseNote;
      if(this.state.pressedUporDown === false) {
        let duration = spaces[notes.indexOf(this.state.noteType)];
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

  noteConverter=()=>{
    let allNotesCopy=this.state.allNotes;
    //look through notes; map them out

  //let rawnotes=then we get notes
  //this.tonePopulater(rawnotes);
  }

  tonePopulater=(notes)=>{
    let tempNotes=[];
    for (var i; i<notes.length; i++){
      let thisNote={
        time:notes[i].beat,
        note:notes[i].note,
        dur:notes[i].duration
      }
        tempNotes.push(thisNote);
    }
    return tempNotes;
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
      if(focusedNote.duration === -1)
        return;
      let addressOfLast = this.getEndOfNote(measure, beat, line, sNote, "add");
      if(addressOfLast.beat > 3 || allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].value !== "")
        return;
        allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].disabled = true;
        allNotesCopy[measure][beat][line][sNote].duration += 1;
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

  changeMode =(event)=>{
    event.preventDefault();
    let tempMode=!this.state.editMode;
    let tempMsg="Play";
    const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

    const populate=()=>{
      //this function will assign time note and dur with a for loop

      //push each to note array
      //let noteArrays=this.noteConverter();
      let noteArrays=[{ time : 0, note : ["C4"], dur : '4n'}
        ,
        { time : 0, note : 'G4', dur : '16n'}
        ];

        return noteArrays;
    }

    const part = new Tone.Part(function(time,event){
      synth.triggerAttackRelease(event.note, event.dur, time)
        },populate())

    part.start(0);
    part.loop=true;


    if (tempMode===false){
        this.noteConverter();
        tempMsg="Stop";
        Tone.Transport.start("+0.1");
      
    }
    else{
       Tone.Transport.stop();
    }
    this.setState({editMode:tempMode, btnMessage:tempMsg});
  }

test=()=>{
  console.log("test function");
}

  render() {
    return (
      <Wrapper>
        <h1>Select a note and then enter any fret from 1 to 24</h1>
        <NoteSelector notes = {notes} selectedNoteType = {this.state.noteType} setNoteType = {this.setNoteType}/>
      	<button onClick={this.addMeasure}>Add Measure</button>
        <button onClick={this.changeMode}>{this.state.btnMessage}</button>
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