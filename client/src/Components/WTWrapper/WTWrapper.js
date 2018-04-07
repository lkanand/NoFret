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
					noteSubmit = {props.noteSubmit} noteChange = {props.noteChange} />
				</div>
			</div>
		</div>
	);
};

export default WTWrapper;