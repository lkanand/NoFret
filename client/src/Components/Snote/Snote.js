import React from "react";
import "./Snote.css";

const Snote = props => {
	return props.arrayOfNotes.map((element, index)=>{
		return (
			<div className="note" key={index} id={props.lineIndex+'-s'+index} onChange={props.handleInputChange}>
				{element.value === 0 ? "" : element.value}
			</div>
		)
	});
};

export default Snote;