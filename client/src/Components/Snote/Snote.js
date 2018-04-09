import React from "react";
import "./Snote.css";

const Snote = props => {
	return props.arrayOfNotes.map((element, index)=>{
		let thisId=props.lineIndex+'-s'+index;
		let elementToReturn;
		if(element.clicked === false&&element.value==="")
			elementToReturn = <div className = "editableNote"></div>;
		else if (element.clicked === false&&element.value!=="")
			elementToReturn=<div className="enteredNote">{element.value}</div>;
		else if (element.clicked===true&&element.value==="")
			elementToReturn = <form onSubmit={(e)=>props.noteSubmit(e, {thisId})} className = "newNote"> <input type = "text" onBlur={(e) => props.noteSubmit(e,{thisId})} onChange={(e)=>props.noteChange(e,{thisId})}/> </form>;
		else
			elementToReturn = <form onSubmit={(e)=>props.noteSubmit(e, {thisId})} className = "noteForm"> <input defaultValue={element.value} type = "text" onBlur={(e) => props.noteSubmit(e,{thisId})} onChange={(e)=>props.noteChange(e,{thisId})}/> </form>;
		return (
			<div className="note" key={index} id={props.lineIndex+'-s'+index} onClick={(e) => props.noteClick(e,{thisId})}>
				{elementToReturn}
			</div>
		);
	});
};

export default Snote;