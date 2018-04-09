import React from "react";
import NoteOption from "./NoteOption";
import "./NoteSelector.css";

const NoteSelector = props => 
	<div className = "noteSelectorContainer">
		{props.notes.map((element, index) => {
				return <NoteOption selectedNoteType = {props.selectedNoteType} noteId = {element} setNoteType = {props.setNoteType} key = {index} />
			})
		}
	</div>;

export default NoteSelector; 