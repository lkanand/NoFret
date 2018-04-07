import React from "react";
import "./Snote.css";

const Snote = props => {
	return props.arrayOfNotes.map((element, index)=>{
		let thisid=props.lineIndex+'-s'+index;
		let elementToReturn;
		if(element.clicked === false)
			elementToReturn = <div className = "editableNote">{element.value === 0 ? "" : element.value}</div>;
		else
			elementToReturn = <form className = "noteForm"> <input type = "text" onBlur={props.noteSubmit} onChange={props.noteChange}/> </form>;
		return (
			<div className="note" key={index} id={props.lineIndex+'-s'+index} onChange={props.handleInputChange} onClick={() => props.noteClick({thisid})}>
				{elementToReturn}
			</div>
		);
	});
};

export default Snote;