import React from "react";
import LetterBox from "../LetterBox";
import Measure from "../Measure";
import "./WTWrapper.css";

const WTWrapper = props => {
	return props.allNotes.map((element, index)=>
	  	<div className="WTWrapper" key={index+1}>
	  		<div className="forLetters">
	  			<LetterBox/>
	  		</div>
		  	<div className="forMeasures">
				<Measure measureNumber = {"m"+index+1} arrayOfBeats = {element}/>
			</div>
		</div>
	);

};

export default WTWrapper;