import React from "react";
import LetterBox from "../LetterBox";
import Beat from "../Beat";
import "./WTWrapper.css";

const WTWrapper = props => {
	return props.allNotes.map((element, index)=>
	  	<div className="WTWrapper" key={index+1}>
	  		<div className="forLetters">
	  			<LetterBox/>
	  		</div>
		  	<div className="forMeasures">
		  		<div className = "measure">
					<Beat measureIndex = {"m"+index} arrayOfBeats = {element} noteClick={props.noteClick}
					noteSubmit = {props.noteSubmit} noteChange = {props.noteChange} setActiveNote = {props.setActiveNote} 
					activeNoteId = {props.activeNoteId} incOrDecDuration = {props.incOrDecDuration} />
				</div>
			</div>
			<div className = "measureButtonContainer">
				<button onClick = {() => props.clearIndividualMeasure(index+1)}>Clear</button>
				<button onClick = {() => props.deleteIndividualMeasure(index+1)}>Delete</button>
			</div>
		</div>
	);
};

export default WTWrapper;