import React from "react";
import LetterBox from "../LetterBox";
import Beat from "../Beat";
import "./WTWrapper.css";

const WTWrapper = props => {
	let {allNotes, editMode, clearIndividualMeasure, deleteIndividualMeasure, ...other} = props;
	return allNotes.map((element, index)=>
	  	<div className={editMode === true ? "WTWrapper" : "WTWrapper noClick"} key={index+1}>
	  		<LetterBox openStrings={props.openStrings}/>
		  	<div className="measure">
				<Beat measureIndex = {"m"+index} arrayOfBeats = {element} {...other} />
			</div>
			<div className = "measureButtonContainer">
				<button onClick = {() => clearIndividualMeasure(index+1)}><i className="fas fa-eraser"></i></button>
				<button onClick = {() => deleteIndividualMeasure(index+1)}><i className="fas fa-trash-alt"></i></button>
			</div>
		</div>
	);
};

export default WTWrapper;