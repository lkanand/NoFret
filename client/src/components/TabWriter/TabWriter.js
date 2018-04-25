import React, { Component } from 'react';
import NoteSelector from "../NoteSelector";
import WTWrapper from "../WTWrapper";
import Wrapper from "../Wrapper";
import MeasureHeader from "../MeasureHeader";
import axios from 'axios';
import "./TabWriter.css";

const notes = ["sixtyfourth", "thirtysecond", "sixteenth", "eighth", "quarter", "half", "whole"];
const spaces = [1, 2, 4, 8, 16, 32, 64];
let intervals = [];
let timeouts = [];
let tempNotes = [];

class TabWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStrings: props.openstrings,
      allNotes:[],
      measureNumber:1,
      noteSelected: "",
      noteType: "quarter",
      activeNoteId: "",
      pressedUporDown: false,
      editMode: props.editMode,
      instrument: 275,
      timeSig: props.timeSig,
      tabId: props.tabId
    };

    this.modalFunction=props.modalFunction;
  }

  componentWillReceiveProps(props) {
    if(props.editMode === false && this.state.editMode === true) {
      const promise1 = this.noteConverter();
      let that = this;
      Promise.all([promise1]).then(function(){
        that.props.midi.startPlayLoop(tempNotes,that.props.bpm,1/64,0);
        that.setLightUpEvents();
        let intervalFunction = setInterval(function(){
          that.props.midi.stopPlayLoop();
          that.props.midi.beatIndex = 0;
          that.props.midi.startPlayLoop(tempNotes,that.props.bpm,1/64,0);
          that.setLightUpEvents();
        }, 1000*(60 / that.props.bpm)*that.state.timeSig*(that.state.measureNumber-1));
        intervals.push(intervalFunction);
      });
    }
    else if(props.editMode === true && this.state.editMode === false) {
      this.removeAllFlashClasses();
      intervals.forEach(element => clearInterval(element));
      timeouts.forEach(element => clearTimeout(element));
      intervals = [];
      timeouts = [];
      this.props.midi.stopPlayLoop();
      this.props.midi.beatIndex=0;
    }

    if(props.timeSig !== this.state.timeSig) {
      this.modifyMeasureArrays(props.timeSig, this.state.timeSig);
    }

    if(this.state.tabId !== props.tabId) {
      if(props.tabId === "") {
        this.clearAllMeasures(props.timeSig);
        this.setState({tabId: props.tabId});
      }
      else {
        this.setState({tabId: props.tabId});
        axios.get('api/onetab/'+props.tabId)
        .then(res =>{
          this.setState({allNotes: res.data.notes})
        })
        .catch(err => console.log(err));
      }
    }

    this.setState({openStrings: props.openstrings, editMode: props.editMode, timeSig: props.timeSig});
  }

  componentDidMount(){
    this.addMeasure();
  }

  addMeasure = () => {
    let tempArr=this.state.allNotes;
    let newMeasure = this.createMeasure(this.state.measureNumber, this.state.timeSig);
    tempArr.push(newMeasure);
    let counter = this.state.measureNumber;
    counter++;
    this.setState({allNotes:tempArr, measureNumber:counter});
  }

  clearAllMeasures = (timeSig) => {
    let newMeasure = this.createMeasure(1, timeSig);
    this.setState({allNotes: [newMeasure], measureNumber: 2});
  }

  clearIndividualMeasure = (measureNumber) => {
    let blankMeasure = this.createMeasure(measureNumber, this.state.timeSig);
    let tempArr = this.state.allNotes;
    tempArr[measureNumber - 1] = blankMeasure;
    this.setState({allNotes: tempArr});
  }

  deleteIndividualMeasure = (measureNumber) => {
    let tempArr = this.state.allNotes;
    tempArr.splice(measureNumber - 1, 1);
    if(tempArr.length > 0) {
      for(let i = 0; i < tempArr.length; i++) {
        for(let j = 0; j < tempArr[i].length; j++) {
          for(let k = 0; k < tempArr[i][j].length; k++) {
            for(let m = 0; m < tempArr[i][j][k].length; m++) 
              tempArr[i][j][k][m].snoteID = "m" + (i + 1) + "-b" + (j + 1) + "-l" + (k + 1) + "-s" + (m + 1);
          }
        }
      }
    }
    else 
      tempArr = [this.createMeasure(1, this.state.timeSig)];

    let newMeasureNumber = Math.max(2, this.state.measureNumber - 1);

    this.setState({allNotes: tempArr, measureNumber: newMeasureNumber});
  }

  createMeasure = (measureNumber, currentTimeSig) => {
    let mArray=[];
    for(let j=1;j<currentTimeSig+1;j++){
      let bArray=this.createNewBeat(measureNumber, j);
      mArray.push(bArray);
    }
    return mArray;
  }

  modifyMeasureArrays = (newTimeSig, oldTimeSig) => {
    let allNotesCopy = this.state.allNotes;
    if(newTimeSig < oldTimeSig) {
      for(let q = 0; q < allNotesCopy.length; q++)
        allNotesCopy[q].splice(newTimeSig);

      for(let i = 0; i < allNotesCopy.length; i++) {
        for(let j = 0; j < allNotesCopy[i].length; j++) {
          for(let k = 0; k < allNotesCopy[i][j].length; k++) {
            for(let m = 0; m < allNotesCopy[i][j][k].length; m++) {
              if(allNotesCopy[i][j][k][m].value !== "") {
                let currentIndex = j * 16 + (m + 1);
                let maxIndex = newTimeSig * 16;
                let thisDuration = allNotesCopy[i][j][k][m].duration;
                let endingIndex = currentIndex + thisDuration - 1;
                if(endingIndex > maxIndex)
                  allNotesCopy[i][j][k][m].duration = thisDuration - (endingIndex - maxIndex); 
              }
            }
          }
        }
      }
    }
    else {
      for(let i = 0; i < allNotesCopy.length; i++) {
        for(let j = oldTimeSig; j < newTimeSig; j++)
          allNotesCopy[i].push(this.createNewBeat(i + 1, j + 1));
      }
    }
    this.setState({allNotes: allNotesCopy});
  }

  createNewBeat = (measureNumber, beatNumber) => {
    let newBeat = [];
    for(var k = 1; k < 7; k++) {
      let newLine = [];
      for(var m = 1; m < 17; m++) {
        const noteObject = {
          snoteID: "m"+measureNumber+"-b"+beatNumber+"-l"+k+"-s"+m,
          value: "",
          clicked: false,
          noteEntered: "",
          duration: -1,
          disabled: false
        };
        newLine.push(noteObject);
      }
      newBeat.push(newLine);
    }
    return newBeat;
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

    let objRegExp = /^[a-zA-Z]+$/;

    if(noteEntered2 === "" || (isNaN(noteEntered2) || parseNote % 1 !== 0 || parseNote<0||parseNote>24)) {
      let duration=allNotesCopy[measure][beat][line][sNote].duration;
      if(duration > 0) {
        duration--;
        let notesToModify = this.getIds(duration, currentLocation, "remove");
        for(let i = 0; i < notesToModify.length; i++)
          allNotesCopy[notesToModify[i].measure][notesToModify[i].beat][notesToModify[i].line][notesToModify[i].sNote].disabled = false;
      }

      if(objRegExp.test(noteEntered2) === true && noteEntered2.length === 1) {
        allNotesCopy[measure][beat][line][sNote].value = noteEntered2;
        allNotesCopy[measure][beat][line][sNote].duration = 1;
      }
      else {
        allNotesCopy[measure][beat][line][sNote].value = "";
        allNotesCopy[measure][beat][line][sNote].noteEntered = "";
        allNotesCopy[measure][beat][line][sNote].duration = -1;
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

  getIds = (duration, location, addOrRemove) => {
    let notesToModify = [];
    let currentBeat = parseInt(location.beat, 10);
    let currentSnote = parseInt(location.sNote, 10);
    let noteToAdd;
    while(duration > 0 && currentBeat < this.state.timeSig) {
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
      else if(currentBeat < this.state.timeSig - 1) {
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

    if(isNaN(focusedNoteEntered) || parsedFocusedNoteEntered % 1 !== 0 || parsedFocusedNoteEntered < 0 || parsedFocusedNoteEntered > 24)
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
        if(addressOfLast.beat > this.state.timeSig - 1 || allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].value !== "")
          return;
        allNotesCopy[addressOfLast.measure][addressOfLast.beat][addressOfLast.line][addressOfLast.sNote].disabled = true;
        allNotesCopy[measure][beat][line][sNote].duration += 1;
      }
      this.setState({allNotes: allNotesCopy, pressedUporDown: true});
    }
  }

  getEndOfNote = (measure, beat, line, sNote, removeOrAdd) => {
    let duration = this.state.allNotes[measure][beat][line][sNote].duration;
    if(removeOrAdd === "remove")
      duration--;
    if(duration <= (15 - sNote))
      return {measure, beat, line, sNote: sNote + duration};
    else if(duration === (15 - sNote) + 16 * (this.state.timeSig - 1 - beat))
      return {measure, beat: this.state.timeSig - 1, line, sNote: 15};
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
    for(let j=0;j<this.state.timeSig;j++){
      let bArray=[];
      for(let k=0;k<6;k++){
        let lArray=[];
        for(let l=0;l<16;l++){
          if (allNotesCopy[i][j][k][l].value==="" || isNaN(allNotesCopy[i][j][k][l].value)) {
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
              default: 
                break;    
            }
            
            let userVal=allNotesCopy[i][j][k][l].value;

            const notes = {
              duration: (allNotesCopy[i][j][k][l].duration)/64,
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
    tempNotes = [];
    let masterArray = [];
    for (let i=0; i<notes.length; i++){
      for(let j = 0; j < notes[i].length;j++){
        for(let k = 0; k < notes[i][j][0].length; k++) {
          let notesToPlay = [];
          for(let m = 0; m < 6; m++) {
            if(notes[i][j][m][k].note !== "") {
              let instrumentNote = [this.props.tone, [notes[i][j][m][k].note],notes[i][j][m][k].duration, "down"];
              notesToPlay.push(instrumentNote);
            }
          }
          let sixtyFourArray = [[], notesToPlay];
          masterArray.push(sixtyFourArray);
        }
      }
    }
    tempNotes = masterArray;
  }

  setLightUpEvents = () => {
    let arrayOfNotesCopy = this.state.allNotes;
    for(var i = 0; i < arrayOfNotesCopy.length; i++){
      for(var j = 0; j < arrayOfNotesCopy[i].length; j++){
        for(var k = 0; k < arrayOfNotesCopy[i][j].length; k++){
          for(var m = 0; m < arrayOfNotesCopy[i][j][k].length; m++) {
            let duration = arrayOfNotesCopy[i][j][k][m].duration; 
            if(duration > 0) {
              let arrayToLight = this.getIdsToLight(duration, {measure: i, beat: j, line: k, sNote: m});
              let thisAddress = {measure: i, beat: j, line: k, sNote: m};
              arrayToLight.unshift(thisAddress);
              arrayToLight.pop();
              let that = this;
              let timeoutFunction = setTimeout(that.toLightUpNotes(arrayToLight, duration), ((60 / that.props.bpm) * this.state.timeSig * i + (60 / that.props.bpm) * j + (60 / that.props.bpm) / 16 * m)*1000);
              timeouts.push(timeoutFunction);
            }
          }
        }
      }
    }
  }

  getIdsToLight = (duration, location) => {
    let notesToModify = [];
    let currentBeat = location.beat;
    let currentSnote = location.sNote;
    while(duration > 0 && currentBeat < this.state.timeSig) {
      if(currentSnote < 15) {
        let address = {
          measure: parseInt(location.measure, 10),
          beat: currentBeat,
          line: parseInt(location.line, 10),
          sNote: currentSnote += 1
        }
        notesToModify.push(address);
      }
      else if(currentBeat < this.state.timeSig - 1) {
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
        let address = {
          measure: parseInt(location.measure, 10),
          beat: currentBeat,
          line: parseInt(location.line, 10),
          sNote: currentSnote
        }
        notesToModify.push(address);
        return notesToModify;
      }
      duration--;
    }
    return notesToModify;
  }

  toLightUpNotes = (arrayToLight, duration) => {
    let that = this;
    return function(){
      that.lightUpNotes(arrayToLight, duration);
    }
  }

  lightUpNotes = (arrayOfNotes, duration) => {
    for(var i = 0; i < arrayOfNotes.length; i++) {
      let measure = arrayOfNotes[i].measure;
      let beat = arrayOfNotes[i].beat;
      let line = arrayOfNotes[i].line;
      let sNote = arrayOfNotes[i].sNote;
      let elementToLight = document.getElementById("m" + measure + "-b" + beat + "-l" + 
        line + "-s" + sNote).children[0];
      elementToLight.classList.remove("flashBackward");
      elementToLight.classList.add("flashForward");
      let that = this;
      if(duration < 16*this.props.timeSig*(this.state.measureNumber - 1)) {
        let timeoutFunction = setTimeout(that.toRemoveFlash(elementToLight), 1000*duration*(60 / that.props.bpm) / 16);
        timeouts.push(timeoutFunction);
      }
    }
  }

  toRemoveFlash = (elementToUnlight) => {
    let that = this;
    return function(){
      that.removeFlash(elementToUnlight);
    }
  }

  removeFlash = (elementToUnlight) => {
    elementToUnlight.classList.remove("flashForward");
    elementToUnlight.classList.add("flashBackward");
  }

  removeAllFlashClasses = () => {
    let animatedNotes = document.querySelectorAll(".flashForward");
    animatedNotes.forEach((element, index) => element.classList.remove("flashForward"));
    animatedNotes = document.querySelectorAll(".flashBackward");
    animatedNotes.forEach((element, index) => element.classList.remove("flashBackward"));
  }

  render() {
    return (
      <Wrapper>
        <NoteSelector notes = {notes} selectedNoteType = {this.state.noteType} setNoteType = {this.setNoteType}/>
        <div className="allMeasuresContainer">
          <MeasureHeader tabId={this.props.tabId} allNotes={this.state.allNotes} modalFunction={this.modalFunction} loggedIn={this.props.loggedIn} editMode={this.state.editMode} bpm={this.props.bpm} timeSig={this.state.timeSig} 
          tuning={this.props.tuning} addMeasure={this.addMeasure} clearAllMeasures={this.clearAllMeasures} newTab={this.props.newTab} triggerSaveModal={this.props.triggerSaveModal}/>
          {(this.state.editMode===true)?(
          	   <WTWrapper allNotes={this.state.allNotes} noteClick={this.noteClick}
                noteSubmit={this.noteSubmit} noteChange = {this.noteChange} setActiveNote = {this.setActiveNote} 
                activeNoteId = {this.state.activeNoteId} incOrDecDuration = {this.incOrDecDuration} 
                clearIndividualMeasure = {this.clearIndividualMeasure} deleteIndividualMeasure = {this.deleteIndividualMeasure} 
                editMode = {this.state.editMode} openStrings = {this.state.openStrings}/>
            ):(
              <WTWrapper allNotes={this.state.allNotes} editMode = {this.state.editMode}  openStrings = {this.state.openStrings}/>
            )
          }
        </div>
      </Wrapper>
    );
  }
};

export default TabWriter;