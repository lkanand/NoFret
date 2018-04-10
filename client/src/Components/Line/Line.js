import React from "react";
import "./Line.css";
import Snote from "../Snote";

const Line = props => {
	return props.arrayOfLines.map((element, index)=>{
	  	return (
	  		<div className="line" key={index} >
	      		<Snote lineIndex = {props.beatIndex+'-l'+index} arrayOfNotes = {element} noteClick={props.noteClick}
	      		noteSubmit = {props.noteSubmit} noteChange = {props.noteChange} setActiveNote = {props.setActiveNote} 
	      		activeNoteId = {props.activeNoteId} incOrDecDuration = {props.incOrDecDuration} />
	  		</div>
	  	)
	});
};

export default Line;