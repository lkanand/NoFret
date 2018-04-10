import React from "react";
import "./NoteSelector.css";

const NoteOption = props => 
	<img className = {props.selectedNoteType === props.noteId ? "noteOption solidBorder" : "noteOption transparentBorder"} 
	src = {"./img/" + props.noteId + "note.png"} alt = {props.noteId} onClick = {() => props.setNoteType(props.noteId)} />

export default NoteOption;