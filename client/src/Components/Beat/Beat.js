import React from "react";
import "./Beat.css";
import Line from "../Line";

const Beat = props => {
	return props.arrayOfBeats.map((element, index)=>{
  		return (
    		<div className="beat" key={index} >
      			<Line beatIndex = {props.measureIndex+'-b'+index} arrayOfLines = {element} noteClick={props.noteClick}
      			noteSubmit = {props.noteSubmit} noteChange={props.noteChange} setActiveNote = {props.setActiveNote} 
      			activeNoteId = {props.activeNoteId} incOrDecDuration = {props.incOrDecDuration} />
    		</div>
    	)
    });
} 

export default Beat;