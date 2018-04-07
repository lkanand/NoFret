import React from "react";
import "./Line.css";
import Snote from "../Snote";

const Line = props => {
	return props.arrayOfLines.map((element, index)=>{
	  	return (
	  		<div className="line" key={index}>
	      		<Snote lineIndex = {props.beatIndex+'-l'+index} arrayOfNotes = {element} />
	  		</div>
	  	)
	});
};

export default Line;