import React from "react";
import "./Snote.css";

const Snote = props => {
	return props.arrayOfNotes.map((element, index)=>{
		let thisid=props.lineIndex+'-s'+index;
		let elementToReturn;
		if(element.clicked === false&&element.value==="")
			elementToReturn = <div className = "editableNote"></div>;
		else if (element.clicked === false&&element.value!=="")
			elementToReturn=<div className="enteredNote">{element.value}</div>;
		else if (element.clicked===true&&element.value==="")
			elementToReturn = <form onSubmit={(e)=>e.preventDefault()} className = "newNote"> <input type = "text" onBlur={(e) => props.noteSubmit(e,{thisid})} onChange={(e)=>props.noteChange(e,{thisid})}/> </form>;
		else
			elementToReturn = <form onSubmit={(e)=>e.preventDefault()} className = "noteForm"> <input defaultValue={element.value} type = "text" onBlur={(e) => props.noteSubmit(e,{thisid})} onChange={(e)=>props.noteChange(e,{thisid})}/> </form>;
		return (
			<div className="note" key={index} id={props.lineIndex+'-s'+index} onClick={(e) => props.noteClick(e,{thisid})}>
				{elementToReturn}
			</div>
		);
	});
};

export default Snote;